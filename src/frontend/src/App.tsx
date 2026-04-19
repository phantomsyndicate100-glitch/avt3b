import { useCallback, useEffect, useRef, useState } from "react";
import { SECTIONS, type SectionName } from "./types";

import AdminModal from "./components/AdminModal";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import MessageSection from "./sections/MessageSection";
import ProductsSection from "./sections/ProductsSection";
import SkillsSection from "./sections/SkillsSection";
import WhatIBuildSection from "./sections/WhatIBuildSection";
import WhoIAmSection from "./sections/WhoIAmSection";
import WorkSystemSection from "./sections/WorkSystemSection";

const ADMIN_PASSWORD = "PMT60ZPRINCE";
const TOTAL_SECTIONS = SECTIONS.length;

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  const aKeyPressesRef = useRef<number[]>([]);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSection) return;
      if (index < 0 || index >= TOTAL_SECTIONS) return;
      setIsTransitioning(true);
      setCurrentSection(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [currentSection, isTransitioning],
  );

  const goNext = useCallback(
    () => goTo(currentSection + 1),
    [currentSection, goTo],
  );
  const goPrev = useCallback(
    () => goTo(currentSection - 1),
    [currentSection, goTo],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showAdminModal) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "a" || e.key === "A") {
        const now = Date.now();
        aKeyPressesRef.current = [...aKeyPressesRef.current, now].filter(
          (t) => now - t < 1000,
        );
        if (aKeyPressesRef.current.length >= 3) {
          aKeyPressesRef.current = [];
          setShowAdminModal(true);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, showAdminModal]);

  // Touch/swipe support
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const threshold = 50;
      if (Math.abs(dy) > Math.abs(dx)) {
        if (dy > threshold) goNext();
        else if (dy < -threshold) goPrev();
      }
    };
    const el = containerRef.current;
    el?.addEventListener("touchstart", handleTouchStart, { passive: true });
    el?.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", handleTouchStart);
      el?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setCursorHovered(
        !!target.closest(
          'a, button, [role="button"], input, textarea, select, label',
        ),
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const handleAdminLogin = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const handleAdminClose = useCallback(() => {
    setShowAdminModal(false);
  }, []);

  const handleSectionNavigate = useCallback(
    (section: SectionName) => {
      const idx = SECTIONS.findIndex((s) => s.id === section);
      if (idx >= 0) goTo(idx);
    },
    [goTo],
  );

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-background"
      ref={containerRef}
    >
      {/* Custom cursor — desktop only */}
      <div
        className={`cursor-ring ${cursorHovered ? "hovered" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden="true"
      />
      <div
        className="cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden="true"
      />

      {/* Navigation dots */}
      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
        aria-label="Section navigation"
      >
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            type="button"
            data-ocid={`nav.dot.${i + 1}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${section.label}`}
            className={`relative group w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSection
                ? "bg-[#00ff88] shadow-glow-md scale-125"
                : "bg-white/20 hover:bg-white/50"
            }`}
          >
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#00ff88] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 px-2 py-0.5 rounded border border-[rgba(0,255,136,0.2)] pointer-events-none">
              {section.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Prev/Next arrows */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
        <button
          type="button"
          data-ocid="nav.prev_button"
          onClick={goPrev}
          disabled={currentSection === 0}
          aria-label="Previous section"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[rgba(0,255,136,0.3)] text-[#00ff88] disabled:opacity-20 disabled:cursor-not-allowed hover:border-[#00ff88] hover:shadow-glow-sm transition-all duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 13L8 3M8 3L3 8M8 3L13 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="font-mono text-xs text-white/40 tabular-nums">
          {String(currentSection + 1).padStart(2, "0")} /{" "}
          {String(TOTAL_SECTIONS).padStart(2, "0")}
        </span>

        <button
          type="button"
          data-ocid="nav.next_button"
          onClick={goNext}
          disabled={currentSection === TOTAL_SECTIONS - 1}
          aria-label="Next section"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[rgba(0,255,136,0.3)] text-[#00ff88] disabled:opacity-20 disabled:cursor-not-allowed hover:border-[#00ff88] hover:shadow-glow-sm transition-all duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 3L8 13M8 13L13 8M8 13L3 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Section slides container */}
      <div
        className="w-full"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      >
        <div className="section-slide">
          <HeroSection goNext={goNext} />
        </div>
        <div className="section-slide">
          <WhatIBuildSection />
        </div>
        <div className="section-slide">
          <WhoIAmSection />
        </div>
        <div className="section-slide">
          <SkillsSection />
        </div>
        <div className="section-slide">
          <AboutSection />
        </div>
        <div className="section-slide">
          <WorkSystemSection />
        </div>
        <div className="section-slide">
          <MessageSection />
        </div>
        <div className="section-slide">
          <ContactSection />
        </div>
        <div className="section-slide">
          <ProductsSection adminAuthenticated={adminAuthenticated} />
        </div>
      </div>

      {/* Admin Modal */}
      {showAdminModal && (
        <AdminModal
          authenticated={adminAuthenticated}
          onLogin={handleAdminLogin}
          onClose={handleAdminClose}
          onSectionNavigate={handleSectionNavigate}
        />
      )}
    </div>
  );
}
