"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Nu afișa dacă deja e instalată sau pe iOS (care nu suportă beforeinstallprompt)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error - iOS specific
      window.navigator.standalone === true;

    if (isStandalone) return;

    // Nu afișa dacă user-ul a respins recent (24h)
    const dismissedAt = localStorage.getItem("pwa-install-dismissed");
    if (dismissedAt) {
      const diff = Date.now() - parseInt(dismissedAt);
      if (diff < 24 * 60 * 60 * 1000) return; // 24 ore
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Arată bannerul după 3 secunde
      setTimeout(() => setShow(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  if (!show || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-4 duration-500"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
    >
      <div
        style={{
          background: "oklch(0.16 0 0 / 0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid oklch(0.30 0 0 / 0.6)",
          borderRadius: "20px",
          boxShadow: "0 -4px 40px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.84 0.18 80 / 0.1)",
        }}
        className="flex items-center gap-3 p-4"
      >
        {/* Icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            overflow: "hidden",
            flexShrink: 0,
            border: "1px solid oklch(0.84 0.18 80 / 0.3)",
          }}
        >
          <Image
            src="/icons/icon-192x192.png"
            alt="BarberApp"
            width={52}
            height={52}
            style={{ borderRadius: 14 }}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "oklch(0.98 0 0)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Instalează BarberApp
          </p>
          <p
            style={{
              fontSize: 12,
              color: "oklch(0.65 0 0)",
              margin: "2px 0 0",
              lineHeight: 1.4,
            }}
          >
            Adaugă pe ecranul principal pentru acces rapid
          </p>
        </div>

        {/* Install button */}
        <button
          onClick={handleInstall}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 12,
            background: "oklch(0.84 0.18 80)",
            color: "oklch(0.12 0 0)",
            fontSize: 13,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <Download size={14} />
          Instalează
        </button>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "oklch(0.22 0 0)",
            border: "none",
            cursor: "pointer",
            color: "oklch(0.60 0 0)",
            flexShrink: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
