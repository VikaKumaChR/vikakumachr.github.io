import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";

type Options = {
  selectedIndex: number;
  count: number;
  next: () => void;
  blocked?: boolean;
};

export const GALLERY_INTERVAL = 6000;

/** Auto-advance only while visible; hand control to the visitor on interaction. */
export function useGalleryAutoplay({ selectedIndex, count, next, blocked = false }: Options) {
  const regionRef = useRef<HTMLDivElement>(null);
  const advance = useRef(next);
  const [playing, setPlaying] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [hovered, setHovered] = useState(false);
  useLayoutEffect(() => { advance.current = next; });

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const preferenceChanged = () => { if (query.matches) setPlaying(false); };
    const visibilityChanged = () => setHidden(document.hidden);
    query.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25);
    }, { threshold: [0, 0.25] });
    if (regionRef.current) observer.observe(regionRef.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
    };
  }, []);

  const running = playing && visible && !hidden && !blocked && !hovered && count > 1;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => advance.current(), GALLERY_INTERVAL);
    return () => clearTimeout(timer);
  }, [running, selectedIndex]);

  return {
    regionRef, playing, running,
    handlers: {
      onPointerEnter: (event: PointerEvent<HTMLDivElement>) => { if (event.pointerType !== "touch") setHovered(true); },
      onPointerLeave: () => setHovered(false),
      // Do not restart after a click, swipe or keyboard entry into the gallery.
      onPointerDownCapture: () => setPlaying(false),
      onFocusCapture: () => setPlaying(false),
    },
  };
}
