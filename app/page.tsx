import Link from 'next/link';
import EnvVarsForm from './EnvVarsForm';
import GPTInstructionsForm from './GPTInstructionsForm';
import OpenAPISchemaForm from './OpenAPISchemaForm';
import PrivacyUrlDisplay from './PrivacyUrlDisplay';

export default function Home() {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui',
      lineHeight: '1.6'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Jira & Confluence Custom GPT
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Connect ChatGPT with your Atlassian workspace
        </p>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: '#10b981',
          color: 'white',
          borderRadius: '0.5rem',
          marginTop: '1rem'
        }}>
          ✓ Service Running
        </div>
      </header>

      <section style={{
        backgroundColor: '#f0f9ff',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0 }}>📋 What is This?</h2>
        <p>
          This service allows you to use ChatGPT to interact with your Jira and Confluence workspaces
          using natural language. No coding required! Just talk to ChatGPT like you would to a colleague.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Examples of what you can do:</strong>
        </p>
        <ul>
          <li>&quot;List all my Jira projects&quot;</li>
          <li>&quot;Create a user story for login feature&quot;</li>
          <li>&quot;Find Confluence pages about API documentation&quot;</li>
          <li>&quot;Add a sequence diagram to the payment flow page&quot;</li>
        </ul>
      </section>

      <section style={{
        backgroundColor: '#f9fafb',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ marginTop: 0 }}>🏗️ How It Works</h2>
        <p style={{ marginBottom: '1rem' }}>Here&apos;s the architecture of how Custom GPT communicates with your Atlassian workspace:</p>
        <pre style={{
          backgroundColor: '#1f2937',
          color: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          fontFamily: 'monospace'
        }}>
{`┌─────────────────┐
│   Custom GPT    │  ← You chat using natural language
└────────┬────────┘
         │ JSON over HTTPS
         │ Header: X-API-Key
         ▼
┌─────────────────┐
│  Middleware API │  ← Next.js API on Vercel
│                 │
│  ┌───────────┐  │
│  │ Endpoints │  │
│  └─────┬─────┘  │
│        │        │
│  ┌─────▼──────┐ │
│  │  Services  │ │  ← Business logic
│  └─────┬──────┘ │
└────────┼────────┘
         │
    ┌────▼─────┐
    │ Atlassian│
    │   APIs   │
    └──────────┘`}
        </pre>
        <div style={{
          backgroundColor: '#dbeafe',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginTop: '1rem',
          borderLeft: '4px solid #3b82f6'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            <strong>🔒 Security:</strong> Your API key (X-API-Key header) ensures only your Custom GPT can access your middleware.
            The middleware then securely communicates with Atlassian using your API token.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>🚀 Complete Setup Guide</h2>

        <div style={{
          backgroundColor: '#fef3c7',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
          borderLeft: '4px solid #f59e0b'
        }}>
          <strong>⚠️ Prerequisites:</strong>
          <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            <li>A GitHub account (free - we&apos;ll show you how to create one)</li>
            <li>A ChatGPT Plus or Team subscription (required to create Custom GPTs)</li>
            <li>Access to Jira and/or Confluence (with permission to create API tokens)</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Step 0: Create a GitHub Account (If You Don&apos;t Have One)</h3>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <p><strong>Already have a GitHub account?</strong> Skip to Step 1.</p>
          <p>
            <strong>New to GitHub?</strong> It&apos;s free and easy! Visit{' '}
            <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>
              github.com/signup
            </a>
            {' '}and follow the prompts to create an account with your email, password, and username. You&apos;ll need to verify your email address.
          </p>
          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            borderLeft: '4px solid #3b82f6'
          }}>
            <strong>✅ Once done,</strong> proceed to Step 1 below.
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Step 1: Fork the GitHub Repository</h3>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <p><strong>Why fork?</strong> Forking creates your own copy of the project that you can deploy and customize.</p>

          <h4>📸 Detailed Instructions:</h4>
          <ol>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Go to the GitHub repository:</strong>
              <br />
              <a href="https://github.com/hoangpm96/jira-confluence-nextjs" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>
                https://github.com/hoangpm96/jira-confluence-nextjs
              </a>
            </li>

            <li style={{ marginBottom: '1rem' }}>
              <strong>Click the &quot;Fork&quot; button</strong> in the top-right corner of the page
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                (It&apos;s next to the &quot;Star&quot; button)
              </span>
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <img
                  src="/fork-jira-confluence-nextjs.png"
                  alt="GitHub Fork button highlighted in red circle"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </li>

            <li style={{ marginBottom: '1rem' }}>
              <strong>On the &quot;Create a new fork&quot; page:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                <li>Keep the repository name as <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>jira-confluence-nextjs</code> (or rename if you want)</li>
                <li>Add a description (optional): &quot;My Jira & Confluence Custom GPT&quot;</li>
                <li>Make sure &quot;Copy the main branch only&quot; is checked</li>
              </ul>
            </li>

            <li style={{ marginBottom: '1rem' }}>
              <strong>Click the green &quot;Create fork&quot; button</strong>
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <img
                  src="/create-fork.png"
                  alt="Create fork button highlighted"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </li>

            <li style={{ marginBottom: 0 }}>
              <strong>Wait a few seconds</strong> - GitHub will create your fork and redirect you to your new repository
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                Your repository URL will be: <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>github.com/YOUR-USERNAME/jira-confluence-nextjs</code>
              </span>
            </li>
          </ol>

          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1.5rem',
            borderLeft: '4px solid #3b82f6'
          }}>
            <strong>✅ Success!</strong> You now have your own copy of the project. Keep this browser tab open - you&apos;ll need it for deployment.
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Step 2: Get Your Atlassian Credentials</h3>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <p><strong>You need 3 pieces of information:</strong></p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li>Your Atlassian domain (e.g., yourcompany.atlassian.net)</li>
            <li>Your email address (the one you use to login to Jira/Confluence)</li>
            <li>An API token (we&apos;ll create this now)</li>
          </ul>

          <h4>📸 Creating Your API Token:</h4>
          <ol>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Go to Atlassian API Tokens page:</strong>
              <br />
              <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>
                https://id.atlassian.com/manage-profile/security/api-tokens
              </a>
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                (You&apos;ll need to login with your Atlassian account)
              </span>
            </li>

            <li style={{ marginBottom: '1rem' }}>
              <strong>Choose how to create your API token:</strong>
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <img
                  src="/create-key-atlassian.png"
                  alt="Create API token buttons highlighted"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Two options available:</strong></p>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>&quot;Create API token&quot;</strong> - Grants full access to all Jira and Confluence resources.
                    <br />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>✅ Recommended for simplicity and full functionality</span>
                  </li>
                  <li style={{ marginBottom: 0 }}>
                    <strong>&quot;Create API token with scopes&quot;</strong> - Allows you to limit permissions to specific resources.
                    <br />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>⚠️ Advanced option - use only if you need restricted access</span>
                  </li>
                </ul>
              </div>
            </li>

            <li style={{ marginBottom: '1rem' }}>
              <strong>Fill in the token details:</strong>
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/create-api-key-atlassian.png"
                  alt="Create API token dialog with name and expiration fields"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <ul style={{ marginTop: '0.75rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Name:</strong> Enter a descriptive name like{' '}
                  <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
                    ChatGPT Integration
                  </code>
                  {' '}or{' '}
                  <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
                    GPT Confluence Writer
                  </code>
                  <br />
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    This helps you identify what this token is used for
                  </span>
                </li>
                <li style={{ marginBottom: 0 }}>
                  <strong>Expires on:</strong> Set an expiration date (maximum 1 year from now)
                  <br />
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    For security, tokens can last no longer than a year. Choose a date that works for you.
                  </span>
                </li>
              </ul>
              <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                <strong>Then click the blue &quot;Create&quot; button</strong> at the bottom right.
              </p>
            </li>

            <li style={{ marginBottom: '1rem' }}>
              <strong>Copy your API token immediately!</strong>
              <div style={{
                backgroundColor: '#fee2e2',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                borderLeft: '4px solid #ef4444'
              }}>
                ⚠️ <strong>Important:</strong> You won&apos;t be able to see this token again! Copy it now and save it somewhere safe (like a password manager or notes app).
              </div>
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/copy-api-key-atlassian.png"
                  alt="Copy API token dialog with Copy button highlighted"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                Click the &quot;Copy&quot; button to copy your token to the clipboard, then save it somewhere secure.
              </p>
            </li>

            <li style={{ marginBottom: '0' }}>
              <strong>Note your Atlassian domain:</strong>
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                This is the URL you use to access Jira/Confluence. For example:
              </span>
              <ul style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <li>If you access Jira at <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>https://mycompany.atlassian.net/jira</code></li>
                <li>Your domain is: <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>mycompany.atlassian.net</code></li>
              </ul>
            </li>
          </ol>

          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1.5rem',
            borderLeft: '4px solid #3b82f6'
          }}>
            <strong>💡 Pro Tip:</strong> You can use the same API token for both Jira and Confluence if they&apos;re in the same Atlassian organization.
          </div>
        </div>

        <h3>Step 3: Deploy to Vercel (Free & Easy)</h3>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <p><strong>Vercel provides free hosting for Next.js apps - perfect for this project!</strong></p>

          <h4>📸 Deployment Steps:</h4>
          <ol>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Go to Vercel and sign up:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>vercel.com</a>
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Create an account (you can use GitHub, GitLab, Bitbucket, Google, or email).</span>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Create new project:</strong> Click &quot;Add New...&quot; → &quot;Project&quot;
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/add-vercel-project.png"
                  alt="Add New dropdown menu with Project option highlighted"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Connect to GitHub:</strong> Click &quot;Continue with GitHub&quot; to connect your GitHub account
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <img
                  src="/vercel-connect-github.png"
                  alt="Vercel Git provider selection with Continue with GitHub highlighted"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Install GitHub app on Vercel:</strong> If you haven&apos;t connected GitHub to Vercel before, you&apos;ll need to install the GitHub application. Click &quot;Install&quot; to proceed.
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Choose repository access:</strong></p>
                <div style={{
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  maxWidth: '100%'
                }}>
                  <img
                    src="/vercel-github-grant.png"
                    alt="GitHub authorization page showing repository access options and Install button"
                    style={{
                      width: '100%',
                      maxWidth: '600px',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>&quot;All repositories&quot;</strong> - Grants access to all current and future repositories (includes public repos as read-only)
                    <br />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>✅ Easiest option - no need to configure later</span>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>&quot;Only select repositories&quot;</strong> - Choose specific repositories to grant access
                    <br />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>⚠️ If you choose this, make sure to select your <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>jira-confluence-nextjs</code> fork</span>
                  </li>
                  <li style={{ marginBottom: 0 }}>
                    After selecting, click the green <strong>&quot;Install&quot;</strong> button to authorize Vercel
                  </li>
                </ul>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Import repository:</strong> Find and click &quot;Import&quot; on your <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>jira-confluence-nextjs</code> repo
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/import-project-vercel.png"
                  alt="Import Git Repository page with jira-confluence-nextjs and Import button highlighted"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Add Environment Variables:</strong> Expand the &quot;Environment Variables&quot; section and add these 5 required variables:
              <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem', borderLeft: '4px solid #f97316', fontSize: '0.9rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Required variables:</p>
                1. <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>JIRA_URL</code> = https://your-company.atlassian.net
                <br />2. <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>JIRA_EMAIL</code> = your@email.com
                <br />3. <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>JIRA_API_TOKEN</code> = ATATT3xFfGF0... (from Step 2)
                <br />4. <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>DEFAULT_SPACE_KEY</code> = ~712020... (optional - your Confluence space key)
                <br />5. <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>API_KEY</code> = demo-api-key-123 (optional - create your own secure key)
              </div>
              <EnvVarsForm />
              <div style={{
                marginTop: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/add-variable-and-deploy.png"
                  alt="Environment Variables section with variables filled in and Deploy button highlighted"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                After pasting your environment variables, click the <strong>&quot;Deploy&quot;</strong> button at the bottom to start the build process.
              </p>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Wait 2-3 minutes:</strong> Vercel will build and deploy your application. You can watch the build logs in real-time.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Go to Dashboard:</strong> After deployment completes, click &quot;Continue to Dashboard&quot;
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/after-deployed.png"
                  alt="After deployment success screen with Continue to Dashboard button highlighted"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </li>
            <li style={{ marginBottom: '0' }}>
              <strong>Copy your deployment URL:</strong> In the dashboard, find your domain under &quot;Domains&quot; section and copy it
              <div style={{
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                maxWidth: '100%'
              }}>
                <img
                  src="/domain-and-copy.png"
                  alt="Vercel dashboard showing the deployment domain"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                Your URL will look like: <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>your-app.vercel.app</code>
              </p>
            </li>
          </ol>
          <div style={{ backgroundColor: '#dcfce7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1.5rem', borderLeft: '4px solid #10b981' }}>
            <strong>✅ Next Step:</strong> Click &quot;Visit&quot; or open your deployment URL in a new tab, then continue with <strong>Step 4</strong> below on that page. The forms will automatically detect your domain!
          </div>
        </div>

        <h3>Step 4: Create Your Custom GPT</h3>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h4>📸 GPT Configuration Steps:</h4>
          <ol>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Go to GPT Editor:</strong> <a href="https://chat.openai.com/gpts/editor" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>chat.openai.com/gpts/editor</a>
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>You need ChatGPT Plus or Team subscription.</span>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Switch to &quot;Configure&quot; tab</strong> and fill in the basic information:
              <ul style={{ marginTop: '0.5rem' }}>
                <li><strong>Name:</strong> <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>Jira & Confluence Assistant</code></li>
                <li><strong>Description:</strong> <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>Manage Jira issues and Confluence pages using natural language</code></li>
              </ul>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Generate Instructions:</strong> Use the form below to create custom instructions for your GPT
              <GPTInstructionsForm />
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Add Conversation Starters (Optional):</strong> These help users discover what your GPT can do
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>Suggested prompts:</p>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <code style={{ backgroundColor: '#e5e7eb', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', display: 'block' }}>
                    &quot;Liệt kê tất cả Confluence pages&quot;
                  </code>
                  <code style={{ backgroundColor: '#e5e7eb', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', display: 'block' }}>
                    &quot;Tạo user story cho tính năng đăng nhập&quot;
                  </code>
                  <code style={{ backgroundColor: '#e5e7eb', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', display: 'block' }}>
                    &quot;Thêm sequence diagram cho luồng thanh toán&quot;
                  </code>
                  <code style={{ backgroundColor: '#e5e7eb', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem', display: 'block' }}>
                    &quot;Tạo 5 user stories cho module xác thực&quot;
                  </code>
                </div>
                <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                  Copy these into the &quot;Conversation starters&quot; field in the Configure tab (you can add up to 4).
                </p>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Upload Knowledge (Optional):</strong> Add reference files for your GPT
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
                  You can upload files (PDF, docs, etc.) that contain additional context about your projects, workflows, or company processes.
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                  💡 <strong>Tip:</strong> Upload your team&apos;s coding standards, Jira workflow documentation, or Confluence templates to help the GPT provide more relevant suggestions.
                </p>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Select Model (Optional):</strong> Choose which GPT model to use
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
                  <strong>Recommended:</strong> Keep the default setting (usually the newest model like GPT-4o or GPT-4 Turbo).
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                  💡 The newest model provides better performance, understanding, and more accurate responses for complex Jira/Confluence operations.
                </p>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Configure Capabilities (Optional):</strong> Choose what functions your GPT can use
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>Available options:</p>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Web Browsing:</strong> Not needed for this GPT (all data comes from your Jira/Confluence)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>DALL·E Image Generation:</strong> Not needed for this GPT
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Code Interpreter:</strong> ✅ Recommended - Helps with processing data and formatting responses
                  </li>
                </ul>
                <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                  💡 <strong>Suggestion:</strong> Enable &quot;Code Interpreter&quot; only, disable the others to keep the GPT focused on Jira/Confluence tasks.
                </p>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Scroll down to &quot;Actions&quot; section</strong>
              <br />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Click &quot;Create new action&quot; button</span>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Import OpenAPI schema:</strong> Use the form below to generate the schema
              <OpenAPISchemaForm />
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '1rem',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  📸 Step-by-step instructions:
                </p>
                <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Copy the generated schema URL</strong> from the form above (it looks like <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>https://your-app.vercel.app/api/openapi</code>)
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Click the settings icon (⚙️)</strong> next to the &quot;Schema&quot; field in the Actions section
                    <div style={{
                      marginTop: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      maxWidth: '420px'
                    }}>
                      <img
                        src="/add-schema.png"
                        alt="Settings icon highlighted next to Schema field, showing where to paste the OpenAPI schema URL"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                      The settings icon appears as a gear icon. Click it to open a dialog where you can paste the schema URL.
                    </p>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Paste the schema URL</strong> into the text field that appears, then click <strong>&quot;Import&quot;</strong>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: 0 }}>
                      The URL should start with <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>https://</code> and end with <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>/api/openapi</code>
                    </p>
                  </li>
                  <li style={{ marginBottom: 0 }}>
                    <strong>Wait for the import to complete</strong> - ChatGPT will load all available API endpoints from your schema
                  </li>
                </ol>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Configure Authentication:</strong> Set up the API key for secure access
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  marginBottom: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  maxWidth: '420px'
                }}>
                  <img
                    src="/input-api-key.png"
                    alt="Authentication configuration showing API Key type selected, with custom header name X-API-Key"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Two scenarios based on your Step 3 setup:
                </p>
                <div style={{
                  backgroundColor: '#dbeafe',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  borderLeft: '4px solid #3b82f6'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    ✅ Option 1: If you DID NOT set API_KEY in Step 3
                  </p>
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Authentication Type:</strong> Select <strong>&quot;None&quot;</strong>
                    </li>
                    <li style={{ marginBottom: 0 }}>
                      No additional configuration needed - your API is publicly accessible
                    </li>
                  </ul>
                </div>
                <div style={{
                  backgroundColor: '#fef3c7',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  borderLeft: '4px solid #f59e0b'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    🔒 Option 2: If you DID set API_KEY in Step 3 (Recommended)
                  </p>
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Authentication Type:</strong> Select <strong>&quot;API Key&quot;</strong>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>API Key:</strong> Enter the same API_KEY value you set in Step 3 (e.g., <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>demo-api-key-123456</code>)
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong>Auth Type:</strong> Select <strong>&quot;Custom&quot;</strong>
                    </li>
                    <li style={{ marginBottom: 0 }}>
                      <strong>Custom Header Name:</strong> Enter <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>X-API-Key</code> (exactly as shown)
                    </li>
                  </ul>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.75rem', marginBottom: 0 }}>
                  💡 <strong>Security Note:</strong> Setting an API_KEY adds a security layer to prevent unauthorized access to your middleware API. The key you enter here must match the one you set in your Vercel environment variables.
                </p>
              </div>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Test your actions (Recommended):</strong> Verify the API connection works before saving
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem' }}>
                  Before saving your GPT, it&apos;s a good idea to test that the actions are working correctly:
                </p>
                <div style={{
                  marginBottom: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  maxWidth: '420px'
                }}>
                  <img
                    src="/call-list-pages-to-test.png"
                    alt="Available actions list showing Test buttons next to each function like listConfluencePages"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    In the Actions section, scroll down to see the <strong>&quot;Available actions&quot;</strong> list
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Click the <strong>&quot;Test&quot;</strong> button next to any function (e.g., <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>listConfluencePages</code>)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    If the test succeeds, you&apos;ll see a response with data from your Jira/Confluence
                  </li>
                  <li style={{ marginBottom: 0 }}>
                    If it fails, check your environment variables (especially <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>API_KEY</code>, <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>JIRA_URL</code>, and authentication settings)
                  </li>
                </ul>
                <PrivacyUrlDisplay />
              </div>
            </li>
            <li style={{ marginBottom: '0' }}>
              <strong>Save your GPT:</strong> Click &quot;Save&quot; or &quot;Update&quot; in the top-right
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Choose who can access your GPT:
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>&quot;Only me&quot;</strong> - Only you can access and use this GPT
                    <br />
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>✅ Recommended for personal use and testing</span>
                  </li>
                  <li style={{ marginBottom: 0 }}>
                    <strong>&quot;Anyone with the link&quot;</strong> - Anyone with the link can use your GPT
                    <br />
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>⚠️ They will use your API credentials, so only share with trusted team members</span>
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>

        <h3>Step 5: Test Your Custom GPT</h3>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ marginTop: 0 }}>📍 Where to access your Custom GPT:</h4>
          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            borderLeft: '4px solid #3b82f6'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
              After saving your GPT, you can access it in two ways:
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Quick access after creation:</strong> Click the <strong>&quot;Share&quot;</strong> button in the GPT editor, then click <strong>&quot;Copy link&quot;</strong>. Open this link in your browser to start chatting with your GPT.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong>From ChatGPT later:</strong> Go to <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>chat.openai.com</a>, click <strong>&quot;GPTs&quot;</strong> in the sidebar → <strong>&quot;Explore&quot;</strong> → then click <strong>&quot;My GPTs&quot;</strong> in the top-right corner to see all your custom GPTs
              </li>
            </ul>
          </div>

          <h4>🧪 Test commands to try:</h4>
          <p style={{ margin: '0 0 0.5rem 0' }}>Once you&apos;re in the chat interface, try these commands to verify everything works:</p>
          <ol>
            <li>&quot;List all my Jira projects&quot;</li>
            <li>&quot;What Confluence spaces do I have?&quot;</li>
            <li>&quot;Show me recent Jira issues&quot;</li>
          </ol>

          <div style={{
            backgroundColor: '#fee2e2',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            borderLeft: '4px solid #ef4444'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              <strong>⚠️ Troubleshooting:</strong> If you get errors, check that your environment variables are set correctly in Vercel and that your API tokens have the right permissions.
            </p>
          </div>
        </div>
      </section>

      <section style={{
        backgroundColor: '#f0fdf4',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0 }}>✨ Example Use Cases</h2>

        <h3>For Project Managers:</h3>
        <ul>
          <li>&quot;Create 5 user stories for the authentication module&quot;</li>
          <li>&quot;Show me all open bugs in the mobile project&quot;</li>
          <li>&quot;Add a comment to PROJ-123 asking for status update&quot;</li>
        </ul>

        <h3>For Developers:</h3>
        <ul>
          <li>&quot;Create a technical spec page in Confluence for the payment API&quot;</li>
          <li>&quot;Add a sequence diagram showing the login flow&quot;</li>
          <li>&quot;Search for pages about database architecture&quot;</li>
        </ul>

        <h3>For Team Leads:</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>&quot;Bulk create user stories from this feature list&quot;</li>
          <li>&quot;Update the sprint planning page with today&apos;s decisions&quot;</li>
          <li>&quot;Generate a technical document from these Jira stories&quot;</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🔧 Troubleshooting</h2>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }}>
          <h3>Common Issues:</h3>

          <h4>❌ &quot;Authentication failed&quot;</h4>
          <ul>
            <li>Check that your API tokens are correct</li>
            <li>Verify your email address matches your Atlassian account</li>
            <li>Make sure the tokens haven&apos;t expired</li>
          </ul>

          <h4>❌ &quot;Cannot find project&quot;</h4>
          <ul>
            <li>Verify you have access to the project in Jira</li>
            <li>Use the exact project key (e.g., PROJ, not Project Name)</li>
          </ul>

          <h4>❌ &quot;Service not responding&quot;</h4>
          <ul>
            <li>Check if your deployment is running (visit your deployment URL)</li>
            <li>Look at the deployment logs in Vercel/Railway</li>
            <li>Verify environment variables are set correctly</li>
          </ul>

          <h4>❌ &quot;Permission denied&quot;</h4>
          <ul style={{ marginBottom: 0 }}>
            <li>Your API token needs the right permissions</li>
            <li>For Jira: Read/Write access to projects</li>
            <li>For Confluence: Read/Write access to spaces</li>
          </ul>
        </div>
      </section>

      <section style={{
        backgroundColor: '#fef2f2',
        padding: '2rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0 }}>🔒 Security & Privacy</h2>
        <ul>
          <li>Your API tokens are stored securely as environment variables</li>
          <li>This service acts as a secure bridge between ChatGPT and Atlassian</li>
          <li>No data is permanently stored - all requests are proxied in real-time</li>
          <li>Only you can access your Custom GPT and your data</li>
          <li>Read our full <Link href="/privacy" style={{ color: '#0066cc' }}>Privacy Policy</Link></li>
        </ul>
      </section>

      <section>
        <h2>📚 Technical Documentation</h2>
        <p>For developers who want to understand the API or contribute:</p>
        <ul>
          <li>
            <strong>Health Check:</strong>{' '}
            <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
              GET /api/health
            </code>
          </li>
          <li>
            <strong>OpenAPI Schema:</strong>{' '}
            <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
              GET /api
            </code>
          </li>
          <li>
            <strong>Jira Endpoints:</strong>{' '}
            <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
              /api/jira/*
            </code>
          </li>
          <li>
            <strong>Confluence Endpoints:</strong>{' '}
            <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
              /api/confluence/*
            </code>
          </li>
          <li>
            <strong>Workflow Endpoints:</strong>{' '}
            <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
              /api/workflow/*
            </code>
          </li>
        </ul>
        <p>
          View the complete technical documentation in the GitHub repository&apos;s README file.
        </p>
      </section>

      <footer style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>
          Need help? Check the GitHub repository for issues and discussions.
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          Made with ❤️ for the Atlassian + ChatGPT community
        </p>
        <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>
          Created by{' '}
          <a href="https://hoangphan.blog" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            hoangphan.blog
          </a>
          {' | '}
          <a href="https://ai4ba.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            ai4ba.com
          </a>
          {' | '}
          <a href="https://testgenai.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            testgenai.com
          </a>
        </p>
      </footer>
    </div>
  );
}
