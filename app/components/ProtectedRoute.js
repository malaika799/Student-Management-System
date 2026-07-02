'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.replace('/login');
  } else {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: token only readable client-side, this is the single render pass that flips checking -> authorized
    setChecking(false);
  }
}, [router]);

  if (checking) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <span style={{ fontSize: '0.875rem' }}>Checking authentication…</span>
      </div>
    );
  }

  return children;
}