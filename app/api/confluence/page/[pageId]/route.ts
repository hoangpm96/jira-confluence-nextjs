import { NextRequest } from 'next/server';
import { ConfluenceService } from '@/lib/services/confluence';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const { pageId } = await params;
    const service = new ConfluenceService();
    const pageData = await service.getPageContent(pageId);

    return successResponse('Page retrieved successfully', pageData);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
