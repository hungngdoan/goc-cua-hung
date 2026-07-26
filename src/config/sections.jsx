import { lazy } from "react";

// Astro propagates normal CSS imports from every module reachable by a
// hydrated island into the page head, including modules behind React.lazy.
// Import the three new lazy styles as emitted asset URLs instead, then hold
// each component promise until its stylesheet link has loaded. This keeps the
// CSS off the default route and prevents an unstyled frame when a tab opens.
import taoThaoStylesheet from "../styles/taothao.css?url&no-inline";
import thirtySixKeStylesheet from "../content/36ke.css?url&no-inline";
import veTuiStylesheet from "../components/react/VeTui.css?url&no-inline";

const stylesheetLoads = new Map();

function loadStylesheet(href) {
  if (typeof document === "undefined") return Promise.resolve();

  const absoluteHref = new URL(href, document.baseURI).href;
  const pending = stylesheetLoads.get(absoluteHref);
  if (pending) return pending;

  const existing = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .find((link) => link.href === absoluteHref);
  if (existing?.sheet) return Promise.resolve();

  const link = existing || document.createElement("link");
  link.rel = "stylesheet";
  link.href = absoluteHref;

  const loaded = new Promise((resolve, reject) => {
    link.addEventListener("load", resolve, { once: true });
    link.addEventListener(
      "error",
      () => reject(new Error(`Unable to load stylesheet: ${absoluteHref}`)),
      { once: true },
    );
  });

  stylesheetLoads.set(absoluteHref, loaded);
  if (!existing) document.head.appendChild(link);
  return loaded;
}

const withStylesheet = (loadComponent, stylesheet) => {
  let pending;
  return () => {
    pending ??= Promise.all([
      loadStylesheet(stylesheet),
      loadComponent(),
    ]).then(([, component]) => component);
    return pending;
  };
};

// Each loader is named so the registry can expose it as `preload` as well as
// hand it to lazy(). Warming a chunk when the reader shows intent (pointer or
// keyboard focus on the tab) usually means it has already arrived by the time
// they click, which is what keeps the tab feeling instant. Repeat calls are
// free: a dynamic import resolves from the module cache after the first.
const loadTaoThao = withStylesheet(
  () => import("../components/react/TaoThao.jsx"),
  taoThaoStylesheet,
);
const loadThirtySixKe = withStylesheet(
  () => import("../components/react/ThirtySixKe.jsx"),
  thirtySixKeStylesheet,
);
const loadVeTui = withStylesheet(
  () => import("../components/react/VeTui.jsx"),
  veTuiStylesheet,
);
const loadMucLam = () => import("../components/react/MucLam.jsx");
const loadTuSach = () => import("../components/react/TuSach.jsx");
const loadMuaRoi = () => import("../components/react/MuaRoi.jsx");

const TaoThao = lazy(loadTaoThao);
const ThirtySixKe = lazy(loadThirtySixKe);
const VeTui = lazy(loadVeTui);
const MucLam = lazy(loadMucLam);
const TuSach = lazy(loadTuSach);
const MuaRoi = lazy(loadMuaRoi);

const withTheme = (Component) =>
  (theme, section) => (
    <Component
      theme={{
        ...theme,
        name: section.name,
        subtitle: section.subtitle,
      }}
    />
  );

const constrained = (Component) =>
  () => (
    <div className="mx-auto w-full max-w-[1080px]">
      <Component />
    </div>
  );

export const DEFAULT_SECTION_ID = "den_dau";

export const sectionRegistry = [
  {
    id: "den_dau",
    name: "Đêm Huyền",
    subtitle: "Câu chuyện dưới ánh trăng.",
    slug: "dem-huyen",
    aliases: [],
    icon: "🌙",
    row: "dark",
    component: null,
    preload: null,
  },
  {
    id: "hong_tram",
    name: "Về tui",
    subtitle:
      "Morbi vulputate neque ut massa facilisis, vitae luctus lorem dictum.",
    slug: "ve-tui",
    aliases: [],
    icon: "🕯",
    row: "dark",
    component: () => <VeTui />,
    preload: loadVeTui,
  },
  {
    id: "muc_than",
    name: "36 Kế",
    subtitle: "Ba mươi sáu mưu kế cổ điển.",
    slug: "36-ke",
    aliases: [],
    icon: "📜",
    row: "dark",
    component: constrained(ThirtySixKe),
    preload: loadThirtySixKe,
  },
  {
    id: "hoian",
    name: "Tào Tháo",
    subtitle:
      "Praesent commodo libero non lectus facilisis, sed tempor mi luctus.",
    slug: "tao-thao",
    aliases: ["hoi-an"],
    icon: "🏮",
    row: "dark",
    component: constrained(TaoThao),
    preload: loadTaoThao,
  },
  {
    id: "sap_bao_dem",
    name: "Nhạc Khuya",
    subtitle: "Nhạc khuya, nghe để buồn, chỉ là buồn một mình.",
    slug: "nhac-khuya",
    aliases: [],
    icon: "🎶",
    row: "dark",
    component: null,
    preload: null,
  },
  {
    id: "quan_coc_toi",
    name: "Trò chơi điện tử",
    subtitle:
      "Maecenas suscipit sem vitae sapien rhoncus, non posuere neque tempor.",
    slug: "tro-choi-dien-tu",
    aliases: [],
    icon: "🎮",
    row: "dark",
    component: null,
    preload: null,
  },
  {
    id: "hoa_dao",
    name: "Góc Hồng",
    subtitle: "Peach blossom in spring, soft and full of longing.",
    slug: "goc-hong",
    aliases: [],
    icon: "🌸",
    row: "bright",
    component: null,
    preload: null,
  },
  {
    id: "giaydo",
    name: "Mực Lam",
    subtitle: "Nền giấy sáng, mực xanh lam, một dấu son nhỏ giữ nhịp.",
    slug: "muc-lam",
    aliases: ["giay-do"],
    icon: "✒️",
    row: "bright",
    component: withTheme(MucLam),
    preload: loadMucLam,
  },
  {
    id: "dongho",
    name: "Tủ sách",
    subtitle:
      "Những cuốn sách đã đọc, và đôi dòng đọng lại sau khi gấp trang cuối.",
    slug: "tu-sach",
    aliases: [],
    icon: "📚",
    row: "bright",
    component: withTheme(TuSach),
    preload: loadTuSach,
  },
  {
    id: "sapbao_sang",
    name: "Trà Sáng",
    subtitle: "Giấy màu trà ấm, xanh sâu, vàng rang và mực nâu trầm.",
    slug: "tra-sang",
    aliases: [],
    icon: "🍵",
    row: "bright",
    component: null,
    preload: null,
  },
  {
    id: "quancoc_sang",
    name: "Lụa Sen",
    subtitle: "Hồng sen nhạt, nền ngà, xanh sage và mực mận trầm.",
    slug: "lua-sen",
    aliases: [],
    icon: "🪷",
    row: "bright",
    component: null,
    preload: null,
  },
  {
    id: "suong_mai",
    name: "Cơn Mưa",
    subtitle: "Ngày mưa ngồi yên, nhặt đôi câu chữ rồi ngẫm.",
    slug: "con-mua",
    aliases: [],
    icon: "💧",
    row: "bright",
    component: withTheme(MuaRoi),
    preload: loadMuaRoi,
  },
];

export const sectionRows = {
  dark: [],
  bright: [],
};

export const hashToSectionId = new Map();
for (const section of sectionRegistry) {
  sectionRows[section.row].push(section);
  for (const hash of [section.slug, section.id, ...section.aliases]) {
    hashToSectionId.set(hash, section.id);
  }
}
