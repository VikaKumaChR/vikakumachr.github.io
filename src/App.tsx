import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactElement } from "react";
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  FluentProvider,
  Link,
  PopoverSurface,
  Subtitle1,
  Text,
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
  BookOpen24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  DocumentBulletList24Regular,
  GlobeShield24Regular,
  PanelRightGallery24Regular,
  Person24Regular,
  Share24Regular,
  Translate24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";
import characterCollage from "../Image/LifeFourCuts.png";

// 首頁四個手帳拼貼塊替換入口：用你的四張透明 PNG 覆蓋 Image/LifePanel_01.png 到 LifePanel_04.png。
import lifePanel01 from "../Image/LifePanel_01.png";
import lifePanel02 from "../Image/LifePanel_02.png";
import lifePanel03 from "../Image/LifePanel_03.png";
import lifePanel04 from "../Image/LifePanel_04.png";
import characterPortrait from "../Image/VikaKumaChR_Stand.png";
import characterScene from "../Image/VikaKumaChR_Scene.png";
import heroFigurePlaceholder from "../Image/hero_figure_placeholder.png";
import heroGuideLeft from "../Image/MainPageComponent/4_guide.png";
import heroLaceTopRight from "../Image/MainPageComponent/MainPageCorner_TopRight.webp";
import brandAvatar from "../Image/BrandAvatar.png";

// 首頁半身立繪替換入口：把上方 import 指向你的透明 PNG，再讓 heroFigure 使用它。
const heroFigure = heroFigurePlaceholder;

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
  colorBrandBackground: "#c6bae0",
  colorBrandBackgroundHover: "#b4aad4",
  colorBrandForeground1: "#5d5178",
  colorBrandForeground2: "#716590",
  colorBrandStroke1: "#9d91bf",
  borderRadiusMedium: "8px",
  borderRadiusLarge: "8px",
};

const darkTheme: Theme = {
  ...createDarkTheme(brandRamp),
  colorBrandBackground: "#c6bae0",
  colorBrandBackgroundHover: "#d2c7e7",
  colorBrandForeground1: "#ded5ef",
  colorBrandForeground2: "#d2c7e7",
  colorBrandStroke1: "#c6bae0",
  borderRadiusMedium: "8px",
  borderRadiusLarge: "8px",
};

const useStyles = makeStyles({
  shell: {
    minHeight: "100vh",
    overflowX: "hidden",
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
    columnGap: "18px",
    padding: "12px clamp(18px, 4vw, 54px)",
    backgroundColor: "color-mix(in srgb, var(--colorNeutralBackground1) 88%, transparent)",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backdropFilter: "blur(22px) saturate(1.18)",
    "@media (max-width: 860px)": {
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
    gap: "1px",
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
    display: "flex",
    alignItems: "center",
    columnGap: "clamp(10px, 2.4vw, 22px)",
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 860px)": {
      order: 3,
      gridColumn: "1 / -1",
      width: "100%",
      justifyContent: "center",
      columnGap: "18px",
    },
    "@media (max-width: 430px)": {
      justifyContent: "space-between",
      columnGap: "8px",
    },
  },
  navLink: {
    minHeight: "40px",
    display: "inline-grid",
    gridTemplateRows: "1fr 3px",
    alignItems: "center",
    justifyItems: "center",
    gap: "2px",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    ...shorthands.padding("0", "2px"),
    transitionDuration: tokens.durationNormal,
    transitionProperty: "color",
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
    "@media (max-width: 430px)": {
      fontSize: tokens.fontSizeBase200,
    },
  },
  navLinkActive: {
    color: tokens.colorNeutralForeground1,
  },
  navUnderline: {
    width: "100%",
    height: "3px",
    borderRadius: "999px",
    backgroundColor: "#c6bae0",
    opacity: 0,
    transform: "scaleX(0.72)",
    transitionDuration: tokens.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: tokens.curveEasyEase,
  },
  navUnderlineActive: {
    opacity: 1,
    transform: "scaleX(1)",
  },
  headerActions: {
    justifySelf: "end",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    "@media (max-width: 430px)": {
      gap: "4px",
    },
  },
  actionButton: {
    minWidth: "40px",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
  },
  languageButton: {
    width: "auto",
    minWidth: "58px",
    paddingRight: "10px",
    paddingLeft: "10px",
    fontWeight: tokens.fontWeightSemibold,
    "@media (max-width: 430px)": {
      minWidth: "52px",
      paddingRight: "8px",
      paddingLeft: "8px",
    },
  },
  themeButton: {
    color: tokens.colorBrandForeground1,
  },
  hero: {
    position: "relative",
    minHeight: "clamp(760px, 100vh, 920px)",
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    isolation: "isolate",
    scrollMarginTop: "72px",
    padding: "calc(72px + clamp(38px, 6vh, 66px)) clamp(20px, 6vw, 92px) clamp(34px, 5vh, 54px)",
    backgroundColor: "var(--heroBase)",
    backgroundImage:
      "linear-gradient(135deg, transparent 0 47.5%, var(--heroGridLine) 48.5% 51.5%, transparent 52.5% 100%), linear-gradient(45deg, transparent 0 47.5%, var(--heroGridLine) 48.5% 51.5%, transparent 52.5% 100%), radial-gradient(ellipse at 72% 18%, var(--heroCoolGlow) 0, transparent 44%), radial-gradient(ellipse at 24% 88%, var(--heroWarmGlow) 0, transparent 36%), linear-gradient(180deg, var(--heroBase) 0%, var(--heroPaper) 58%, var(--heroBase) 100%)",
    backgroundSize: "112px 112px, 112px 112px, auto, auto, auto",
    backgroundPosition: "center, center, center, center, center",
    ":before": {
      content: '""',
      position: "absolute",
      zIndex: 0,
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
    "@media (max-width: 860px)": {
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
  heroInner: {
    position: "relative",
    zIndex: 2,
    width: "min(1240px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.95fr) minmax(300px, 0.78fr)",
    alignItems: "center",
    gap: "clamp(24px, 4.4vw, 58px)",
    "@media (max-width: 980px)": {
      gridTemplateColumns: "1fr",
      gap: "22px",
    },
    "@media (max-width: 860px)": {
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
    width: "clamp(196px, 15.8vw, 284px)",
    transform: "rotate(0deg)",
    "@media (max-width: 860px)": {
      top: 0,
      right: "-14px",
      width: "172px",
      opacity: "var(--heroLaceMobileOpacity)",
    },
  },
  heroGuideLeftEdge: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: "clamp(280px, 38vh, 360px)",
    width: "clamp(320px, 25vw, 440px)",
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
    "@media (max-width: 860px)": {
      top: "clamp(228px, 30vh, 300px)",
      width: "clamp(270px, 42vw, 360px)",
      opacity: "var(--heroGuideMobileOpacity)",
    },
    "@media (max-width: 520px)": {
      top: "clamp(226px, 25vh, 252px)",
      width: "clamp(300px, 82vw, 350px)",
      left: "-62px",
    },
  },
  heroCopy: {
    display: "grid",
    gap: "22px",
    maxWidth: "660px",
    "@media (max-width: 520px)": {
      gap: "16px",
    },
  },
  eyebrow: {
    margin: 0,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
  },
  heroTitle: {
    maxWidth: "9.8ch",
    marginTop: 0,
    marginBottom: 0,
    fontSize: "clamp(3.7rem, 7.5vw, 7.4rem)",
    lineHeight: "0.92",
    overflowWrap: "anywhere",
    "@media (max-width: 860px)": {
      fontSize: "clamp(3.7rem, 10.4vw, 5.35rem)",
    },
    "@media (max-width: 520px)": {
      fontSize: "clamp(3.05rem, 13.2vw, 3.42rem)",
      maxWidth: "8.6ch",
    },
  },
  heroLead: {
    maxWidth: "38ch",
    color: tokens.colorNeutralForeground2,
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
    minHeight: "clamp(420px, 56vh, 610px)",
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
    "@media (max-width: 860px)": {
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
    inset: "-4% -12% 0 -18%",
    pointerEvents: "none",
    userSelect: "none",
    "@media (max-width: 860px)": {
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
    width: "clamp(150px, 16vw, 230px)",
    height: "auto",
    objectFit: "contain",
    opacity: 0.78,
    mixBlendMode: "multiply",
    filter: "saturate(0.94) drop-shadow(0 18px 28px rgba(82, 68, 111, 0.16))",
    transformOrigin: "center",
    "@media (max-width: 860px)": {
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
    "@media (max-width: 860px)": {
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
    "@media (max-width: 860px)": {
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
    "@media (max-width: 860px)": {
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
    "@media (max-width: 860px)": {
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
    width: "min(92%, 500px)",
    maxHeight: "clamp(420px, 68vh, 660px)",
    display: "grid",
    placeItems: "end center",
    lineHeight: 0,
    userSelect: "none",
    "@media (max-width: 980px)": {
      maxHeight: "480px",
    },
    "@media (max-width: 860px)": {
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
    filter: "saturate(0.96) contrast(0.98) drop-shadow(0 32px 48px rgba(66, 52, 95, 0.22))",
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
    gridColumn: "1 / -1",
    position: "relative",
    zIndex: 4,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "clamp(-112px, -9vh, -72px)",
    paddingTop: "clamp(10px, 2vh, 18px)",
    "@media (min-width: 681px) and (max-width: 900px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "12px",
      marginTop: "clamp(-132px, -16vw, -84px)",
      paddingTop: "8px",
    },
    "@media (max-width: 680px)": {
      gridTemplateColumns: "1fr",
      marginTop: "-18px",
      paddingTop: 0,
    },
    "@media (max-width: 520px)": {
      marginTop: "-18px",
      gap: "12px",
    },
  },
  partCard: {
    position: "relative",
    minHeight: "clamp(112px, 8vw, 132px)",
    display: "grid",
    gridTemplateColumns: "56px minmax(0, 1fr)",
    alignItems: "center",
    gap: "20px",
    overflow: "hidden",
    padding: "24px",
    borderRadius: tokens.borderRadiusXLarge,
    color: tokens.colorNeutralForeground1,
    backgroundColor: "var(--partMaterialBase)",
    backgroundImage: "linear-gradient(180deg, var(--partMaterialTint), transparent 100%)",
    textDecorationLine: "none",
    boxShadow: tokens.shadow8,
    ...shorthands.border("1px", "solid", "var(--partStroke)"),
    transitionDuration: tokens.durationNormal,
    transitionProperty: "background-color, border-color, box-shadow, transform",
    transitionTimingFunction: tokens.curveEasyEase,
    ":before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      height: "1px",
      backgroundColor: "var(--partTopStroke)",
      pointerEvents: "none",
    },
    ":after": {
      content: '""',
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      backgroundColor: "var(--partPressedOverlay)",
      opacity: 0,
      transitionDuration: tokens.durationNormal,
      transitionProperty: "opacity",
      transitionTimingFunction: tokens.curveEasyEase,
    },
    ":hover": {
      transform: "translateY(-2px)",
      backgroundColor: "var(--partMaterialHover)",
      boxShadow: tokens.shadow16,
      ...shorthands.borderColor("var(--partStrokeHover)"),
    },
    ":active": {
      transform: "translateY(0)",
      boxShadow: tokens.shadow4,
      ":after": {
        opacity: 1,
      },
    },
    "@media (max-width: 520px)": {
      minHeight: "104px",
      gridTemplateColumns: "48px minmax(0, 1fr)",
      gap: "16px",
      padding: "18px",
      borderRadius: tokens.borderRadiusLarge,
    },
  },
  partIcon: {
    position: "relative",
    zIndex: 1,
    width: "56px",
    height: "56px",
    display: "grid",
    placeItems: "center",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: "var(--partIconSurface)",
    color: tokens.colorBrandForeground1,
    ...shorthands.border("1px", "solid", "var(--partIconStroke)"),
    "@media (max-width: 520px)": {
      width: "48px",
      height: "48px",
      borderRadius: tokens.borderRadiusLarge,
    },
  },
  partText: {
    position: "relative",
    zIndex: 1,
    minWidth: 0,
    display: "grid",
    gap: "4px",
  },
  partCopy: {
    color: tokens.colorNeutralForeground2,
  },
  section: {
    scrollMarginTop: "0px",
    padding: "clamp(44px, 5vw, 60px) clamp(22px, 5vw, 72px)",
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
    marginBottom: "clamp(26px, 3vw, 38px)",
    "@media (max-width: 820px)": {
      alignItems: "start",
      flexDirection: "column",
    },
  },
  sectionTitleCluster: {
    display: "grid",
    gridTemplateColumns: "36px minmax(0, 1fr)",
    columnGap: "14px",
    rowGap: "18px",
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
    lineHeight: "1.08",
  },
  sectionTitleIcon: {
    gridColumn: 1,
    gridRow: 1,
    width: "36px",
    height: "36px",
    flexShrink: 0,
    display: "inline-grid",
    placeItems: "center",
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  headingCopy: {
    gridColumn: 2,
    marginTop: 0,
    marginBottom: 0,
    maxWidth: "62ch",
    color: tokens.colorNeutralForeground2,
  },
  chartHeadingCopy: {
    maxWidth: "54ch",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
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
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: "12px",
    height: "clamp(316px, 30vw, 404px)",
    overflowX: "auto",
    overflowY: "hidden",
    padding: 0,
    backgroundColor: "transparent",
    scrollPaddingInline: 0,
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "@media (max-width: 760px)": {
      height: "374px",
    },
    "@media (max-width: 520px)": {
      height: "332px",
    },
  },
  albumCard: {
    position: "relative",
    order: "var(--albumOrder)",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "var(--albumBasis)",
    height: "100%",
    scrollSnapAlign: "center",
    overflow: "hidden",
    borderRadius: "28px",
    color: "#fff",
    backgroundColor: "var(--imageSurface)",
    boxShadow: "none",
    transitionDuration: "520ms",
    transitionProperty: "flex-basis, border-radius",
    transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
    ...shorthands.border("0", "solid", "transparent"),
    cursor: "pointer",
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
    gap: "5px",
    padding: "18px",
    background: "linear-gradient(180deg, transparent, rgba(31, 24, 48, 0.78))",
    pointerEvents: "none",
  },
  albumMeta: {
    color: "rgba(255,255,255,0.82)",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
  },
  albumTitle: {
    fontSize: "clamp(1.2rem, 1.8vw, 1.55rem)",
    lineHeight: "1.12",
  },
  albumPanel: {
    width: "100%",
    marginTop: "clamp(22px, 2.5vw, 32px)",
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
    gap: "8px",
  },
  albumControls: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "8px",
    flexWrap: "wrap",
  },
  albumDots: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    paddingRight: "8px",
    paddingLeft: "8px",
  },
  albumDot: {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: tokens.colorNeutralStroke1,
    transitionDuration: tokens.durationNormal,
    transitionProperty: "width, background-color",
    transitionTimingFunction: tokens.curveEasyEase,
  },
  albumDotActive: {
    width: "24px",
    backgroundColor: "#c6bae0",
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
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: tokens.shadow4,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    transitionDuration: tokens.durationNormal,
    transitionProperty: "box-shadow, border-color, transform",
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      boxShadow: tokens.shadow8,
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
      transform: "translateY(-1px)",
    },
    ":focus-within": {
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: tokens.colorBrandStroke1,
      outlineOffset: "2px",
    },
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
    padding: "24px 32px",
    "@media (max-width: 640px)": {
      padding: "24px",
    },
  },
  blogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  blogHeader: {
    alignItems: "center",
  },
  blogHeaderIcon: {
    width: "40px",
    height: "40px",
    display: "inline-grid",
    placeItems: "center",
    flexShrink: 0,
    borderRadius: "8px",
    backgroundColor: "color-mix(in srgb, #c6bae0 22%, var(--colorNeutralBackground1))",
    color: tokens.colorBrandForeground1,
    ...shorthands.border("1px", "solid", "color-mix(in srgb, #c6bae0 42%, transparent)"),
  },
  blogTitle: {
    marginTop: 0,
    marginBottom: 0,
    lineHeight: "1.25",
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
    lineHeight: tokens.lineHeightBase400,
  },
  blogFooter: {
    paddingTop: "0",
    justifyContent: "flex-start",
  },
  blogReadButton: {
    minWidth: "88px",
    fontWeight: tokens.fontWeightSemibold,
    borderRadius: "6px",
    ":focus-visible": {
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: tokens.colorBrandStroke1,
      outlineOffset: "2px",
    },
  },
  regulationGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 360px",
    gap: "24px",
    alignItems: "start",
    "@media (max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
  regulationLead: {
    gridColumn: 2,
    marginTop: 0,
    marginBottom: 0,
    maxWidth: "62ch",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  statementCard: {
    borderRadius: "8px",
    boxShadow: tokens.shadow8,
  },
  statementBody: {
    padding: "22px",
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
    padding: "28px clamp(20px, 5vw, 72px)",
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 540px)": {
      alignItems: "start",
      flexDirection: "column",
    },
  },
  workPopoverSurface: {
    position: "fixed",
    zIndex: 1000,
    left: "50%",
    bottom: "max(24px, calc(env(safe-area-inset-bottom) + 18px))",
    transform: "translateX(-50%)",
    maxWidth: "min(320px, calc(100vw - 32px))",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    padding: "12px 16px",
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
  },
});

type Locale = "zh-TW" | "zh-CN";
type ChartId = "collage" | "portrait" | "scene";
type PartId = "charts" | "blog" | "regulation";
type SectionId = "hero" | PartId;
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
    languageShort: string;
    languageTitle: string;
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
    chartsCount: (count: number) => string;
    albumControls: string;
    previousChart: string;
    nextChart: string;
    viewChart: (title: string) => string;
    blogTitle: string;
    blogCopy: string;
    read: string;
    readPost: (title: string) => string;
    regulationTitle: string;
    regulationCopy: string;
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
  charts: <PanelRightGallery24Regular />,
  blog: <BookOpen24Regular />,
  regulation: <GlobeShield24Regular />,
};

const workInProgressText = "Work in progress...";

const contentByLocale: Record<Locale, LocaleContent> = {
  "zh-TW": {
    appTitle: "VkC's Blog",
    htmlLang: "zh-Hant-TW",
    brandMeta: "角色部落格",
    navItems: [
      { id: "hero", label: "首頁" },
      { id: "charts", label: "圖件" },
      { id: "blog", label: "札記" },
      { id: "regulation", label: "聲明" },
    ],
    hero: {
      titleLine1: "维嘉VkC",
      titleLine2: "Blog",
      lead: "歡迎訪問^^ Welcome to my world~",
      artLabel: "维嘉首頁立繪舞台",
      figureAlt: "维嘉的淡紫色角色立繪",
      partLabel: "特色頁面入口",
    },
    actions: {
      share: "分享此頁",
      copied: "連結已複製",
      shareText: "维嘉原創角色部落格",
      themeToLight: "切換到亮色",
      themeToDark: "切換到暗色",
      languageShort: "简",
      languageTitle: "切換為簡體中文",
    },
    aria: {
      header: "部落格導覽",
      home: "回到首頁",
      nav: "主要導覽",
      actions: "頁面操作",
    },
    sections: {
      chartsTitle: "圖件",
      chartsCopy: "维嘉的圖件被放進同一條圖冊軌道：拼貼、肖像與場景會依序成為主位，保留前後素材的連續感。",
      chartsCount: (count) => `${count} 件圖件`,
      albumControls: "圖冊控制",
      previousChart: "上一張",
      nextChart: "下一張",
      viewChart: (title) => `查看 ${title}`,
      blogTitle: "札記",
      blogCopy: "整理設定札記、圖件歸檔與角色觀察。每篇貼文都有封面、分類與摘要。",
      read: "閱讀",
      readPost: (title) => `閱讀：${title}`,
      regulationTitle: "使用聲明",
      regulationCopy: "這裡只保留必要聲明：素材來源、原作者、展示範圍與使用限制。關於區不再堆疊額外敘述。",
    },
    charts: [
      {
        id: "collage",
        title: "四格拼貼",
        meta: "角色索引",
        alt: "维嘉多張處理後插圖組成的四格拼貼",
        summary: "多張素材先收進同一入口，作為角色檔案總覽。",
        detail: "拼貼負責建立角色檔案的第一層：表情、姿態、日常片段與後續補檔線索先被收束在一起。",
      },
      {
        id: "portrait",
        title: "肖像立繪",
        meta: "身份識別",
        alt: "维嘉的處理後肖像圖",
        summary: "紫髮、淺色服裝和柔和表情是最穩定的角色識別點。",
        detail: "肖像圖承擔身份錨點，是檔案中最適合放在角色資料頁的主要圖件。",
      },
      {
        id: "scene",
        title: "場景氣質",
        meta: "世界氣質",
        alt: "维嘉站在淡藍紫色場景中的處理後插圖",
        summary: "淡藍背景、低飽和紫和留白共同形成安靜、柔光的敘事空間。",
        detail: "場景圖承接首頁的故事感，讓角色資料像章節一樣逐步展開。",
      },
    ],
    parts: [
      { id: "charts", title: "圖件整理", copy: "整理角色圖件與立繪。" },
      { id: "blog", title: "創作札記", copy: "保存設定札記與創作紀錄。" },
      { id: "regulation", title: "使用聲明", copy: "查看使用聲明與來源資訊。" },
    ],
    posts: [
      {
        image: "characterScene",
        title: "维嘉的頁面為什麼需要故事入口",
        excerpt: "首頁不再只放照片，而是把角色氣質、素材線索和閱讀動線組成一個開場敘事。",
      },
      {
        image: "characterCollage",
        title: "三張圖件如何構成维嘉的資料線",
        excerpt: "拼貼、肖像與場景被安排成連續索引，讓角色印象從總覽延伸到細節。",
      },
      {
        image: "characterPortrait",
        title: "紫髮、冰藍與白色服裝的識別作用",
        excerpt: "從處理後素材裡提取穩定元素，用於角色檔案、貼文封面與後續規範文字。",
      },
    ],
    regulation: [
      { term: "畫師媽咪", value: "几维不是猕猴桃" },
      { term: "角色來源", value: "個人角色：维嘉" },
      { term: "展示範圍", value: "本頁僅展示處理後公開素材與整理文字" },
      { term: "使用聲明", value: "未經確認請勿轉載、訓練AI、二次分發、二改或商用" },
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
      { id: "regulation", label: "声明" },
    ],
    hero: {
      titleLine1: "维嘉VkC",
      titleLine2: "Blog",
      lead: "欢迎访问^^ Welcome to my world~",
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
      languageShort: "繁",
      languageTitle: "切换为繁体中文",
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
      chartsCount: (count) => `${count} 件图件`,
      albumControls: "图册控制",
      previousChart: "上一张",
      nextChart: "下一张",
      viewChart: (title) => `查看 ${title}`,
      blogTitle: "札记",
      blogCopy: "整理设定札记、图件归档与角色观察。每篇贴文都有封面、分类与摘要。",
      read: "阅读",
      readPost: (title) => `阅读：${title}`,
      regulationTitle: "使用声明",
      regulationCopy: "这里只保留必要声明：素材来源、原作者、展示范围与使用限制。关于区不再堆叠额外叙述。",
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
      { id: "regulation", title: "使用声明", copy: "查看使用声明与来源信息。" },
    ],
    posts: [
      {
        image: "characterScene",
        title: "维嘉的页面为什么需要故事入口",
        excerpt: "首页不再只放照片，而是把角色气质、素材线索和阅读动线组成一个开场叙事。",
      },
      {
        image: "characterCollage",
        title: "三张图件如何构成维嘉的资料线",
        excerpt: "拼贴、肖像与场景被安排成连续索引，让角色印象从总览延伸到细节。",
      },
      {
        image: "characterPortrait",
        title: "紫发、冰蓝与白色服装的识别作用",
        excerpt: "从处理后素材里提取稳定元素，用于角色档案、贴文封面与后续规范文字。",
      },
    ],
    regulation: [
      { term: "画师妈咪", value: "几维不是猕猴桃" },
      { term: "角色来源", value: "个人角色：维嘉" },
      { term: "展示范围", value: "本页仅展示处理后公开素材与整理文字" },
      { term: "使用声明", value: "未经确认请勿转载、训练AI、二次分发、二改或商用" },
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
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [selectedChart, setSelectedChart] = useState<ChartId>("collage");
  const [shareHint, setShareHint] = useState(contentByLocale["zh-TW"].actions.share);
  const [themeSettling, setThemeSettling] = useState(false);
  const [workPopoverOpen, setWorkPopoverOpen] = useState(false);
  const navigationLockUntil = useRef(0);
  const themeSettleTimer = useRef<number | null>(null);
  const workPopoverTimer = useRef<number | null>(null);
  const albumViewportRef = useRef<HTMLDivElement | null>(null);

  const theme = mode === "dark" ? darkTheme : lightTheme;
  const selectedChartIndex = charts.findIndex((item) => item.id === selectedChart);
  const selectedChartItem = charts[selectedChartIndex] ?? charts[0];

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.appTitle;
    setShareHint(copy.actions.share);
  }, [copy]);

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.theme = mode;
    document.body.style.backgroundColor = theme.colorNeutralBackground1;
  }, [mode, theme.colorNeutralBackground1]);

  useEffect(() => {
    return () => {
      if (themeSettleTimer.current !== null) {
        window.clearTimeout(themeSettleTimer.current);
      }
      if (workPopoverTimer.current !== null) {
        window.clearTimeout(workPopoverTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const viewport = albumViewportRef.current;

    if (!viewport) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    viewport.scrollTo({
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [selectedChart]);

  useEffect(() => {
    const sectionIds: SectionId[] = ["hero", "charts", "blog", "regulation"];
    let frame = 0;

    const updateActiveSection = () => {
      if (Date.now() < navigationLockUntil.current) {
        return;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (pageBottom >= documentHeight - 8) {
        setActiveSection("regulation");
        return;
      }

      const marker = 140;
      const current =
        sectionIds
          .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top }))
          .filter((section): section is { id: SectionId; top: number } => typeof section.top === "number")
          .filter((section) => section.top <= marker)
          .at(-1)?.id ?? "hero";

      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  const toggleTheme = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    if (themeSettleTimer.current !== null) {
      window.clearTimeout(themeSettleTimer.current);
    }
    setThemeSettling(true);
    setMode(nextMode);
    localStorage.setItem("theme", nextMode);
    themeSettleTimer.current = window.setTimeout(() => {
      setThemeSettling(false);
      themeSettleTimer.current = null;
    }, 260);
  };

  const toggleLocale = () => {
    const nextLocale = locale === "zh-TW" ? "zh-CN" : "zh-TW";
    setLocale(nextLocale);
    localStorage.setItem("locale", nextLocale);
  };

  const navigateToSection = (section: SectionId) => {
    navigationLockUntil.current = Date.now() + 900;
    setActiveSection(section);
  };

  const selectPreviousChart = () => {
    setSelectedChart(charts[(selectedChartIndex - 1 + charts.length) % charts.length].id);
  };

  const selectNextChart = () => {
    setSelectedChart(charts[(selectedChartIndex + 1) % charts.length].id);
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

  const showWorkInProgress = () => {
    if (workPopoverTimer.current !== null) {
      window.clearTimeout(workPopoverTimer.current);
    }

    setWorkPopoverOpen(true);
    workPopoverTimer.current = window.setTimeout(() => {
      setWorkPopoverOpen(false);
      workPopoverTimer.current = null;
    }, 1800);
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
      className={mergeClasses(styles.shell, themeSettling ? "theme-settling" : undefined)}
      onContextMenu={preventMediaContextMenu}
      style={
        {
          colorScheme: mode,
          "--heroBase": mode === "dark" ? "#15131d" : "#fbf9fd",
          "--heroPaper": mode === "dark" ? "#1d1828" : "#f6f1fa",
          "--heroCoolGlow": mode === "dark" ? "rgba(129, 159, 186, 0.16)" : "rgba(184, 203, 228, 0.42)",
          "--heroWarmGlow": mode === "dark" ? "rgba(198, 186, 224, 0.12)" : "rgba(236, 224, 241, 0.72)",
          "--heroGridLine": mode === "dark" ? "rgba(198, 186, 224, 0.055)" : "rgba(198, 186, 224, 0.16)",
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
          "--partIconSurface": mode === "dark" ? "rgba(255,255,255,0.045)" : "rgba(246,244,250,0.88)",
          "--partIconStroke": mode === "dark" ? "rgba(255,255,255,0.075)" : "rgba(58,48,75,0.06)",
          "--partStroke": mode === "dark" ? "rgba(255,255,255,0.095)" : "rgba(36,36,36,0.12)",
          "--partStrokeHover": mode === "dark" ? "rgba(198,186,224,0.22)" : "rgba(93,81,120,0.22)",
          "--albumGlow": mode === "dark" ? "rgba(198, 186, 224, 0.14)" : "rgba(198, 186, 224, 0.26)",
          "--imageSurface": mode === "dark" ? "rgba(198, 186, 224, 0.16)" : "rgba(232, 222, 245, 0.58)",
          "--colorNeutralBackground1": theme.colorNeutralBackground1,
        } as CSSProperties
      }
    >
      <header className={styles.header} aria-label={copy.aria.header}>
        <Link className={styles.brand} href="#hero" appearance="subtle" aria-label={copy.aria.home}>
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
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                className={mergeClasses(styles.navLink, isActive ? styles.navLinkActive : undefined)}
                href={`#${item.id}`}
                appearance="subtle"
                onClick={() => navigateToSection(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
                <span
                  className={mergeClasses(styles.navUnderline, isActive ? styles.navUnderlineActive : undefined)}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className={styles.headerActions} aria-label={copy.aria.actions}>
          <Button
            className={styles.actionButton}
            appearance="subtle"
            icon={<Share24Regular />}
            onClick={sharePage}
            title={shareHint}
            aria-label={shareHint}
          />
          <Button
            className={mergeClasses(styles.actionButton, styles.languageButton)}
            appearance="subtle"
            icon={<Translate24Regular />}
            onClick={toggleLocale}
            title={copy.actions.languageTitle}
            aria-label={copy.actions.languageTitle}
          >
            {copy.actions.languageShort}
          </Button>
          <Button
            className={mergeClasses(styles.actionButton, styles.themeButton)}
            appearance="subtle"
            icon={mode === "dark" ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
            onClick={toggleTheme}
            title={mode === "dark" ? copy.actions.themeToLight : copy.actions.themeToDark}
            aria-pressed={mode === "dark"}
            aria-label={mode === "dark" ? copy.actions.themeToLight : copy.actions.themeToDark}
          />
        </div>
      </header>

      <main>
        <section className={styles.hero} id="hero" aria-labelledby="hero-title">
          <img className={mergeClasses(styles.heroGuideLeftEdge, styles.protectedImage)} src={heroGuideLeft} alt="" aria-hidden="true" draggable={false} data-hero-guide="true" />
          <div className={styles.heroScrapbookLayer} aria-hidden="true">
            <img className={mergeClasses(styles.heroLaceDecor, styles.heroLaceTopRight, styles.protectedImage)} src={heroLaceTopRight} alt="" draggable={false} data-hero-lace="true" />
            <span className={mergeClasses(styles.scrapbookDots, styles.scrapbookDotsOne)} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div>
                <Text as="p" className={styles.eyebrow}>

                </Text>
                <h1 id="hero-title" className={styles.heroTitle}>
                  {copy.hero.titleLine1}
                  <br />
                  {copy.hero.titleLine2}
                </h1>
              </div>
              <Text as="p" className={styles.heroLead}>
                {copy.hero.lead}
              </Text>
            </div>

            <aside className={styles.heroArtStage} aria-label={copy.hero.artLabel}>
              <div className={styles.heroArtBackdrop} aria-hidden="true" />
              <div className={styles.heroCollageLayer} aria-hidden="true">
                <img className={mergeClasses(styles.heroLifePanel, styles.heroLifePanelOne, styles.protectedImage)} src={lifePanel01} alt="" draggable={false} data-hero-panel="true" />
                <img className={mergeClasses(styles.heroLifePanel, styles.heroLifePanelTwo, styles.protectedImage)} src={lifePanel02} alt="" draggable={false} data-hero-panel="true" />
                <img className={mergeClasses(styles.heroLifePanel, styles.heroLifePanelThree, styles.protectedImage)} src={lifePanel03} alt="" draggable={false} data-hero-panel="true" />
                <img className={mergeClasses(styles.heroLifePanel, styles.heroLifePanelFour, styles.protectedImage)} src={lifePanel04} alt="" draggable={false} data-hero-panel="true" />
              </div>
              <div className={styles.heroFigureFrame} onContextMenu={(event) => event.preventDefault()}>
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

            <div className={styles.partGrid} aria-label={copy.hero.partLabel} data-part-grid="true">
              {parts.map((part) => (
                <a
                  className={styles.partCard}
                  href={`#${part.id}`}
                  key={part.id}
                  onClick={() => navigateToSection(part.id)}
                >
                  <span className={styles.partIcon} aria-hidden="true">
                    {part.icon}
                  </span>
                  <span className={styles.partText}>
                    <Title3 as="span">{part.title}</Title3>
                    <Text as="span" className={styles.partCopy}>
                      {part.copy}
                    </Text>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="charts" aria-labelledby="charts-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitleCluster}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionTitleIcon} aria-hidden="true">
                    <PanelRightGallery24Regular />
                  </span>
                  <Title1 as="h2" id="charts-title" className={styles.sectionTitleText}>
                    {copy.sections.chartsTitle}
                  </Title1>
                </div>
                <Text as="p" className={mergeClasses(styles.headingCopy, styles.chartHeadingCopy)}>
                  {copy.sections.chartsCopy}
                </Text>
              </div>
              <Badge appearance="tint">{copy.sections.chartsCount(charts.length)}</Badge>
            </div>

            <div className={styles.albumShell}>
              <div className={styles.albumViewport} ref={albumViewportRef} aria-live="polite">
                {charts.map((item, index) => {
                  const position = (index - selectedChartIndex + charts.length) % charts.length;
                  const isActive = selectedChart === item.id;
                  const isMedium = position === 1;

                  return (
                    <button
                      key={item.id}
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
                      onClick={() => setSelectedChart(item.id)}
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

              <div className={styles.albumPanel}>
                <div className={styles.albumCaption}>
                  <Text as="p" className={styles.eyebrow}>
                    {selectedChartItem.meta}
                  </Text>
                  <Title2 as="h3">{selectedChartItem.title}</Title2>
                  <Text as="p" className={styles.cardCopy}>
                    {selectedChartItem.detail}
                  </Text>
                </div>
                <div className={styles.albumControls} aria-label={copy.sections.albumControls}>
                  <Button
                    appearance="secondary"
                    icon={<ChevronLeft24Regular />}
                    onClick={selectPreviousChart}
                    aria-label={copy.sections.previousChart}
                  />
                  <span className={styles.albumDots} aria-hidden="true">
                    {charts.map((item) => (
                      <span
                        key={item.id}
                        className={mergeClasses(styles.albumDot, selectedChart === item.id ? styles.albumDotActive : undefined)}
                      />
                    ))}
                  </span>
                  <Button
                    appearance="secondary"
                    icon={<ChevronRight24Regular />}
                    onClick={selectNextChart}
                    aria-label={copy.sections.nextChart}
                  />
                </div>
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
                    <BookOpen24Regular />
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
                        image={
                          <span className={styles.blogHeaderIcon} aria-hidden="true">
                            <DocumentBulletList24Regular />
                          </span>
                        }
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
                      <Button
                        className={styles.blogReadButton}
                        appearance="primary"
                        icon={<BookOpen24Regular />}
                        onClick={showWorkInProgress}
                        aria-label={copy.sections.readPost(post.title)}
                      >
                        {copy.sections.read}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="regulation" aria-labelledby="regulation-title">
          <div className={mergeClasses(styles.sectionInner, styles.regulationGrid)}>
            <div className={styles.sectionTitleCluster}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitleIcon} aria-hidden="true">
                  <GlobeShield24Regular />
                </span>
                <Title1 as="h2" id="regulation-title" className={styles.sectionTitleText}>
                  {copy.sections.regulationTitle}
                </Title1>
              </div>
              <Text as="p" className={styles.regulationLead}>
                {copy.sections.regulationCopy}
              </Text>
            </div>

            <Card className={styles.statementCard}>
              <div className={styles.statementBody}>
                <CardHeader image={<Person24Regular />} header={<Title3 as="h3">{copy.sections.regulationTitle}</Title3>} />
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

      {workPopoverOpen ? (
        <PopoverSurface className={styles.workPopoverSurface} role="status" aria-live="polite" aria-atomic="true">
          <Text weight="semibold">{workInProgressText}</Text>
        </PopoverSurface>
      ) : null}

      <footer className={styles.footer}>
        <Text weight="semibold">{copy.footer.name}</Text>
        <Button as="a" href="#hero" appearance="subtle" icon={<ArrowUp24Regular />}>
          {copy.footer.back}
        </Button>
      </footer>
    </FluentProvider>
  );
}
