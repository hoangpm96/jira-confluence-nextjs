'use client';

import { useState } from 'react';

export default function EnvVarsForm() {
  const [jiraUrl, setJiraUrl] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [spaceKey, setSpaceKey] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const generateEnvVars = () => {
    // Auto-add https:// to JIRA_URL if missing
    let finalJiraUrl = jiraUrl.trim();
    if (finalJiraUrl && !finalJiraUrl.startsWith('http://') && !finalJiraUrl.startsWith('https://')) {
      finalJiraUrl = `https://${finalJiraUrl}`;
    }

    return `JIRA_URL=${finalJiraUrl}
JIRA_EMAIL=${jiraEmail}
JIRA_API_TOKEN=${jiraToken}
DEFAULT_SPACE_KEY=${spaceKey}
API_KEY=${apiKey}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEnvVars());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>📝 Environment Variables Helper</h4>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
        Fill in your credentials below, then copy the generated environment variables to paste into Vercel:
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>
            JIRA_URL
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            The URL of your Jira workspace (e.g., https://your-company.atlassian.net)
          </p>
          <input
            type="text"
            value={jiraUrl}
            onChange={(e) => setJiraUrl(e.target.value)}
            placeholder="https://your-company.atlassian.net"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            JIRA_EMAIL
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            The email you use to login to Jira/Confluence
          </p>
          <input
            type="email"
            value={jiraEmail}
            onChange={(e) => setJiraEmail(e.target.value)}
            placeholder="your@email.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            JIRA_API_TOKEN
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            The API token you created in Step 2
          </p>
          <input
            type="text"
            value={jiraToken}
            onChange={(e) => setJiraToken(e.target.value)}
            placeholder="ATATT3xFfGF0..."
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            DEFAULT_SPACE_KEY
            <span style={{ color: '#f59e0b', fontWeight: 'normal', marginLeft: '0.5rem' }}>
              (optional)
            </span>
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Choose the Confluence space where you store doc pages. Go to your space, copy the space key from the URL.
            <br />
            Example: If your URL is <code style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>https://yourcompany.atlassian.net/wiki/spaces/~712020cd.../overview</code>
            <br />
            Copy the part: <code style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>~712020cd3185085d6847b9aadf76f66028a738</code>
          </p>
          <input
            type="text"
            value={spaceKey}
            onChange={(e) => setSpaceKey(e.target.value)}
            placeholder="~712020cd3185085d6847b9aadf76f66028a738"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            API_KEY
            <span style={{ color: '#f59e0b', fontWeight: 'normal', marginLeft: '0.5rem' }}>
              (optional but recommended)
            </span>
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Create your own secure key (any random string). You&apos;ll add this key to your Custom GPT to allow it to securely call this app.
          </p>
          <div style={{
            backgroundColor: '#fee2e2',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            borderLeft: '4px solid #ef4444',
            fontSize: '0.8rem',
            marginBottom: '0.5rem'
          }}>
            ⚠️ <strong>Warning:</strong> Without an API key, anyone can call your app and control your Jira/Confluence!
          </div>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="demo-api-key-123456"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#1f2937',
        borderRadius: '0.375rem',
        position: 'relative' as const
      }}>
        <pre style={{
          margin: 0,
          color: '#f3f4f6',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap' as const,
          wordBreak: 'break-all' as const
        }}>
          {generateEnvVars() || '# Fill in the form above to generate your environment variables'}
        </pre>
      </div>

      <button
        onClick={copyToClipboard}
        disabled={!jiraUrl || !jiraEmail || !jiraToken}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: copied ? '#10b981' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: (!jiraUrl || !jiraEmail || !jiraToken) ? 'not-allowed' : 'pointer',
          opacity: (!jiraUrl || !jiraEmail || !jiraToken) ? 0.5 : 1,
          transition: 'all 0.2s'
        }}
      >
        {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
      </button>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#dbeafe',
        borderRadius: '0.375rem',
        borderLeft: '4px solid #3b82f6',
        fontSize: '0.875rem'
      }}>
        <strong>💡 Tip:</strong> After copying, paste these variables one by one in Vercel&apos;s Environment Variables section during deployment.
      </div>
    </div>
  );
}
