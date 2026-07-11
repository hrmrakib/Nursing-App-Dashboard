export function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in environment variables",
    );
  }

  if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
    throw new Error("NEXT_PUBLIC_API_URL must include http:// or https://");
  }

  // Remove trailing slash so callers can safely do `${getBaseUrl()}/api/...`
  return baseUrl.replace(/\/+$/, "");
}
