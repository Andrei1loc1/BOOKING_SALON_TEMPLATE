"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error - iOS specific
      window.navigator.standalone === true;

    if (isStandalone) return;

    const dismissedAt = localStorage.getItem("pwa-install-dismissed");
    if (dismissedAt) {
      const diff = Date.now() - parseInt(dismissedAt);
      if (diff < 24 * 60 * 60 * 1000) return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
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
      {/* Gold gradient border wrapper — exact modal style */}
      <div
        className="relative rounded-3xl p-[1px]"
        style={{
          background: "linear-gradient(135deg, oklch(0.84 0.18 80) 0%, transparent 35%, transparent 65%, oklch(0.55 0.15 72) 100%)",
        }}
      >
        <div className="relative rounded-[calc(1.5rem-1px)] p-4 flex items-center gap-3" style={{ background: "oklch(0.14 0 0)" }}>

          {/* App icon */}
          <div className="rounded-2xl overflow-hidden shrink-0" style={{ border: "1px solid oklch(0.84 0.18 80 / 0.25)" }}>
            <Image
              src="/icons/icon_app.png"
              alt="BarberApp"
              width={46}
              height={46}
            />
          </div>

          {/* Title */}
          <p className="flex-1 text-sm font-bold text-gold-gradient">
            Instalează BarberApp
          </p>

          {/* Install button */}
          <Button
            size="sm"
            className="shrink-0 !bg-[linear-gradient(to_right,oklch(0.55_0.15_72),var(--color-gold-light),oklch(0.55_0.15_72))] text-black font-bold hover:opacity-90"
            onClick={handleInstall}
          >
            <Download />
            Instalează
          </Button>

          {/* Dismiss */}
          <Button
            size="icon-sm"
            variant="ghost"
            className="shrink-0 text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            onClick={handleDismiss}
          >
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}
