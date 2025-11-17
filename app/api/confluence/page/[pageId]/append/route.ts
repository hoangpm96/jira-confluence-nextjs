import { NextRequest } from 'next/server';
import { ConfluenceService } from '@/lib/services/confluence';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const { pageId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const content = searchParams.get('content') || '';
    const separator = searchParams.get('separator') || '<hr/>';

    const service = new ConfluenceService();
    const pageData = await service.appendToPage(pageId, content, separator);

    return successResponse('Content appended successfully', pageData);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
