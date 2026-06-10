import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  FluentProvider,
  Link,
  Subtitle1,
  Tab,
  TabList,
  Text,
  Title1,
  Title2,
  Title3,
  createDarkTheme,
  createLightTheme,
  makeStyles,
  shorthands,
  tokens,
  type BrandVariants,
  type SelectTabData,
  type SelectTabEvent,
  type Theme,
} from "@fluentui/react-components";
import {
  ArrowUp24Regular,
  BookOpen24Regular,
  DarkTheme24Regular,
  PenSparkle24Regular,
  Person24Regular,
  Sparkle24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";
import webModuleOne from "../Image/web-module-01.png";
import webModuleTwo from "../Image/web-module-02.png";

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
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  header: {
    position: "fixed",
    zIndex: 20,
    top: 0,
    left: 0,
    right: 0,
    minHeight: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "18px",
    rowGap: "12px",
    padding: "14px clamp(18px, 4vw, 54px)",
    backgroundColor: "color-mix(in srgb, var(--colorNeutralBackground1) 78%, transparent)",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backdropFilter: "blur(22px) saturate(1.2)",
    "@media (max-width: 860px)": {
      position: "sticky",
      flexWrap: "wrap",
    },
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    columnGap: "10px",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  brandMark: {
    width: "40px",
    height: "40px",
    display: "grid",
    placeItems: "center",
    borderRadius: "8px",
    backgroundColor: "#c6bae0",
    color: "#211936",
    fontWeight: tokens.fontWeightBold,
  },
  brandText: {
    whiteSpace: "nowrap",
    "@media (max-width: 540px)": {
      display: "none",
    },
  },
  nav: {
    display: "flex",
    alignItems: "center",
    columnGap: "clamp(12px, 3vw, 28px)",
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 860px)": {
      order: 3,
      width: "100%",
      justifyContent: "space-between",
    },
  },
  navLink: {
    position: "relative",
    minHeight: "40px",
    display: "inline-flex",
    alignItems: "center",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    paddingBottom: "2px",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
    "::after": {
      content: '""',
      position: "absolute",
      left: "10%",
      right: "10%",
      bottom: "2px",
      height: "3px",
      borderRadius: "999px",
      backgroundColor: "transparent",
      transform: "scaleX(0.36)",
      transitionDuration: tokens.durationNormal,
      transitionProperty: "background-color, transform",
      transitionTimingFunction: tokens.curveEasyEase,
    },
  },
  navLinkActive: {
    color: tokens.colorNeutralForeground1,
    "::after": {
      backgroundColor: "#c6bae0",
      transform: "scaleX(1)",
    },
  },
  themeButton: {
    minWidth: "44px",
    width: "44px",
    height: "44px",
    borderRadius: "8px",
  },
  hero: {
    position: "relative",
    minHeight: "90vh",
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    isolation: "isolate",
    padding: "calc(72px + 42px) clamp(20px, 6vw, 90px) 70px",
    backgroundColor: "var(--heroBase)",
    backgroundImage:
      "linear-gradient(135deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(225deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(45deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(315deg, var(--heroDiamond) 25%, var(--heroBase) 25%)",
    backgroundPosition: "42px 0, 42px 0, 0 0, 0 0",
    backgroundSize: "84px 84px",
    "@media (max-width: 860px)": {
      minHeight: "82vh",
      paddingTop: "80px",
    },
    "@media (max-width: 540px)": {
      minHeight: "78vh",
    },
  },
  heroReferenceOne: {
    position: "absolute",
    zIndex: 0,
    right: "clamp(-240px, -12vw, -80px)",
    top: "calc(72px + 16px)",
    width: "min(62vw, 980px)",
    opacity: "var(--moduleOneOpacity)",
    filter: "saturate(0.86) drop-shadow(0 22px 40px rgba(101, 86, 138, 0.12))",
    "@media (max-width: 960px)": {
      right: "-360px",
      width: "940px",
      opacity: "0.26",
    },
    "@media (max-width: 540px)": {
      right: "-330px",
      top: "96px",
      width: "780px",
    },
  },
  heroReferenceTwo: {
    position: "absolute",
    zIndex: 0,
    left: "clamp(-60px, 3vw, 46px)",
    bottom: "clamp(-170px, -10vw, -80px)",
    width: "min(32vw, 380px)",
    minWidth: "220px",
    opacity: "var(--moduleTwoOpacity)",
    transform: "rotate(-1deg)",
    filter: "drop-shadow(0 20px 30px rgba(101, 86, 138, 0.13))",
    "@media (max-width: 860px)": {
      display: "none",
    },
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, var(--heroOverlayStrong) 0%, var(--heroOverlayMid) 39%, var(--heroOverlaySoft) 78%), linear-gradient(180deg, transparent 64%, var(--colorNeutralBackground1) 100%)",
    "@media (max-width: 860px)": {
      background:
        "linear-gradient(180deg, var(--heroOverlayStrong) 0%, var(--heroOverlayMid) 56%, var(--colorNeutralBackground1) 100%)",
    },
  },
  heroLayout: {
    position: "relative",
    zIndex: 2,
    width: "min(1180px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(360px, 0.78fr)",
    alignItems: "center",
    gap: "clamp(28px, 5vw, 72px)",
    "@media (max-width: 980px)": {
      gridTemplateColumns: "1fr",
      alignItems: "start",
    },
  },
  heroContent: {
    position: "relative",
    maxWidth: "680px",
    padding: "clamp(28px, 4vw, 46px)",
    backgroundColor: "var(--heroCardBackground)",
    borderRadius: "8px",
    ...shorthands.border("1px", "solid", "var(--heroCardStroke)"),
    boxShadow: "0 22px 52px rgba(101, 86, 138, 0.14)",
    backdropFilter: "blur(18px) saturate(1.15)",
    "::before": {
      content: '""',
      position: "absolute",
      inset: "12px",
      pointerEvents: "none",
      borderRadius: "8px",
      ...shorthands.border("1px", "dashed", "rgba(157, 145, 191, 0.36)"),
    },
    "@media (max-width: 540px)": {
      padding: "24px",
    },
  },
  heroMetaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "24px",
  },
  heroTag: {
    backgroundColor: "var(--mintSoft)",
    color: "var(--tagText)",
  },
  heroContentInner: {
    position: "relative",
    zIndex: 1,
  },
  eyebrow: {
    marginBottom: "10px",
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
    letterSpacing: "0",
  },
  heroTitle: {
    maxWidth: "10ch",
    marginTop: 0,
    marginBottom: 0,
    fontSize: "clamp(3.2rem, 7vw, 6.8rem)",
    lineHeight: "0.92",
    letterSpacing: "0",
    overflowWrap: "anywhere",
    "@media (max-width: 540px)": {
      fontSize: "3.15rem",
    },
  },
  heroCopy: {
    maxWidth: "58ch",
    marginTop: "24px",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase500,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "30px",
  },
  visualBoard: {
    position: "relative",
    display: "grid",
    gap: "18px",
    padding: "20px",
    backgroundColor: "var(--boardBackground)",
    borderRadius: "8px",
    ...shorthands.border("1px", "solid", "var(--heroCardStroke)"),
    boxShadow: "0 24px 54px rgba(101, 86, 138, 0.16)",
    backdropFilter: "blur(12px)",
    "@media (max-width: 980px)": {
      maxWidth: "620px",
    },
  },
  boardRibbon: {
    position: "absolute",
    top: "-16px",
    left: "28px",
    right: "28px",
    height: "28px",
    borderRadius: "8px",
    backgroundColor: "var(--ribbonColor)",
    boxShadow: "0 10px 22px rgba(101, 86, 138, 0.12)",
  },
  boardHeader: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    padding: "10px 4px 0",
  },
  boardTitle: {
    margin: 0,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  boardCount: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightBold,
  },
  frameGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    "@media (max-width: 540px)": {
      gridTemplateColumns: "1fr",
    },
  },
  framePanel: {
    position: "relative",
    minHeight: "178px",
    display: "grid",
    alignContent: "end",
    gap: "8px",
    padding: "18px",
    overflow: "hidden",
    color: tokens.colorNeutralForeground1,
    textDecorationLine: "none",
    borderRadius: "8px",
    backgroundColor: "var(--mintPanel)",
    ...shorthands.border("10px", "solid", "var(--laceWhite)"),
    boxShadow: "inset 0 0 0 2px rgba(198, 186, 224, 0.42)",
    "::before": {
      content: '""',
      position: "absolute",
      inset: "8px",
      pointerEvents: "none",
      borderRadius: "8px",
      ...shorthands.border("1px", "dashed", "rgba(157, 145, 191, 0.55)"),
    },
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "inset 0 0 0 2px rgba(198, 186, 224, 0.5), 0 16px 34px rgba(101, 86, 138, 0.13)",
    },
  },
  framePanelTall: {
    gridRow: "span 2",
    minHeight: "370px",
    backgroundColor: "var(--paperPanel)",
    "@media (max-width: 540px)": {
      minHeight: "230px",
    },
  },
  frameKicker: {
    position: "relative",
    zIndex: 1,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
  },
  frameTitle: {
    position: "relative",
    zIndex: 1,
    margin: 0,
    fontSize: tokens.fontSizeBase600,
    lineHeight: 1.2,
  },
  frameCopy: {
    position: "relative",
    zIndex: 1,
    color: tokens.colorNeutralForeground2,
  },
  paperLines: {
    position: "absolute",
    inset: "72px 18px 22px",
    opacity: "var(--paperLineOpacity)",
    backgroundImage:
      "repeating-linear-gradient(180deg, transparent 0 28px, rgba(157, 145, 191, 0.32) 29px 30px)",
    transform: "rotate(-3deg)",
  },
  section: {
    padding: "clamp(64px, 9vw, 112px) clamp(20px, 5vw, 72px)",
  },
  sectionMuted: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sectionInner: {
    width: "min(1120px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
  },
  introBand: {
    paddingTop: "22px",
    paddingBottom: "22px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "1px",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: "8px",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    boxShadow: tokens.shadow16,
    "@media (max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
  stat: {
    minHeight: "118px",
    display: "grid",
    alignContent: "center",
    gap: "4px",
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  statValue: {
    color: tokens.colorBrandForeground1,
    fontSize: "2.2rem",
    fontWeight: tokens.fontWeightBold,
    lineHeight: 1,
  },
  statLabel: {
    color: tokens.colorNeutralForeground2,
  },
  sectionHeading: {
    marginBottom: "34px",
  },
  sectionHeadingSplit: {
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: "28px",
    marginBottom: "34px",
    "@media (max-width: 860px)": {
      alignItems: "start",
      flexDirection: "column",
    },
  },
  headingCopy: {
    maxWidth: "58ch",
    color: tokens.colorNeutralForeground2,
  },
  characterGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.9fr 0.9fr",
    gap: "18px",
    "@media (max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
  featuredCard: {
    gridRow: "span 2",
  },
  card: {
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: tokens.shadow8,
  },
  characterArt: {
    minHeight: "178px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.48), transparent), radial-gradient(circle at 72% 24%, rgba(255, 255, 255, 0.8), transparent 26%), var(--artColor)",
  },
  featuredArt: {
    minHeight: "310px",
  },
  cardBody: {
    padding: "22px",
  },
  cardCopy: {
    color: tokens.colorNeutralForeground2,
  },
  metaList: {
    display: "grid",
    gap: "12px",
    marginTop: "20px",
  },
  metaTerm: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  metaDefinition: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
  },
  tabList: {
    maxWidth: "100%",
    padding: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    overflowX: "auto",
  },
  postList: {
    display: "grid",
    gap: "14px",
  },
  postCard: {
    display: "grid",
    gridTemplateColumns: "92px 1fr",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: tokens.shadow8,
    "@media (max-width: 540px)": {
      gridTemplateColumns: "1fr",
    },
  },
  postDate: {
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: "2px",
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 540px)": {
      minHeight: "76px",
      borderRightWidth: 0,
      ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    },
  },
  postDay: {
    fontSize: "2rem",
    fontWeight: tokens.fontWeightBold,
    lineHeight: 1,
  },
  postMonth: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  postMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 340px",
    gap: "26px",
    alignItems: "start",
    "@media (max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
  profileList: {
    display: "grid",
    gap: "12px",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  profileItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    paddingTop: "12px",
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
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
});

const posts = [
  {
    category: "设定",
    day: "06",
    month: "Jun",
    readTime: "4 min read",
    title: "璃音的记忆笔记如何影响主线推进",
    excerpt: "这篇整理她的观察习惯、叙事视角，以及笔记在章节结构中的功能。",
  },
  {
    category: "札记",
    day: "28",
    month: "May",
    readTime: "2 min read",
    title: "给旧城区增加“安静但危险”的气质",
    excerpt: "从街灯、窗户、路牌和声音密度入手，让场景不用直说也能传达不安。",
  },
  {
    category: "绘图",
    day: "15",
    month: "May",
    readTime: "3 min read",
    title: "角色立绘配色记录：淡紫、冷灰与一点暖色",
    excerpt: "主色选择接近 #c6bae0，用低饱和冷灰稳定画面，再用暖色做视线落点。",
  },
] as const;

type Character = {
  name: string;
  type: string;
  color: string;
  summary: string;
  featured?: boolean;
  keywords?: string;
  status?: string;
};

const characters: Character[] = [
  {
    name: "璃音",
    type: "主线角色",
    color: "#c6bae0",
    featured: true,
    summary: "以记忆为线索行动的记录者。外表冷静，习惯把重要的事写进随身笔记。",
    keywords: "月光、旧信、观察者",
    status: "设定整理中",
  },
  {
    name: "青澄",
    type: "支线角色",
    color: "#76a99a",
    summary: "擅长修复机械鸟的少年，性格明亮，但对过去保持沉默。",
  },
  {
    name: "诺亚",
    type: "世界观角色",
    color: "#d77b6d",
    summary: "城市边界的巡夜人，负责把迷路的人带回灯光仍在的街区。",
  },
] as const;

export function App() {
  const styles = useStyles();
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [filter, setFilter] = useState<string>("all");
  const [activeSection, setActiveSection] = useState("characters");

  const theme = mode === "dark" ? darkTheme : lightTheme;
  const filteredPosts = useMemo(
    () => posts.filter((post) => filter === "all" || post.category === filter),
    [filter],
  );

  useEffect(() => {
    const sectionIds = ["characters", "posts", "about"];
    let frame = 0;

    const updateActiveSection = () => {
      const marker = 140;
      const current =
        sectionIds
          .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top }))
          .filter((section): section is { id: string; top: number } => typeof section.top === "number")
          .filter((section) => section.top <= marker)
          .at(-1)?.id ?? "characters";

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
    setMode(nextMode);
    localStorage.setItem("theme", nextMode);
  };

  return (
    <FluentProvider
      theme={theme}
      className={styles.shell}
      style={
        {
          "--heroOverlayStrong":
            mode === "dark" ? "rgba(18, 15, 26, 0.9)" : "rgba(248, 244, 255, 0.82)",
          "--heroOverlayMid":
            mode === "dark" ? "rgba(18, 15, 26, 0.58)" : "rgba(248, 244, 255, 0.42)",
          "--heroOverlaySoft":
            mode === "dark" ? "rgba(18, 15, 26, 0.22)" : "rgba(248, 244, 255, 0.08)",
          "--heroBase": mode === "dark" ? "#181523" : "#e8def5",
          "--heroDiamond": mode === "dark" ? "rgba(198, 186, 224, 0.06)" : "rgba(255, 255, 255, 0.25)",
          "--heroCardBackground":
            mode === "dark" ? "rgba(30, 26, 43, 0.72)" : "rgba(255, 255, 255, 0.58)",
          "--heroCardStroke":
            mode === "dark" ? "rgba(222, 213, 239, 0.22)" : "rgba(255, 255, 255, 0.72)",
          "--moduleOneOpacity": mode === "dark" ? "0.16" : "0.22",
          "--moduleTwoOpacity": mode === "dark" ? "0.16" : "0.24",
          "--mintSoft": mode === "dark" ? "rgba(191, 226, 197, 0.16)" : "rgba(205, 236, 209, 0.84)",
          "--mintPanel": mode === "dark" ? "rgba(143, 190, 153, 0.2)" : "rgba(205, 236, 209, 0.9)",
          "--paperPanel": mode === "dark" ? "rgba(244, 241, 251, 0.14)" : "rgba(255, 255, 255, 0.76)",
          "--boardBackground": mode === "dark" ? "rgba(25, 22, 36, 0.72)" : "rgba(255, 255, 255, 0.42)",
          "--ribbonColor": mode === "dark" ? "rgba(198, 186, 224, 0.34)" : "rgba(198, 186, 224, 0.72)",
          "--laceWhite": mode === "dark" ? "rgba(244, 241, 251, 0.2)" : "rgba(255, 255, 255, 0.86)",
          "--tagText": mode === "dark" ? "#dff4e3" : "#385943",
          "--paperLineOpacity": mode === "dark" ? "0.26" : "0.5",
          "--colorNeutralBackground1": theme.colorNeutralBackground1,
        } as React.CSSProperties
      }
    >
      <header className={styles.header} aria-label="站点导航">
        <Link className={styles.brand} href="#top" appearance="subtle" aria-label="回到首页">
          <span className={styles.brandMark}>VK</span>
          <span className={styles.brandText}>Character Log</span>
        </Link>
        <nav className={styles.nav} aria-label="主要导航">
          <Link
            className={`${styles.navLink} ${
              activeSection === "characters" ? styles.navLinkActive : ""
            }`}
            href="#characters"
            appearance="subtle"
            onClick={() => setActiveSection("characters")}
            aria-current={activeSection === "characters" ? "page" : undefined}
            style={{
              borderBottom:
                activeSection === "characters" ? "3px solid #c6bae0" : "3px solid transparent",
              color: activeSection === "characters" ? theme.colorNeutralForeground1 : undefined,
            }}
          >
            原创角色
          </Link>
          <Link
            className={`${styles.navLink} ${activeSection === "posts" ? styles.navLinkActive : ""}`}
            href="#posts"
            appearance="subtle"
            onClick={() => setActiveSection("posts")}
            aria-current={activeSection === "posts" ? "page" : undefined}
            style={{
              borderBottom:
                activeSection === "posts" ? "3px solid #c6bae0" : "3px solid transparent",
              color: activeSection === "posts" ? theme.colorNeutralForeground1 : undefined,
            }}
          >
            个人贴文
          </Link>
          <Link
            className={`${styles.navLink} ${activeSection === "about" ? styles.navLinkActive : ""}`}
            href="#about"
            appearance="subtle"
            onClick={() => setActiveSection("about")}
            aria-current={activeSection === "about" ? "page" : undefined}
            style={{
              borderBottom:
                activeSection === "about" ? "3px solid #c6bae0" : "3px solid transparent",
              color: activeSection === "about" ? theme.colorNeutralForeground1 : undefined,
            }}
          >
            关于
          </Link>
        </nav>
        <Button
          className={styles.themeButton}
          appearance="subtle"
          icon={mode === "dark" ? <WeatherSunny24Regular /> : <DarkTheme24Regular />}
          onClick={toggleTheme}
          aria-label={mode === "dark" ? "切换亮色模式" : "切换暗色模式"}
          title={mode === "dark" ? "切换亮色模式" : "切换暗色模式"}
        />
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <img className={styles.heroReferenceOne} src={webModuleOne} alt="" aria-hidden="true" />
          <img className={styles.heroReferenceTwo} src={webModuleTwo} alt="" aria-hidden="true" />
          <div className={styles.heroOverlay} />
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <div className={styles.heroContentInner}>
                <Text as="p" className={styles.eyebrow}>
                  Personal Identity System
                </Text>
                <h1 id="hero-title" className={styles.heroTitle}>
                  VK Character Log
                </h1>
                <Text as="p" className={styles.heroCopy}>
                  像桌布一样安静铺开，像四格手账一样收纳日常：这里存放原创角色、人设档案、
                  世界观碎片和创作贴文。
                </Text>
                <div className={styles.heroMetaRow} aria-label="博客气质关键词">
                  <Badge className={styles.heroTag} appearance="tint">
                    紫色身份感
                  </Badge>
                  <Badge className={styles.heroTag} appearance="tint">
                    绿色内容框
                  </Badge>
                  <Badge className={styles.heroTag} appearance="tint">
                    手账分格
                  </Badge>
                </div>
                <div className={styles.heroActions}>
                  <Button
                    as="a"
                    href="#characters"
                    appearance="primary"
                    icon={<Person24Regular />}
                    onClick={() => setActiveSection("characters")}
                  >
                    浏览角色
                  </Button>
                  <Button
                    as="a"
                    href="#posts"
                    appearance="secondary"
                    icon={<BookOpen24Regular />}
                    onClick={() => setActiveSection("posts")}
                  >
                    阅读贴文
                  </Button>
                </div>
              </div>
            </div>

            <aside className={styles.visualBoard} aria-label="主页内容分格">
              <div className={styles.boardRibbon} aria-hidden="true" />
              <div className={styles.boardHeader}>
                <Text as="p" className={styles.boardTitle}>
                  Life Panels
                </Text>
                <Text className={styles.boardCount}>04</Text>
              </div>
              <div className={styles.frameGrid}>
                <a
                  className={`${styles.framePanel} ${styles.framePanelTall}`}
                  href="#characters"
                  onClick={() => setActiveSection("characters")}
                >
                  <span className={styles.paperLines} aria-hidden="true" />
                  <span className={styles.frameKicker}>Character File</span>
                  <h2 className={styles.frameTitle}>原创角色档案</h2>
                  <Text className={styles.frameCopy}>
                    主线、支线与世界观角色，以可继续补完的档案形式收纳。
                  </Text>
                </a>
                <a
                  className={styles.framePanel}
                  href="#posts"
                  onClick={() => setActiveSection("posts")}
                >
                  <span className={styles.frameKicker}>Daily Notes</span>
                  <h2 className={styles.frameTitle}>个人贴文</h2>
                  <Text className={styles.frameCopy}>短札、绘图记录和设定推进。</Text>
                </a>
                <a
                  className={styles.framePanel}
                  href="#about"
                  onClick={() => setActiveSection("about")}
                >
                  <span className={styles.frameKicker}>World View</span>
                  <h2 className={styles.frameTitle}>世界观索引</h2>
                  <Text className={styles.frameCopy}>把零散灵感整理成可回访的入口。</Text>
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.introBand}`} aria-label="博客概览">
          <div className={`${styles.sectionInner} ${styles.statsGrid}`}>
            {[
              ["06", "角色档案"],
              ["18", "创作贴文"],
              ["04", "世界观分区"],
            ].map(([value, label]) => (
              <article className={styles.stat} key={label}>
                <span className={styles.statValue}>{value}</span>
                <Text className={styles.statLabel}>{label}</Text>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="characters" aria-labelledby="characters-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <Text as="p" className={styles.eyebrow}>
                Character Archive
              </Text>
              <Title1 as="h2" id="characters-title">
                原创角色
              </Title1>
              <Text as="p" className={styles.headingCopy}>
                用 Fluent UI v9 的卡片、标签和主题令牌记录角色定位、气质关键词和最新设定状态。
              </Text>
            </div>

            <div className={styles.characterGrid}>
              {characters.map((character) => (
                <Card
                  key={character.name}
                  className={`${styles.card} ${character.featured ? styles.featuredCard : ""}`}
                  style={{ "--artColor": character.color } as React.CSSProperties}
                >
                  <div
                    className={`${styles.characterArt} ${
                      character.featured ? styles.featuredArt : ""
                    }`}
                    aria-hidden="true"
                  />
                  <div className={styles.cardBody}>
                    <Badge appearance="tint">{character.type}</Badge>
                    <CardHeader header={<Title3 as="h3">{character.name}</Title3>} />
                    <Text as="p" className={styles.cardCopy}>
                      {character.summary}
                    </Text>
                    {character.featured ? (
                      <dl className={styles.metaList}>
                        <div>
                          <dt className={styles.metaTerm}>关键词</dt>
                          <dd className={styles.metaDefinition}>{character.keywords}</dd>
                        </div>
                        <div>
                          <dt className={styles.metaTerm}>状态</dt>
                          <dd className={styles.metaDefinition}>{character.status}</dd>
                        </div>
                      </dl>
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`} id="posts" aria-labelledby="posts-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeadingSplit}>
              <div>
                <Text as="p" className={styles.eyebrow}>
                  Personal Posts
                </Text>
                <Title1 as="h2" id="posts-title">
                  个人贴文
                </Title1>
                <Text as="p" className={styles.headingCopy}>
                  短札、设定片段、绘图记录和角色关系梳理。
                </Text>
              </div>
              <TabList
                className={styles.tabList}
                selectedValue={filter}
                onTabSelect={(_: SelectTabEvent, data: SelectTabData) =>
                  setFilter(String(data.value))
                }
                aria-label="贴文分类"
              >
                <Tab value="all">全部</Tab>
                <Tab value="设定">设定</Tab>
                <Tab value="札记">札记</Tab>
                <Tab value="绘图">绘图</Tab>
              </TabList>
            </div>

            <div className={styles.postList}>
              {filteredPosts.map((post) => (
                <Card key={post.title} className={styles.postCard}>
                  <div className={styles.postDate}>
                    <span className={styles.postDay}>{post.day}</span>
                    <span className={styles.postMonth}>{post.month}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.postMeta}>
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardHeader header={<Subtitle1 as="h3">{post.title}</Subtitle1>} />
                    <Text as="p" className={styles.cardCopy}>
                      {post.excerpt}
                    </Text>
                    <CardFooter>
                      <Button appearance="subtle" icon={<PenSparkle24Regular />}>
                        阅读
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="about" aria-labelledby="about-title">
          <div className={`${styles.sectionInner} ${styles.aboutGrid}`}>
            <div className={styles.sectionHeading}>
              <Text as="p" className={styles.eyebrow}>
                About
              </Text>
              <Title1 as="h2" id="about-title">
                关于这个博客
              </Title1>
              <Text as="p" className={styles.headingCopy}>
                这里适合放你的个人简介、创作偏好、更新频率，以及角色授权或转载说明。页面已经改为
                React + Fluent UI v9，构建后仍可部署到 GitHub Pages。
              </Text>
            </div>
            <Card className={styles.card}>
              <div className={styles.cardBody}>
                <CardHeader
                  image={<Sparkle24Regular />}
                  header={<Title2 as="p">站点信息</Title2>}
                />
                <ul className={styles.profileList}>
                  <li className={styles.profileItem}>
                    <Text>主题色</Text>
                    <Text weight="semibold">#c6bae0</Text>
                  </li>
                  <li className={styles.profileItem}>
                    <Text>组件库</Text>
                    <Text weight="semibold">Fluent UI v9</Text>
                  </li>
                  <li className={styles.profileItem}>
                    <Text>发布方式</Text>
                    <Text weight="semibold">GitHub Pages</Text>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Text weight="semibold">VK Character Log</Text>
        <Button as="a" href="#top" appearance="subtle" icon={<ArrowUp24Regular />}>
          返回顶部
        </Button>
      </footer>
    </FluentProvider>
  );
}
