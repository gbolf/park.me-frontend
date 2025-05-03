import { API_ENDPOINT } from './constants';
import axios from 'axios';

async function request<T = any>(resourcePath: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(resourcePath.includes('http') ? resourcePath : API_ENDPOINT + resourcePath, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!resourcePath.includes('http') && { credentials: 'include' }),
    ...options,
  });

  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${error}`);
  }

  return response.json();
}

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export async function cookieSetup(): Promise<void> {
  axiosInstance.get(API_ENDPOINT.replace('api/', 'sanctum/csrf-cookie'));

  //  await fetch(API_ENDPOINT.replace('api/', 'sanctum/csrf-cookie'), { credentials: 'include' });
  //  await fetch(API_ENDPOINT + 'file', { method: 'POST', credentials: 'include' });
}

export function getResource<T = any>(resourcePath: string) {
  return () => request<T>(resourcePath, { method: 'GET' });
}

export function postResource<T = any>(resourcePath: string, body: any) {
  return axiosInstance.post(API_ENDPOINT + resourcePath);
  return () =>
    request<T>(resourcePath, {
      method: 'POST',
      body: JSON.stringify(body),
    });
}

export function postResourceFormData<T = any>(resourcePath: string, body: any) {
  return () => request<T>(resourcePath, { method: 'POST', body, headers: { Accept: 'application/json' } });
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
