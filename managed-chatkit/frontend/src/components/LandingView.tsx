interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-12">
      {/* Decorative gradient blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        {/* Logo */}
        <div className="animate-fade-in">
          <img
            src="https://res.cloudinary.com/dzxwhfhkx/image/upload/v1750696690/iqlogo_ihk3s9.webp"
            alt="IQ Project"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="animate-fade-in text-center space-y-2" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            IQ Project
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Master prompt
            </span>
          </h1>
        </div>

        {/* By IQ Project */}
        <div className="animate-fade-in flex items-center gap-2" style={{ animationDelay: "0.2s" }}>
          <span className="text-gray-400">By</span>
          <a
            href="https://iq-project.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>IQ Project</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l6-6m0 0l-6 6m6-6v6" />
            </svg>
          </a>
        </div>

        {/* Feature highlight */}
        <div className="animate-fade-in flex items-start gap-3 bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-3" style={{ animationDelay: "0.3s" }}>
          <span className="text-lg">✓</span>
          <span className="text-gray-300 text-sm">
            Using the creator's recommended model: GPT-5.1 Thinking
          </span>
        </div>

        {/* Description */}
        <div className="animate-fade-in text-center text-gray-300 leading-relaxed" style={{ animationDelay: "0.4s" }}>
          <p>
            Assistant IQ Project pour générer des cahiers des charges techniques complets et prêts à l'emploi pour créer une application web avec Bolt ou Lovable.
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in mt-4" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={onStart}
            className="group relative px-8 py-4 text-lg font-semibold text-white rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-300 overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <span className="relative flex items-center gap-2">
              <span>👋</span>
              Commencer !
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
