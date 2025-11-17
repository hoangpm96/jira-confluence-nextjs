import { NextRequest } from 'next/server';
import { ConfluenceService } from '@/lib/services/confluence';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const spaceKey = searchParams.get('space_key') || undefined;

    if (!query) {
      return errorResponse('Query parameter is required', 400);
    }

    const service = new ConfluenceService();
    const results = await service.searchPages(query, spaceKey);

    return successResponse(`Found ${results.length} pages`, { results, count: results.length });
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
