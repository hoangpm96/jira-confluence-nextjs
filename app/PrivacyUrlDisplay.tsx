'use client';

import { useState, useEffect } from 'react';

export default function PrivacyUrlDisplay() {
  const [privacyUrl, setPrivacyUrl] = useState('https://your-app.vercel.app/privacy');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrivacyUrl(`${window.location.protocol}//${window.location.host}/privacy`);
    }
  }, []);

  return (
    <div style={{
      backgroundColor: '#dbeafe',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginTop: '1rem',
      borderLeft: '4px solid #3b82f6'
    }}>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
        📝 Optional: Set Privacy Policy URL
      </p>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
        Scroll down in the Configure tab to find the &quot;Privacy policy&quot; field and enter:
      </p>
      <div style={{
        backgroundColor: '#e5e7eb',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        wordBreak: 'break-all'
      }}>
        {privacyUrl}
      </div>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
        ✓ Automatically detected from current domain
      </p>
    </div>
  );
}
