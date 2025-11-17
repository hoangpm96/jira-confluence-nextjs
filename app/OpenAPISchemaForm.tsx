'use client';

import { useState, useEffect } from 'react';

export default function OpenAPISchemaForm() {
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-detect the current domain
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = `${window.location.protocol}//${window.location.host}`;
      setDeploymentUrl(currentUrl);
    }
  }, []);

  const getOpenAPIUrl = () => {
    // Clean up the URL: remove trailing slashes
    let cleanUrl = deploymentUrl || 'https://your-app.vercel.app';
    cleanUrl = cleanUrl.trim().replace(/\/+$/, '');
    return `${cleanUrl}/api/openapi`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getOpenAPIUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSchema = () => {
    // Clean up the URL: remove trailing slashes and ensure no double slashes
    let cleanUrl = deploymentUrl || 'https://your-app.vercel.app';
    cleanUrl = cleanUrl.trim().replace(/\/+$/, ''); // Remove trailing slashes

    return {
      "openapi": "3.1.0",
      "info": {
        "title": "Jira & Confluence API for Custom GPT",
        "description": "API to manage Jira issues and Confluence pages",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": `${cleanUrl}/api`,
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
                    "required": ["title", "content"],
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
                    "required": ["page_id"],
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
                  "default": "<hr/>"
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
                    "required": ["project_key", "user_story"],
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
                        "required": ["summary", "description"],
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
                    "required": ["project_key", "stories"],
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
                    "required": ["comment"],
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
                    "required": ["project_key", "stories"],
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
        "schemas": {},
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
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    fontFamily: 'monospace'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: 'bold' as const
  };

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginTop: '1rem',
      border: '1px solid #e5e7eb'
    }}>
      <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>📝 OpenAPI Schema URL</h4>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
        Your deployment URL has been auto-detected. You can edit it if needed:
      </p>

      <div>
        <label style={labelStyle}>
          Deployment URL (Auto-detected)
        </label>
        <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
          ✓ Automatically detected from current domain
        </p>
        <input
          type="text"
          value={deploymentUrl}
          onChange={(e) => setDeploymentUrl(e.target.value)}
          placeholder="https://your-app.vercel.app"
          style={inputStyle}
        />
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#dcfce7',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #10b981'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <strong style={{ fontSize: '0.875rem', color: '#166534' }}>✨ Your OpenAPI Schema URL:</strong>
          <button
            onClick={copyToClipboard}
            disabled={!deploymentUrl}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: copied ? '#10b981' : '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              cursor: !deploymentUrl ? 'not-allowed' : 'pointer',
              opacity: !deploymentUrl ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy URL'}
          </button>
        </div>
        <code style={{
          display: 'block',
          backgroundColor: '#f0fdf4',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
          color: '#166534'
        }}>
          {getOpenAPIUrl()}
        </code>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#dbeafe',
        borderRadius: '0.375rem',
        borderLeft: '4px solid #3b82f6',
        fontSize: '0.875rem'
      }}>
        <strong>💡 How to use:</strong> In the GPT Actions editor, click &quot;Import from URL&quot; and paste the URL above. The schema will be loaded automatically with the correct server URL!
      </div>
    </div>
  );
}
