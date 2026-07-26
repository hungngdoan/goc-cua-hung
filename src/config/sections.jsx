import TaoThao from "../components/react/TaoThao.jsx";
import ThirtySixKe from "../components/react/ThirtySixKe.jsx";
import VeTui from "../components/react/VeTui.jsx";
import MucLam from "../components/react/MucLam.jsx";
import TuSach from "../components/react/TuSach.jsx";
import MuaRoi from "../components/react/MuaRoi.jsx";

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
