export const getBackendURL = () => {
  // Server-side (Next.js API routes, Server Components)
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BACKEND_DOCKER || "http://backend_rh:8000";
  }
  // Client-side (browser) - always use localhost
  return process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:8000";
};