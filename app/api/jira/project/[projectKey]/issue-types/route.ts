import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectKey: string }> }
) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const { projectKey } = await params;
    const service = new JiraService();
    const issueTypes = await service.getIssueTypes(projectKey);

    return successResponse(`Found ${issueTypes.length} issue types`, {
      issue_types: issueTypes,
      count: issueTypes.length,
    });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
