import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';
import type { BulkCreateStoriesRequest } from '@/types';

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const body: BulkCreateStoriesRequest = await request.json();
    const service = new JiraService();

    const result = await service.createStoriesBulk(body.project_key, body.stories);

    return successResponse(
      `Created ${result.created} stories, ${result.failed} failed`,
      result
    );
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
