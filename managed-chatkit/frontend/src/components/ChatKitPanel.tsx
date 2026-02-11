import { useMemo, useState } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";
import { LandingView } from "./LandingView";

export function ChatKitPanel() {
  const [started, setStarted] = useState(false);

  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const chatkit = useChatKit({
    api: { getClientSecret },
  });

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
