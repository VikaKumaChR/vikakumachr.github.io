import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type KeyboardEvent, type MouseEvent } from "react";

const duration = 240;
const easing = "cubic-bezier(0.77, 0, 0.175, 1)";
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Keep one selection for arrows, dots, cards, keyboard, wheel and touch.
// Capture visible positions before reordering; FLIP makes previous/next travel
// in opposite directions instead of always teleporting the chosen card left.
export function useAlbumNavigation(count: number) {
  const [selection, setSelection] = useState({ index: 0, direction: 1 });
  const current = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const before = useRef(new Map<string, DOMRect>());
  const animations = useRef<Animation[]>([]);
  const gesture = useRef<{ x: number; y: number; dx: number; dragging: boolean } | null>(null);
  const suppressClickUntil = useRef(0);
  const navigate = useRef<(index: number, direction?: number) => void>(() => {});

  const select = (index: number, direction = Math.sign(index - current.current)) => {
    const next = (index + count) % count;
    if (next === current.current) return;
    before.current = new Map(Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-chart-id]") ?? [])
      .map(card => [card.dataset.chartId!, card.getBoundingClientRect()]));
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    if (trackRef.current) trackRef.current.style.transform = "";
    current.current = next;
    setSelection({ index: next, direction: direction || 1 });
  };
  const previous = () => select(current.current - 1, -1);
  const next = () => select(current.current + 1, 1);

  useLayoutEffect(() => { navigate.current = select; });

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || !before.current.size) return;
    if (track.contains(document.activeElement)) {
      track.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus({ preventScroll: true });
    }
    viewport.scrollLeft = 0;
    const viewportWidth = viewport.clientWidth;
    if (!reduceMotion()) {
      animations.current = Array.from(track.querySelectorAll<HTMLElement>("[data-chart-id]")).map(card => {
        const old = before.current.get(card.dataset.chartId!)!;
        const target = card.getBoundingClientRect();
        let dx = old.left - target.left;
        let scale = old.width / target.width;
        // Wrapped cards enter from the edge matching the requested direction.
        if ((selection.direction > 0 && dx < -1) || (selection.direction < 0 && dx > 1)) {
          dx = selection.direction * (viewportWidth + 12);
          scale = 1;
        }
        return card.animate([
          { transform: `translateX(${dx}px) scaleX(${scale})` },
          { transform: "translateX(0) scaleX(1)" },
        ], { duration, easing });
      });
    }
    before.current.clear();
  }, [selection]);

  const resetDrag = () => {
    const track = trackRef.current;
    if (!track) return;
    const transform = track.style.transform || "translateX(0)";
    track.style.transform = "";
    if (!reduceMotion()) animations.current.push(track.animate([{ transform }, { transform: "translateX(0)" }], { duration, easing }));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { x: event.clientX, y: event.clientY, dx: 0, dragging: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
      gesture.current = null;
      return;
    }
    if (!start.dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      start.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!start.dragging) return;
    start.dx = dx;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dx * 0.45}px)`;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (start?.dragging) {
      suppressClickUntil.current = Date.now() + 350;
      if (Math.abs(start.dx) >= 40) start.dx < 0 ? next() : previous();
      else resetDrag();
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onPointerCancel = () => { gesture.current = null; resetDrag(); };
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (Date.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.key === "ArrowLeft" ? previous() : next();
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    let accumulated = 0;
    let lastWheel = 0;
    let lastNavigation = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || event.ctrlKey) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastWheel > 160) accumulated = 0;
      lastWheel = now;
      if (now - lastNavigation < duration) return;
      accumulated += event.deltaX;
      if (Math.abs(accumulated) >= 40) {
        const direction = Math.sign(accumulated);
        navigate.current(current.current + direction, direction);
        accumulated = 0;
        lastNavigation = now;
      }
    };
    viewport?.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport?.removeEventListener("wheel", onWheel);
      animations.current.forEach(animation => animation.cancel());
    };
  }, []);

  return { selectedIndex: selection.index, direction: selection.direction, viewportRef, trackRef, select, previous, next,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onClickCapture, onKeyDown } };
}
