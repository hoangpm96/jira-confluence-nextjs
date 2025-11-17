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

    const service = new ConfluenceService();
    const spaceInfo = await service.getSpaceInfo(spaceKey);

    return successResponse('Space information retrieved successfully', spaceInfo);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
