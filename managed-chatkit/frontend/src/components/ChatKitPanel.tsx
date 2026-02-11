import { useMemo, useState, useEffect } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";
import { LandingView } from "./LandingView";

export function ChatKitPanel() {
  const [started, setStarted] = useState(false);
  const [messagesSent, setMessagesSent] = useState(false);

  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const chatkit = useChatKit({
    api: { getClientSecret },
  });

  // Send initial message asking for app name
  useEffect(() => {
    if (started && chatkit.control && !messagesSent) {
      // Small delay to ensure ChatKit is fully ready
      const timer = setTimeout(() => {
        try {
          chatkit.control?.sendMessage(
            "Bonjour! Quel est le nom de l'application que vous souhaitez construire?"
          );
          setMessagesSent(true);
        } catch (error) {
          console.error("Failed to send initial message:", error);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [started, chatkit.control, messagesSent]);

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
