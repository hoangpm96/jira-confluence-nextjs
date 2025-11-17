import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'running',
    service: 'Jira & Confluence API',
    version: '1.0.0',
    endpoints: {
      confluence: '/api/confluence/*',
      jira: '/api/jira/*',
      workflow: '/api/workflow/*',
    },
  });
}
