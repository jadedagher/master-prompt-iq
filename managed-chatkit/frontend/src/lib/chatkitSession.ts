const readEnvString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

export const workflowId = (() => {
  const id = readEnvString(import.meta.env.VITE_CHATKIT_WORKFLOW_ID);
  if (!id || id.startsWith("wf_replace")) {
    throw new Error("Set VITE_CHATKIT_WORKFLOW_ID in your .env file.");
  }
  return id;
})();

const getApiEndpoint = (): string => {
  const backendUrl = readEnvString(import.meta.env.VITE_BACKEND_URL);
  if (backendUrl) {
    return `${backendUrl}/api/create-session`;
  }
  return "/api/create-session";
};

export function createClientSecretFetcher(
  workflow: string,
  endpoint?: string
) {
  const finalEndpoint = endpoint || getApiEndpoint();
  return async (currentSecret: string | null) => {
    if (currentSecret) return currentSecret;

    const response = await fetch(finalEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workflow: { id: workflow } }),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      client_secret?: string;
      error?: string;
    };

    if (!response.ok) {
      throw new Error(payload.error ?? "Failed to create session");
    }

    if (!payload.client_secret) {
      throw new Error("Missing client secret in response");
    }

    return payload.client_secret;
  };
}
