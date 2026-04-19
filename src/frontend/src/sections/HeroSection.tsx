import { useEffect, useRef } from "react";

interface HeroSectionProps {
  goNext: () => void;
}

const TAGLINE_WORDS = ["RESULTS", "SYSTEMS", "REVENUE", "GROWTH"];

export default function HeroSection({ goNext }: HeroSectionProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % TAGLINE_WORDS.length;
      if (wordRef.current) {
        wordRef.current.style.opacity = "0";
        wordRef.current.style.transform = "translateY(-12px)";
        setTimeout(() => {
          if (wordRef.current) {
            wordRef.current.textContent = TAGLINE_WORDS[indexRef.current];
            wordRef.current.style.opacity = "1";
            wordRef.current.style.transform = "translateY(0)";
          }
        }, 200);
      }
    }, 2200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      data-ocid="hero.section"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000000]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[rgba(0,255,136,0.4)]" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[rgba(0,255,136,0.4)]" />
      <div className="absolute bottom-20 left-8 w-8 h-8 border-b-2 border-l-2 border-[rgba(0,255,136,0.4)]" />
      <div className="absolute bottom-20 right-8 w-8 h-8 border-b-2 border-r-2 border-[rgba(0,255,136,0.4)]" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      {/* Top badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-glow-pulse" />
        <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
          FOUNDER — AVT3B
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-glow-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1
          className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-wide text-white uppercase fade-up"
          style={{ textShadow: "0 0 1px rgba(255,255,255,0.1)" }}
        >
          PRINCE SHARMA
        </h1>

        <div className="mt-2 mb-6 fade-up fade-up-delay-1">
          <p className="font-mono text-sm md:text-base tracking-[0.4em] text-white/50 uppercase">
            I Build AI Systems That Generate{" "}
            <span
              ref={wordRef}
              className="text-[#00ff88]"
              style={{
                transition: "opacity 0.2s ease, transform 0.2s ease",
                display: "inline-block",
              }}
            >
              {TAGLINE_WORDS[0]}
            </span>
          </p>
        </div>

        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mb-8 fade-up fade-up-delay-2" />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up fade-up-delay-3">
          <button
            type="button"
            data-ocid="hero.explore_button"
            onClick={goNext}
            className="group relative px-8 py-4 bg-[#00ff88] text-black font-display text-xl tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-glow-lg"
          >
            <span className="relative z-10">EXPLORE MY UNIVERSE</span>
            <span className="absolute inset-0 bg-[#00cc6a] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </button>

          <a
            href="https://wa.me/919137341138"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.connect_button"
            className="flex items-center gap-2 px-8 py-4 border border-[rgba(0,255,136,0.4)] text-[#00ff88] font-mono text-sm tracking-widest uppercase hover:border-[#00ff88] hover:shadow-glow-sm transition-all duration-300"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 10.5v1.75C13 12.66 12.33 13 11.5 13 6.2 13 1 7.8 1 2.5 1 1.67 1.34 1 2.25 1H4A1.25 1.25 0 0 1 5.25 2c.3 1 .78 1.96 1.35 2.83L5.5 6A7.5 7.5 0 0 0 8 8.5l1.17-1.1c.87.57 1.83 1.05 2.83 1.35A1.25 1.25 0 0 1 13 10.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            WORK WITH ME
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 fade-up fade-up-delay-5">
        <span className="font-mono text-[10px] tracking-widest text-white uppercase">
          Scroll Down
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-float" />
      </div>
    </section>
  );
}
