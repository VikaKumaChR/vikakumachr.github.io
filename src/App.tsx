import { useEffect, useLayoutEffect, useState, type CSSProperties, type MouseEvent, type ReactElement } from "react";
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  FluentProvider,
  Link,
  Subtitle1,
  Tab,
  TabList,
  Text,
  Toast,
  Toaster,
  ToastTitle,
  Tooltip,
  useToastController,
  Title1,
  Title2,
  Title3,
  createDarkTheme,
  createLightTheme,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  type BrandVariants,
  type Theme,
} from "@fluentui/react-components";
import {
  ArrowUp24Regular,
  ArrowUpRight24Regular,
  GlobeShield24Regular,
  Share24Regular,
} from "@fluentui/react-icons";
import { FluentNamedIcon } from "./FluentNamedIcon";
import { BrandIcon } from "./BrandIcon";
import { ThemeSwitch } from "./ThemeSwitch";
import { useAlbumNavigation } from "./useAlbumNavigation";
import { AlbumNavigation } from "./AlbumNavigation";
import { animateEntryIcon, previewEntryIcon } from "./animateEntryIcon";
import { useThemeTransition } from "./useThemeTransition";
import { useSectionNavigation } from "./useSectionNavigation";
import { NavigationIndicator } from "./NavigationIndicator";
import { HeroPhotoNotes, HeroHomeFrame, HeroFigureBackdrop } from "./HeroScrapbook";
import characterCollage from "../Image/LifeFourCuts.png";

import characterPortrait from "../Image/VikaKumaChR_Stand.png";
import characterScene from "../Image/VikaKumaChR_Scene.png";
import heroFigurePlaceholder from "../Image/hero_figure_placeholder.png";
import brandAvatar from "../Image/BrandAvatar.png";

// 首頁半身立繪替換入口：把上方 import 指向你的透明 PNG，再讓 heroFigure 使用它。
const heroFigure = heroFigurePlaceholder;

const getIsMobileDevice = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(userAgent);
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.matchMedia("(max-width: 1023px)").matches;

  return mobileUserAgent || narrowViewport || (coarsePointer && window.innerWidth <= 900);
};

const brandRamp: BrandVariants = {
  10: "#07050c",
  20: "#171221",
  30: "#292036",
  40: "#3a304b",
  50: "#4b4060",
  60: "#5d5178",
  70: "#716590",
  80: "#877aa8",
  90: "#9d91bf",
  100: "#b4aad4",
  110: "#c6bae0",
  120: "#d2c7e7",
  130: "#ded5ef",
  140: "#e9e4f6",
  150: "#f4f1fb",
  160: "#fbfaff",
};

const lightTheme: Theme = {
  ...createLightTheme(brandRamp),
  fontFamilyBase: "var(--font-serif)",
  fontFamilyNumeric: "var(--font-serif)",
  colorBrandBackground: "#c6bae0",
  colorBrandBackgroundHover: "#b4aad4",
  colorBrandBackgroundPressed: "#9d91bf",
  colorNeutralForegroundOnBrand: "#24202e",
  colorBrandForeground1: "#5d5178",
  colorBrandForeground2: "#716590",
  colorBrandStroke1: "#9d91bf",
  borderRadiusMedium: "8px",
  borderRadiusLarge: "8px",
};

const darkTheme: Theme = {
  ...createDarkTheme(brandRamp),
  fontFamilyBase: "var(--font-serif)",
  fontFamilyNumeric: "var(--font-serif)",
  colorBrandBackground: "#c6bae0",
  colorBrandBackgroundHover: "#d2c7e7",
  colorBrandBackgroundPressed: "#b4aad4",
  colorNeutralForegroundOnBrand: "#24202e",
  colorBrandForeground1: "#ded5ef",
  colorBrandForeground2: "#d2c7e7",
  colorBrandStroke1: "#c6bae0",
  borderRadiusMedium: "8px",
  borderRadiusLarge: "8px",
};

const useStyles = makeStyles({
  shell: {
    minHeight: "100vh",
    // Clip decorations without creating a scroll container that breaks the mobile sticky header.
    overflowX: "clip",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  header: {
    position: "fixed",
    zIndex: 20,
    top: 0,
    right: 0,
    left: 0,
    minHeight: "72px",
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) auto minmax(160px, 1fr)",
    alignItems: "center",
    columnGap: "24px",
    padding: "12px var(--page-gutter)",
    backgroundColor: "color-mix(in srgb, var(--colorNeutralBackground1) 88%, transparent)",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backdropFilter: "blur(22px) saturate(1.18)",
    "@media (max-width: 1023px)": {
      position: "sticky",
      gridTemplateColumns: "1fr auto",
      rowGap: "10px",
    },
  },
  brand: {
    justifySelf: "start",
    display: "inline-flex",
    alignItems: "center",
    columnGap: "12px",
    minWidth: 0,
    color: tokens.colorNeutralForeground1,
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "none" },
    ":active": { textDecorationLine: "none" },
    ":focus-visible": { textDecorationLine: "none" },
  },
  brandMark: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    overflow: "visible",
    borderRadius: 0,
    backgroundColor: "transparent",
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightBold,
  },
  brandAvatar: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "contain",
  },
  brandCopy: {
    display: "grid",
    minWidth: 0,
    gap: tokens.spacingVerticalXXS,
    "@media (max-width: 540px)": {
      display: "none",
    },
  },
  brandName: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    whiteSpace: "nowrap",
  },
  brandMeta: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: "nowrap",
  },
  nav: {
    justifySelf: "center",
    "@media (max-width: 1023px)": {
      order: 3,
      gridColumn: "1 / -1",
      width: "100%",
    },
  },
  navTabs: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXXL,
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 1023px)": {
      order: 3,
      gridColumn: "1 / -1",
      width: "100%",
      justifyContent: "center",
      columnGap: tokens.spacingHorizontalL,
    },
    "@media (max-width: 430px)": {
      justifyContent: "space-between",
      columnGap: "8px",
    },
  },
  navLink: {
    minWidth: "44px",
    minHeight: "44px",
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalSNudge),
    // NavigationIndicator owns the single WinUI-style stretch/contract underline.
    // Keep TabList's selection and keyboard behavior, not its per-tab sliding lines.
    "::after": { display: "none" },
    "&::before, &:hover::before, &:active::before": { display: "none" },
    "&:hover, &:active": { backgroundColor: "transparent" },
    "& .fui-Tab__content": { fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit" },
    "&[data-fui-focus-visible]": {
      boxShadow: "none", outline: `2px solid ${tokens.colorBrandStroke1}`, outlineOffset: "2px",
    },
  },
  headerActions: {
    justifySelf: "end",
    display: "inline-grid",
    gridAutoFlow: "column",
    gridAutoColumns: "var(--toolbar-target-size)",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 430px)": {
      gap: tokens.spacingHorizontalS,
    },
  },
  actionButton: {
    minWidth: "var(--toolbar-target-size)",
    width: "var(--toolbar-target-size)",
    height: "var(--toolbar-target-size)",
    borderRadius: "50%",
    backgroundColor: "transparent",
    boxShadow: "none",
    color: tokens.colorNeutralForeground2,
    "& .fui-Button__icon": {
      width: "24px",
      height: "24px",
      fontSize: "24px",
      color: "inherit",
    },
    ":hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: tokens.colorBrandForeground1,
    },
    ":hover:active": {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: tokens.colorBrandForeground2,
    },
    ":active:focus-visible": {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: tokens.colorBrandForeground2,
    },
    "&[data-fui-focus-visible]": {
      boxShadow: "none",
      ...shorthands.borderColor("transparent"),
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "2px",
    },
    "&[data-fui-focus-visible]:hover": {
      boxShadow: "none",
      ...shorthands.borderColor("transparent"),
    },
  },
  hero: {
    position: "relative",
    minHeight: "clamp(720px, 92vh, 880px)",
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    isolation: "isolate",
    scrollMarginTop: "0px",
    padding: "120px 48px 48px",
    backgroundColor: "var(--heroBase)",
    backgroundImage:
      "radial-gradient(ellipse at 72% 38%, var(--heroWarmGlow), transparent 64%), radial-gradient(ellipse at 12% 72%, var(--heroCoolGlow), transparent 60%), linear-gradient(180deg, var(--heroBase), var(--heroPaper))",
    backgroundPosition: "center",
    ":before": {
      content: '""',
      position: "absolute",
      zIndex: 0,
      display: "none",
      top: "72px",
      right: 0,
      left: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, var(--heroLine) 16%, var(--heroLine) 84%, transparent)",
      opacity: 0.68,
    },
    ":after": {
      content: '""',
      position: "absolute",
      zIndex: 1,
      right: 0,
      bottom: 0,
      left: 0,
      height: "clamp(170px, 24vh, 250px)",
      background:
        "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--heroBase) 58%, transparent) 58%, var(--colorNeutralBackground1) 100%)",
      pointerEvents: "none",
    },
    "@media (max-width: 1023px)": {
      minHeight: "calc(100svh - 118px)",
      alignItems: "start",
      paddingTop: "clamp(28px, 5vw, 42px)",
      paddingRight: "clamp(18px, 4vw, 34px)",
      paddingBottom: "34px",
      paddingLeft: "clamp(18px, 4vw, 34px)",
    },
    "@media (max-width: 520px)": {
      minHeight: "calc(100svh - 112px)",
      paddingTop: "24px",
      paddingRight: "clamp(16px, 5vw, 22px)",
      paddingBottom: "24px",
      paddingLeft: "clamp(16px, 5vw, 22px)",
    },
  },
  heroTexture: {
    position: "absolute",
    zIndex: 0,
    left: "var(--heroTextureLeft, 0px)",
    top: "var(--heroTextureTop, 0px)",
    width: "var(--heroTextureWidth, 100%)",
    maxWidth: "none",
    height: "auto",
    pointerEvents: "none",
    userSelect: "none",
    filter: "var(--heroTextureFilter)",
    opacity: "var(--heroTextureOpacity)",
    maskImage: "radial-gradient(ellipse 34% 46% at 50% 48.5%, #000 60%, transparent 100%)",
  },
  mobileHeroTexture: {
    // Feather in both axes; a vertical-only fade leaves a visible lace band and side seam.
    maskImage: "radial-gradient(ellipse 38% 46% at 50% 48.5%, #000 60%, transparent 100%)",
  },
  mobileHero: {
    minHeight: "auto",
    "@media (max-width: 1023px)": { minHeight: "auto" },
    "@media (max-width: 520px)": { minHeight: "auto" },
    alignItems: "start",
    overflow: "hidden",
    padding: "26px clamp(18px, 5vw, 24px) max(28px, env(safe-area-inset-bottom))",
    ":before": {
      display: "none",
    },
    ":after": {
      zIndex: 1,
      height: "132px",
      background:
        "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--heroBase) 72%, transparent) 54%, var(--colorNeutralBackground1) 100%)",
    },
  },
  mobileHeroInner: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "520px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateAreas: `
      "copy"
      "art"
      "parts"
    `,
    alignItems: "end",
    rowGap: 0,
    "@media (max-width: 380px)": {
      rowGap: 0,
    },
  },
  mobileHeroCopy: {
    position: "relative",
    gridArea: "copy",
    zIndex: 8,
    display: "grid",
    gap: "14px",
    minWidth: 0,
    paddingTop: 0,
    marginBottom: "16px",
    "@media (max-width: 380px)": {
      marginBottom: "14px",
    },
  },
  mobileHeroTitle: {
    maxWidth: "100%",
    marginTop: 0,
    marginBottom: 0,
    color: "var(--hero-title-color)",
    fontSize: "clamp(2.125rem, 8.5vw, 2.75rem)",
    lineHeight: "1.16",
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "-0.015em",
    wordSpacing: "-0.08em",
    fontKerning: "normal",
    overflowWrap: "anywhere",
  },
  mobileHeroLead: {
    maxWidth: "100%",
    marginTop: 0,
    marginBottom: 0,
    color: "var(--hero-copy-color)",
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  mobileHeroScene: {
    position: "relative",
    gridArea: "art",
    zIndex: 4,
    justifySelf: "stretch",
    width: "100%",
    height: "clamp(248px, 61vw, 302px)",
    minHeight: 0,
    display: "grid",
    placeItems: "end center",
    overflow: "visible",
    isolation: "isolate",
    marginTop: 0,
    marginBottom: 0,
    ":after": {
      content: '""',
      position: "absolute",
      zIndex: 2,
      right: "12%",
      bottom: 0,
      left: "12%",
      height: "34px",
      borderRadius: "999px",
      background:
        "radial-gradient(ellipse at center, color-mix(in srgb, #c6bae0 22%, transparent) 0%, transparent 68%)",
      filter: "blur(10px)",
      pointerEvents: "none",
    },
    "@media (max-width: 380px)": {
      height: "clamp(238px, 68vw, 278px)",
      marginTop: 0,
    },
  },
  mobileGuideSheet: {
    position: "absolute",
    zIndex: 1,
    display: "none",
    left: "50%",
    bottom: "-2px",
    width: "clamp(258px, 68vw, 342px)",
    height: "auto",
    objectFit: "contain",
    opacity: 0.72,
    filter: "var(--heroGuideFilter)",
    transform: "translateX(-50%) rotate(-6deg)",
    transformOrigin: "center bottom",
    pointerEvents: "none",
    userSelect: "none",
  },
  mobileLaceHint: {
    position: "absolute",
    zIndex: 1,
    top: "-18px",
    right: "-66px",
    width: "188px",
    height: "auto",
    display: "none",
    opacity: "var(--heroLaceMobileOpacity)",
    filter: "var(--heroLaceFilter)",
    pointerEvents: "none",
    userSelect: "none",
  },
  mobileLifePanel: {
    position: "absolute",
    zIndex: 3,
    display: "none",
    width: "clamp(42px, 10vw, 58px)",
    height: "auto",
    objectFit: "contain",
    opacity: 0.58,
    filter: "saturate(0.9) drop-shadow(0 8px 14px rgba(82, 68, 111, 0.12))",
    pointerEvents: "none",
    userSelect: "none",
  },
  mobileLifePanelOne: {
    top: "2%",
    left: "18%",
    transform: "rotate(-7deg)",
  },
  mobileLifePanelTwo: {
    top: "6%",
    right: "9%",
    transform: "rotate(6deg)",
  },
  mobileLifePanelThree: {
    top: "48%",
    left: "13%",
    transform: "rotate(4deg)",
  },
  mobileLifePanelFour: {
    right: "11%",
    bottom: "18%",
    transform: "rotate(-5deg)",
  },
  mobileFigureFrame: {
    position: "relative",
    zIndex: 5,
    width: "clamp(190px, 52vw, 242px)",
    maxHeight: "100%",
    display: "grid",
    placeItems: "end center",
    lineHeight: 0,
    userSelect: "none",
  },
  mobileHeroArtImage: {
    width: "100%",
    maxHeight: "clamp(246px, 64vw, 298px)",
    objectFit: "contain",
    filter: "saturate(0.92) contrast(0.96) drop-shadow(0 4px 8px rgba(66, 52, 95, 0.12))",
  },
  mobilePartGrid: {
    position: "relative", gridArea: "parts", zIndex: 9, display: "grid",
    gap: "16px", marginTop: "-16px",
  },
  mobilePartButton: {
    minHeight: "104px", display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)",
    alignItems: "center", gap: "16px", padding: "24px",
    color: tokens.colorNeutralForeground1, textDecorationLine: "none",
    backgroundColor: tokens.colorNeutralBackground1, borderRadius: "22px",
    boxShadow: tokens.shadow4,
    touchAction: "manipulation", userSelect: "none",
    ":active": { backgroundColor: tokens.colorNeutralBackground1Pressed },
    ":focus-visible": { outline: `2px solid ${tokens.colorBrandStroke1}`, outlineOffset: "4px" },
  },
  mobilePartButtonIcon: {
    position: "relative",
    zIndex: 1,
    width: "48px",
    height: "48px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
    fontSize: "48px",
    lineHeight: 0,
    "& svg": {
      width: "48px",
      height: "48px",
    },
  },
  mobilePartButtonText: {
    position: "relative",
    zIndex: 1,
    minWidth: 0,
    display: "grid",
    gap: "4px",
  },
  mobilePartButtonTitle: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  mobilePartButtonCopy: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  heroInner: {
    position: "relative",
    zIndex: 2,
    width: "min(1240px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "center",
    columnGap: "48px",
    rowGap: 0,
    "@media (max-width: 980px)": {
      gridTemplateColumns: "1fr",
      gap: "22px",
    },
    "@media (max-width: 1023px)": {
      alignItems: "start",
      gap: "16px",
    },
    "@media (max-width: 520px)": {
      gap: "10px",
    },
  },
  heroScrapbookLayer: {
    position: "absolute",
    zIndex: 1,
    inset: "72px 0 0",
    overflow: "hidden",
    pointerEvents: "none",
    userSelect: "none",
  },
  scrapbookDots: {
    position: "absolute",
    width: "168px",
    height: "128px",
    backgroundImage: "radial-gradient(circle, rgba(113, 101, 144, 0.2) 1.4px, transparent 1.6px)",
    backgroundSize: "16px 16px",
    opacity: 0.46,
    mixBlendMode: "multiply",
  },
  scrapbookDotsOne: {
    top: "28%",
    left: "44%",
    transform: "rotate(4deg)",
    "@media (max-width: 980px)": {
      left: "66%",
    },
  },
  heroLaceDecor: {
    position: "absolute",
    zIndex: 0,
    display: "block",
    height: "auto",
    objectFit: "contain",
    opacity: "var(--heroLaceOpacity)",
    filter: "var(--heroLaceFilter)",
    pointerEvents: "none",
    userSelect: "none",
  },
  heroLaceTopRight: {
    top: 0,
    right: "-22px",
    width: "clamp(148px, 12vw, 216px)",
    transform: "rotate(0deg)",
    "@media (max-width: 1023px)": {
      top: 0,
      right: "-14px",
      width: "132px",
      opacity: "var(--heroLaceMobileOpacity)",
    },
  },
  heroGuideLeftEdge: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: "clamp(280px, 38vh, 360px)",
    width: "clamp(240px, 19vw, 334px)",
    height: "auto",
    display: "block",
    objectFit: "contain",
    opacity: "var(--heroGuideOpacity)",
    filter: "var(--heroGuideFilter)",
    mixBlendMode: "normal",
    WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)",
    maskImage: "linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)",
    pointerEvents: "none",
    userSelect: "none",
    "@media (max-width: 1023px)": {
      top: "clamp(228px, 30vh, 300px)",
      width: "clamp(205px, 32vw, 274px)",
      opacity: "var(--heroGuideMobileOpacity)",
    },
    "@media (max-width: 520px)": {
      top: "clamp(226px, 25vh, 252px)",
      width: "clamp(228px, 62vw, 266px)",
      left: "-62px",
    },
  },
  heroCopy: {
    display: "grid",
    gap: "24px",
    maxWidth: "560px",
    "@media (max-width: 520px)": {
      gap: "16px",
    },
  },
  heroTitle: {
    maxWidth: "100%",
    marginTop: 0,
    marginBottom: 0,
    // The brand wordmark has its own display composition, as on the Fluent homepage.
    color: "var(--hero-title-color)",
    fontSize: "clamp(3.5rem, 5.5vw, 5.75rem)",
    lineHeight: "1.16",
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "-0.015em",
    wordSpacing: "-0.08em",
    fontKerning: "normal",
    whiteSpace: "nowrap",
  },
  heroDescriptor: {
    margin: 0,
    color: "var(--hero-copy-color)",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular,
  },
  heroLead: {
    maxWidth: "38ch",
    color: "var(--hero-copy-color)",
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    "@media (max-width: 520px)": {
      maxWidth: "31ch",
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  heroArtStage: {
    position: "relative",
    minHeight: "clamp(400px, 54vh, 560px)",
    display: "grid",
    placeItems: "end center",
    overflow: "visible",
    isolation: "isolate",
    backgroundColor: "transparent",
    ":before": {
      content: '""',
      position: "absolute",
      zIndex: 0,
      right: "8%",
      bottom: "4%",
      left: "8%",
      height: "22%",
      borderRadius: "50%",
      background:
        "radial-gradient(ellipse at center, var(--figureShadow) 0, transparent 68%)",
      filter: "blur(18px)",
    },
    "@media (max-width: 980px)": {
      minHeight: "clamp(420px, 58vw, 520px)",
    },
    "@media (max-width: 1023px)": {
      width: "100%",
      minHeight: "clamp(276px, 60vw, 500px)",
      placeItems: "end center",
    },
    "@media (max-width: 520px)": {
      minHeight: "clamp(308px, 78vw, 356px)",
    },
    "@media (max-width: 520px) and (max-height: 860px)": {
      minHeight: "clamp(268px, 70vw, 316px)",
    },
  },
  heroArtBackdrop: {
    position: "absolute",
    zIndex: 0,
    inset: "8% 0 0",
    background:
      "radial-gradient(ellipse at 52% 34%, var(--figureLight) 0, transparent 58%)",
    pointerEvents: "none",
  },
  heroCollageLayer: {
    position: "absolute",
    zIndex: 2,
    inset: "4% 0 0",
    pointerEvents: "none",
    userSelect: "none",
    "@media (max-width: 1023px)": {
      inset: "0 4% 0",
      opacity: 0.68,
    },
    "@media (max-width: 640px)": {
      inset: "0",
      opacity: 0.56,
    },
    "@media (max-width: 520px)": {
      inset: "-2% -2% 0",
      opacity: 0.5,
    },
  },
  heroLifePanel: {
    position: "absolute",
    display: "block",
    width: "clamp(128px, 12vw, 176px)",
    height: "auto",
    objectFit: "contain",
    opacity: 0.78,
    mixBlendMode: "multiply",
    filter: "saturate(0.94) drop-shadow(0 18px 28px rgba(82, 68, 111, 0.16))",
    transformOrigin: "center",
    "@media (max-width: 1023px)": {
      width: "clamp(92px, 18vw, 140px)",
      opacity: 0.55,
    },
    "@media (max-width: 640px)": {
      width: "clamp(78px, 25vw, 112px)",
      opacity: 0.4,
    },
    "@media (max-width: 520px)": {
      width: "clamp(72px, 22vw, 96px)",
    },
  },
  heroLifePanelOne: {
    top: "10%",
    left: "1%",
    transform: "rotate(-8deg)",
    "@media (max-width: 1023px)": {
      top: "9%",
      left: "18%",
    },
    "@media (max-width: 640px)": {
      top: "12%",
      left: "8%",
    },
  },
  heroLifePanelTwo: {
    top: "7%",
    right: "-1%",
    transform: "rotate(7deg)",
    "@media (max-width: 1023px)": {
      top: "10%",
      right: "14%",
    },
    "@media (max-width: 640px)": {
      top: "18%",
      right: "8%",
    },
  },
  heroLifePanelThree: {
    top: "46%",
    left: "-8%",
    transform: "rotate(4deg)",
    "@media (max-width: 1023px)": {
      top: "44%",
      left: "14%",
    },
    "@media (max-width: 640px)": {
      top: "54%",
      left: "8%",
    },
  },
  heroLifePanelFour: {
    right: "-7%",
    bottom: "15%",
    transform: "rotate(-6deg)",
    "@media (max-width: 1023px)": {
      right: "15%",
      bottom: "18%",
    },
    "@media (max-width: 640px)": {
      right: "8%",
      bottom: "18%",
    },
  },
  heroFigureFrame: {
    position: "relative",
    zIndex: 3,
    width: "min(84%, 408px)",
    maxHeight: "560px",
    display: "grid",
    placeItems: "end center",
    lineHeight: 0,
    userSelect: "none",
    "@media (max-width: 980px)": {
      maxHeight: "480px",
    },
    "@media (max-width: 1023px)": {
      width: "min(52vw, 360px)",
      maxHeight: "clamp(350px, 54vh, 480px)",
    },
    "@media (max-width: 520px)": {
      width: "min(60vw, 252px)",
      maxHeight: "330px",
    },
    "@media (max-width: 520px) and (max-height: 860px)": {
      width: "min(56vw, 232px)",
      maxHeight: "300px",
    },
  },
  heroArtImage: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "auto",
    maxHeight: "inherit",
    minHeight: 0,
    display: "block",
    objectFit: "contain",
    objectPosition: "bottom center",
    filter: "saturate(0.96) contrast(0.98) drop-shadow(0 4px 8px rgba(66, 52, 95, 0.12))",
    mixBlendMode: "normal",
  },
  heroFigureGuard: {
    position: "absolute",
    zIndex: 2,
    inset: 0,
    backgroundColor: "transparent",
    cursor: "default",
    pointerEvents: "auto",
    userSelect: "none",
  },
  protectedImage: {
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitUserDrag: "none",
  },
  mediaGuard: {
    position: "absolute",
    zIndex: 1,
    inset: 0,
    backgroundColor: "transparent",
    cursor: "default",
    pointerEvents: "auto",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  partGrid: {
    gridColumn: "1 / -1", position: "relative", zIndex: 4,
    display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "24px", marginTop: "-24px",
  },
  partCard: {
    minHeight: "152px", display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)",
    alignItems: "center", gap: "24px", padding: "32px",
    color: tokens.colorNeutralForeground1, textDecorationLine: "none",
    backgroundColor: tokens.colorNeutralBackground1, borderRadius: "22px",
    boxShadow: tokens.shadow4,
    touchAction: "manipulation", userSelect: "none",
    ":active": { backgroundColor: tokens.colorNeutralBackground1Pressed },
    ":focus-visible": { outline: `2px solid ${tokens.colorBrandStroke1}`, outlineOffset: "4px" },
  },
  mobilePartCard: {
    minHeight: "96px",
    padding: "18px 20px",
    boxShadow: tokens.shadow2,
    transform: "none",
    ":hover": {
      transform: "none",
    },
  },
  partIcon: {
    width: "64px", height: "64px", display: "inline-flex", alignItems: "center",
    color: tokens.colorBrandForeground1, fontSize: "64px", lineHeight: 0,
  },
  partText: {
    position: "relative",
    zIndex: 1,
    minWidth: 0,
    display: "grid",
    gap: "6px",
  },
  partTitle: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "26px",
  },
  partCopy: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  section: {
    scrollMarginTop: "0px",
    padding: "64px 48px",
    "@media (max-width: 1023px)": { padding: "48px 24px" },
    "@media (max-width: 479px)": { padding: "32px 16px" },
  },
  sectionMuted: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sectionInner: {
    width: "min(1280px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
  },
  sectionHeading: {
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: "28px",
    marginBottom: "32px",
    "@media (max-width: 820px)": {
      alignItems: "start",
      flexDirection: "column",
    },
  },
  sectionTitleCluster: {
    display: "grid",
    gridTemplateColumns: `${tokens.fontSizeHero800} minmax(0, 1fr)`,
    columnGap: "12px",
    rowGap: "16px",
    alignItems: "center",
    maxWidth: "720px",
  },
  sectionTitleRow: {
    display: "contents",
  },
  sectionTitleText: {
    gridColumn: 2,
    marginTop: 0,
    marginBottom: 0,
    lineHeight: tokens.lineHeightHero800,
    fontSize: tokens.fontSizeHero800,
  },
  sectionTitleIcon: {
    gridColumn: 1,
    gridRow: 1,
    width: tokens.fontSizeHero800,
    height: tokens.fontSizeHero800,
    fontSize: tokens.fontSizeHero800,
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
    lineHeight: 0,
    "& svg": {
      width: "1em",
      height: "1em",
    },
  },
  headingCopy: {
    gridColumn: 2,
    marginTop: 0,
    marginBottom: 0,
    maxWidth: "62ch",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  chartHeadingCopy: {
    maxWidth: "54ch",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  albumShell: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "transparent",
    boxShadow: "none",
    ...shorthands.border("0", "solid", "transparent"),
  },
  albumViewport: {
    height: "clamp(316px, 30vw, 404px)",
    overflow: "hidden", touchAction: "pan-y pinch-zoom",
    "@media (max-width: 760px)": { height: "374px" },
    "@media (max-width: 520px)": { height: "332px" },
  },
  albumTrack: {
    display: "flex", alignItems: "stretch", justifyContent: "flex-start",
    gap: "12px", height: "100%", userSelect: "none",
  },
  albumCard: {
    position: "relative",
    order: "var(--albumOrder)",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "var(--albumBasis)",
    height: "100%",
    overflow: "hidden",
    borderRadius: "28px",
    color: "#fff",
    backgroundColor: "var(--imageSurface)",
    boxShadow: "none",
    transformOrigin: "left center",
    ...shorthands.border("0", "solid", "transparent"),
    cursor: "pointer",
    padding: 0,
    fontFamily: tokens.fontFamilyBase,
    textAlign: "left",
    ":focus-visible": {
      outline: `3px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "-3px",
    },
    "& [data-media-guard]": {
      cursor: "pointer",
    },
    "@media (max-width: 760px)": {
      flexBasis: "var(--albumMobileBasis)",
    },
    "@media (max-width: 520px)": {
      borderRadius: "24px",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "1ms",
    },
  },
  albumCardActive: {
    boxShadow: "none",
  },
  albumImage: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
  },
  albumOverlay: {
    position: "absolute",
    zIndex: 2,
    right: 0,
    bottom: 0,
    left: 0,
    display: "grid",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingHorizontalL,
    background: "linear-gradient(180deg, transparent, rgba(31, 24, 48, 0.78))",
    pointerEvents: "none",
  },
  albumMeta: {
    color: "rgba(255,255,255,0.82)",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
  },
  albumTitle: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    "@media (max-width: 520px)": { fontSize: tokens.fontSizeBase500, lineHeight: "26px" },
  },
  albumPanel: {
    width: "100%",
    marginTop: "16px",
    marginRight: 0,
    marginLeft: 0,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gap: "22px",
    alignItems: "center",
    padding: "4px 0 0",
    backgroundColor: "transparent",
    ...shorthands.borderTop("0", "solid", "transparent"),
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
    },
  },
  albumCaption: {
    display: "grid",
    gap: tokens.spacingVerticalS,
    "& h3": { margin: 0 },
  },

  blogGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    "@media (max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
  blogCard: {
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  blogPreview: {
    position: "relative",
    backgroundColor: "var(--imageSurface)",
  },
  blogImage: {
    width: "100%",
    aspectRatio: "16 / 9",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
  },
  blogBody: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
    "@media (max-width: 640px)": {
      padding: "24px",
    },
  },
  blogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  blogHeader: {
    alignItems: "center",
  },
  blogTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: tokens.fontSizeBase500,
    lineHeight: "26px",
  },
  blogMetaLine: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  blogDot: {
    color: tokens.colorNeutralForeground4,
  },
  cardCopy: {
    marginTop: 0,
    marginBottom: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },

  blogFooter: { marginTop: "auto", paddingTop: "16px" },
  blogReadButton: {
    minWidth: "80px", color: tokens.colorNeutralForegroundOnBrand, fontWeight: tokens.fontWeightSemibold,
  },
  linksSection: {
    paddingRight: "var(--page-gutter)",
    paddingLeft: "var(--page-gutter)",
    "@media (max-width: 1023px)": {
      paddingRight: "var(--page-gutter)", paddingLeft: "var(--page-gutter)",
    },
    "@media (max-width: 479px)": {
      paddingRight: "var(--page-gutter)", paddingLeft: "var(--page-gutter)",
    },
  },
  regulationGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 360px",
    gap: "48px",
    alignItems: "start",
    "@media (max-width: 1023px)": {
      gridTemplateColumns: "1fr",
    },
  },
  externalLinksCopy: {
    gridColumn: 2,
    marginTop: 0,
    marginBottom: 0,
    maxWidth: "62ch",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  externalLinks: {
    gridColumn: 2,
    display: "grid",
    width: "100%",
    maxWidth: "640px",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  externalLink: {
    display: "grid",
    gridTemplateColumns: "32px minmax(0, 1fr) 24px",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    minHeight: "60px",
    padding: "12px 4px",
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    textDecorationLine: "none",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    ":hover": {
      color: tokens.colorBrandForeground1,
      ...shorthands.borderBottom("1px", "solid", tokens.colorBrandStroke1),
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "4px",
      borderRadius: "4px",
    },
    "& svg": {
      flexShrink: 0,
      color: "inherit",
    },
  },
  platformIcon: { width: "24px", height: "24px", color: "inherit" },

  statementBody: {
    padding: "24px",
    "& h3": { margin: 0 },
    "& .fui-CardHeader": { marginBottom: tokens.spacingVerticalL },
  },
  statementList: {
    display: "grid",
    gap: "12px",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  statementItem: {
    display: "grid",
    gridTemplateColumns: "112px minmax(0, 1fr)",
    gap: "16px",
    paddingTop: "12px",
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 460px)": {
      gridTemplateColumns: "1fr",
      gap: "4px",
    },
  },
  statementTerm: {
    color: tokens.colorNeutralForeground2,
  },
  statementValue: {
    fontWeight: tokens.fontWeightSemibold,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    padding: "28px var(--page-gutter)",
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 540px)": {
      alignItems: "start",
      flexDirection: "column",
    },
  },

});

type Locale = "zh-TW" | "zh-CN";
type ChartId = "collage" | "portrait" | "scene";
type PartId = "charts" | "blog";
type SectionId = "hero" | "regulation" | PartId;
type PostImageId = "characterScene" | "characterCollage" | "characterPortrait";

type ChartCopy = {
  id: ChartId;
  title: string;
  meta: string;
  alt: string;
  summary: string;
  detail: string;
};

type PartCopy = {
  id: PartId;
  title: string;
  copy: string;
};

type BlogPostCopy = {
  image: PostImageId;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  readTime?: string;
};

type LocaleContent = {
  appTitle: string;
  htmlLang: string;
  brandMeta: string;
  navItems: readonly { id: SectionId; label: string }[];
  hero: {
    titleLine1: string;
    titleLine2: string;
    lead: string;
    artLabel: string;
    figureAlt: string;
    partLabel: string;
  };
  actions: {
    share: string;
    copied: string;
    shareText: string;
    themeToLight: string;
    themeToDark: string;
    languageTitle: string;
    languageCurrent: string;
    darkMode: string;
  };
  aria: {
    header: string;
    home: string;
    nav: string;
    actions: string;
  };
  sections: {
    chartsTitle: string;
    chartsCopy: string;
    albumControls: string;
    previousChart: string;
    nextChart: string;
    viewChart: (title: string) => string;
    blogTitle: string;
    blogCopy: string;
    read: string;
    readPost: (title: string) => string;
    regulationTitle: string;
    externalLinksTitle: string;
    externalLinksCopy: string;
    opensInNewTab: string;
  };
  charts: readonly ChartCopy[];
  parts: readonly PartCopy[];
  posts: readonly BlogPostCopy[];
  regulation: readonly { term: string; value: string }[];
  footer: {
    name: string;
    back: string;
  };
};

const chartImages: Record<ChartId, string> = {
  collage: characterCollage,
  portrait: characterPortrait,
  scene: characterScene,
};

const postImages: Record<PostImageId, string> = {
  characterScene,
  characterCollage,
  characterPortrait,
};

const partIcons: Record<PartId, ReactElement> = {
  charts: <FluentNamedIcon name="PhotoCollection" animated />,
  blog: <FluentNamedIcon name="Library" animated />,
};

const externalLinks = [
  { name: { "zh-TW": "GitHub", "zh-CN": "GitHub" }, href: "https://github.com/VikaKumaChR", icon: "github" },
  { name: { "zh-TW": "嗶哩嗶哩", "zh-CN": "哔哩哔哩" }, href: "https://space.bilibili.com/387756916", icon: "bilibili" },
  { name: { "zh-TW": "小紅書", "zh-CN": "小红书" }, href: "https://xhslink.cn/o/7rwdxZDWMnl", icon: "xiaohongshu" },
] as const;

const contentByLocale: Record<Locale, LocaleContent> = {
  "zh-TW": {
    appTitle: "VkC's Blog",
    htmlLang: "zh-Hant-TW",
    brandMeta: "角色部落格",
    navItems: [
      { id: "hero", label: "首頁" },
      { id: "charts", label: "圖件" },
      { id: "blog", label: "札記" },
    ],
    hero: {
      titleLine1: "維嘉 VkC",
      titleLine2: "角色部落格 / Character Journal",
      lead: "現在是傍晚時……歡迎來訪～",
      artLabel: "維嘉首頁立繪舞台",
      figureAlt: "維嘉的淡紫色角色立繪",
      partLabel: "特色頁面入口",
    },
    actions: {
      share: "分享此頁",
      copied: "連結已複製",
      shareText: "維嘉原創角色部落格",
      themeToLight: "切換到亮色",
      themeToDark: "切換到暗色",
      languageTitle: "切換簡體中文",
      languageCurrent: "目前為正體中文",
      darkMode: "暗色模式",
    },
    aria: {
      header: "部落格導覽",
      home: "回到首頁",
      nav: "主要導覽",
      actions: "頁面操作",
    },
    sections: {
      chartsTitle: "圖件",
      chartsCopy: "維嘉的圖件被放進同一條圖冊軌道：拼貼、肖像與場景會依序成為主位，保留前後素材的連續感。",
      albumControls: "圖冊控制",
      previousChart: "上一張",
      nextChart: "下一張",
      viewChart: (title) => `查看 ${title}`,
      blogTitle: "札記",
      blogCopy: "整理設定札記、圖件歸檔與角色觀察。每篇貼文都有封面、分類與摘要。",
      read: "閱讀",
      readPost: (title) => `閱讀：${title}`,
      regulationTitle: "須知",
      externalLinksTitle: "站外連結",
      externalLinksCopy: "也可以在這裡找到我。",
      opensInNewTab: "在新分頁開啟",
    },
    charts: [
      {
        id: "collage",
        title: "四格拼貼",
        meta: "角色索引",
        alt: "維嘉多張處理後插圖組成的四格拼貼",
        summary: "多張素材先收進同一入口，作為角色檔案總覽。",
        detail: "拼貼負責建立角色檔案的第一層：表情、姿態、日常片段與後續補檔線索先被收束在一起。",
      },
      {
        id: "portrait",
        title: "肖像立繪",
        meta: "身份識別",
        alt: "維嘉的處理後肖像圖",
        summary: "紫髮、淺色服裝和柔和表情是最穩定的角色識別點。",
        detail: "肖像圖承擔身份錨點，是檔案中最適合放在角色資料頁的主要圖件。",
      },
      {
        id: "scene",
        title: "場景氣質",
        meta: "世界氣質",
        alt: "維嘉站在淡藍紫色場景中的處理後插圖",
        summary: "淡藍背景、低飽和紫和留白共同形成安靜、柔光的敘事空間。",
        detail: "場景圖承接首頁的故事感，讓角色資料像章節一樣逐步展開。",
      },
    ],
    parts: [
      { id: "charts", title: "圖件整理", copy: "整理角色圖件與立繪。" },
      { id: "blog", title: "創作札記", copy: "保存設定札記與創作紀錄。" },
    ],
    posts: [
      {
        image: "characterScene",
        title: "維嘉的頁面為什麼需要故事入口",
        excerpt: "可以隨時隨地查看與了解維嘉^^",
      },
      {
        image: "characterCollage",
        title: "三張圖件如何構成維嘉的資料線",
        excerpt: "為什麼會用這個功能呢？因為很好看><",
      },
      {
        image: "characterPortrait",
        title: "維嘉是誰？",
        excerpt: "查看維嘉的角色設定、外觀特徵與創作說明w",
      },
    ],
    regulation: [
      { term: "畫師媽咪", value: "几维不是猕猴桃" },
      { term: "角色來源", value: "個人角色：維嘉" },
      { term: "展示範圍", value: "本頁僅展示個人角色和整理日誌" },
      { term: "授權範圍", value: "未經確認請勿使用、轉載、訓練AI、二次分發、二改或商用" },
    ],
    footer: {
      name: "VkC's Blog",
      back: "返回首頁",
    },
  },
  "zh-CN": {
    appTitle: "VkC's Blog",
    htmlLang: "zh-CN",
    brandMeta: "角色博客",
    navItems: [
      { id: "hero", label: "首页" },
      { id: "charts", label: "图件" },
      { id: "blog", label: "札记" },
    ],
    hero: {
      titleLine1: "维嘉 VkC",
      titleLine2: "角色博客 / Character Journal",
      lead: "现在是傍晚时……欢迎访问～",
      artLabel: "维嘉首页立绘舞台",
      figureAlt: "维嘉的淡紫色角色立绘",
      partLabel: "特色页面入口",
    },
    actions: {
      share: "分享此页",
      copied: "链接已复制",
      shareText: "维嘉原创角色博客",
      themeToLight: "切换到亮色",
      themeToDark: "切换到暗色",
      languageTitle: "切換正體中文",
      languageCurrent: "当前为简体中文",
      darkMode: "暗色模式",
    },
    aria: {
      header: "博客导航",
      home: "回到首页",
      nav: "主要导航",
      actions: "页面操作",
    },
    sections: {
      chartsTitle: "图件",
      chartsCopy: "维嘉的图件被放进同一条图册轨道：拼贴、肖像与场景会依序成为主位，保留前后素材的连续感。",
      albumControls: "图册控制",
      previousChart: "上一张",
      nextChart: "下一张",
      viewChart: (title) => `查看 ${title}`,
      blogTitle: "札记",
      blogCopy: "整理设定札记、图件归档与角色观察。每篇贴文都有封面、分类与摘要。",
      read: "阅读",
      readPost: (title) => `阅读：${title}`,
      regulationTitle: "须知",
      externalLinksTitle: "站外链接",
      externalLinksCopy: "也可以在这里找到我。",
      opensInNewTab: "在新标签页打开",
    },
    charts: [
      {
        id: "collage",
        title: "四格拼贴",
        meta: "角色索引",
        alt: "维嘉多张处理后插图组成的四格拼贴",
        summary: "多张素材先收进同一入口，作为角色档案总览。",
        detail: "拼贴负责建立角色档案的第一层：表情、姿态、日常片段与后续补档线索先被收束在一起。",
      },
      {
        id: "portrait",
        title: "肖像立绘",
        meta: "身份识别",
        alt: "维嘉的处理后肖像图",
        summary: "紫发、浅色服装和柔和表情是最稳定的角色识别点。",
        detail: "肖像图承担身份锚点，是档案中最适合放在角色资料页的主要图件。",
      },
      {
        id: "scene",
        title: "场景气质",
        meta: "世界气质",
        alt: "维嘉站在淡蓝紫色场景中的处理后插图",
        summary: "淡蓝背景、低饱和紫和留白共同形成安静、柔光的叙事空间。",
        detail: "场景图承接首页的故事感，让角色资料像章节一样逐步展开。",
      },
    ],
    parts: [
      { id: "charts", title: "图件整理", copy: "整理角色图件与立绘。" },
      { id: "blog", title: "创作札记", copy: "保存设定札记与创作记录。" },
    ],
    posts: [
      {
        image: "characterScene",
        title: "维嘉的页面为什么需要故事入口",
        excerpt: "可以随时随地查看与了解维嘉^^",
      },
      {
        image: "characterCollage",
        title: "三张图件如何构成维嘉的资料线",
        excerpt: "为什么会用这个功能呢？因为豪堪><",
      },
      {
        image: "characterPortrait",
        title: "维嘉是谁？",
        excerpt: "查看维嘉的角色设定、外观特征与创作说明w",
      },
    ],
    regulation: [
      { term: "画师妈咪", value: "几维不是猕猴桃" },
      { term: "角色来源", value: "个人角色：维嘉" },
      { term: "展示范围", value: "本页仅展示个人角色和整理日志" },
      { term: "授权范围", value: "未经确认请勿使用、转载、训练AI、二次分发、二改或商用" },
    ],
    footer: {
      name: "VkC's Blog",
      back: "返回首页",
    },
  },
};

export function App() {
  const styles = useStyles();
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem("locale");
    return stored === "zh-CN" || stored === "zh-TW" ? stored : "zh-TW";
  });
  const copy = contentByLocale[locale];
  const charts = copy.charts.map((item) => ({ ...item, image: chartImages[item.id] }));
  const parts = copy.parts.map((part) => ({ ...part, icon: partIcons[part.id] }));
  const posts = copy.posts.map((post) => ({ ...post, image: postImages[post.image] }));
  const regulation = copy.regulation;
  const navItems = copy.navItems;
  const { activeSection, headerRef, navigateToSection } = useSectionNavigation();
  const album = useAlbumNavigation(charts.length);
  const selectedChart = charts[album.selectedIndex].id;
  const { dispatchToast } = useToastController("blog-feedback");
  const [shareHint, setShareHint] = useState(contentByLocale["zh-TW"].actions.share);
  const [isMobileMode, setIsMobileMode] = useState(getIsMobileDevice);
  const transitionTheme = useThemeTransition();
  const theme = mode === "dark" ? darkTheme : lightTheme;
  const selectedChartIndex = charts.findIndex((item) => item.id === selectedChart);
  const selectedChartItem = charts[selectedChartIndex] ?? charts[0];

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.appTitle;
    setShareHint(copy.actions.share);
  }, [copy]);

  useLayoutEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.theme = mode;
    document.body.style.backgroundColor = theme.colorNeutralBackground1;
  }, [mode, theme.colorNeutralBackground1]);


  useEffect(() => {
    const syncMobileMode = () => {
      setIsMobileMode(getIsMobileDevice());
    };
    const narrowQuery = window.matchMedia("(max-width: 1023px)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const addListener = (query: MediaQueryList) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", syncMobileMode);
      } else {
        query.addListener(syncMobileMode);
      }
    };
    const removeListener = (query: MediaQueryList) => {
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", syncMobileMode);
      } else {
        query.removeListener(syncMobileMode);
      }
    };

    syncMobileMode();
    addListener(narrowQuery);
    addListener(pointerQuery);
    window.addEventListener("orientationchange", syncMobileMode);
    window.addEventListener("resize", syncMobileMode);

    return () => {
      removeListener(narrowQuery);
      removeListener(pointerQuery);
      window.removeEventListener("orientationchange", syncMobileMode);
      window.removeEventListener("resize", syncMobileMode);
    };
  }, []);


  const setThemeMode = (nextMode: "light" | "dark") => {
    transitionTheme(() => {
      setMode(nextMode);
      localStorage.setItem("theme", nextMode);
    });
  };

  const toggleLocale = () => {
    const nextLocale = locale === "zh-TW" ? "zh-CN" : "zh-TW";
    setLocale(nextLocale);
    localStorage.setItem("locale", nextLocale);
  };

  const activateLink = (event: MouseEvent<HTMLAnchorElement>, section: SectionId) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    // Touch gets press feedback; mouse feedback starts on entry, without restarting on click.
    if (event.detail > 0 && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      animateEntryIcon(event.currentTarget);
    }
    navigateToSection(section);
  };

  const showWorkInProgress = () => {
    dispatchToast(
      <Toast className="ui-feedback"><ToastTitle>{locale === "zh-TW" ? "札記內容整理中" : "札记内容整理中"}</ToastTitle></Toast>,
      { intent: "info", timeout: 2400, toastId: "post-status" },
    );
  };

  const sharePage = async () => {
    const sharePayload = {
      title: copy.appTitle,
      text: copy.actions.shareText,
      url: window.location.href,
    };
    const browserNavigator = navigator as Navigator & {
      share?: (data: typeof sharePayload) => Promise<void>;
    };

    try {
      if (typeof browserNavigator.share === "function") {
        await browserNavigator.share(sharePayload);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareHint(copy.actions.copied);
      window.setTimeout(() => setShareHint(copy.actions.share), 1600);
    } catch {
      setShareHint(copy.actions.share);
    }
  };


  const preventMediaContextMenu = (event: MouseEvent<HTMLElement>) => {
    const target = event.target;

    if (
      target instanceof Element &&
      target.closest("img, [data-media-guard='true'], [data-protect-media='true']")
    ) {
      event.preventDefault();
    }
  };

  return (
    <FluentProvider
      theme={theme}
      applyStylesToPortals={false}
      className={mergeClasses(styles.shell, "theme-surface")}
      onContextMenu={preventMediaContextMenu}
      style={
        {
          colorScheme: mode,
          "--heroTextureFilter": mode === "dark" ? "brightness(0.28) saturate(0.7)" : "none",
          "--heroTextureOpacity": mode === "dark" ? "0.88" : "1",
          "--heroBase": mode === "dark" ? "#15131d" : "#fbf9fd",
          "--heroPaper": mode === "dark" ? "#1d1828" : "#f6f1fa",
          "--heroCoolGlow": mode === "dark" ? "rgba(129, 159, 186, 0.16)" : "rgba(184, 203, 228, 0.42)",
          "--heroWarmGlow": mode === "dark" ? "rgba(198, 186, 224, 0.12)" : "rgba(236, 224, 241, 0.72)",
          "--heroLine": mode === "dark" ? "rgba(222, 213, 239, 0.14)" : "rgba(113, 101, 144, 0.16)",
          "--heroLaceOpacity": mode === "dark" ? "0.38" : "0.48",
          "--heroLaceMobileOpacity": mode === "dark" ? "0.26" : "0.34",
          "--heroLaceFilter": mode === "dark" ? "saturate(0.78) brightness(0.86)" : "saturate(0.86)",
          "--heroGuideOpacity": "1",
          "--heroGuideMobileOpacity": "1",
          "--heroGuideFilter": mode === "dark" ? "saturate(0.82) brightness(0.68) contrast(0.92)" : "saturate(0.88)",
          "--figureLight": mode === "dark" ? "rgba(198, 186, 224, 0.16)" : "rgba(255, 255, 255, 0.78)",
          "--figureShadow": mode === "dark" ? "rgba(6, 4, 12, 0.56)" : "rgba(101, 86, 138, 0.2)",
          "--partMaterialBase": mode === "dark" ? "#1f1b2a" : "#ffffff",
          "--partMaterialHover": mode === "dark" ? "#242030" : "#ffffff",
          "--partMaterialTint": mode === "dark" ? "rgba(255,255,255,0.025)" : "rgba(248,246,252,0.72)",
          "--partTopStroke": mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.86)",
          "--partPressedOverlay": mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(36,36,36,0.035)",
          "--partStroke": mode === "dark" ? "rgba(255,255,255,0.095)" : "rgba(36,36,36,0.12)",
          "--partStrokeHover": mode === "dark" ? "rgba(198,186,224,0.22)" : "rgba(93,81,120,0.22)",
          "--partGradientBorder":
            mode === "dark"
              ? "linear-gradient(120deg, rgba(198,186,224,0.94) 0%, rgba(154,190,216,0.74) 48%, rgba(232,215,255,0.72) 100%)"
              : "linear-gradient(120deg, rgba(198,186,224,0.94) 0%, rgba(177,218,232,0.78) 48%, rgba(231,212,255,0.76) 100%)",
          "--albumGlow": mode === "dark" ? "rgba(198, 186, 224, 0.14)" : "rgba(198, 186, 224, 0.26)",
          "--imageSurface": mode === "dark" ? "rgba(198, 186, 224, 0.16)" : "rgba(232, 222, 245, 0.58)",
          "--colorNeutralBackground1": theme.colorNeutralBackground1,
        } as CSSProperties
      }
    >
      <Toaster toasterId="blog-feedback" position="bottom-end" limit={1} />
      <header ref={headerRef} className={styles.header} aria-label={copy.aria.header}>
        <Link className={styles.brand} href="#hero" onClick={(event) => activateLink(event, "hero")} appearance="subtle" aria-label={copy.aria.home}>
          <span className={styles.brandMark} aria-hidden="true">
            {/* QQ 人插圖入口：將下方文字替換為 <img className={styles.brandAvatar} src={你的圖片} alt="" />。 */}
            <img className={styles.brandAvatar} src={brandAvatar} alt="" />
          </span>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>{copy.appTitle}</span>
            <span className={styles.brandMeta}>{copy.brandMeta}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={copy.aria.nav}>
          <TabList
            className={styles.navTabs}
            selectedValue={activeSection}
            onTabSelect={(_, data) => navigateToSection(data.value as SectionId)}
            aria-label={copy.aria.nav}
          >
            {navItems.map((item) => (
              <Tab key={item.id} value={item.id} className={styles.navLink}
                aria-controls={item.id} aria-current={activeSection === item.id ? "location" : undefined}>
                {item.label}
              </Tab>
            ))}
            <NavigationIndicator selectedValue={activeSection} />
          </TabList>
        </nav>

        <div className={styles.headerActions} role="group" aria-label={copy.aria.actions} data-header-actions>
          <ThemeSwitch dark={mode === "dark"} label={copy.actions.darkMode} onChange={(dark) => setThemeMode(dark ? "dark" : "light")} />
          <Tooltip content={{ children: shareHint, className: "ui-feedback" }} relationship="description">
          <Button
            className={styles.actionButton}
            appearance="transparent"
            icon={<Share24Regular />}
            onClick={sharePage}
            aria-label={shareHint}
          />
          </Tooltip>
          <Tooltip content={{ children: `${copy.actions.languageCurrent}；${copy.actions.languageTitle}`, className: "ui-feedback" }} relationship="description">
          <Button
            className={styles.actionButton}
            appearance="transparent"
            icon={<FluentNamedIcon name={locale === "zh-TW" ? "ChineseBoPoMoFo" : "ChinesePinyin"} />}
            onClick={toggleLocale}
            aria-label={`${copy.actions.languageCurrent}；${copy.actions.languageTitle}`}
          />
          </Tooltip>

        </div>
      </header>

      <main>
        <section
          className={mergeClasses(styles.hero, isMobileMode ? styles.mobileHero : undefined, "hero-journal")}
          id="hero"
          aria-labelledby="hero-title"
          data-mobile-hero={isMobileMode ? "true" : undefined}
        >
          <HeroHomeFrame />
          {isMobileMode ? (
            <div className={styles.mobileHeroInner}>
              <div className={mergeClasses(styles.mobileHeroCopy, "hero-journal-copy")}>
                <div className="hero-welcome-note">
                  <div className="hero-title-group">
                    <h1 id="hero-title" className={styles.mobileHeroTitle}>{copy.hero.titleLine1}</h1>
                    <Text as="p" className={styles.heroDescriptor} data-hero-descriptor>{copy.hero.titleLine2}</Text>
                  </div>
                  <Text as="p" className={styles.mobileHeroLead}>
                    {copy.hero.lead}
                  </Text>
                </div>
              </div>

              <aside className={mergeClasses(styles.mobileHeroScene, "hero-journal-stage")} aria-label={copy.hero.artLabel}>
                <HeroPhotoNotes />
                <div className={mergeClasses(styles.mobileFigureFrame, "hero-journal-figure")} onContextMenu={(event) => event.preventDefault()}>
                  <HeroFigureBackdrop />
                  <img
                    className={mergeClasses(styles.heroArtImage, styles.mobileHeroArtImage, styles.protectedImage)}
                    src={heroFigure}
                    alt={copy.hero.figureAlt}
                    draggable={false}
                    data-hero-figure="true"
                  />
                  <span
                    className={styles.heroFigureGuard}
                    data-figure-guard="true"
                    aria-hidden="true"
                    onContextMenu={(event) => event.preventDefault()}
                  />
                </div>
              </aside>

              <div className={styles.mobilePartGrid} aria-label={copy.hero.partLabel} data-part-grid="true">
                {parts.map((part) => (
                  <a
                    className={styles.mobilePartButton}
                    href={`#${part.id}`}
                    key={part.id}
                    onClick={(event) => activateLink(event, part.id)}
                    onPointerEnter={previewEntryIcon}
                    aria-label={`${part.title} - ${part.copy}`}
                  >
                    <span className={styles.mobilePartButtonIcon} aria-hidden="true">
                      {part.icon}
                    </span>
                    <span className={styles.mobilePartButtonText}>
                      <span className={styles.mobilePartButtonTitle}>{part.title}</span>
                      <Text as="span" className={styles.mobilePartButtonCopy}>
                        {part.copy}
                      </Text>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className={mergeClasses(styles.heroInner, "hero-journal-layout")}>
                <div className="hero-memo-spread">
                  <div className={mergeClasses(styles.heroCopy, "hero-journal-copy")}>
                    <div className="hero-welcome-note">
                      <div className="hero-title-group">
                        <h1 id="hero-title" className={styles.heroTitle}>{copy.hero.titleLine1}</h1>
                        <Text as="p" className={styles.heroDescriptor} data-hero-descriptor>{copy.hero.titleLine2}</Text>
                      </div>
                      <Text as="p" className={styles.heroLead}>
                        {copy.hero.lead}
                      </Text>
                    </div>
                  </div>

                  <aside className={mergeClasses(styles.heroArtStage, "hero-journal-stage")} aria-label={copy.hero.artLabel}>
                    <HeroPhotoNotes variant="portrait" />
                    <HeroPhotoNotes variant="memo" />
                    <div className={mergeClasses(styles.heroFigureFrame, "hero-journal-figure")} onContextMenu={(event) => event.preventDefault()}>
                      <HeroFigureBackdrop />
                      <img
                        className={mergeClasses(styles.heroArtImage, styles.protectedImage)}
                        src={heroFigure}
                        alt={copy.hero.figureAlt}
                        draggable={false}
                        data-hero-figure="true"
                      />
                      <span
                        className={styles.heroFigureGuard}
                        data-figure-guard="true"
                        aria-hidden="true"
                        onContextMenu={(event) => event.preventDefault()}
                      />
                    </div>
                  </aside>
                </div>

                <div className={styles.partGrid} aria-label={copy.hero.partLabel} data-part-grid="true">
                  {parts.map((part) => (
                    <a
                      className={styles.partCard}
                      href={`#${part.id}`}
                      key={part.id}
                      onClick={(event) => activateLink(event, part.id)}
                      onPointerEnter={previewEntryIcon}
                    >
                      <span className={styles.partIcon} aria-hidden="true">
                        {part.icon}
                      </span>
                      <span className={styles.partText}>
                        <span className={styles.partTitle}>{part.title}</span>
                        <Text as="span" className={styles.partCopy}>
                          {part.copy}
                        </Text>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        <section className={styles.section} id="charts" aria-labelledby="charts-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitleCluster}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionTitleIcon} aria-hidden="true">
                    <FluentNamedIcon name="PhotoCollection" />
                  </span>
                  <Title1 as="h2" id="charts-title" className={styles.sectionTitleText}>
                    {copy.sections.chartsTitle}
                  </Title1>
                </div>
                <Text as="p" className={mergeClasses(styles.headingCopy, styles.chartHeadingCopy)}>
                  {copy.sections.chartsCopy}
                </Text>
              </div>
            </div>

            <div className={styles.albumShell}>
              <div id="chart-gallery" role="tabpanel" aria-labelledby={`gallery-tab-${selectedChart}`} className={styles.albumViewport} ref={album.viewportRef} {...album.handlers} data-direction={album.direction}>
                <div className={styles.albumTrack} ref={album.trackRef}>
                {charts.map((item, index) => {
                  const position = (index - selectedChartIndex + charts.length) % charts.length;
                  const isActive = selectedChart === item.id;
                  const isMedium = position === 1;

                  return (
                    <button
                      key={item.id}
                      data-chart-id={item.id}
                      className={mergeClasses(styles.albumCard, isActive ? styles.albumCardActive : undefined)}
                      style={
                        {
                          "--albumOrder": position,
                          "--albumBasis": isActive
                            ? "52%"
                            : isMedium
                              ? "31%"
                              : "clamp(96px, calc(17% - 24px), 190px)",
                          "--albumMobileBasis": isActive ? "72vw" : isMedium ? "46vw" : "22vw",
                        } as CSSProperties
                      }
                      type="button"
                      onClick={() => album.select(index)}
                      tabIndex={isActive ? 0 : -1}
                      aria-pressed={isActive}
                      aria-label={copy.sections.viewChart(item.title)}
                      data-protect-media="true"
                    >
                      <img className={mergeClasses(styles.albumImage, styles.protectedImage)} src={item.image} alt={item.alt} draggable={false} />
                      <span className={styles.mediaGuard} data-media-guard="true" aria-hidden="true" />
                      <span className={styles.albumOverlay}>
                        <span className={styles.albumMeta}>{item.meta}</span>
                        <Title3 as="span" className={styles.albumTitle}>
                          {item.title}
                        </Title3>
                      </span>
                    </button>
                  );
                })}
                </div>
              </div>

              <div className={styles.albumPanel}>
                <div className={styles.albumCaption} aria-live="polite" aria-atomic="true">
                  <Title2 as="h3">{selectedChartItem.title}</Title2>
                  <Text as="p" className={styles.cardCopy}>
                    {selectedChartItem.detail}
                  </Text>
                </div>
                <AlbumNavigation
                  items={charts}
                  selectedIndex={album.selectedIndex}
                  label={copy.sections.albumControls}
                  previousLabel={copy.sections.previousChart}
                  nextLabel={copy.sections.nextChart}
                  itemLabel={copy.sections.viewChart}
                  select={album.select}
                  previous={album.previous}
                  next={album.next}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={mergeClasses(styles.section, styles.sectionMuted)} id="blog" aria-labelledby="blog-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitleCluster}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionTitleIcon} aria-hidden="true">
                    <FluentNamedIcon name="Library" />
                  </span>
                  <Title1 as="h2" id="blog-title" className={styles.sectionTitleText}>
                    {copy.sections.blogTitle}
                  </Title1>
                </div>
                <Text as="p" className={styles.headingCopy}>
                  {copy.sections.blogCopy}
                </Text>
              </div>
            </div>

            <div className={styles.blogGrid}>
              {posts.map((post) => (
                <Card key={post.title} className={styles.blogCard}>
                  <CardPreview className={styles.blogPreview} data-protect-media="true">
                    <img className={mergeClasses(styles.blogImage, styles.protectedImage)} src={post.image} alt="" draggable={false} />
                    <span className={styles.mediaGuard} data-media-guard="true" aria-hidden="true" />
                  </CardPreview>
                  <div className={styles.blogBody}>
                    <div className={styles.blogContent}>
                      <CardHeader
                        className={styles.blogHeader}
                        header={
                          <Subtitle1 as="h3" className={styles.blogTitle}>
                            {post.title}
                          </Subtitle1>
                        }
                        description={
                          post.category || post.date || post.readTime ? (
                            <span className={styles.blogMetaLine}>
                              {post.category ? <Badge appearance="tint">{post.category}</Badge> : null}
                              {post.date ? <Text as="span">{post.date}</Text> : null}
                              {post.readTime ? (
                                <>
                                  <Text as="span" className={styles.blogDot}>
                                    /
                                  </Text>
                                  <Text as="span">{post.readTime}</Text>
                                </>
                              ) : null}
                            </span>
                          ) : undefined
                        }
                      />
                      <Text as="p" className={styles.cardCopy}>
                        {post.excerpt}
                      </Text>
                    </div>
                    <CardFooter className={styles.blogFooter}>
                      <Button className={styles.blogReadButton} appearance="primary" onClick={showWorkInProgress} aria-label={copy.sections.readPost(post.title)}>{copy.sections.read}</Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={mergeClasses(styles.section, styles.linksSection)} id="regulation" aria-labelledby="regulation-title">
          <div className={styles.regulationGrid}>
            <div className={styles.sectionTitleCluster}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitleIcon} aria-hidden="true">
                  <FluentNamedIcon name="Relationship" />
                </span>
                <Title1 as="h2" id="regulation-title" className={styles.sectionTitleText}>
                  {copy.sections.externalLinksTitle}
                </Title1>
              </div>
              <Text as="p" className={styles.externalLinksCopy}>
                {copy.sections.externalLinksCopy}
              </Text>
              <ul className={styles.externalLinks}>
                {externalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      className={styles.externalLink}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.name[locale]} · ${copy.sections.opensInNewTab}`}
                    >
                      <BrandIcon name={link.icon} className={styles.platformIcon} />
                      <span>{link.name[locale]}</span>
                      <ArrowUpRight24Regular aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Card>
              <div className={styles.statementBody}>
                <CardHeader image={<GlobeShield24Regular />} header={<Title3 as="h3">{copy.sections.regulationTitle}</Title3>} />
                <ul className={styles.statementList}>
                  {regulation.map((item) => (
                    <li className={styles.statementItem} key={item.term}>
                      <Text className={styles.statementTerm}>{item.term}</Text>
                      <Text className={styles.statementValue}>{item.value}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </main>


      <footer className={styles.footer}>
        <Text weight="semibold">{copy.footer.name}</Text>
        <Button as="a" href="#hero" onClick={(event) => activateLink(event, "hero")} appearance="subtle" icon={<ArrowUp24Regular />}>
          {copy.footer.back}
        </Button>
      </footer>
    </FluentProvider>
  );
}
