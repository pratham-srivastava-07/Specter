"use client"

import { useState } from 'react';

export default function Landing() {
  const [data, setData] = useState('');
  const [url, setUrl] = useState('https://example.com');

  const fetchViaProxy = async () => {
    try {
      const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      const text = await res.text();
      setData(text);
    } catch (e) {
      console.error('Failed to fetch via proxy:', e);
      setData('Error fetching');
    }
  };

  return (
    <div>
      <h1>Proxy Tester</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />
      <button onClick={fetchViaProxy}>Send through Proxy</button>
      <pre>{data}</pre>
    </div>
  );
}
