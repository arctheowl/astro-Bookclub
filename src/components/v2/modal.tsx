import { useEffect, useRef, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import SkeletonLoader from "./SkeletonLoader";

type Props = {
  title: string;
  image: string;
  author: string;
  desc: string;
  month: string;
  year: string;
  rating: number;
  close: (v: boolean) => void;
};

export default function Modal({ title, image, author, desc, month, year, rating, close }: Props) {
  const [exiting, setExiting] = useState(false);
  const panelRef   = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // Esc key + body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, []);

  // Swipe-down-to-dismiss (mobile bottom sheet only).
  // Uses imperative non-passive listeners so preventDefault works,
  // preventing the page behind from scrolling during the drag.
  useEffect(() => {
    const panel    = panelRef.current;
    const scrollEl = scrollRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !scrollEl || !backdrop) return;

    let startY = 0;
    let dragY  = 0;
    let active = false;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      dragY  = 0;
      active = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientY - startY;
      // Only activate when already scrolled to the top and pulling down
      if (scrollEl.scrollTop === 0 && delta > 0) {
        active = true;
        dragY  = delta;
        panel.style.transition   = "none";
        panel.style.transform    = `translateY(${delta}px)`;
        // Fade backdrop proportionally as the sheet moves away
        backdrop.style.opacity   = String(Math.max(0.2, 1 - delta / 220));
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      if (!active) return;
      active = false;

      if (dragY > 80) {
        // Enough drag — animate out from current position then unmount
        panel.style.transition    = "transform 0.28s cubic-bezier(0.4, 0, 1, 1)";
        panel.style.transform     = "translateY(100%)";
        backdrop.style.transition = "opacity 0.28s ease-in";
        backdrop.style.opacity    = "0";
        setTimeout(() => close(false), 280);
      } else {
        // Not enough — spring back
        panel.style.transition    = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
        panel.style.transform     = "translateY(0)";
        backdrop.style.transition = "opacity 0.35s ease-out";
        backdrop.style.opacity    = "";   // let CSS animation fill value take over
      }
    };

    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchmove",  onTouchMove,  { passive: false });
    panel.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchmove",  onTouchMove);
      panel.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => close(false), 300);
  };

  const exitCls = exiting ? " book-detail-exiting" : "";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={"book-detail-backdrop" + exitCls + " absolute inset-0"}
        style={{ background: "oklch(12% 0.015 50 / 0.68)" }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={"book-detail-panel" + exitCls + " relative z-10 bg-paper w-full overflow-hidden rounded-t-[22px] md:rounded-2xl md:max-w-2xl md:mx-4 flex flex-col"}
        style={{ maxHeight: "92dvh" }}
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0 md:hidden">
          <div className="w-9 h-1 rounded-full bg-sand" />
        </div>

        {/* Content area — scrollable on mobile, side-by-side on desktop */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto md:flex md:overflow-hidden"
        >
          {/* Cover — padded, maintains 2:3 aspect ratio */}
          <div className="flex-shrink-0 flex items-center justify-center bg-parchment p-5 md:w-[38%] md:p-6">
            <div
              className="w-[45%] md:w-full rounded-xl overflow-hidden"
              style={{ aspectRatio: "2 / 3" }}
            >
              <SkeletonLoader
                src={image}
                alt={`Cover of ${title}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="p-6 pb-10 md:p-8 md:flex-1 md:overflow-y-auto">
            {rating > 1 && (
              <div className="flex items-center gap-1.5 mb-5">
                <BsStarFill
                  style={{ color: "oklch(40% 0.1 30)", width: "0.9rem", height: "0.9rem" }}
                />
                <span
                  className="font-sans text-sm font-medium"
                  style={{ color: "oklch(40% 0.1 30)" }}
                >
                  {rating}
                </span>
              </div>
            )}

            <h2
              className="font-serif text-ink leading-snug mb-2"
              style={{ fontSize: "clamp(1.4rem, 5vw, 1.9rem)" }}
            >
              {title}
            </h2>

            <p
              className="font-sans font-medium mb-1"
              style={{ color: "oklch(40% 0.1 30)", fontSize: "0.95rem" }}
            >
              {author}
            </p>

            <p
              className="font-sans mb-6"
              style={{ color: "oklch(48% 0.02 50)", fontSize: "0.82rem" }}
            >
              {month} {year}
            </p>

            <p
              className="font-sans text-ink leading-relaxed whitespace-pre-line"
              style={{ fontSize: "0.95rem" }}
            >
              {desc}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-parchment"
          style={{
            width: "2rem",
            height: "2rem",
            background: "oklch(93% 0.01 58)",
            color: "oklch(48% 0.02 50)",
          }}
          aria-label="Close"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="10" y2="10" />
            <line x1="10" y1="1" x2="1"  y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
