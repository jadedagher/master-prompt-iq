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
          '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        fontSources: [
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
            weight: 400,
            style: "normal",
            display: "swap",
          },
          {
            family: "OpenAI Sans",
            src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-SemiBold.woff2",
            weight: 600,
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    composer: {
      attachments: {
        enabled: true,
        maxCount: 5,
        maxSize: 10485760, // 10MB
      },
    },
    startScreen: {
      greeting: "Quel est le nom de ton app?",
      prompts: [
        {
          prompt:
            "🚀 Commencer! Je veux créer une application web. Aide-moi à générer un cahier des charges technique complet et détaillé prêt pour Bolt ou Lovable.",
        },
        {
          prompt:
            "🛍️ E-commerce: Je veux créer une plateforme e-commerce. Génère-moi un cahier des charges complet avec tous les détails techniques pour construire une boutique en ligne moderne.",
        },
        {
          prompt:
            "📱 SaaS: Je développe une application SaaS. Aide-moi à créer un cahier des charges technique détaillé pour une solution cloud.",
        },
        {
          prompt:
            "📊 Tableau de bord: Je veux un tableau de bord analytique. Génère les spécifications techniques pour un dashboard avec visualisations de données.",
        },
      ],
    },
  };

  const chatkit = useChatKit(options);

  return (
    <div className="flex h-[90vh] w-full rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900 overflow-hidden">
      {!started ? (
        <LandingView onStart={() => setStarted(true)} />
      ) : (
        <ChatKit control={chatkit.control} className="h-full w-full" />
      )}
    </div>
  );
}
