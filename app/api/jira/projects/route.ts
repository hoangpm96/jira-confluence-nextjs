import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const service = new JiraService();
    const projects = await service.getProjects();

    return successResponse(`Found ${projects.length} projects`, {
      projects,
      count: projects.length,
    });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
