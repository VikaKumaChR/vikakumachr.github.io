import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const sectionIds = ["hero", "charts", "blog", "regulation"] as const;
type SectionId = typeof sectionIds[number];
const isSection = (value: string): value is SectionId => sectionIds.some(id => id === value);

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const headerRef = useRef<HTMLElement>(null);
  const pendingSection = useRef<SectionId | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const interactionCount = useRef(0);

  const updateActiveSection = useCallback(() => {
    if (pendingSection.current) return;
    const marker = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 32;
    const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
    const current = atBottom ? "regulation" : sectionIds.filter(id => {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      return top !== undefined && top <= marker;
    }).at(-1) ?? "hero";
    setActiveSection(current);
  }, []);

  const finishNavigation = useCallback(() => {
    clearTimeout(settleTimer.current);
    pendingSection.current = null;
    updateActiveSection();
  }, [updateActiveSection]);

  const navigateToSection = useCallback((section: SectionId, updateHistory = true, instant = false) => {
    const target = document.getElementById(section);
    if (!target) return;
    interactionCount.current++;
    clearTimeout(settleTimer.current);
    pendingSection.current = section;
    setActiveSection(section);
    // Repeated activation must scroll even when the URL already has this hash.
    if (updateHistory && window.location.hash !== `#${section}`) {
      window.history.pushState(null, "", `#${section}`);
    }
    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
    const top = section === "hero" ? 0 : Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 16);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: instant || reduceMotion ? "instant" : "smooth" });
    // Also settles when already at the target and no scroll event is emitted.
    settleTimer.current = setTimeout(finishNavigation, 160);
  }, [finishNavigation]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => document.documentElement.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
      if (pendingSection.current) {
        clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(finishNavigation, 160);
      }
    };
    const onManualScroll = () => {
      interactionCount.current++;
      finishNavigation();
    };
    const onKey = (event: KeyboardEvent) => {
      if (["PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", " "].includes(event.key)) onManualScroll();
    };
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (isSection(id)) navigateToSection(id, false, true);
    };
    const initialHash = window.location.hash.slice(1);
    document.fonts.ready.then(() => {
      if (!disposed && interactionCount.current === 0 && isSection(initialHash)) navigateToSection(initialHash, false, true);
    });
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", onManualScroll, { passive: true });
    window.addEventListener("touchstart", onManualScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", onManualScroll);
      window.removeEventListener("touchstart", onManualScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [finishNavigation, navigateToSection, updateActiveSection]);

  return { activeSection, headerRef, navigateToSection };
}
