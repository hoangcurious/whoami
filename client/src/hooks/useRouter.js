import { useState, useCallback, useEffect } from 'react';

/**
 * Minimal history.pushState router — no dependencies.
 * Works with the catch-all rewrite in vercel.json and vite historyApiFallback.
 */
export function useRouter() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to) => {
    history.pushState(null, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return { path, navigate };
}

/**
 * Parse a pathname into a route descriptor.
 *
 * /                          → { page: 'home' }
 * /category/:id              → { page: 'category', categoryId }
 * /test/:id                  → { page: 'test', modelId }
 * /test/:id/results          → { page: 'results', modelId }
 * /synthesis                 → { page: 'synthesis' }
 * /share/:modelId            → { page: 'share', modelId }
 */
export function parseRoute(path) {
  const parts = path.replace(/^\//, '').split('/').filter(Boolean);

  if (!parts.length) return { page: 'home' };

  if (parts[0] === 'category' && parts[1]) {
    return { page: 'category', categoryId: parts[1] };
  }
  if (parts[0] === 'test' && parts[1]) {
    if (parts[2] === 'results') return { page: 'results', modelId: parts[1] };
    return { page: 'test', modelId: parts[1] };
  }
  if (parts[0] === 'synthesis') {
    return { page: 'synthesis' };
  }
  if (parts[0] === 'share' && parts[1]) {
    return { page: 'share', modelId: parts[1] };
  }

  return { page: 'home' };
}
