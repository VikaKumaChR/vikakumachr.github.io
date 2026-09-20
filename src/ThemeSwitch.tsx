import { Switch } from "@fluentui/react-components";
import { useId } from "react";
import "./ThemeSwitch.css";

export function ThemeSwitch({ dark, label, onChange }: { dark: boolean; label: string; onChange: (dark: boolean) => void }) {
  const moonMask = useId();
  return (
    <Switch
      className="theme-switch"
      checked={dark}
      aria-label={label}
      onChange={(_, data) => onChange(data.checked)}
      indicator={{ children: (
        <span className="theme-switch-thumb" aria-hidden="true">
          <svg viewBox="0 0 12 12" focusable="false">
            <defs>
              <mask id={moonMask} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                <rect width="12" height="12" fill="white" />
                <circle className="theme-moon-cutout" cx="6" cy="6" r="5.5" fill="black" />
              </mask>
            </defs>
            <circle cx="6" cy="6" r="6" fill="currentColor" mask={`url(#${moonMask})`} />
          </svg>
        </span>
      ) }}
    />
  );
}
