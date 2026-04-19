const ROLES = [
  "Trader",
  "Broker",
  "Strategist",
  "AI Builder",
  "Entrepreneur",
  "Founder",
  "NISM Certified",
];

const STATS = [
  { value: "5+", label: "Years Building" },
  { value: "₹Cr", label: "Volume Traded" },
  { value: "10+", label: "Systems Built" },
  { value: "100%", label: "Execution Focus" },
];

export default function WhoIAmSection() {
  return (
    <section
      data-ocid="who-i-am.section"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      {/* Left glow */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase fade-up">
            03 / WHO I AM
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-wide text-white uppercase mt-2 mb-6 fade-up fade-up-delay-1">
            TRADER. BUILDER.
            <span className="text-accent-glow"> STRATEGIST.</span>
          </h2>

          <p className="text-white/60 leading-relaxed mb-8 max-w-lg fade-up fade-up-delay-2 font-body">
            I combine technical expertise with strategic thinking to build
            systems that generate real results. Not theory — execution. Every
            system I build is tested in live markets and real businesses.
          </p>

          {/* Role tags */}
          <div className="flex flex-wrap gap-2 mb-8 fade-up fade-up-delay-3">
            {ROLES.map((role, i) => (
              <span
                key={role}
                data-ocid={`who-i-am.role.${i + 1}`}
                className="font-mono text-xs text-[#00ff88] border border-[rgba(0,255,136,0.3)] px-3 py-1 rounded-full tracking-wider hover:border-[#00ff88] hover:shadow-glow-sm transition-all duration-200"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="border-l-2 border-[#00ff88] pl-4 fade-up fade-up-delay-4">
            <p className="font-display text-xl tracking-wide text-white uppercase">
              "Systems beat motivation."
            </p>
            <cite className="font-mono text-xs text-white/40 mt-1 block not-italic">
              — Prince Sharma
            </cite>
          </blockquote>
        </div>

        {/* Right column — stats */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-ocid={`who-i-am.stat.${i + 1}`}
              className="glass-card rounded-lg p-6 text-center group hover:border-[rgba(0,255,136,0.4)] transition-all duration-300 hover:shadow-glow-sm fade-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="font-display text-4xl text-accent-glow mb-2 group-hover:animate-text-glow">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-white/40 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
          {/* Featured card */}
          <div className="col-span-2 glass-card rounded-lg p-5 border border-[rgba(0,255,136,0.2)] fade-up fade-up-delay-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-glow-pulse" />
              <span className="font-mono text-xs text-[#00ff88] tracking-wider uppercase">
                Founder @ AVT3B
              </span>
            </div>
            <p className="text-white/50 text-sm font-body">
              Building a system-driven company that creates, automates, and
              scales multiple digital income streams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
