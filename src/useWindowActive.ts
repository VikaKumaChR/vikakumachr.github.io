import { useEffect, useState } from "react";

export function useWindowActive() {
  const [active, setActive] = useState(() => document.hasFocus() && !document.hidden);
  useEffect(() => {
    const update = () => setActive(document.hasFocus() && !document.hidden);
    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return active;
}
