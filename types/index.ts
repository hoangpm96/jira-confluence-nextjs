// Confluence Types
export interface PageListResponse {
  pages: PageInfo[];
  total: number;
  space_key: string;
  space_name: string;
}

export interface PageInfo {
  id: string;
  title: string;
  type?: string;
  version?: number;
  url: string;
  last_updated?: string;
  updated_by?: string;
}

export interface CreatePageRequest {
  title: string;
  content: string;
  space_key?: string;
  parent_id?: string;
  content_type?: string;
}

export interface UpdatePageRequest {
  page_id: string;
  title?: string;
  content?: string;
  version_comment?: string;
}

export interface PageContent {
  id: string;
  title: string;
  content: string;
  version: number;
  space_key: string;
  url: string;
}

// Jira Types
export interface UserStory {
  summary: string;
  description: string;
  acceptance_criteria?: string;
  story_points?: number;
  priority?: string;
  labels?: string[];
  assignee?: string;
}

export interface CreateIssueRequest {
  project_key: string;
  user_story: UserStory;
  issue_type?: string;
}

export interface BulkCreateStoriesRequest {
  project_key: string;
  stories: UserStory[];
}

export interface IssueResponse {
  key: string;
  id: string;
  url: string;
  summary: string;
  issue_type: string;
}

export interface IssueDetails {
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  reporter: string;
  created: string;
  updated: string;
  url: string;
}

export interface ProjectInfo {
  key: string;
  name: string;
  type: string;
  lead: string;
}

export interface IssueType {
  id: string;
  name: string;
  description?: string;
  subtask: boolean;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface BulkCreateResponse {
  created: number;
  failed: number;
  stories: IssueResponse[];
  errors: Array<{
    index: number;
    summary: string;
    error: string;
  }>;
}

// Workflow Types
export interface WorkflowRequest {
  project_key: string;
  stories: UserStory[];
  page_id?: string;
  page_title?: string;
  space_key?: string;
}

export interface SpaceInfo {
  key: string;
  name: string;
  type: string;
  homepage_id?: string;
  _links?: any;
}
