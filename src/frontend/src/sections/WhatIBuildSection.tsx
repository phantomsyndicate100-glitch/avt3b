const BUILD_ITEMS = [
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "Intelligent workflows and pipelines that eliminate manual processes and scale operations without adding headcount.",
    tags: ["GPT-4", "LangChain", "n8n"],
  },
  {
    icon: "📈",
    title: "Trading Systems",
    desc: "Algorithmic strategies, risk management engines, and real-time data pipelines for consistent market edge.",
    tags: ["Algo Trading", "Backtesting", "NISM"],
  },
  {
    icon: "⚡",
    title: "Digital Systems",
    desc: "End-to-end digital infrastructure — from lead generation funnels to automated sales and delivery pipelines.",
    tags: ["Funnels", "CRM", "Analytics"],
  },
  {
    icon: "🚀",
    title: "Scalable Products",
    desc: "Revenue-generating digital products built to scale: courses, tools, SaaS dashboards, and community platforms.",
    tags: ["SaaS", "Products", "Launch"],
  },
];

export default function WhatIBuildSection() {
  return (
    <section
      data-ocid="what-i-build.section"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-10 fade-up">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
            02 / WHAT I BUILD
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide text-white uppercase mt-2">
            BUILDING THE
            <span className="text-accent-glow"> FUTURE</span>
          </h2>
          <div className="h-px w-16 bg-[#00ff88] mt-4" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUILD_ITEMS.map((item, i) => (
            <div
              key={item.title}
              data-ocid={`what-i-build.item.${i + 1}`}
              className="glass-card rounded-lg p-5 group hover:border-[rgba(0,255,136,0.4)] transition-all duration-300 hover:shadow-glow-sm fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="text-3xl mb-3 animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {item.icon}
              </div>
              <h3 className="font-display text-xl tracking-wide text-white uppercase mb-2 group-hover:text-accent-glow transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4 font-body">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-[#00ff88] border border-[rgba(0,255,136,0.25)] px-2 py-0.5 rounded-sm tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
