const readEnvString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

export const workflowId = (() => {
  const id = readEnvString(import.meta.env.VITE_CHATKIT_WORKFLOW_ID);
  if (!id || id.startsWith("wf_replace")) {
    throw new Error("Set VITE_CHATKIT_WORKFLOW_ID in your .env file.");
  }
  return id;
})();

export function createClientSecretFetcher(
  workflow: string,
  endpoint = "/api/create-session"
) {
  let expiresAt = 0;

  return async (currentSecret: string | null) => {
    // Only reuse the secret if it exists and hasn't expired yet
    // (with a 60-second buffer to avoid edge-case 401s)
    if (currentSecret && Date.now() < expiresAt - 60_000) {
      return currentSecret;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workflow: { id: workflow } }),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      client_secret?: string;
      expires_after?: number;
      error?: string;
    };

    if (!response.ok) {
      throw new Error(payload.error ?? "Failed to create session");
    }

    if (!payload.client_secret) {
      throw new Error("Missing client secret in response");
    }

    // Track when this secret expires (expires_after is in seconds)
    if (payload.expires_after) {
      expiresAt = Date.now() + payload.expires_after * 1000;
    } else {
      // Default to 10 minutes if no expiry provided
      expiresAt = Date.now() + 10 * 60 * 1000;
    }

    return payload.client_secret;
  };
}
