import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";

// Keep each palette intact throughout the reveal; cross-fading black and white
// text against inverse backgrounds makes both disappear at the midpoint.
export function useThemeTransition() {
  const active = useRef<ViewTransition | null>(null);
  const sequence = useRef(0);
  useEffect(() => () => { sequence.current++; active.current?.skipTransition(); }, []);

  return (update: () => void) => {
    const id = ++sequence.current;
    active.current?.skipTransition();
    const root = document.documentElement;
    const apply = () => { if (sequence.current === id) flushSync(update); };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete root.dataset.themeTransition;
      apply();
      return;
    }
    const rect = document.querySelector(".theme-switch")?.getBoundingClientRect();
    const x = rect ? rect.x + rect.width / 2 : innerWidth;
    const y = rect ? rect.y + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const style = getComputedStyle(root);
    const duration = parseFloat(style.getPropertyValue("--theme-duration"));
    const easing = style.getPropertyValue("--ease-in-out").trim();
    root.dataset.themeTransition = "true";
    const transition = document.startViewTransition(apply);
    active.current = transition;
    void transition.ready.then(() => {
      if (id !== sequence.current) return;
      root.animate([
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
      ], { duration, easing, fill: "both", pseudoElement: "::view-transition-new(root)" });
    }).catch(() => { /* Interrupted transitions still apply the latest state. */ });
    void transition.finished.finally(() => {
      if (id === sequence.current) {
        delete root.dataset.themeTransition;
        active.current = null;
      }
    });
  };
}
