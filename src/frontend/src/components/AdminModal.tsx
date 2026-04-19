import { useEffect, useRef, useState } from "react";
import type { SectionName } from "../types";
import { SECTIONS } from "../types";

interface AdminModalProps {
  authenticated: boolean;
  onLogin: (password: string) => boolean;
  onClose: () => void;
  onSectionNavigate: (section: SectionName) => void;
}

export default function AdminModal({
  authenticated,
  onLogin,
  onClose,
  onSectionNavigate,
}: AdminModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(authenticated);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on mount without using autoFocus attribute
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleLogin = () => {
    const success = onLogin(password);
    if (success) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid password. Try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleNavigate = (sectionId: SectionName) => {
    onSectionNavigate(sectionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <dialog
        data-ocid="admin.dialog"
        className="glass-card rounded-lg w-full max-w-sm p-6 border border-[rgba(0,255,136,0.4)] shadow-glow-md bg-transparent text-white"
        open
        aria-label="Admin panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-glow-pulse" />
              <span className="font-mono text-[10px] text-[#00ff88] tracking-widest uppercase">
                System Access
              </span>
            </div>
            <h2 className="font-display text-2xl tracking-wide text-white uppercase">
              {isLoggedIn ? "ADMIN PANEL" : "AUTHENTICATE"}
            </h2>
          </div>
          <button
            type="button"
            data-ocid="admin.close_button"
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors duration-200"
            aria-label="Close admin panel"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {!isLoggedIn ? (
          /* Login form */
          <div className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1.5"
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                ref={inputRef}
                type="password"
                data-ocid="admin.password_input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.2)] text-white font-mono text-sm px-3 py-2.5 rounded focus:outline-none focus:border-[#00ff88] transition-colors duration-200"
                placeholder="Enter password"
              />
              {error && (
                <p
                  data-ocid="admin.error_state"
                  className="font-mono text-[10px] text-red-400 mt-1.5"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="button"
              data-ocid="admin.login_button"
              onClick={handleLogin}
              className="w-full py-3 bg-[#00ff88] text-black font-mono text-xs tracking-widest uppercase hover:shadow-glow-sm transition-all duration-200 rounded"
            >
              ACCESS SYSTEM
            </button>

            <p className="font-mono text-[10px] text-white/20 text-center tracking-wider">
              Hint: Press A key 3 times to trigger
            </p>
          </div>
        ) : (
          /* Admin panel — navigate to sections */
          <div className="space-y-3">
            <p className="font-mono text-[10px] text-[#00ff88] tracking-wider uppercase mb-4">
              ✓ Authenticated — Navigate to section:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {SECTIONS.map((section, i) => (
                <button
                  key={section.id}
                  type="button"
                  data-ocid={`admin.navigate.${i + 1}`}
                  onClick={() => handleNavigate(section.id)}
                  className="py-2 px-3 text-left border border-[rgba(0,255,136,0.2)] text-white/60 font-mono text-[10px] tracking-wider uppercase hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-200 rounded"
                >
                  {String(i + 1).padStart(2, "0")} {section.label}
                </button>
              ))}
            </div>

            <div className="h-px w-full bg-[rgba(0,255,136,0.1)] my-3" />

            <button
              type="button"
              data-ocid="admin.products_button"
              onClick={() => handleNavigate("products")}
              className="w-full py-3 bg-[#00ff88] text-black font-mono text-xs tracking-widest uppercase hover:shadow-glow-sm transition-all duration-200 rounded"
            >
              MANAGE PRODUCTS →
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
