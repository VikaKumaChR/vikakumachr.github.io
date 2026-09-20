import { useLayoutEffect, useRef } from "react";
import "./NavigationIndicator.css";

// Web adaptation of WinUI NavigationView::PlayIndicatorAnimations:
// https://github.com/microsoft/microsoft-ui-xaml/blob/b806c885762ea4a1b14bb996c20b0510b8d2f459/controls/dev/NavigationView/NavigationView.cpp
// Its first third stretches toward the destination; the remaining two thirds
// contract the trailing edge. These are Fluent's accelerate/decelerate-max curves.
const duration = 600;
const stretchEnd = 1 / 3;

export function NavigationIndicator({ selectedValue }: { selectedValue: string }) {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const positioned = useRef(false);
  const alignRef = useRef<(animate: boolean) => void>(() => {});

  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const list = indicator?.parentElement;
    if (!indicator || !list) return;

    const align = (animate: boolean) => {
      // Fluent's context subscribers can commit aria-selected after this sibling's
      // layout effect. Use the requested value so the indicator never lags a click.
      const target = Array.from(list.querySelectorAll<HTMLElement>(".fui-Tab"))
        .find(tab => tab.getAttribute("aria-controls") === selectedValue);
      const listRect = list.getBoundingClientRect();
      if (!target || !listRect.width) {
        animationRef.current?.cancel();
        indicator.style.visibility = "hidden";
        positioned.current = false;
        return;
      }
      // Follow the label, independently of the tab's accessible hit area.
      const targetRect = (target.querySelector<HTMLElement>(".fui-Tab__content") ?? target).getBoundingClientRect();
      const toLeft = targetRect.left - listRect.left;
      const toRight = listRect.width - (targetRect.right - listRect.left);
      const clip = (left: number, right: number) => `inset(0px ${right}px 0px ${left}px round 1.5px)`;
      const finalClip = clip(toLeft, toRight);
      // Read the currently painted shape BEFORE canceling: rapid reversals must
      // continue here, not restart at the last tab's final position.
      const currentClip = getComputedStyle(indicator).clipPath;
      // Browsers shorten equal CSS insets to one/two/three values (the middle tab
      // commonly has equal left/right insets), so accept every shorthand form.
      const edges = currentClip.startsWith("inset(")
        ? currentClip.slice(6).split(" round ")[0].replace(")", "").trim().split(/\s+/).map(Number.parseFloat)
        : null;
      animationRef.current?.cancel();
      animationRef.current = null;
      indicator.style.clipPath = finalClip;
      indicator.style.visibility = "visible";
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (animate && positioned.current && edges && !reduceMotion) {
        const fromRight = edges[1] ?? edges[0];
        const fromLeft = edges[3] ?? edges[1] ?? edges[0];
        if (Math.abs(fromLeft - toLeft) + Math.abs(fromRight - toRight) > 0.5) {
          const style = getComputedStyle(list);
          const stretchCurve = style.getPropertyValue("--curveAccelerateMax").trim();
          const contractCurve = style.getPropertyValue("--curveDecelerateMax").trim();
          animationRef.current = indicator.animate([
            { clipPath: currentClip, offset: 0, easing: stretchCurve },
            { clipPath: clip(Math.min(fromLeft, toLeft), Math.min(fromRight, toRight)), offset: stretchEnd, easing: contractCurve },
            { clipPath: finalClip, offset: 1 },
          ], { duration, easing: "linear" });
        }
      }
      positioned.current = true;
    };
    alignRef.current = align;
    align(true);
  }, [selectedValue]);

  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const list = indicator?.parentElement;
    if (!indicator || !list) return;
    const geometry = () => [list, ...list.querySelectorAll(".fui-Tab")].map(element => {
      const rect = element.getBoundingClientRect();
      return `${rect.left}:${rect.width}:${rect.height}`;
    }).join("|");
    let previousGeometry = geometry();
    const onResize = () => {
      const nextGeometry = geometry();
      if (nextGeometry !== previousGeometry) {
        previousGeometry = nextGeometry;
        alignRef.current(false);
      }
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(list);
    list.querySelectorAll(".fui-Tab").forEach(tab => observer.observe(tab));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => alignRef.current(false);
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      animationRef.current?.cancel();
      positioned.current = false;
    };
  }, []);

  return <span ref={indicatorRef} className="navigation-selection-indicator" aria-hidden="true" />;
}
