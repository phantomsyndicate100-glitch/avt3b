const CONTACTS = [
  {
    platform: "Instagram",
    handle: "@avt3b.prince",
    href: "https://instagram.com/avt3b.prince",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    platform: "Email",
    handle: "avt3btech@gmail.com",
    href: "mailto:avt3btech@gmail.com",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2 8l10 6 10-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    platform: "Phone / WhatsApp",
    handle: "+91 9137341138",
    href: "https://wa.me/919137341138",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M22 16.5v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 5 5l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section
      data-ocid="contact.section"
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#000000] px-6 py-12"
    >
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        <div className="mb-8 fade-up">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
            08 / CONTACT
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide text-white uppercase mt-2">
            LET'S <span className="text-accent-glow">CONNECT</span>
          </h2>
          <div className="h-px w-16 bg-[#00ff88] mt-4 mx-auto" />
          <p className="mt-4 text-white/40 font-body text-sm leading-relaxed max-w-md mx-auto">
            Ready to build something that actually works? Let's talk strategy,
            systems, and execution.
          </p>
        </div>

        {/* Contact cards */}
        <div className="flex flex-col gap-4 mb-8">
          {CONTACTS.map((contact, i) => (
            <a
              key={contact.platform}
              href={contact.href}
              data-ocid={`contact.link.${i + 1}`}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={
                contact.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="glass-card rounded-lg p-5 flex items-center gap-4 group hover:border-[rgba(0,255,136,0.5)] transition-all duration-300 hover:shadow-glow-sm text-left fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(0,255,136,0.3)] text-[#00ff88] group-hover:border-[#00ff88] group-hover:shadow-glow-sm transition-all duration-300 shrink-0">
                {contact.icon}
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-white/30 tracking-wider uppercase mb-0.5">
                  {contact.platform}
                </div>
                <div className="font-body text-white/80 group-hover:text-[#00ff88] transition-colors duration-300 truncate">
                  {contact.handle}
                </div>
              </div>
              <div className="ml-auto text-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12L12 2M12 2H6M12 2V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Primary CTA */}
        <a
          href="https://wa.me/919137341138"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="contact.cta_button"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#00ff88] text-black font-display text-xl tracking-widest uppercase hover:shadow-glow-lg transition-all duration-300 group fade-up fade-up-delay-4"
        >
          <span>WORK WITH ME</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Footer branding */}
        <div className="mt-10 fade-up fade-up-delay-5">
          <p className="font-mono text-[10px] text-white/20 tracking-widest">
            © {new Date().getFullYear()} AVT3B — Prince Sharma. Built with love
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ff88] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
