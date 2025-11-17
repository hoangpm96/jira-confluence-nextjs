import { NextRequest } from 'next/server';
import { ConfluenceService } from '@/lib/services/confluence';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';
import type { CreatePageRequest, UpdatePageRequest } from '@/types';

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const body: CreatePageRequest = await request.json();
    const service = new ConfluenceService();

    const pageData = await service.createPage(
      body.title,
      body.content,
      body.space_key,
      body.parent_id,
      body.content_type || 'page'
    );

    return successResponse(`Page '${body.title}' created successfully`, pageData);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const body: UpdatePageRequest = await request.json();
    const service = new ConfluenceService();

    const pageData = await service.updatePage(
      body.page_id,
      body.title,
      body.content,
      body.version_comment || 'Updated via API'
    );

    return successResponse('Page updated successfully', pageData);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
