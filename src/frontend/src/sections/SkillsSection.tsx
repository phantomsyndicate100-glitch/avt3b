const SKILLS = [
  {
    category: "AI & Automation",
    items: [
      "GPT-4 Integration",
      "LangChain",
      "n8n Workflows",
      "Process Automation",
      "AI Agents",
    ],
    level: 92,
  },
  {
    category: "Trading Systems",
    items: [
      "Algo Trading",
      "Risk Management",
      "NISM Certified",
      "Options Strategy",
      "Backtesting",
    ],
    level: 88,
  },
  {
    category: "AI Development",
    items: [
      "Prompt Engineering",
      "Model Fine-tuning",
      "RAG Systems",
      "Data Pipelines",
      "API Design",
    ],
    level: 85,
  },
  {
    category: "Consulting",
    items: [
      "System Design",
      "Business Strategy",
      "Process Optimization",
      "Growth Hacking",
      "Scaling",
    ],
    level: 90,
  },
  {
    category: "Lead Generation",
    items: [
      "Funnel Building",
      "CRM Setup",
      "Email Automation",
      "Social Ads",
      "Conversion Opt.",
    ],
    level: 87,
  },
];

export default function SkillsSection() {
  return (
    <section
      data-ocid="skills.section"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      <div
        className="absolute top-1/2 right-0 w-64 h-64 opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="mb-8 fade-up">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
            04 / SKILLS
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide text-white uppercase mt-2">
            CORE <span className="text-accent-glow">COMPETENCIES</span>
          </h2>
          <div className="h-px w-16 bg-[#00ff88] mt-4" />
        </div>

        <div className="grid gap-4">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.category}
              data-ocid={`skills.item.${i + 1}`}
              className="glass-card rounded-lg p-4 group hover:border-[rgba(0,255,136,0.4)] transition-all duration-300 fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-lg tracking-wide text-white uppercase group-hover:text-accent-glow transition-colors duration-300">
                      {skill.category}
                    </h3>
                    <span className="font-mono text-xs text-[#00ff88] ml-4 shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-px w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00ff88] rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded-sm tracking-wider hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.3)] transition-colors duration-200"
                  >
                    {item}
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
