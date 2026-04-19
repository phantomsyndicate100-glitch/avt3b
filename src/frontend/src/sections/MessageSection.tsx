const MESSAGES = [
  {
    quote: "Systems beat motivation.",
    sub: "Build the machine. Let the machine do the work.",
  },
  {
    quote: "Never give up.",
    sub: "Every setback is data. Use it.",
  },
  {
    quote: "Startup like a game.",
    sub: "Play to win. Iterate fast. Level up.",
  },
  {
    quote: "Execution > Ideas.",
    sub: "A mediocre plan executed beats a perfect plan imagined.",
  },
];

export default function MessageSection() {
  return (
    <section
      data-ocid="message.section"
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="mb-10 text-center fade-up">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
            07 / MESSAGE
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide text-white uppercase mt-2">
            THE <span className="text-accent-glow">MINDSET</span>
          </h2>
          <div className="h-px w-16 bg-[#00ff88] mt-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MESSAGES.map((msg, i) => (
            <div
              key={msg.quote}
              data-ocid={`message.item.${i + 1}`}
              className={`glass-card rounded-lg p-7 group hover:border-[rgba(0,255,136,0.5)] transition-all duration-300 hover:shadow-glow-md fade-up ${
                i === 0 ? "sm:col-span-2 text-center" : ""
              }`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {i === 0 && (
                <div className="text-4xl text-[rgba(0,255,136,0.3)] font-mono mb-3 leading-none">
                  "
                </div>
              )}
              <p
                className={`font-display tracking-wide text-white uppercase group-hover:text-accent-glow transition-colors duration-300 ${
                  i === 0 ? "text-3xl md:text-5xl mb-3" : "text-2xl mb-2"
                }`}
              >
                {msg.quote}
              </p>
              <p className="font-body text-sm text-white/40 leading-relaxed">
                {msg.sub}
              </p>
              {i === 0 && (
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mt-5 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
