import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
  Tooltip,
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
  Image24Regular,
  Person24Regular,
  Share24Regular,
  Sparkle24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";
import characterCollage from "../Image/Snipaste_2026-07-23_16-09-13.png";
import characterPortrait from "../Image/Snipaste_2026-07-23_16-22-56.png";
import characterScene from "../Image/Snipaste_2026-07-23_16-23-18.png";

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
    right: 0,
    left: 0,
    minHeight: "72px",
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) auto minmax(160px, 1fr)",
    alignItems: "center",
    columnGap: "18px",
    padding: "12px clamp(18px, 4vw, 54px)",
    backgroundColor: "color-mix(in srgb, var(--colorNeutralBackground1) 82%, transparent)",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backdropFilter: "blur(22px) saturate(1.2)",
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
    width: "40px",
    height: "40px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "8px",
    backgroundColor: "#c6bae0",
    color: "#211936",
    fontWeight: tokens.fontWeightBold,
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
    columnGap: "clamp(10px, 2.6vw, 24px)",
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 860px)": {
      order: 3,
      gridColumn: "1 / -1",
      width: "100%",
      justifyContent: "center",
      columnGap: "22px",
    },
    "@media (max-width: 420px)": {
      justifyContent: "space-between",
      columnGap: "10px",
    },
  },
  navLink: {
    position: "relative",
    minHeight: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    ...shorthands.padding("0", "2px"),
    transitionDuration: tokens.durationNormal,
    transitionProperty: "color",
    transitionTimingFunction: tokens.curveEasyEase,
    "::after": {
      content: '""',
      position: "absolute",
      right: "2px",
      bottom: "2px",
      left: "2px",
      height: "3px",
      borderRadius: "999px",
      backgroundColor: "#c6bae0",
      opacity: 0,
      transform: "scaleX(0.68)",
      transformOrigin: "center",
      transitionDuration: tokens.durationNormal,
      transitionProperty: "opacity, transform",
      transitionTimingFunction: tokens.curveEasyEase,
    },
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  navLinkActive: {
    color: tokens.colorNeutralForeground1,
    "::after": {
      opacity: 1,
      transform: "scaleX(1)",
    },
  },
  headerActions: {
    justifySelf: "end",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  actionButton: {
    minWidth: "40px",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
  },
  themeButton: {
    color: tokens.colorBrandForeground1,
  },
  hero: {
    position: "relative",
    minHeight: "90vh",
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    isolation: "isolate",
    padding: "calc(72px + 48px) clamp(20px, 6vw, 88px) 76px",
    backgroundColor: "var(--heroBase)",
    backgroundImage:
      "linear-gradient(135deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(225deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(45deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(315deg, var(--heroDiamond) 25%, var(--heroBase) 25%)",
    backgroundPosition: "42px 0, 42px 0, 0 0, 0 0",
    backgroundSize: "84px 84px",
    "@media (max-width: 860px)": {
      minHeight: "auto",
      paddingTop: "38px",
      paddingBottom: "48px",
    },
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    background:
      "linear-gradient(90deg, var(--heroOverlayStrong) 0%, var(--heroOverlayMid) 48%, var(--heroOverlaySoft) 100%), linear-gradient(180deg, transparent 72%, var(--colorNeutralBackground1) 100%)",
    "@media (max-width: 860px)": {
      background:
        "linear-gradient(180deg, var(--heroOverlayStrong) 0%, var(--heroOverlayMid) 62%, var(--colorNeutralBackground1) 100%)",
    },
  },
  heroLayout: {
    position: "relative",
    zIndex: 1,
    width: "min(1180px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.82fr) minmax(360px, 0.9fr)",
    alignItems: "center",
    gap: "clamp(28px, 5vw, 68px)",
    "@media (max-width: 980px)": {
      gridTemplateColumns: "1fr",
      alignItems: "start",
    },
  },
  heroContent: {
    position: "relative",
    maxWidth: "610px",
    padding: "clamp(24px, 3.4vw, 40px)",
    borderRadius: "8px",
    backgroundColor: "var(--heroCardBackground)",
    ...shorthands.border("1px", "solid", "var(--heroCardStroke)"),
    boxShadow: "0 22px 52px rgba(101, 86, 138, 0.14)",
    backdropFilter: "blur(18px) saturate(1.12)",
    "::before": {
      content: '""',
      position: "absolute",
      inset: "12px",
      pointerEvents: "none",
      borderRadius: "8px",
      ...shorthands.border("1px", "dashed", "rgba(157, 145, 191, 0.34)"),
    },
  },
  heroContentInner: {
    position: "relative",
    zIndex: 1,
  },
  eyebrow: {
    marginBottom: "12px",
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
  },
  heroTitle: {
    maxWidth: "11ch",
    marginTop: 0,
    marginBottom: 0,
    fontSize: "clamp(3.2rem, 7vw, 6rem)",
    lineHeight: "0.94",
    overflowWrap: "anywhere",
  },
  heroCopy: {
    maxWidth: "40ch",
    marginTop: "22px",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase500,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "28px",
  },
  heroMedia: {
    display: "grid",
    gap: "14px",
    minWidth: 0,
  },
  heroImageFrame: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: "var(--mediaBackground)",
    ...shorthands.border("1px", "solid", "var(--heroCardStroke)"),
    boxShadow: "0 24px 54px rgba(101, 86, 138, 0.16)",
    aspectRatio: "4 / 3",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
    filter: "saturate(0.94) contrast(0.98)",
  },
  heroImageLabel: {
    position: "absolute",
    left: "16px",
    bottom: "16px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: "var(--imageLabelBackground)",
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow4,
    backdropFilter: "blur(12px)",
  },
  heroGallery: {
    display: "grid",
    gridTemplateColumns: "0.88fr 1fr",
    gap: "14px",
    "@media (max-width: 540px)": {
      gridTemplateColumns: "1fr",
    },
  },
  heroThumb: {
    display: "grid",
    gridTemplateColumns: "88px minmax(0, 1fr)",
    gap: "12px",
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "var(--thumbBackground)",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    boxShadow: tokens.shadow4,
  },
  heroThumbImage: {
    width: "88px",
    height: "88px",
    display: "block",
    objectFit: "cover",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  heroThumbTitle: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
  },
  heroThumbCopy: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
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
  sectionHeading: {
    marginBottom: "34px",
  },
  sectionHeadingStack: {
    display: "grid",
    gap: "8px",
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
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  sectionTitleIcon: {
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
    maxWidth: "62ch",
    color: tokens.colorNeutralForeground2,
  },
  characterGrid: {
    display: "grid",
    gridTemplateColumns: "360px minmax(0, 1fr)",
    gap: "22px",
    alignItems: "start",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  characterProfile: {
    position: "sticky",
    top: "96px",
    "@media (max-width: 900px)": {
      position: "static",
    },
  },
  card: {
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: tokens.shadow8,
  },
  characterImage: {
    width: "100%",
    aspectRatio: "4 / 5",
    display: "block",
    objectFit: "cover",
    objectPosition: "center top",
    backgroundColor: "var(--imageSurface)",
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
  illustrationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
  illustrationCard: {
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    boxShadow: tokens.shadow8,
  },
  illustrationPreview: {
    position: "relative",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    backgroundColor: "var(--imageSurface)",
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
  },
  illustrationMeta: {
    position: "absolute",
    top: "12px",
    right: "12px",
    left: "12px",
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  illustrationBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 8px",
    borderRadius: "8px",
    backgroundColor: "var(--imageLabelBackground)",
    backdropFilter: "blur(10px)",
  },
  illustrationContent: {
    display: "grid",
    gap: "8px",
    padding: "18px",
  },
  illustrationHeading: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  illustrationIcon: {
    width: "30px",
    height: "30px",
    flexShrink: 0,
    display: "inline-grid",
    placeItems: "center",
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
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
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    "@media (max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
  postCard: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: tokens.shadow8,
  },
  postDate: {
    minHeight: "118px",
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: "14px",
    padding: "18px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.62), transparent), var(--postAccent)",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
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
  postBody: {
    minHeight: "220px",
    display: "grid",
    alignContent: "space-between",
    padding: "22px",
  },
  postMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  postExcerpt: {
    color: tokens.colorNeutralForeground2,
    marginBottom: "18px",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 360px",
    gap: "34px",
    alignItems: "start",
    "@media (max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
  aboutLead: {
    maxWidth: "62ch",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase500,
  },
  aboutPoints: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "24px",
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
    },
  },
  aboutPoint: {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
  },
  aboutPointTitle: {
    marginBottom: "8px",
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
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
  profileValue: {
    textAlign: "right",
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
    accent: "#c6bae0",
    title: "璃音的视觉关键词：淡紫、冰蓝与柔光",
    excerpt: "从处理后的角色图中整理出稳定的视觉锚点：紫发、白色服装、浅蓝环境和手账式边框。",
  },
  {
    category: "札记",
    day: "28",
    month: "May",
    readTime: "2 min read",
    accent: "#cfe9d2",
    title: "把四格拼贴整理成角色索引",
    excerpt: "拼贴图更适合承担归档入口：它能同时展示表情、姿态、日常场景和设定碎片。",
  },
  {
    category: "绘图",
    day: "15",
    month: "May",
    readTime: "3 min read",
    accent: "#b8cbe4",
    title: "场景立绘里的轻盈感如何延续到页面",
    excerpt: "页面用低饱和紫、冰蓝和留白承接角色气质，让博客像角色档案而不是普通作品列表。",
  },
] as const;

const character = {
  name: "璃音",
  type: "主线角色",
  color: "#c6bae0",
  summary: "紫发、浅色服装和冷调背景构成她的第一印象；整体气质柔和、安静，适合用档案卡、拼贴和短札记慢慢补完。",
  keywords: "淡紫、冰蓝、白色服装、手账拼贴",
  status: "公开页整理中",
};

const illustrations = [
  {
    title: "四格拼贴",
    tone: "Archive Board",
    image: characterCollage,
    alt: "璃音多张处理后插图组成的四格拼贴",
    caption: "作为首页索引使用，负责快速展示角色的多个状态与页面的手账式组织方式。",
  },
  {
    title: "肖像立绘",
    tone: "Portrait",
    image: characterPortrait,
    alt: "璃音的处理后肖像图",
    caption: "紫色头发和浅色服装是主要识别点，适合放在角色档案卡中承担身份锚点。",
  },
  {
    title: "场景气质",
    tone: "Scene",
    image: characterScene,
    alt: "璃音站在淡蓝紫色场景中的处理后插图",
    caption: "浅蓝与淡紫背景让角色更像处在柔光世界里，适合延展为博客的空间氛围。",
  },
] as const;

const aboutPoints = [
  {
    title: "角色档案",
    copy: "先集中维护璃音的核心设定、关键词和公开展示素材。",
  },
  {
    title: "插图归档",
    copy: "同一角色的拼贴、肖像和场景图按阶段补充，不混成杂乱图库。",
  },
  {
    title: "贴文记录",
    copy: "贴文用于记录修改动机、视觉观察和设定推进，不追求一次定稿。",
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
  const [shareHint, setShareHint] = useState("分享此页");
  const navigationLockUntil = useRef(0);

  const theme = mode === "dark" ? darkTheme : lightTheme;
  const filteredPosts = useMemo(
    () => posts.filter((post) => filter === "all" || post.category === filter),
    [filter],
  );

  useEffect(() => {
    const sectionIds = ["characters", "posts", "about"];
    let frame = 0;

    const updateActiveSection = () => {
      if (Date.now() < navigationLockUntil.current) {
        return;
      }

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

  const navigateToSection = (section: string) => {
    navigationLockUntil.current = Date.now() + 900;
    setActiveSection(section);
  };

  const sharePage = async () => {
    const sharePayload = {
      title: "VK Character Log",
      text: "璃音原创角色档案",
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
      setShareHint("链接已复制");
      window.setTimeout(() => setShareHint("分享此页"), 1600);
    } catch {
      setShareHint("分享此页");
    }
  };

  const navItems = [
    { id: "characters", label: "原创角色" },
    { id: "posts", label: "个人贴文" },
    { id: "about", label: "关于" },
  ] as const;

  return (
    <FluentProvider
      theme={theme}
      className={styles.shell}
      style={
        {
          "--heroOverlayStrong":
            mode === "dark" ? "rgba(18, 15, 26, 0.92)" : "rgba(248, 244, 255, 0.86)",
          "--heroOverlayMid":
            mode === "dark" ? "rgba(18, 15, 26, 0.62)" : "rgba(248, 244, 255, 0.38)",
          "--heroOverlaySoft":
            mode === "dark" ? "rgba(18, 15, 26, 0.24)" : "rgba(248, 244, 255, 0.04)",
          "--heroBase": mode === "dark" ? "#181523" : "#e8def5",
          "--heroDiamond": mode === "dark" ? "rgba(198, 186, 224, 0.06)" : "rgba(255, 255, 255, 0.25)",
          "--heroCardBackground":
            mode === "dark" ? "rgba(30, 26, 43, 0.72)" : "rgba(255, 255, 255, 0.66)",
          "--heroCardStroke":
            mode === "dark" ? "rgba(222, 213, 239, 0.22)" : "rgba(255, 255, 255, 0.72)",
          "--mediaBackground": mode === "dark" ? "rgba(25, 22, 36, 0.74)" : "rgba(255,255,255,0.54)",
          "--thumbBackground": mode === "dark" ? "rgba(25, 22, 36, 0.78)" : "rgba(255,255,255,0.68)",
          "--imageLabelBackground":
            mode === "dark" ? "rgba(25, 22, 36, 0.78)" : "rgba(255,255,255,0.74)",
          "--imageSurface": mode === "dark" ? "rgba(198, 186, 224, 0.16)" : "rgba(232, 222, 245, 0.58)",
          "--colorNeutralBackground1": theme.colorNeutralBackground1,
        } as CSSProperties
      }
    >
      <header className={styles.header} aria-label="站点导航">
        <Link className={styles.brand} href="#top" appearance="subtle" aria-label="回到首页">
          <span className={styles.brandMark}>VK</span>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>VikaKumaChR</span>
            <span className={styles.brandMeta}>Character Log</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="主要导航">
          {navItems.map((item) => (
            <Link
              key={item.id}
              className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ""}`}
              href={`#${item.id}`}
              appearance="subtle"
              onClick={() => navigateToSection(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions} aria-label="页面操作">
          <Tooltip content={shareHint} relationship="label">
            <Button
              className={styles.actionButton}
              appearance="subtle"
              icon={<Share24Regular />}
              onClick={sharePage}
              aria-label={shareHint}
            />
          </Tooltip>
          <Tooltip content={mode === "dark" ? "切换到亮色" : "切换到暗色"} relationship="label">
            <Button
              className={`${styles.actionButton} ${styles.themeButton}`}
              appearance="subtle"
              icon={mode === "dark" ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
              onClick={toggleTheme}
              aria-pressed={mode === "dark"}
              aria-label={mode === "dark" ? "切换到亮色" : "切换到暗色"}
            />
          </Tooltip>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroOverlay} />
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <div className={styles.heroContentInner}>
                <Text as="p" className={styles.eyebrow}>
                  Original Character Archive
                </Text>
                <h1 id="hero-title" className={styles.heroTitle}>
                  璃音
                  <br />
                  Archive
                </h1>
                <Text as="p" className={styles.heroCopy}>
                  以淡紫、冰蓝和手账式拼贴为视觉线索，整理同一个原创角色的公开档案、插图阶段和创作贴文。
                </Text>
                <div className={styles.heroActions}>
                  <Button
                    as="a"
                    href="#characters"
                    appearance="primary"
                    icon={<Person24Regular />}
                    onClick={() => navigateToSection("characters")}
                  >
                    浏览角色
                  </Button>
                  <Button
                    as="a"
                    href="#posts"
                    appearance="secondary"
                    icon={<BookOpen24Regular />}
                    onClick={() => navigateToSection("posts")}
                  >
                    阅读贴文
                  </Button>
                </div>
              </div>
            </div>

            <aside className={styles.heroMedia} aria-label="璃音视觉档案预览">
              <div className={styles.heroImageFrame}>
                <img className={styles.heroImage} src={characterScene} alt="璃音的淡蓝紫场景插图" />
                <span className={styles.heroImageLabel}>
                  <Image24Regular />
                  场景气质 / Pastel scene
                </span>
              </div>
              <div className={styles.heroGallery}>
                <article className={styles.heroThumb}>
                  <img className={styles.heroThumbImage} src={characterPortrait} alt="璃音肖像图缩略图" />
                  <div>
                    <p className={styles.heroThumbTitle}>紫发肖像</p>
                    <Text as="p" className={styles.heroThumbCopy}>
                      角色识别点集中在发色、浅色服装和柔和表情。
                    </Text>
                  </div>
                </article>
                <article className={styles.heroThumb}>
                  <img className={styles.heroThumbImage} src={characterCollage} alt="璃音拼贴图缩略图" />
                  <div>
                    <p className={styles.heroThumbTitle}>拼贴索引</p>
                    <Text as="p" className={styles.heroThumbCopy}>
                      适合承载多张插图、日常片段和后续补档入口。
                    </Text>
                  </div>
                </article>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section} id="characters" aria-labelledby="characters-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitleIcon} aria-hidden="true">
                  <Person24Regular />
                </span>
                <Title1 as="h2" id="characters-title">
                  原创角色：璃音
                </Title1>
              </div>
              <Text as="p" className={styles.headingCopy}>
                当前仅展示一个原创角色，页面重点放在角色档案与多张处理后插图的阶段性归档。
              </Text>
            </div>

            <div className={styles.characterGrid}>
              <Card className={`${styles.card} ${styles.characterProfile}`}>
                <img className={styles.characterImage} src={characterPortrait} alt="璃音的处理后肖像图" />
                <div className={styles.cardBody}>
                  <Badge appearance="tint">{character.type}</Badge>
                  <CardHeader header={<Title3 as="h3">{character.name}</Title3>} />
                  <Text as="p" className={styles.cardCopy}>
                    {character.summary}
                  </Text>
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
                </div>
              </Card>

              <div className={styles.illustrationGrid} aria-label="璃音插图展示">
                {illustrations.map((item, index) => (
                  <article key={item.title} className={styles.illustrationCard}>
                    <div className={styles.illustrationPreview}>
                      <img className={styles.illustrationImage} src={item.image} alt={item.alt} />
                      <div className={styles.illustrationMeta}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className={styles.illustrationBadge}>
                          <Image24Regular />
                          {item.tone}
                        </span>
                      </div>
                    </div>
                    <div className={styles.illustrationContent}>
                      <div className={styles.illustrationHeading}>
                        <span className={styles.illustrationIcon} aria-hidden="true">
                          <Image24Regular />
                        </span>
                        <Title3 as="h3">{item.title}</Title3>
                      </div>
                      <Text as="p" className={styles.cardCopy}>
                        {item.caption}
                      </Text>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`} id="posts" aria-labelledby="posts-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeadingSplit}>
              <div className={styles.sectionHeadingStack}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionTitleIcon} aria-hidden="true">
                    <BookOpen24Regular />
                  </span>
                  <Title1 as="h2" id="posts-title">
                    个人贴文
                  </Title1>
                </div>
                <Text as="p" className={styles.headingCopy}>
                  贴文区改成围绕璃音展开：设定、札记和绘图记录都服务于同一个角色档案。
                </Text>
              </div>
              <TabList
                className={styles.tabList}
                selectedValue={filter}
                onTabSelect={(_: SelectTabEvent, data: SelectTabData) => setFilter(String(data.value))}
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
                <Card
                  key={post.title}
                  className={styles.postCard}
                  style={{ "--postAccent": post.accent } as CSSProperties}
                >
                  <div className={styles.postDate}>
                    <span className={styles.postDay}>{post.day}</span>
                    <span className={styles.postMonth}>{post.month}</span>
                  </div>
                  <div className={styles.postBody}>
                    <div>
                      <div className={styles.postMeta}>
                        <span>{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardHeader header={<Subtitle1 as="h3">{post.title}</Subtitle1>} />
                      <Text as="p" className={styles.postExcerpt}>
                        {post.excerpt}
                      </Text>
                    </div>
                    <CardFooter>
                      <Button appearance="subtle" icon={<BookOpen24Regular />}>
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
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitleIcon} aria-hidden="true">
                  <Sparkle24Regular />
                </span>
                <Title1 as="h2" id="about-title">
                  关于这个博客
                </Title1>
              </div>
              <Text as="p" className={styles.aboutLead}>
                这里是 VikaKumaChR 的原创角色整理页。当前公开页只展示处理后的角色资料图和整理文字，用更克制的结构记录璃音的设定、插图和创作更新。
              </Text>
              <div className={styles.aboutPoints}>
                {aboutPoints.map((point) => (
                  <article className={styles.aboutPoint} key={point.title}>
                    <Text as="p" className={styles.aboutPointTitle}>
                      {point.title}
                    </Text>
                    <Text as="p" className={styles.cardCopy}>
                      {point.copy}
                    </Text>
                  </article>
                ))}
              </div>
            </div>
            <Card className={styles.card}>
              <div className={styles.cardBody}>
                <CardHeader
                  image={<Sparkle24Regular />}
                  header={<Title2 as="p">创作索引</Title2>}
                  description="角色、插图与贴文的公开整理入口"
                />
                <ul className={styles.profileList}>
                  <li className={styles.profileItem}>
                    <Text>主要内容</Text>
                    <Text className={styles.profileValue} weight="semibold">
                      璃音 / 插图 / 贴文
                    </Text>
                  </li>
                  <li className={styles.profileItem}>
                    <Text>更新节奏</Text>
                    <Text className={styles.profileValue} weight="semibold">
                      随创作进度补完
                    </Text>
                  </li>
                  <li className={styles.profileItem}>
                    <Text>转载说明</Text>
                    <Text className={styles.profileValue} weight="semibold">
                      请先联系确认
                    </Text>
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
