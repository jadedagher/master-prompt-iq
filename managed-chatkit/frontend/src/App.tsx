import { ChatKitPanel } from "./components/ChatKitPanel";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-5xl px-4">
        <ChatKitPanel />
      </div>
    </main>
  );
}
