import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { ConfluenceService } from '@/lib/services/confluence';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';
import type { WorkflowRequest } from '@/types';

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const body: WorkflowRequest = await request.json();
    const jiraService = new JiraService();
    const confluenceService = new ConfluenceService();

    // Create stories in Jira
    const jiraResult = await jiraService.createStoriesBulk(
      body.project_key,
      body.stories
    );

    // Format content for Confluence
    let confluenceContent = '<h2>User Stories</h2>\n';
    confluenceContent += `<p>Created: ${jiraResult.created} stories</p>\n`;
    confluenceContent += '<table><tr><th>Key</th><th>Summary</th><th>URL</th></tr>\n';

    for (const story of jiraResult.stories) {
      confluenceContent += `<tr><td>${story.key}</td><td>${story.summary}</td>`;
      confluenceContent += `<td><a href="${story.url}">${story.key}</a></td></tr>\n`;
    }

    confluenceContent += '</table>\n';

    // Add to Confluence
    let confluenceResult;
    if (body.page_id) {
      confluenceResult = await confluenceService.appendToPage(
        body.page_id,
        confluenceContent
      );
    } else {
      confluenceResult = await confluenceService.createPage(
        body.page_title || 'User Stories',
        confluenceContent,
        body.space_key
      );
    }

    return successResponse('Stories created and documented successfully', {
      jira: jiraResult,
      confluence: confluenceResult,
    });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
