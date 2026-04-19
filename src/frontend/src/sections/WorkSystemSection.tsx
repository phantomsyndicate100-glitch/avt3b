const STEPS = [
  {
    number: "01",
    title: "ANALYZE",
    desc: "Deep-dive into the problem. Map the current state, identify bottlenecks, and define what success looks like.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "BUILD",
    desc: "Architect and execute. Systems, automations, products — built fast, built right, built to last.",
    icon: "⚙️",
  },
  {
    number: "03",
    title: "OPTIMIZE",
    desc: "Test, measure, iterate. Remove friction. Amplify what works. Kill what doesn't.",
    icon: "📊",
  },
  {
    number: "04",
    title: "SCALE",
    desc: "Replicate winning systems. Expand revenue streams. Build the machine that runs without you.",
    icon: "🚀",
  },
];

const SCAN_LINES = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function WorkSystemSection() {
  return (
    <section
      data-ocid="work-system.section"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      {/* Diagonal line accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        {SCAN_LINES.map((letter, i) => (
          <div
            key={letter}
            className="absolute w-px bg-[#00ff88]"
            style={{
              height: "200%",
              left: `${10 + i * 12}%`,
              top: "-50%",
              transform: "rotate(15deg)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="mb-10 fade-up">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
            06 / WORK SYSTEM
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide text-white uppercase mt-2">
            THE <span className="text-accent-glow">PROCESS</span>
          </h2>
          <div className="h-px w-16 bg-[#00ff88] mt-4" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              data-ocid={`work-system.step.${i + 1}`}
              className="relative group fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t border-dashed border-[rgba(0,255,136,0.2)] z-0" />
              )}

              <div className="glass-card rounded-lg p-6 relative z-10 h-full group-hover:border-[rgba(0,255,136,0.4)] transition-all duration-300 group-hover:shadow-glow-sm">
                <div className="font-mono text-4xl text-[rgba(0,255,136,0.15)] font-bold mb-3 group-hover:text-[rgba(0,255,136,0.3)] transition-colors duration-300">
                  {step.number}
                </div>
                <div className="text-2xl mb-3">{step.icon}</div>
                <h3 className="font-display text-xl tracking-wide text-white uppercase mb-2 group-hover:text-accent-glow transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-white/40 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-10 flex items-center justify-center fade-up fade-up-delay-5">
          <div className="flex items-center gap-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#00ff88] tracking-widest">
                  {step.title}
                </span>
                {i < STEPS.length - 1 && (
                  <svg
                    width="16"
                    height="8"
                    viewBox="0 0 16 8"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 4H14M14 4L10 1M14 4L10 7"
                      stroke="rgba(0,255,136,0.5)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
