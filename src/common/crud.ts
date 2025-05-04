import { API_ENDPOINT } from './constants';

async function request<T>(resourcePath: string, options: RequestInit = {}): Promise<T> {
  const url = resourcePath.startsWith('http') ? resourcePath : `${API_ENDPOINT.replace(/\/$/, '')}/${resourcePath.replace(/^\//, '')}`;

  const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const isExternal = resourcePath.startsWith('http');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...(isExternal ? {} : { credentials: 'include' }),
  });

  if (!response.ok) {
    let errorMessage: string;
    try {
      errorMessage = await response.text();
    } catch {
      errorMessage = 'Unknown error';
    }
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorMessage}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error('Failed to parse JSON response');
  }
}

// Resource helpers
export function getResource<T>(resourcePath: string): () => Promise<T> {
  return () => request<T>(resourcePath, { method: 'GET' });
}

export function postResource<T, B = unknown>(resourcePath: string, body: B): () => Promise<T> {
  return () =>
    request<T>(resourcePath, {
      method: 'POST',
      body: JSON.stringify(body),
    });
}

export function postResourceFormData<T>(resourcePath: string, body: FormData): () => Promise<T> {
  return () =>
    request<T>(resourcePath, {
      method: 'POST',
      body,
      // Let the browser set the correct multipart/form-data boundary
      headers: {
        Accept: 'application/json',
      },
    });
}

export function putResource<T, B = unknown>(resourcePath: string, body: B): () => Promise<T> {
  return () =>
    request<T>(resourcePath, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
}

export function patchResource<T, B = unknown>(resourcePath: string, body: B): () => Promise<T> {
  return () =>
    request<T>(resourcePath, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
}

export function deleteResource<T>(resourcePath: string): () => Promise<T> {
  return () => request<T>(resourcePath, { method: 'DELETE' });
}
