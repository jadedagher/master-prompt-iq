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
      colorScheme: "light",
      radius: "pill",
      density: "normal",
      color: {
        surface: {
          background: "#ffffff",
          foreground: "#ffffff",
        },
      },
      typography: {
        baseSize: 16,
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
      },
    },
    composer: {
      attachments: {
        enabled: true,
        maxCount: 10,
        maxSize: 512 * 1024 * 1024, // 512 MB max
      },
    },
    startScreen: {
      greeting: "Appuie sur commencer!  ⬇",
      prompts: [
        {
          label: "🚀 Commencer!",
          prompt:
            "Je veux créer une application web. Aide-moi à générer un cahier des charges technique complet et détaillé prêt pour Bolt ou Lovable.",
        },
      ],
    },
  };

  const chatkit = useChatKit(options);

  return (
    <div className="flex h-[90vh] w-full flex-col rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900 overflow-hidden">
      {!started ? (
        <LandingView onStart={() => setStarted(true)} />
      ) : (
        <>
          <div className="flex items-center justify-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
            <img
              src="https://res.cloudinary.com/dzxwhfhkx/image/upload/v1750696690/iqlogo_ihk3s9.webp"
              alt="IQ Project"
              className="h-10 w-auto object-contain"
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
