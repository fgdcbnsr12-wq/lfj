import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  getBackendBaseUrl,
  getDashboardRedirectPath,
  getFilamentRedirectUrl,
  isFilamentRedirectPath,
} from '../dashboardRoutes';

describe('dashboard route utilities', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      location: {
        origin: 'http://localhost:5173',
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('returns the current origin when a remote backend is configured for localhost', () => {
    vi.stubEnv('VITE_BACKEND_URL', 'https://api.example.com');

    expect(getBackendBaseUrl()).toBe('http://localhost:5173');
  });

  it('keeps the requested route when the user is not an admin and the route is safe', () => {
    const path = getDashboardRedirectPath(
      {
        id: 1,
        name: 'Jane Doe',
        can_access_filament: false,
        redirect_to: '/dashboard',
      },
      '/blog',
    );

    expect(path).toBe('/blog');
  });

  it('resolves an admin redirect to the backend base url', () => {
    vi.stubEnv('VITE_BACKEND_URL', 'https://api.example.com');

    expect(getFilamentRedirectUrl('/admin')).toBe('https://api.example.com/admin');
    expect(isFilamentRedirectPath('/admin/posts')).toBe(true);
  });
});
