const PILLARS = [
  {
    icon: "⚙️",
    title: "System-Driven",
    desc: "Every process is documented, automated, and optimized for scale.",
  },
  {
    icon: "📊",
    title: "Data-Driven",
    desc: "Decisions backed by real metrics, not assumptions or emotions.",
  },
  {
    icon: "🔗",
    title: "Multi-Stream",
    desc: "Trading + AI + Digital Products = diversified income architecture.",
  },
  {
    icon: "🧠",
    title: "Long-Term Vision",
    desc: "Building assets that compound over years, not just quick wins.",
  },
];

export default function AboutSection() {
  return (
    <section
      data-ocid="about.section"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      <div
        className="absolute top-0 left-1/2 w-96 h-96 opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 fade-up">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
            05 / ABOUT AVT3B
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-wide text-white uppercase mt-2">
            ONE ECOSYSTEM.
            <span className="text-accent-glow"> INFINITE SCALE.</span>
          </h2>
          <div className="h-px w-16 bg-[#00ff88] mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Description */}
          <div className="fade-up fade-up-delay-1">
            <p className="text-white/60 leading-relaxed mb-6 font-body text-base">
              AVT3B is a system-driven company built to create, automate, and
              scale multiple digital income streams through structured
              processes, AI tools, and data-driven execution.
            </p>
            <p className="text-white/60 leading-relaxed mb-8 font-body text-base">
              It focuses on building strong foundations, developing scalable
              products, and achieving long-term growth by integrating trading,
              automation, and digital systems into one centralized, efficient
              ecosystem.
            </p>

            {/* Mission */}
            <div className="border border-[rgba(0,255,136,0.25)] rounded-lg p-5 bg-[rgba(0,255,136,0.03)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-glow-pulse" />
                <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
                  Mission Statement
                </span>
              </div>
              <p className="font-display text-2xl text-white tracking-wide uppercase">
                Scale Beyond Individuals.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                data-ocid={`about.pillar.${i + 1}`}
                className="glass-card rounded-lg p-4 group hover:border-[rgba(0,255,136,0.4)] transition-all duration-300 hover:shadow-glow-sm fade-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="text-2xl mb-2">{pillar.icon}</div>
                <h3 className="font-display text-base tracking-wide text-white uppercase mb-1 group-hover:text-accent-glow transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs text-white/40 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
