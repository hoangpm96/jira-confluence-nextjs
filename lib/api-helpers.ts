import { NextResponse } from 'next/server';
import type { APIResponse } from '@/types';

export function successResponse<T>(message: string, data?: T): NextResponse<APIResponse<T>> {
  return NextResponse.json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(message: string, status: number = 500): NextResponse<APIResponse> {
  return NextResponse.json(
    {
      success: false,
      message: 'Error',
      error: message,
    },
    { status }
  );
}

export function verifyApiKey(request: Request): boolean {
  const apiKey = request.headers.get('X-API-Key');
  const expectedKey = process.env.API_KEY;

  // If no API key is configured, allow all requests
  if (!expectedKey) {
    return true;
  }

  return apiKey === expectedKey;
}
