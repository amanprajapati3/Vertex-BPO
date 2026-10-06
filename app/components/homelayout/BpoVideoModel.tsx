"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface BpoVideoModalProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

export default function BpoVideoModal({ open, url, onClose }: BpoVideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const src = `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#E10600] text-white transition-colors hover:bg-[#b80500]"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            src={src}
            title="Video player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}