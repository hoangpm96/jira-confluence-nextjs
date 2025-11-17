import { NextRequest } from 'next/server';
import { ConfluenceService } from '@/lib/services/confluence';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const spaceKey = searchParams.get('space_key') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');

    const service = new ConfluenceService();
    const pagesData = await service.listPages(spaceKey, limit);

    return successResponse(`Found ${pagesData.total} pages`, pagesData);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
