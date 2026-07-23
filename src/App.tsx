import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  type Theme,
} from "@fluentui/react-components";
import {
  ArrowUp24Regular,
  BookOpen24Regular,
  DocumentBulletList24Regular,
  GlobeShield24Regular,
  Image24Regular,
  PanelRightGallery24Regular,
  Person24Regular,
  Share24Regular,
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
    backgroundColor: "color-mix(in srgb, var(--colorNeutralBackground1) 86%, transparent)",
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
    minHeight: "100vh",
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    scrollMarginTop: "72px",
    padding: "calc(72px + 52px) clamp(20px, 6vw, 88px) 72px",
    backgroundColor: "var(--heroBase)",
    backgroundImage:
      "linear-gradient(135deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(225deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(45deg, var(--heroDiamond) 25%, transparent 25%), linear-gradient(315deg, var(--heroDiamond) 25%, var(--heroBase) 25%)",
    backgroundPosition: "42px 0, 42px 0, 0 0, 0 0",
    backgroundSize: "84px 84px",
    "@media (max-width: 860px)": {
      minHeight: "auto",
      paddingTop: "42px",
      paddingBottom: "52px",
    },
  },
  storySpread: {
    width: "min(1180px, 100%)",
    marginRight: "auto",
    marginLeft: "auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.95fr) minmax(360px, 0.8fr)",
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: "var(--storySurface)",
    ...shorthands.border("1px", "solid", "var(--storyStroke)"),
    boxShadow: "0 28px 70px rgba(101, 86, 138, 0.16)",
    "@media (max-width: 920px)": {
      gridTemplateColumns: "1fr",
    },
  },
  storyCopy: {
    display: "grid",
    alignContent: "center",
    gap: "24px",
    padding: "clamp(26px, 5vw, 58px)",
  },
  eyebrow: {
    margin: 0,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
  },
  heroTitle: {
    maxWidth: "12ch",
    marginTop: 0,
    marginBottom: 0,
    fontSize: "clamp(3rem, 7vw, 6.4rem)",
    lineHeight: "0.96",
    overflowWrap: "anywhere",
  },
  heroLead: {
    maxWidth: "48ch",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  storySteps: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "10px",
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
  storyStep: {
    minHeight: "104px",
    display: "grid",
    alignContent: "space-between",
    padding: "14px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
  },
  storyStepIndex: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightBold,
  },
  storyStepText: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  storyVisual: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    minHeight: "560px",
    backgroundColor: "var(--imageSurface)",
    ...shorthands.borderLeft("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 920px)": {
      minHeight: "420px",
      ...shorthands.borderLeft("0", "solid", "transparent"),
      ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
    },
  },
  storyImage: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
    filter: "saturate(0.94) contrast(0.98)",
  },
  storyCaption: {
    display: "grid",
    gap: "4px",
    padding: "18px",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
  },
  section: {
    scrollMarginTop: "0px",
    padding: "clamp(44px, 5vw, 64px) clamp(20px, 5vw, 72px)",
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
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: "28px",
    marginBottom: "34px",
    "@media (max-width: 820px)": {
      alignItems: "start",
      flexDirection: "column",
    },
  },
  sectionTitleCluster: {
    display: "grid",
    gap: "8px",
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
  chartsBoard: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 332px",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    boxShadow: tokens.shadow8,
    "@media (max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
  galleryViewport: {
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) auto",
    minHeight: "548px",
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: "var(--imageSurface)",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 620px)": {
      minHeight: "440px",
    },
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
  },
  galleryCaption: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "18px",
    alignItems: "end",
    padding: "20px",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
    "@media (max-width: 620px)": {
      gridTemplateColumns: "1fr",
    },
  },
  galleryCaptionText: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
  galleryTitle: {
    display: "block",
    marginTop: "6px",
    marginBottom: "8px",
  },
  drawerList: {
    display: "grid",
    gridAutoRows: "1fr",
    gap: "8px",
    minHeight: 0,
    "@media (max-width: 860px)": {
      gridTemplateColumns: "repeat(3, minmax(244px, 1fr))",
      overflowX: "auto",
      paddingBottom: "2px",
    },
  },
  drawerButton: {
    width: "100%",
    minHeight: "176px",
    display: "grid",
    gridTemplateColumns: "96px minmax(0, 1fr)",
    alignItems: "stretch",
    gap: "12px",
    padding: "10px",
    borderRadius: "8px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    cursor: "pointer",
    textAlign: "left",
    transitionDuration: tokens.durationNormal,
    transitionProperty: "background-color, border-color, transform",
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
    "@media (max-width: 860px)": {
      minHeight: "148px",
    },
  },
  drawerButtonActive: {
    backgroundColor: "var(--drawerActive)",
    ...shorthands.borderColor("#c6bae0"),
  },
  drawerThumb: {
    width: "96px",
    height: "100%",
    display: "block",
    objectFit: "cover",
    borderRadius: "8px",
    backgroundColor: "var(--imageSurface)",
  },
  drawerText: {
    minWidth: 0,
    display: "grid",
    alignContent: "center",
    gap: "6px",
  },
  drawerMeta: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    textTransform: "uppercase",
  },
  drawerCopy: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    "@media (max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
  blogCard: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: tokens.shadow8,
  },
  blogPreview: {
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
    minHeight: "250px",
    display: "grid",
    alignContent: "space-between",
    gap: "18px",
    padding: "18px",
  },
  blogMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  cardCopy: {
    color: tokens.colorNeutralForeground2,
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
});

const charts = [
  {
    id: "collage",
    title: "四格拼貼",
    meta: "Archive drawer",
    image: characterCollage,
    alt: "璃音多張處理後插圖組成的四格拼貼",
    summary: "多張素材先收進同一入口，適合作為角色檔案總覽。",
    detail: "四格拼貼負責建立角色檔案的第一層：表情、姿態、日常片段與後續補檔線索先被收束在一起。",
  },
  {
    id: "portrait",
    title: "肖像立繪",
    meta: "Identity",
    image: characterPortrait,
    alt: "璃音的處理後肖像圖",
    summary: "紫髮、淺色服裝和柔和表情是最穩定的角色識別點。",
    detail: "肖像圖負責承擔身份錨點，是檔案抽屜中的主要圖件。",
  },
  {
    id: "scene",
    title: "場景氣質",
    meta: "World tone",
    image: characterScene,
    alt: "璃音站在淡藍紫色場景中的處理後插圖",
    summary: "淡藍背景、低飽和紫和留白共同形成安靜、柔光的敘事空間。",
    detail: "場景圖承接首頁的故事感，讓角色資料像章節一樣逐步展開。",
  },
] as const;

const posts = [
  {
    category: "設計札記",
    date: "06 Jun",
    readTime: "4 min read",
    image: characterScene,
    title: "璃音的頁面為什麼需要故事入口",
    excerpt: "首頁不再只放照片，而是把角色氣質、素材線索和閱讀動線組成一個開場敘事。",
  },
  {
    category: "圖件整理",
    date: "28 May",
    readTime: "2 min read",
    image: characterCollage,
    title: "拼貼圖件的歸檔方式",
    excerpt: "同一角色的多張圖件被放進同一組索引，方便之後補充表情、姿態與日常片段。",
  },
  {
    category: "角色觀察",
    date: "15 May",
    readTime: "3 min read",
    image: characterPortrait,
    title: "紫髮、冰藍與白色服裝的識別作用",
    excerpt: "從處理後素材裡提取穩定元素，用於角色檔案、貼文封面與後續規範文字。",
  },
] as const;

const regulation = [
  { term: "原作者", value: "VikaKumaChR" },
  { term: "角色來源", value: "個人原創角色：璃音" },
  { term: "展示範圍", value: "本頁僅展示處理後公開素材與整理文字" },
  { term: "使用聲明", value: "未經確認請勿轉載、二次分發、二改或商用" },
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
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedChart, setSelectedChart] = useState<(typeof charts)[number]["id"]>("collage");
  const [shareHint, setShareHint] = useState("分享此頁");
  const navigationLockUntil = useRef(0);

  const theme = mode === "dark" ? darkTheme : lightTheme;
  const selectedChartItem = charts.find((item) => item.id === selectedChart) ?? charts[0];

  useEffect(() => {
    const sectionIds = ["hero", "charts", "blog", "regulation"];
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
      text: "璃音原創角色部落格",
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
      setShareHint("連結已複製");
      window.setTimeout(() => setShareHint("分享此頁"), 1600);
    } catch {
      setShareHint("分享此頁");
    }
  };

  const navItems = [
    { id: "hero", label: "Hero" },
    { id: "charts", label: "Charts" },
    { id: "blog", label: "Blog" },
    { id: "regulation", label: "Regulation" },
  ] as const;

  return (
    <FluentProvider
      theme={theme}
      className={styles.shell}
      style={
        {
          "--heroBase": mode === "dark" ? "#181523" : "#e8def5",
          "--heroDiamond": mode === "dark" ? "rgba(198, 186, 224, 0.06)" : "rgba(255, 255, 255, 0.24)",
          "--storySurface": mode === "dark" ? "rgba(30, 26, 43, 0.82)" : "rgba(255, 255, 255, 0.72)",
          "--storyStroke": mode === "dark" ? "rgba(222, 213, 239, 0.22)" : "rgba(255, 255, 255, 0.78)",
          "--drawerActive": mode === "dark" ? "rgba(198, 186, 224, 0.16)" : "rgba(198, 186, 224, 0.24)",
          "--imageSurface": mode === "dark" ? "rgba(198, 186, 224, 0.16)" : "rgba(232, 222, 245, 0.58)",
          "--colorNeutralBackground1": theme.colorNeutralBackground1,
        } as CSSProperties
      }
    >
      <header className={styles.header} aria-label="站點導覽">
        <Link className={styles.brand} href="#hero" appearance="subtle" aria-label="回到 Hero">
          <span className={styles.brandMark}>VK</span>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>VikaKumaChR</span>
            <span className={styles.brandMeta}>Character Blog</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="主要導覽">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                href={`#${item.id}`}
                appearance="subtle"
                onClick={() => navigateToSection(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
                <span
                  className={`${styles.navUnderline} ${isActive ? styles.navUnderlineActive : ""}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className={styles.headerActions} aria-label="頁面操作">
          <Tooltip content={shareHint} relationship="label">
            <Button
              className={styles.actionButton}
              appearance="subtle"
              icon={<Share24Regular />}
              onClick={sharePage}
              aria-label={shareHint}
            />
          </Tooltip>
          <Tooltip content={mode === "dark" ? "切換到亮色" : "切換到暗色"} relationship="label">
            <Button
              className={`${styles.actionButton} ${styles.themeButton}`}
              appearance="subtle"
              icon={mode === "dark" ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
              onClick={toggleTheme}
              aria-pressed={mode === "dark"}
              aria-label={mode === "dark" ? "切換到亮色" : "切換到暗色"}
            />
          </Tooltip>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="hero" aria-labelledby="hero-title">
          <div className={styles.storySpread}>
            <div className={styles.storyCopy}>
              <div>
                <Text as="p" className={styles.eyebrow}>
                  Story archive / Original character
                </Text>
                <h1 id="hero-title" className={styles.heroTitle}>
                  璃音的檔案
                  <br />
                  從一張便箋展開
                </h1>
              </div>
              <Text as="p" className={styles.heroLead}>
                璃音的部落格像一只被打開的素材抽屜：第一層是柔光場景，第二層是圖件索引，第三層是每次整理背後的札記。
              </Text>
              <div className={styles.storySteps} aria-label="閱讀動線">
                <article className={styles.storyStep}>
                  <span className={styles.storyStepIndex}>01</span>
                  <p className={styles.storyStepText}>場景先建立角色的第一印象。</p>
                </article>
                <article className={styles.storyStep}>
                  <span className={styles.storyStepIndex}>02</span>
                  <p className={styles.storyStepText}>圖件再整理成可比較資料。</p>
                </article>
                <article className={styles.storyStep}>
                  <span className={styles.storyStepIndex}>03</span>
                  <p className={styles.storyStepText}>貼文記錄設定補完和創作過程。</p>
                </article>
              </div>
              <div className={styles.heroActions}>
                <Button
                  as="a"
                  href="#charts"
                  appearance="primary"
                  icon={<PanelRightGallery24Regular />}
                  onClick={() => navigateToSection("charts")}
                >
                  查看 Charts
                </Button>
                <Button
                  as="a"
                  href="#blog"
                  appearance="secondary"
                  icon={<BookOpen24Regular />}
                  onClick={() => navigateToSection("blog")}
                >
                  閱讀 Blog
                </Button>
              </div>
            </div>

            <aside className={styles.storyVisual} aria-label="璃音故事封面">
              <img className={styles.storyImage} src={characterScene} alt="璃音在淡藍紫色場景中的處理後插圖" />
              <div className={styles.storyCaption}>
                <Text weight="semibold">Scene / Pastel memory</Text>
                <Text className={styles.cardCopy}>淡紫、冰藍、白色服裝和柔光背景共同形成首頁的故事入口。</Text>
              </div>
            </aside>
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
                  <Title1 as="h2" id="charts-title">
                    Charts
                  </Title1>
                </div>
                <Text as="p" className={styles.headingCopy}>
                  璃音的圖件被整理成三個入口：拼貼、肖像、場景。每一格都對應一段補檔線索。
                </Text>
              </div>
              <Badge appearance="tint">3 files</Badge>
            </div>

            <div className={styles.chartsBoard}>
              <div className={styles.galleryViewport} aria-live="polite">
                <img className={styles.galleryImage} src={selectedChartItem.image} alt={selectedChartItem.alt} />
                <div className={styles.galleryCaption}>
                  <div>
                    <Text as="p" className={styles.eyebrow}>
                      {selectedChartItem.meta}
                    </Text>
                    <Title2 as="h3" className={styles.galleryTitle}>
                      {selectedChartItem.title}
                    </Title2>
                    <Text as="p" className={styles.galleryCaptionText}>
                      {selectedChartItem.detail}
                    </Text>
                  </div>
                  <Button as="a" href="#blog" appearance="secondary" icon={<BookOpen24Regular />} onClick={() => navigateToSection("blog")}>
                    看相關貼文
                  </Button>
                </div>
              </div>

              <div className={styles.drawerList} aria-label="Charts gallery drawers">
                {charts.map((item) => {
                  const isSelected = selectedChart === item.id;

                  return (
                    <button
                      key={item.id}
                      className={`${styles.drawerButton} ${isSelected ? styles.drawerButtonActive : ""}`}
                      type="button"
                      onClick={() => setSelectedChart(item.id)}
                      aria-pressed={isSelected}
                    >
                      <img className={styles.drawerThumb} src={item.image} alt="" aria-hidden="true" />
                      <span className={styles.drawerText}>
                        <span className={styles.drawerMeta}>{item.meta}</span>
                        <Text weight="semibold">{item.title}</Text>
                        <span className={styles.drawerCopy}>{item.summary}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`} id="blog" aria-labelledby="blog-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitleCluster}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionTitleIcon} aria-hidden="true">
                    <BookOpen24Regular />
                  </span>
                  <Title1 as="h2" id="blog-title">
                    Blog
                  </Title1>
                </div>
                <Text as="p" className={styles.headingCopy}>
                  整理設定札記、圖件歸檔與角色觀察。每篇貼文都有封面、分類與摘要。
                </Text>
              </div>
            </div>

            <div className={styles.blogGrid}>
              {posts.map((post) => (
                <Card key={post.title} className={styles.blogCard}>
                  <CardPreview className={styles.blogPreview}>
                    <img className={styles.blogImage} src={post.image} alt="" />
                  </CardPreview>
                  <div className={styles.blogBody}>
                    <div>
                      <div className={styles.blogMeta}>
                        <Badge appearance="tint">{post.category}</Badge>
                        <Badge appearance="outline">{post.date}</Badge>
                      </div>
                      <CardHeader
                        image={<DocumentBulletList24Regular />}
                        header={<Subtitle1 as="h3">{post.title}</Subtitle1>}
                        description={post.readTime}
                      />
                      <Text as="p" className={styles.cardCopy}>
                        {post.excerpt}
                      </Text>
                    </div>
                    <CardFooter>
                      <Button appearance="subtle" icon={<BookOpen24Regular />}>
                        閱讀
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="regulation" aria-labelledby="regulation-title">
          <div className={`${styles.sectionInner} ${styles.regulationGrid}`}>
            <div className={styles.sectionTitleCluster}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitleIcon} aria-hidden="true">
                  <GlobeShield24Regular />
                </span>
                <Title1 as="h2" id="regulation-title">
                  Regulation
                </Title1>
              </div>
              <Text as="p" className={styles.regulationLead}>
                這裡只保留必要聲明：素材來源、原作者、展示範圍與使用限制。關於區不再堆疊額外敘述。
              </Text>
            </div>

            <Card className={styles.statementCard}>
              <div className={styles.statementBody}>
                <CardHeader image={<Person24Regular />} header={<Title3 as="h3">使用聲明</Title3>} />
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
        <Text weight="semibold">VK Character Blog</Text>
        <Button as="a" href="#hero" appearance="subtle" icon={<ArrowUp24Regular />}>
          返回頂部
        </Button>
      </footer>
    </FluentProvider>
  );
}
