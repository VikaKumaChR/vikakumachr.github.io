import type { PointerEvent } from "react";

// Hover feedback stays within the icon; the entry card never lifts or scales.
export function previewEntryIcon(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  animateEntryIcon(event.currentTarget, 560);
}

export function animateEntryIcon(entry: HTMLElement, duration = 240) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const easing = getComputedStyle(document.documentElement).getPropertyValue("--ease-in-out").trim();
  entry.querySelectorAll<SVGElement>("[data-icon-motion]").forEach(part => {
    const current = getComputedStyle(part).transform;
    part.getAnimations().forEach(animation => animation.cancel());
    part.animate([
      { transform: current, easing },
      { transform: part.dataset.iconMotion, offset: 0.45, easing },
      { transform: "none" },
    ], { duration });
  });
}
