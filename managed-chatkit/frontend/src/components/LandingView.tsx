interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-surface px-6 py-16">
      {/* Subtle warm glow behind logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg">
        {/* Logo */}
        <div className="animate-fade-up">
          <img
            src="https://res.cloudinary.com/dzxwhfhkx/image/upload/v1750696690/iqlogo_ihk3s9.webp"
            alt="IQ Project"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div
          className="animate-fade-up text-center"
          style={{ animationDelay: "0.08s" }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-[1.1]">
            Master Prompt
            <br />
            <span className="text-muted font-light">Builder</span>
          </h1>
        </div>

        {/* Attribution */}
        <a
          href="https://iq-project.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-up flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200"
          style={{ animationDelay: "0.16s" }}
        >
          par IQ Education
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </a>

        {/* Model badge */}
        <div
          className="animate-fade-up flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-4 py-2"
          style={{ animationDelay: "0.24s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted tracking-wide">
            GPT-5.1 Thinking
          </span>
        </div>

        {/* Description */}
        <p
          className="animate-fade-up text-center text-sm leading-relaxed text-muted max-w-sm"
          style={{ animationDelay: "0.32s" }}
        >
          Generez des cahiers des charges techniques complets, prets a l'emploi
          pour Bolt ou Lovable.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="animate-fade-up group relative mt-2 flex items-center gap-2 rounded-full border border-border bg-surface-raised px-7 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent-soft"
          style={{ animationDelay: "0.40s" }}
        >
          Commencer
          <svg
            className="w-4 h-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
