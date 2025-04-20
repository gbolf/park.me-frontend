async function request<T = any>(resourcePath: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(resourcePath.includes('http') ? resourcePath : 'api/' + resourcePath, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${error}`);
  }

  return response.json();
}

export function getResource<T = any>(resourcePath: string) {
  return () => request<T>(resourcePath, { method: 'GET' });
}

export function postResource<T = any>(resourcePath: string, body: any) {
  return () =>
    request<T>(resourcePath, {
      method: 'POST',
      body: JSON.stringify(body),
    });
}

export function putResource<T = any>(resourcePath: string, body: any) {
  return () =>
    request<T>(resourcePath, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
}

export function patchResource<T = any>(resourcePath: string, body: any) {
  return () =>
    request<T>(resourcePath, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
}

export function deleteResource<T = any>(resourcePath: string) {
  return () => request<T>(resourcePath, { method: 'DELETE' });
}
