import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(method: string, endpoint: string, data?: any) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Check if we're in production (Netlify) or development
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

  let url: string;

  if (isProduction) {
    // Map API endpoints to Netlify functions
    if (endpoint === '/api/services') {
      url = '/.netlify/functions/getServices';
    } else if (endpoint === '/api/portfolio') {
      url = '/.netlify/functions/getPortfolio';
    } else if (endpoint.startsWith('/api/content/')) {
      const section = endpoint.replace('/api/content/', '');
      url = `/.netlify/functions/getContent?section=${section}`;
    } else if (endpoint === '/api/admin/auth') {
      url = '/.netlify/functions/adminAuth';
    } else {
      url = endpoint; // fallback
    }
  } else {
    url = `${API_BASE_URL}${endpoint}`;
  }

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});