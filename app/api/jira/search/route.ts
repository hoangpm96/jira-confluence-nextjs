import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const jql = searchParams.get('jql') || '';
    const maxResults = parseInt(searchParams.get('max_results') || '50');

    if (!jql) {
      return errorResponse('JQL parameter is required', 400);
    }

    const service = new JiraService();
    const results = await service.searchIssues(jql, maxResults);

    return successResponse(`Found ${results.length} issues`, {
      issues: results,
      count: results.length,
    });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
