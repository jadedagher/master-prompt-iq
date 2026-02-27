import { useMemo, useState } from "react";
import type { ChatKitOptions } from "@openai/chatkit";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";
import { LandingView } from "./LandingView";

export function ChatKitPanel() {
  const [started, setStarted] = useState(false);

  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const options: ChatKitOptions = {
    api: {
      getClientSecret,
    },
    theme: {
      colorScheme: "dark",
      radius: "pill",
      density: "normal",
      color: {
        surface: {
          background: "#141416",
          foreground: "#1a1a1e",
        },
        accent: {
          primary: "#e8762d",
          level: 2,
        },
      },
      typography: {
        baseSize: 16,
        fontFamily:
          '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        fontFamilyMono:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      },
    },
    composer: {
      attachments: {
        enabled: true,
        maxCount: 10,
        maxSize: 512 * 1024 * 1024,
      },
    },
    startScreen: {
      greeting: "Appuie sur commencer!  \u2B07",
      prompts: [
        {
          label: "\uD83D\uDE80 Commencer!",
          prompt:
            "Je veux cr\u00E9er une application web. Aide-moi \u00E0 g\u00E9n\u00E9rer un cahier des charges technique complet et d\u00E9taill\u00E9 pr\u00EAt pour Bolt ou Lovable.",
        },
      ],
    },
  };

  const chatkit = useChatKit(options);

  return (
    <div className="flex h-[90vh] w-full flex-col rounded-2xl border border-border-subtle bg-surface shadow-2xl shadow-black/20 overflow-hidden">
      {!started ? (
        <LandingView onStart={() => setStarted(true)} />
      ) : (
        <>
          <div className="flex items-center justify-center px-6 py-3.5 border-b border-border-subtle bg-background">
            <img
              src="https://res.cloudinary.com/dzxwhfhkx/image/upload/v1750696690/iqlogo_ihk3s9.webp"
              alt="IQ Project"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatKit control={chatkit.control} className="h-full w-full" />
          </div>
        </>
      )}
    </div>
  );
}
