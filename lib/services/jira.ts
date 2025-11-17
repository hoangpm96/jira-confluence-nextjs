import axios, { AxiosInstance } from 'axios';
import type {
  ProjectInfo,
  IssueType,
  IssueResponse,
  IssueDetails,
  BulkCreateResponse,
  UserStory
} from '@/types';

export class JiraService {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.JIRA_URL || '';

    const auth = Buffer.from(
      `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
    ).toString('base64');

    this.client = axios.create({
      baseURL: `${this.baseUrl}/rest/api/3`,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  async getProjects(): Promise<ProjectInfo[]> {
    try {
      const response = await this.client.get('/project', {
        params: { expand: 'lead' },
      });

      return response.data.map((project: any) => ({
        key: project.key,
        name: project.name,
        type: project.projectTypeKey,
        lead: project.lead?.displayName || 'Unknown',
      }));
    } catch (error: any) {
      throw new Error(`Error getting projects: ${error.message}`);
    }
  }

  async getIssueTypes(projectKey: string): Promise<IssueType[]> {
    try {
      const response = await this.client.get(`/project/${projectKey}`);
      const issueTypes = response.data.issueTypes || [];

      return issueTypes.map((it: any) => ({
        id: it.id,
        name: it.name,
        description: it.description || '',
        subtask: it.subtask || false,
      }));
    } catch (error: any) {
      throw new Error(`Error getting issue types: ${error.message}`);
    }
  }

  private formatUserStoryDescription(
    description: string,
    acceptanceCriteria?: string
  ): string {
    let formatted = `h3. Description\n${description}\n\n`;

    if (acceptanceCriteria) {
      formatted += `h3. Acceptance Criteria\n${acceptanceCriteria}\n\n`;
    }

    return formatted;
  }

  async createStory(
    projectKey: string,
    summary: string,
    description: string,
    acceptanceCriteria?: string,
    storyPoints?: number,
    priority: string = 'Medium',
    labels?: string[],
    assignee?: string,
    issueType: string = 'Story'
  ): Promise<IssueResponse> {
    try {
      const formattedDescription = this.formatUserStoryDescription(
        description,
        acceptanceCriteria
      );

      const fields: any = {
        project: { key: projectKey },
        summary,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: formattedDescription,
                },
              ],
            },
          ],
        },
        issuetype: { name: issueType },
        priority: { name: priority },
      };

      if (labels && labels.length > 0) {
        fields.labels = labels;
      }

      if (assignee) {
        fields.assignee = { accountId: assignee };
      }

      if (storyPoints !== undefined) {
        // Try common story points field IDs
        try {
          fields.customfield_10016 = storyPoints;
        } catch (e) {
          console.warn('Could not set story points - field ID may be different');
        }
      }

      const response = await this.client.post('/issue', { fields });
      const newIssue = response.data;

      return {
        key: newIssue.key,
        id: newIssue.id,
        url: `${this.baseUrl}/browse/${newIssue.key}`,
        summary,
        issue_type: issueType,
      };
    } catch (error: any) {
      throw new Error(`Error creating story: ${error.response?.data?.errorMessages || error.message}`);
    }
  }

  async createStoriesBulk(
    projectKey: string,
    stories: UserStory[]
  ): Promise<BulkCreateResponse> {
    const createdStories: IssueResponse[] = [];
    const errors: Array<{ index: number; summary: string; error: string }> = [];

    for (let idx = 0; idx < stories.length; idx++) {
      const story = stories[idx];
      try {
        const result = await this.createStory(
          projectKey,
          story.summary,
          story.description,
          story.acceptance_criteria,
          story.story_points,
          story.priority || 'Medium',
          story.labels,
          story.assignee,
          'Story'
        );
        createdStories.push(result);
      } catch (error: any) {
        errors.push({
          index: idx,
          summary: story.summary,
          error: error.message,
        });
      }
    }

    return {
      created: createdStories.length,
      failed: errors.length,
      stories: createdStories,
      errors,
    };
  }

  async getIssue(issueKey: string): Promise<IssueDetails> {
    try {
      const response = await this.client.get(`/issue/${issueKey}`);
      const issue = response.data;
      const fields = issue.fields;

      return {
        key: issue.key,
        summary: fields.summary,
        description: fields.description?.content?.[0]?.content?.[0]?.text || '',
        status: fields.status?.name || 'Unknown',
        priority: fields.priority?.name || 'Unknown',
        assignee: fields.assignee?.displayName,
        reporter: fields.reporter?.displayName || 'Unknown',
        created: fields.created,
        updated: fields.updated,
        url: `${this.baseUrl}/browse/${issue.key}`,
      };
    } catch (error: any) {
      throw new Error(`Error getting issue: ${error.message}`);
    }
  }

  async searchIssues(jql: string, maxResults: number = 50): Promise<IssueDetails[]> {
    try {
      const response = await this.client.post('/search', {
        jql,
        maxResults,
        fields: ['summary', 'status', 'priority', 'assignee'],
      });

      return response.data.issues.map((issue: any) => {
        const fields = issue.fields;
        return {
          key: issue.key,
          summary: fields.summary,
          description: '',
          status: fields.status?.name || 'Unknown',
          priority: fields.priority?.name || 'Unknown',
          assignee: fields.assignee?.displayName,
          reporter: '',
          created: '',
          updated: '',
          url: `${this.baseUrl}/browse/${issue.key}`,
        };
      });
    } catch (error: any) {
      throw new Error(`Error searching issues: ${error.message}`);
    }
  }

  async addComment(issueKey: string, comment: string): Promise<any> {
    try {
      const response = await this.client.post(`/issue/${issueKey}/comment`, {
        body: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: comment,
                },
              ],
            },
          ],
        },
      });

      const result = response.data;
      return {
        id: result.id,
        body: comment,
        created: result.created,
        author: result.author?.displayName || 'Unknown',
      };
    } catch (error: any) {
      throw new Error(`Error adding comment: ${error.message}`);
    }
  }
}
