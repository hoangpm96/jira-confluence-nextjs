import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ issueKey: string }> }
) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const { issueKey } = await params;
    const service = new JiraService();
    const issueData = await service.getIssue(issueKey);

    return successResponse('Issue retrieved successfully', issueData);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
