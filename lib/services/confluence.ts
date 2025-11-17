import axios, { AxiosInstance } from 'axios';
import type { SpaceInfo, PageListResponse, PageContent, PageInfo } from '@/types';

export class ConfluenceService {
  private client: AxiosInstance;
  private baseUrl: string;
  private defaultSpaceKey: string;

  constructor() {
    this.baseUrl = process.env.JIRA_URL || '';
    this.defaultSpaceKey = process.env.DEFAULT_SPACE_KEY || '';

    // Validate required environment variables
    if (!this.baseUrl) {
      throw new Error('JIRA_URL environment variable is not set');
    }
    if (!process.env.JIRA_EMAIL) {
      throw new Error('JIRA_EMAIL environment variable is not set');
    }
    if (!process.env.JIRA_API_TOKEN) {
      throw new Error('JIRA_API_TOKEN environment variable is not set');
    }

    // Auto-add https:// if missing
    if (!this.baseUrl.startsWith('http://') && !this.baseUrl.startsWith('https://')) {
      this.baseUrl = `https://${this.baseUrl}`;
    }

    // Validate URL format
    try {
      new URL(this.baseUrl);
    } catch (error) {
      throw new Error(`Invalid JIRA_URL: ${this.baseUrl}. Must be a valid URL like https://your-domain.atlassian.net`);
    }

    const auth = Buffer.from(
      `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
    ).toString('base64');

    this.client = axios.create({
      baseURL: `${this.baseUrl}/wiki/rest/api`,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  async getSpaceInfo(spaceKey?: string): Promise<SpaceInfo> {
    try {
      const key = spaceKey || this.defaultSpaceKey;
      const response = await this.client.get(`/space/${key}`, {
        params: { expand: 'description,homepage' },
      });

      const space = response.data;
      return {
        key: space.key,
        name: space.name,
        type: space.type,
        homepage_id: space.homepage?.id,
        _links: space._links,
      };
    } catch (error: any) {
      throw new Error(`Error getting space info: ${error.message}`);
    }
  }

  async listPages(spaceKey?: string, limit: number = 50): Promise<PageListResponse> {
    try {
      const key = spaceKey || this.defaultSpaceKey;
      const spaceInfo = await this.getSpaceInfo(key);

      const response = await this.client.get('/content', {
        params: {
          spaceKey: key,
          type: 'page',
          status: 'current',
          limit,
          expand: 'version,body.storage',
        },
      });

      const pages: PageInfo[] = response.data.results.map((page: any) => ({
        id: page.id,
        title: page.title,
        type: page.type,
        version: page.version?.number,
        url: `${this.baseUrl}/wiki/spaces/${key}/pages/${page.id}`,
        last_updated: page.version?.when,
        updated_by: page.version?.by?.displayName,
      }));

      return {
        space_key: key,
        space_name: spaceInfo.name,
        total: pages.length,
        pages,
      };
    } catch (error: any) {
      throw new Error(`Error listing pages: ${error.message}`);
    }
  }

  async getPageContent(pageId: string): Promise<PageContent> {
    try {
      const response = await this.client.get(`/content/${pageId}`, {
        params: { expand: 'body.storage,version,space' },
      });

      const page = response.data;
      return {
        id: page.id,
        title: page.title,
        content: page.body.storage.value,
        version: page.version.number,
        space_key: page.space.key,
        url: `${this.baseUrl}/wiki/spaces/${page.space.key}/pages/${page.id}`,
      };
    } catch (error: any) {
      throw new Error(`Error getting page content: ${error.message}`);
    }
  }

  async createPage(
    title: string,
    content: string,
    spaceKey?: string,
    parentId?: string,
    contentType: string = 'page'
  ): Promise<any> {
    try {
      const key = spaceKey || this.defaultSpaceKey;

      // Convert plain text to HTML if needed
      let htmlContent = content;
      if (!content.startsWith('<')) {
        htmlContent = `<p>${content.replace(/\n/g, '</p><p>')}</p>`;
      }

      const data: any = {
        type: contentType,
        title,
        space: { key },
        body: {
          storage: {
            value: htmlContent,
            representation: 'storage',
          },
        },
      };

      if (parentId) {
        data.ancestors = [{ id: parentId }];
      }

      const response = await this.client.post('/content', data);
      const newPage = response.data;

      return {
        id: newPage.id,
        title: newPage.title,
        url: `${this.baseUrl}/wiki/spaces/${key}/pages/${newPage.id}`,
        version: newPage.version.number,
      };
    } catch (error: any) {
      throw new Error(`Error creating page: ${error.message}`);
    }
  }

  async updatePage(
    pageId: string,
    title?: string,
    content?: string,
    versionComment: string = 'Updated via API'
  ): Promise<any> {
    try {
      // Get current page to get version
      const currentPage = await this.getPageContent(pageId);

      const newTitle = title || currentPage.title;
      let newContent = content || currentPage.content;

      // Convert plain text to HTML if needed
      if (newContent && !newContent.startsWith('<')) {
        newContent = `<p>${newContent.replace(/\n/g, '</p><p>')}</p>`;
      }

      const data = {
        version: {
          number: currentPage.version + 1,
          message: versionComment,
        },
        title: newTitle,
        type: 'page',
        body: {
          storage: {
            value: newContent,
            representation: 'storage',
          },
        },
      };

      const response = await this.client.put(`/content/${pageId}`, data);
      const updatedPage = response.data;

      return {
        id: updatedPage.id,
        title: updatedPage.title,
        url: `${this.baseUrl}/wiki/spaces/${currentPage.space_key}/pages/${pageId}`,
        version: updatedPage.version.number,
        previous_version: currentPage.version,
      };
    } catch (error: any) {
      throw new Error(`Error updating page: ${error.message}`);
    }
  }

  async appendToPage(
    pageId: string,
    additionalContent: string,
    separator: string = '<hr/>'
  ): Promise<any> {
    try {
      const currentPage = await this.getPageContent(pageId);

      // Convert new content to HTML if needed
      let htmlContent = additionalContent;
      if (!additionalContent.startsWith('<')) {
        htmlContent = `<p>${additionalContent.replace(/\n/g, '</p><p>')}</p>`;
      }

      const newContent = `${currentPage.content}${separator}${htmlContent}`;

      return await this.updatePage(
        pageId,
        undefined,
        newContent,
        'Content appended via API'
      );
    } catch (error: any) {
      throw new Error(`Error appending to page: ${error.message}`);
    }
  }

  async searchPages(query: string, spaceKey?: string): Promise<PageInfo[]> {
    try {
      const key = spaceKey || this.defaultSpaceKey;
      const cql = `space = "${key}" AND type = page AND text ~ "${query}"`;

      const response = await this.client.get('/content/search', {
        params: {
          cql,
          limit: 20,
        },
      });

      return response.data.results.map((result: any) => ({
        id: result.id,
        title: result.title,
        type: result.type,
        url: `${this.baseUrl}/wiki${result._links.webui}`,
      }));
    } catch (error: any) {
      throw new Error(`Error searching pages: ${error.message}`);
    }
  }
}
