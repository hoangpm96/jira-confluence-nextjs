import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ issueKey: string }> }
) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const { issueKey } = await params;
    const body = await request.json();
    const comment = body.comment || '';

    if (!comment) {
      return errorResponse('Comment is required', 400);
    }

    const service = new JiraService();
    const result = await service.addComment(issueKey, comment);

    return successResponse('Comment added successfully', result);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
