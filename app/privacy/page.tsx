import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Jira & Confluence API',
  description: 'Privacy Policy for Jira & Confluence Custom GPT Integration',
};

export default function PrivacyPolicy() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui',
      lineHeight: '1.6'
    }}>
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> November 17, 2025</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>1. Overview</h2>
        <p>
          This privacy policy describes how the Jira & Confluence API middleware (&quot;the Service&quot;)
          handles data when used with Custom GPT integrations. The Service acts as an intermediary
          between OpenAI&apos;s Custom GPT and your Atlassian services (Jira and Confluence).
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>2. Data Collection and Usage</h2>
        <h3>2.1 What We Process</h3>
        <p>The Service processes the following types of data:</p>
        <ul>
          <li>Jira project information, issues, and comments</li>
          <li>Confluence pages, spaces, and content</li>
          <li>Authentication credentials (API tokens) for Atlassian services</li>
          <li>API request parameters and responses</li>
        </ul>

        <h3>2.2 How We Use Data</h3>
        <p>Data is used solely for:</p>
        <ul>
          <li>Facilitating communication between Custom GPT and Atlassian services</li>
          <li>Processing and returning requested information</li>
          <li>API authentication and authorization</li>
        </ul>

        <h3>2.3 Data Storage</h3>
        <p>
          The Service operates as a pass-through middleware and does not permanently store
          any user data, project information, or content. Authentication credentials are
          expected to be provided via environment variables and are not logged or persisted
          beyond the runtime environment.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>3. Data Sharing</h2>
        <p>
          Data is shared only with the services necessary for functionality:
        </p>
        <ul>
          <li><strong>Atlassian Services:</strong> Your Jira and Confluence data is accessed
          using your provided credentials to fulfill API requests</li>
          <li><strong>OpenAI Custom GPT:</strong> Responses from Atlassian services are
          returned to the Custom GPT that initiated the request</li>
        </ul>
        <p>
          We do not sell, rent, or share your data with third parties for marketing purposes.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>4. Security</h2>
        <p>Security measures include:</p>
        <ul>
          <li>HTTPS/TLS encryption for all API communications</li>
          <li>Secure environment variable handling for credentials</li>
          <li>No persistent storage of sensitive data</li>
          <li>Authentication validation for all API requests</li>
        </ul>
        <p>
          Users are responsible for securing their own API tokens and ensuring they follow
          Atlassian&apos;s security best practices.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>5. User Rights and Data Control</h2>
        <p>Since the Service does not store user data:</p>
        <ul>
          <li>All data remains in your Atlassian account</li>
          <li>You can revoke API access at any time through Atlassian</li>
          <li>Data deletion is managed through your Atlassian services</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>6. Third-Party Services</h2>
        <p>This Service integrates with:</p>
        <ul>
          <li><strong>Atlassian (Jira & Confluence):</strong> See{' '}
            <a
              href="https://www.atlassian.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066cc' }}
            >
              Atlassian Privacy Policy
            </a>
          </li>
          <li><strong>OpenAI (Custom GPT):</strong> See{' '}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066cc' }}
            >
              OpenAI Privacy Policy
            </a>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>7. Logging and Monitoring</h2>
        <p>
          The Service may log technical information for debugging and monitoring purposes,
          including request timestamps, endpoints accessed, and error messages. These logs
          do not include sensitive data such as authentication tokens or personal information.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be reflected
          by updating the &quot;Last Updated&quot; date at the top of this page.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>9. Self-Hosted Deployment</h2>
        <p>
          If you are self-hosting this Service, you are responsible for:
        </p>
        <ul>
          <li>Securing your deployment environment</li>
          <li>Managing access controls and credentials</li>
          <li>Compliance with applicable privacy regulations</li>
          <li>Any modifications made to the codebase</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>10. Contact</h2>
        <p>
          For questions or concerns about this privacy policy, please contact the
          administrator of your deployment or refer to the project repository.
        </p>
      </section>

      <footer style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #ddd',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <p>
          This Service is provided as-is under the terms specified in the project license.
          For technical documentation, visit the{' '}
          <Link href="/" style={{ color: '#0066cc' }}>
            home page
          </Link>.
        </p>
      </footer>
    </div>
  );
}
