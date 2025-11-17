export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Jira & Confluence API</h1>
      <p>Middleware API for Custom GPT Integration</p>

      <h2>Status</h2>
      <p>Running</p>

      <h2>Available Endpoints</h2>
      <ul>
        <li><code>/api/health</code> - Health check</li>
        <li><code>/api/confluence/*</code> - Confluence endpoints</li>
        <li><code>/api/jira/*</code> - Jira endpoints</li>
        <li><code>/api/workflow/*</code> - Combined workflow endpoints</li>
      </ul>

      <h2>Documentation</h2>
      <p>See README.md for complete API documentation</p>
    </div>
  );
}
