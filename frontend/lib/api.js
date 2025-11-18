const API_BASE_RAW = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// Ensure API_BASE has protocol (add https:// if missing)
const API_BASE = API_BASE_RAW.startsWith("http://") || API_BASE_RAW.startsWith("https://")
  ? API_BASE_RAW
  : `https://${API_BASE_RAW}`;

export async function apiFetch(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Ensure path starts with /api if it doesn't already
  const apiPath = path.startsWith("/api") ? path : `/api${path}`;
  const fullUrl = `${API_BASE}${apiPath}`;
  
  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.msg || `Request failed: ${res.status}`);
    }

    if (res.status === 204) {
      return null;
    }

    return res.json();
  } catch (error) {
    // Provide more helpful error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error(`[API] Network error - Could not reach: ${fullUrl}`);
      console.error(`[API] Check if backend is running and CORS is configured`);
      throw new Error(`Cannot connect to server. Please check if the backend is running at ${API_BASE}`);
    }
    throw error;
  }
}
