import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the base URL from the request
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const schema = {
    "openapi": "3.1.0",
    "info": {
      "title": "Jira & Confluence API for Custom GPT",
      "description": "API to manage Jira issues and Confluence pages",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": `${baseUrl}/api`,
        "description": "Production server"
      }
    ],
    "paths": {
    "/confluence/space": {
      "get": {
        "operationId": "getSpaceInfo",
        "summary": "Get Confluence space information",
        "parameters": [
          {
            "name": "space_key",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response"
          }
        }
      }
    },
    "/confluence/pages": {
      "get": {
        "operationId": "listConfluencePages",
        "summary": "List all Confluence pages",
        "parameters": [
          {
            "name": "space_key",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 50
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of pages"
          }
        }
      }
    },
    "/confluence/page/{page_id}": {
      "get": {
        "operationId": "getConfluencePage",
        "summary": "Get Confluence page content",
        "parameters": [
          {
            "name": "page_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Page content"
          }
        }
      }
    },
    "/confluence/page": {
      "post": {
        "operationId": "createConfluencePage",
        "summary": "Create new Confluence page",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "title",
                  "content"
                ],
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "content": {
                    "type": "string"
                  },
                  "space_key": {
                    "type": "string"
                  },
                  "parent_id": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Page created"
          }
        }
      },
      "put": {
        "operationId": "updateConfluencePage",
        "summary": "Update Confluence page",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "page_id"
                ],
                "properties": {
                  "page_id": {
                    "type": "string"
                  },
                  "title": {
                    "type": "string"
                  },
                  "content": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Page updated"
          }
        }
      }
    },
    "/confluence/page/{page_id}/append": {
      "post": {
        "operationId": "appendToConfluencePage",
        "summary": "Append content to page",
        "parameters": [
          {
            "name": "page_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "content",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "separator",
            "in": "query",
            "schema": {
              "type": "string",
              "default": "\u003Chr/\u003E"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Content appended"
          }
        }
      }
    },
    "/confluence/search": {
      "get": {
        "operationId": "searchConfluencePages",
        "summary": "Search Confluence pages",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Search results"
          }
        }
      }
    },
    "/jira/projects": {
      "get": {
        "operationId": "getJiraProjects",
        "summary": "Get all Jira projects",
        "responses": {
          "200": {
            "description": "List of projects"
          }
        }
      }
    },
    "/jira/project/{project_key}/issue-types": {
      "get": {
        "operationId": "getJiraIssueTypes",
        "summary": "Get issue types for project",
        "parameters": [
          {
            "name": "project_key",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Issue types"
          }
        }
      }
    },
    "/jira/story": {
      "post": {
        "operationId": "createJiraStory",
        "summary": "Create Jira user story",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "project_key",
                  "user_story"
                ],
                "properties": {
                  "project_key": {
                    "type": "string"
                  },
                  "issue_type": {
                    "type": "string",
                    "default": "Story"
                  },
                  "user_story": {
                    "type": "object",
                    "required": [
                      "summary",
                      "description"
                    ],
                    "properties": {
                      "summary": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "acceptance_criteria": {
                        "type": "string"
                      },
                      "story_points": {
                        "type": "integer"
                      },
                      "priority": {
                        "type": "string",
                        "default": "Medium"
                      },
                      "labels": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Story created"
          }
        }
      }
    },
    "/jira/stories/bulk": {
      "post": {
        "operationId": "createJiraStoriesBulk",
        "summary": "Create multiple Jira stories",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "project_key",
                  "stories"
                ],
                "properties": {
                  "project_key": {
                    "type": "string"
                  },
                  "stories": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "summary": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "acceptance_criteria": {
                          "type": "string"
                        },
                        "story_points": {
                          "type": "integer"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Stories created"
          }
        }
      }
    },
    "/jira/issue/{issue_key}": {
      "get": {
        "operationId": "getJiraIssue",
        "summary": "Get Jira issue details",
        "parameters": [
          {
            "name": "issue_key",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Issue details"
          }
        }
      }
    },
    "/jira/search": {
      "get": {
        "operationId": "searchJiraIssues",
        "summary": "Search Jira issues using JQL",
        "parameters": [
          {
            "name": "jql",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "max_results",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 50
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Search results"
          }
        }
      }
    },
    "/jira/issue/{issue_key}/comment": {
      "post": {
        "operationId": "addJiraComment",
        "summary": "Add comment to Jira issue",
        "parameters": [
          {
            "name": "issue_key",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "comment"
                ],
                "properties": {
                  "comment": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Comment added"
          }
        }
      }
    },
    "/workflow/stories-to-confluence": {
      "post": {
        "operationId": "createStoriesAndDocument",
        "summary": "Create stories and document in Confluence",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "project_key",
                  "stories"
                ],
                "properties": {
                  "project_key": {
                    "type": "string"
                  },
                  "stories": {
                    "type": "array",
                    "items": {
                      "type": "object"
                    }
                  },
                  "page_id": {
                    "type": "string"
                  },
                  "page_title": {
                    "type": "string"
                  },
                  "space_key": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Workflow completed"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {

    },
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-Key"
      }
    }
  },
  "security": [
    {
      "ApiKeyAuth": []
    }
  ]
};

  return NextResponse.json(schema);
}
