import { NextRequest } from 'next/server';
import { JiraService } from '@/lib/services/jira';
import { successResponse, errorResponse, verifyApiKey } from '@/lib/api-helpers';
import type { CreateIssueRequest } from '@/types';

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return errorResponse('Invalid API Key', 401);
  }

  try {
    const body: CreateIssueRequest = await request.json();
    const service = new JiraService();
    const story = body.user_story;

    const result = await service.createStory(
      body.project_key,
      story.summary,
      story.description,
      story.acceptance_criteria,
      story.story_points,
      story.priority || 'Medium',
      story.labels,
      story.assignee,
      body.issue_type || 'Story'
    );

    return successResponse(`Story '${story.summary}' created successfully`, result);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
