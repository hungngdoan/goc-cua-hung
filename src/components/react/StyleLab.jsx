import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MusicPlayer from "./MusicPlayer.jsx";
import MonkeyParadoxExperience from "./MonkeyParadoxExperience.jsx";
import TamMaoVignette from "./TamMaoVignette.jsx";
import { monkeyParadoxPost } from "../../content/monkeyParadox.js";
import { themes } from "../../config/themes.js";
import {
  DEFAULT_SECTION_ID,
  hashToSectionId,
  sectionRegistry,
  sectionRows,
} from "../../config/sections.jsx";

const assetBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const bannerVideo = `${assetBase}/banner_roses.mp4`;
const bannerStill = `${assetBase}/banner_roses-still.webp`;
const bannerAlt =
  "Đêm sao: hai đứa trẻ và chú chó ngồi trên bãi cỏ, khóm hồng nở bên phải";

const postsByStyle = {
  den_dau: [
    {
      title: "Tam Mao · Ba Sợi Tóc Giữa Nhân Gian",
      date: "21/7/2026",
      type: "Nhân vật",
      seal: "三毛",
      sealLarge: true,
      intro: "Ba sợi tóc, hai bàn chân trần, một trái tim chưa học cách lạnh đi.",
      vignette: "tam-mao",
      body: [
        "Tam Mao (三毛) là cậu bé mồ côi do họa sĩ Trương Lạc Bình sáng tạo: gầy guộc, lang thang giữa Thượng Hải cũ, sống nhờ chút trí khôn và lòng tử tế lớn hơn hoàn cảnh. Em khiến người ta bật cười rồi chợt nghẹn, bởi sau nét vẽ hóm hỉnh là một câu hỏi rất thật: giữa đói rét và thờ ơ, một đứa trẻ phải mạnh mẽ đến bao nhiêu mới giữ được phần người?",
      ],
      tags: ["#TamMao", "#NhânVật"],
      readMore: false,
    },
    monkeyParadoxPost,
    {
      title: "Hai Mũi Tên",
      date: "31/5/2026",
      type: "Cập nhật",
      seal: "🏹",
      sealLarge: true,
      body: [
        '⛰️ Một người nọ lên núi tìm đại sư để thỉnh giáo. Đại sư hỏi: "Có hai con quỷ muốn ăn thịt ngươi. Quỷ đỏ 👹 chỉ cần một mũi tên là bị tiêu diệt. Quỷ xanh 😈 cần tới tận hai mũi tên. Nhưng trong tay ngươi chỉ có hai mũi tên. Ngươi làm sao để sống sót?"',
        'Người nọ nhìn thẳng vào mắt đại sư, gằn giọng nói: "Đơn giản thôi, tôi sẽ bắn con quỷ xanh một mũi trước. Mũi tên còn lại, kẻ nào dám tấn công tôi, tôi sẽ bắn kẻ đó!"',
      ],
      lesson:
        "🎯 Khi bị dồn vào đường cùng với nguồn lực hạn hẹp, đừng cố tìm cách an toàn tuyệt đối. Hãy dùng đòn phủ đầu để răn đe kẻ mạnh nhất. Giữ lại con bài cuối cùng để kẻ thù khiếp sợ mà không manh động. 🛡️",
      tags: ["#Trí"],
      readMore: false,
    },
  ],
  sap_bao_dem: [
    {
      title: "8 Vạn 6 Ngàn Thương",
      date: "15/7/2026",
      seal: "86K",
      body: [
        '"8 vạn 6 ngàn 400 lần nhớ em".',
        "24 giờ × 60 phút × 60 giây = 86.400 giây.",
        "Anh chưa từng nghĩ, sẽ có ai đó nhung nhớ anh nhiều đến vậy. Thật tình, người ta hay lấy con số ra để đong đếm phải không?",
        "Nhưng người muốn trở về, đâu cần đủ 1000 cái máy bay rồi mới trở về đâu, phải không?",

        "Chờ đợi, là lời tỏ tình dài nhất, và cũng là lời tỏ tình chân thành nhất. Anh chợt nhận ra rằng, nó chỉ đáng giá nếu như hai người thực sự hướng về nhau.",
        "Tình cảm đẹp nhất, là khi cả hai đều chân thành với nhau.",
        '"Còn tình yêu đẹp nhất, là khi không ai có ý định rời đi, cho dù thế nào đi chăng nữa..."',
        "~ Sưu Tầm ~",
      ],
      mediaLink: {
        href: "https://youtu.be/33i7ym_gI3k?si=IsA86470ecvHCRxg",
        title: "8 Vạn 6 Ngàn Thương · AIR Remix",
        artist: "Hạo Thiên · Air Remix",
        eyebrow: "Nhạc khuya · YouTube",
        thumbnail: "https://i.ytimg.com/vi/33i7ym_gI3k/hqdefault.jpg",
      },
      readMore: false,
    },
    {
      title: "Mạnh Bà",
      seal: "MB",
      date: "6/2026",
      body: [
        "Bỉ ngạn hoa nở bên bờ sinh tử\nSông Vong Xuyên nhuộm đỏ cả một dòng\nCanh Mạnh Bà, là ai quên ai nhớ\nCầu Nại Hà, là ai ngóng ai trông",
        '"Mạnh Bà chưa uống đã say\nHà chi Nguyệt Lão cắt dây tơ hồng\nNhân gian một cõi hư không\nCanh thừa, dây đứt khiến lòng ngỗn ngang."',
      ],
      mediaLink: {
        href: "https://youtu.be/xUgHL-6_QS4?si=ttDfI89XbP4I7qxf",
        title: "Mạnh Bà",
        artist: "Linh Hương Luz · Finn T · SinKra",
        eyebrow: "Nhạc khuya · YouTube",
        thumbnail: "https://i.ytimg.com/vi/xUgHL-6_QS4/hqdefault.jpg",
      },
      readMore: false,
    },
  ],
  quan_coc_toi: [
    {
      title: "Liên Minh Huyền Thoại",
      type: "Trò chơi",
      image: `${import.meta.env.BASE_URL}/img/leage_icon.jpg`,
      body: ["Chơi từ hồi gà rán Garena còn khuyến mãi"],
      readMore: false,
    },
    {
      title: "Megaman X4 / Rockman X4",
      type: "Trò chơi",
      image: `${import.meta.env.BASE_URL}/img/mgx4.png`,
      body: ["Chơi trong giờ tin học"],
      readMore: false,
    },
  ],
  hoa_dao: [
    {
      title: "Đối lập với yêu thương là sự thờ ơ",
      small: true,
      body: [],
      readMore: false,
    },
  ],
};

// Goals list shown in the left panel. Defined once and shared across every
// tab so the sidebar reads identically no matter which theme is active.
// status: "done" = finished one-off goal, "open" = in progress / will finish,
// "ongoing" = a habit that is kept up rather than ever "completed".
const sidebarList = {
  title: "Mục Tiêu",
  items: [
    { text: "Dọn gọn một góc riêng", status: "done" },
    { text: "Viết code hàng ngày", status: "ongoing" },
    { text: "Đỗ cao học", status: "done" },
    {
      text: "Học Pytorch",
      status: "done",
      href: "https://www.learnpytorch.io/",
    },
    { text: "Đại số tuyến tính", status: "open" },
    { text: "Tập Gym", status: "ongoing" },
  ],
};

const statusLabels = {
  done: "Xong",
  open: "Đang làm",
  ongoing: "Duy trì",
};

function Divider({ style }) {
  return (
    <div className="my-1.5 flex items-center gap-2 opacity-80">
      <div className="h-px flex-1" style={{ background: style.accent }} />
      <div
        style={{ color: style.accent, letterSpacing: style.dividerTracking }}
        className="text-xs"
      >
        {style.dividerSymbol}
      </div>
      <div className="h-px flex-1" style={{ background: style.accent }} />
    </div>
  );
}

// A small "now playing" equaliser: bars that bounce like a music wave.
// Rendered above song posts (post.wave). Bars inherit currentColor.
function MusicWave({ bars = 4 }) {
  const delays = [-200, -560, -120, -380];
  return (
    <span className="gc-eq" aria-hidden="true">
      {delays.slice(0, bars).map((delay, index) => (
        <i key={index} style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

function OrderedColumns({ contentFirst, content, sidebar }) {
  return (
    <section className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr] 2xl:grid-cols-[320px_1fr] 2xl:gap-8">
      {contentFirst ? (
        <>
          {content}
          {sidebar}
        </>
      ) : (
        <>
          {sidebar}
          {content}
        </>
      )}
    </section>
  );
}

export default function VietnameseBlogStyleLab() {
  const [sectionId, setSectionId] = useState(DEFAULT_SECTION_ID);
  const section = sectionRegistry.find((item) => item.id === sectionId);
  const style = themes[section.id];

  // The active tab lives in the URL hash so a refresh or a shared link
  // restores it, and back/forward walk through previously visited tabs.
  // Applied after mount (not in the initial state) to keep the hydrated
  // markup identical to the prerendered HTML.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      const id = hashToSectionId.get(hash);
      if (id) {
        setSectionId(id);
      } else if (!hash) {
        setSectionId(DEFAULT_SECTION_ID);
      }
    };
    applyHash();
    window.addEventListener("popstate", applyHash);
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.removeEventListener("popstate", applyHash);
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  const selectTab = (item) => {
    setSectionId(item.id);
    const hash = item.slug;
    if (window.location.hash.slice(1) !== hash) {
      window.history.pushState(null, "", `#${hash}`);
    }
  };
  const tabPosts = postsByStyle[section.id] || [];
  // Per-status color, resolved against the active theme so each tab keeps its
  // own palette while the labels stay identical everywhere.
  const statusColors = {
    done: style.accent,
    open: style.text,
    ongoing: style.textMuted,
  };
  // Portal target for the music player: the visual UI portals into this sidebar
  // slot, which now exists on every tab.
  const [musicSlot, setMusicSlot] = useState(null);

  // On Đêm Huyền the sidebar boxes use the colorful hung-blog neon strip to
  // match the music box; every other tab uses its own accent color.
  const sidebarStrip =
    section.id === "den_dau"
      ? "linear-gradient(90deg, #ff69b4, #00ffff, #ffd700)"
      : style.accent;

  const renderTab = (item) => {
    const isActive = item.id === section.id;
    const itemTheme = themes[item.id];
    return (
      <button
        key={item.id}
        onClick={() => selectTab(item)}
        className={`style-tab flex flex-1 items-center justify-center border px-3 py-2 ${isActive ? "is-active" : ""}`}
        style={{
          minWidth: "140px",
          borderColor: isActive ? itemTheme.accent : style.navBorder,
          background: isActive ? style.accentSoft : style.navBg,
          color: isActive ? style.text : style.textSoft,
          fontWeight: isActive ? 800 : 600,
          "--glow": itemTheme.accent,
          "--glow-soft": itemTheme.accentSoft,
        }}
      >
        <span className="tab-icon" aria-hidden="true">
          {item.icon}
        </span>
        {item.name}
      </button>
    );
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .style-tab {
          position: relative;
          transition: box-shadow 220ms ease, transform 180ms ease, border-color 180ms ease;
        }
        .style-tab:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 0 1px var(--glow, transparent), 0 0 14px var(--glow-soft, transparent);
        }
        .style-tab.is-active {
          box-shadow: 0 0 0 1.5px var(--glow, transparent), 0 0 20px var(--glow-soft, transparent), 0 0 6px var(--glow, transparent);
        }
        .style-tab.is-active:hover {
          transform: translateY(-1px);
        }
        .tab-icon {
          display: inline-block;
          max-width: 0;
          margin-right: 0;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          transition: max-width 200ms ease, opacity 200ms ease, margin-right 200ms ease;
          pointer-events: none;
          font-size: 1.05em;
          line-height: 1;
        }
        .style-tab:hover .tab-icon {
          max-width: 1.5em;
          margin-right: 0.4em;
          opacity: 1;
        }
        @media (hover: none) {
          .tab-icon {
            max-width: 1.5em;
            margin-right: 0.4em;
            opacity: 1;
          }
        }
        .banner-stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 7% 32%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 14% 64%, rgba(255,255,255,0.45), transparent),
            radial-gradient(1.5px 1.5px at 24% 22%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 77% 20%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 88% 30%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 94% 60%, rgba(255,255,255,0.45), transparent);
          opacity: 0.7;
          pointer-events: none;
          animation: bannerTwinkle 4.2s ease-in-out infinite;
        }
        @keyframes bannerTwinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.85; }
        }
        .banner-media {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          filter: drop-shadow(0 2px 10px rgba(0,0,0,0.45));
        }
        @media (prefers-reduced-motion: reduce) {
          .banner-stars { animation: none; }
        }
        .web-scale-shell {
          transform-origin: top center;
        }
        @media (min-width: 2000px) {
          .web-scale-shell {
            zoom: 1.12;
          }
        }
        .hb-box {
          position: relative;
          overflow: hidden;
        }
        .hb-box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--strip, linear-gradient(90deg, #ff69b4, #00ffff, #ffd700));
          pointer-events: none;
        }
        .footer-link {
          transition: opacity 160ms ease, text-decoration-color 160ms ease;
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 3px;
        }
        .footer-link:hover {
          opacity: 0.85;
          text-decoration-color: currentColor;
        }
        .gc-footer-stars {
          letter-spacing: 0.5em;
          font-size: 1.1rem;
          animation: gc-rainbow 3s linear infinite;
        }
        @keyframes gc-rainbow {
          0%   { color: #ff3b3b; }
          16%  { color: #ff9f1c; }
          33%  { color: #ffe600; }
          50%  { color: #3bd16f; }
          66%  { color: #3b9bff; }
          83%  { color: #b15bff; }
          100% { color: #ff3b3b; }
        }
        .gc-heart {
          display: inline-block;
          font-size: 1.2em;
          line-height: 1;
          vertical-align: -0.08em;
          color: #ff4d6d;
          animation: gc-twinkle 1.2s ease-in-out infinite;
        }
        @keyframes gc-twinkle {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
        .gc-blink {
          animation: gc-blink-anim 1.1s steps(1) infinite;
        }
        @keyframes gc-blink-anim {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .gc-eq {
          display: inline-flex;
          align-items: flex-end;
          gap: 3px;
          height: 18px;
        }
        .gc-eq i {
          width: 3px;
          height: 6px;
          border-radius: 1px;
          background: currentColor;
          animation: gc-eq-bounce 950ms ease-in-out infinite;
        }
        @keyframes gc-eq-bounce {
          0%, 100% { height: 5px; }
          50%      { height: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gc-footer-stars, .gc-heart, .gc-blink { animation: none; }
          .gc-eq i { animation: none; height: 11px; }
        }
      `,
        }}
      />
      <main
        className="min-h-screen"
        style={{
          color: style.text,
          backgroundColor: style.pageBg,
          backgroundImage: style.pattern,
        }}
      >
        <div className="web-scale-shell mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] px-4 pt-2 pb-3 sm:px-7 lg:px-8 2xl:px-12">
          <div
            className="border-[3px] border-double p-2"
            style={{
              borderColor: style.borderOuter,
              background: style.frameBg,
              boxShadow: style.frameShadow,
            }}
          >
            <div
              className="border p-3 sm:p-4 lg:p-6 2xl:p-8 pt-2 sm:pt-2 lg:pt-3 2xl:pt-4"
              style={{ borderColor: style.borderInner }}
            >
              <div
                className="relative mb-3 overflow-hidden border"
                style={{
                  borderColor: style.panelBorder,
                  boxShadow: style.previewShadow,
                  background:
                    "radial-gradient(120% 80% at 50% 115%, rgba(244,184,96,0.12), transparent 60%), linear-gradient(180deg, #05040a 0%, #0a0710 58%, #050409 100%)",
                }}
              >
                <div className="banner-stars" aria-hidden="true" />
                {/* Decorative pixel-art banner, formerly a 751 KB animated GIF.
                    role="img" keeps the same semantics the <img alt> had: this
                    is a picture that happens to move, not a media player, and it
                    guarantees the label is exposed as an image name.
                    The <source media> is load-bearing, not decoration: when the
                    visitor prefers reduced motion no source matches, so the
                    browser selects nothing, requests no MP4, and paints the
                    poster still instead. Supported in Chrome, Safari, Edge and
                    Firefox 120+; Firefox 53-119 ignores `media` inside <video>
                    and will animate regardless. Dimensions match the poster and
                    the original GIF (597x50); the MP4 is 598 wide only because
                    H.264 requires an even width, and the extra column is black. */}
                <video
                  role="img"
                  aria-label={bannerAlt}
                  poster={bannerStill}
                  width="597"
                  height="50"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="banner-media relative z-10 mx-auto block h-auto w-full"
                  style={{ maxWidth: "620px" }}
                >
                  <source
                    src={bannerVideo}
                    type="video/mp4"
                    media="(prefers-reduced-motion: no-preference)"
                  />
                  {bannerAlt}
                </video>
              </div>
              <header>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h1 className="max-w-4xl 2xl:max-w-5xl font-serif text-2xl font-black leading-none tracking-tight sm:text-3xl lg:text-4xl 2xl:text-5xl">
                    Một Góc Đời
                  </h1>
                  <div
                    className="inline-block border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] -translate-y-[4px]"
                    style={{
                      borderColor: style.tagBorder,
                      color: style.textSoft,
                      background: style.tagBg,
                      boxShadow: style.tagShadow,
                    }}
                  >
                    Đời là vô thường
                  </div>
                </div>
              </header>

              <div
                className="mt-6 border-y py-3"
                style={{ borderColor: style.borderSection }}
              >
                <nav className="flex flex-wrap gap-2 text-sm font-semibold">
                  {sectionRows.dark.map(renderTab)}
                </nav>
                <nav className="mt-2 flex flex-wrap gap-2 text-sm font-semibold">
                  {sectionRows.bright.map(renderTab)}
                </nav>
              </div>

              {/* Mounted once here, outside the tab switch, so the audio never
                unmounts. Its visual UI portals into the sidebar slot below. */}
              {/* Đêm Huyền keeps the colorful hung-blog controls but matches its
                box background to the neighboring boxes; other tabs fully theme. */}
              <MusicPlayer
                portalTarget={musicSlot}
                theme={style}
                colorful={section.id === "den_dau"}
              />

              <OrderedColumns
                contentFirst={section.id === "den_dau"}
                content={
                  <section
                    className={`min-w-0 ${section.id === "den_dau" ? "order-1 lg:order-2" : ""}`}
                  >
                    {section.component ? (
                      section.component(style, section)
                    ) : (
                      <>
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border p-2.5 sm:p-3"
                          style={{
                            background: style.panelBg,
                            borderColor: style.panelBorder,
                            boxShadow: style.previewShadow,
                          }}
                        >
                          <h2
                            className={`text-center font-serif text-3xl font-black leading-tight sm:text-4xl ${section.id === "sap_bao_dem" ? "flex items-center justify-center gap-3" : ""}`}
                            style={{ color: style.accent }}
                          >
                            {section.id === "sap_bao_dem" && <MusicWave />}
                            {section.name}
                          </h2>
                          <p
                            className="mx-auto mt-1 max-w-3xl text-center font-serif text-base leading-6"
                            style={{ color: style.textSoft }}
                          >
                            {section.subtitle}
                          </p>
                          <Divider style={style} />
                          <div
                            className="text-center text-[11px] uppercase leading-4 tracking-[0.24em]"
                            style={{ color: style.textMuted }}
                          >
                            {style.motif}
                          </div>
                        </motion.div>

                        {tabPosts.length > 0 && (
                          <div className="mt-5 space-y-4">
                            {tabPosts.map((post, index) => {
                              const bodyBlocks = Array.isArray(post.body)
                                ? post.body
                                : [post.body];

                              return (
                                <motion.article
                                  key={post.title}
                                  initial={{ opacity: 0, y: 12 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.25,
                                    delay: index * 0.04,
                                  }}
                                  className={`grid gap-4 border ${post.small ? "p-3 sm:p-3.5" : "p-4 sm:p-5"} ${post.centered ? "text-center" : post.small ? "" : "sm:grid-cols-[84px_1fr]"}`}
                                  style={{
                                    background: style.panelSoftBg,
                                    borderColor: style.panelSoftBorder,
                                    boxShadow: style.panelSoftShadow,
                                  }}
                                >
                                  {(post.image ||
                                    post.seal ||
                                    post.type ||
                                    post.date) && (
                                    <div
                                      className={
                                        post.centered
                                          ? "text-center"
                                          : "flex sm:block sm:text-center"
                                      }
                                    >
                                      <div
                                        className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden border-4 border-double font-serif font-black ${post.sealLarge ? "text-xl" : "text-sm"} ${post.centered ? "mx-auto" : "sm:mx-auto"}`}
                                        aria-hidden={
                                          post.experience === "monkey-paradox"
                                            ? "true"
                                            : undefined
                                        }
                                        style={{
                                          color: style.accent,
                                          borderColor: style.sealBorder,
                                          background: style.sealBg,
                                        }}
                                      >
                                        {post.image ? (
                                          <img
                                            className="h-full w-full object-cover"
                                            src={post.image}
                                            alt=""
                                          />
                                        ) : (
                                          post.seal
                                        )}
                                      </div>
                                      <div
                                        className={
                                          post.centered
                                            ? "mt-3"
                                            : "ml-3 sm:ml-0 sm:mt-3"
                                        }
                                      >
                                        {post.type && (
                                          <div
                                            className="text-xs uppercase tracking-[0.2em]"
                                            style={{ color: style.textMuted }}
                                          >
                                            {post.type}
                                          </div>
                                        )}
                                        {post.date && (
                                          <div
                                            className={`${post.type ? "mt-1 " : ""}text-xs`}
                                            style={{ color: style.textMuted }}
                                          >
                                            {post.date}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <div>
                                    <h3
                                      className={`font-serif ${post.small ? "text-base font-normal leading-6" : "text-2xl font-black sm:text-3xl"}`}
                                    >
                                      {post.title}
                                    </h3>
                                    {post.intro && (
                                      <p
                                        className="mt-3 max-w-3xl font-serif text-lg italic leading-8"
                                        style={{ color: style.text }}
                                      >
                                        {post.intro}
                                      </p>
                                    )}
                                    {post.vignette === "tam-mao" && (
                                      <TamMaoVignette
                                        theme={style}
                                      />
                                    )}
                                    {post.mediaLink && (
                                      <a
                                        className="group mt-4 grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden border p-2.5 transition duration-200 hover:-translate-y-0.5 sm:grid-cols-[88px_minmax(0,1fr)_auto]"
                                        style={{
                                          borderColor: style.sealBorder,
                                          background: style.btnBg,
                                          boxShadow: style.btnShadow,
                                        }}
                                        href={post.mediaLink.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Nghe ${post.mediaLink.title} trên YouTube, mở trong tab mới`}
                                      >
                                        <img
                                          className="hidden h-[66px] w-[88px] object-cover opacity-80 transition duration-200 group-hover:opacity-100 sm:block"
                                          src={post.mediaLink.thumbnail}
                                          alt=""
                                          width="88"
                                          height="66"
                                          loading="lazy"
                                          decoding="async"
                                        />
                                        <span className="min-w-0">
                                          <span
                                            className="block text-[9px] font-bold uppercase tracking-[0.2em]"
                                            style={{ color: style.textMuted }}
                                          >
                                            {post.mediaLink.eyebrow}
                                          </span>
                                          <strong
                                            className="mt-1 block truncate font-serif text-sm leading-5 sm:text-base"
                                            style={{ color: style.text }}
                                          >
                                            {post.mediaLink.title}
                                          </strong>
                                          <span
                                            className="mt-0.5 block text-xs"
                                            style={{ color: style.textSoft }}
                                          >
                                            {post.mediaLink.artist}
                                          </span>
                                        </span>
                                        <span
                                          className="grid h-9 w-9 place-items-center border text-xs"
                                          style={{
                                            borderColor: style.accent,
                                            color: style.accent,
                                            background: style.accentSoft,
                                          }}
                                          aria-hidden="true"
                                        >
                                          <svg
                                            className="ml-0.5 h-3.5 w-3.5"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                          >
                                            <path d="M4.5 2.75v10.5L13 8 4.5 2.75Z" />
                                          </svg>
                                        </span>
                                      </a>
                                    )}
                                    {post.experience === "monkey-paradox" && (
                                      <MonkeyParadoxExperience theme={style} />
                                    )}
                                    {bodyBlocks.length > 0 && (
                                      <div
                                        className={`mt-3 max-w-3xl space-y-3 text-base leading-8 ${post.centered ? "mx-auto" : ""}`}
                                        style={{ color: style.textSoft }}
                                      >
                                        {bodyBlocks.map((paragraph) => (
                                          <p key={paragraph}>
                                            {paragraph
                                              .split("\n")
                                              .map((line, lineIndex, lines) => (
                                                <React.Fragment key={line}>
                                                  {line}
                                                  {lineIndex <
                                                    lines.length - 1 && <br />}
                                                </React.Fragment>
                                              ))}
                                          </p>
                                        ))}
                                      </div>
                                    )}
                                    {post.lesson && (
                                      <>
                                        <div className="my-4 flex items-center gap-3 opacity-70">
                                          <div
                                            className="h-px flex-1"
                                            style={{ background: style.accent }}
                                          />
                                          <div
                                            className="text-xs"
                                            style={{
                                              color: style.accent,
                                              letterSpacing:
                                                style.dividerTracking,
                                            }}
                                          >
                                            {style.dividerSymbol}
                                          </div>
                                          <div
                                            className="h-px flex-1"
                                            style={{ background: style.accent }}
                                          />
                                        </div>
                                        <p
                                          className="max-w-3xl border-l-4 py-2 pl-4 font-serif text-lg leading-8"
                                          style={{
                                            borderColor: style.accent,
                                            color: style.text,
                                          }}
                                        >
                                          {post.lesson}
                                        </p>
                                      </>
                                    )}
                                    {post.mood && (
                                      <div
                                        className="mt-4 border-y py-2 text-xs uppercase tracking-[0.16em]"
                                        style={{
                                          borderColor: style.panelSoftBorder,
                                          color: style.textMuted,
                                        }}
                                      >
                                        {post.mood}
                                      </div>
                                    )}
                                    {post.tags && (
                                      <div
                                        className={`mt-3 flex flex-wrap gap-2 ${post.centered ? "justify-center" : ""}`}
                                      >
                                        {post.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="border px-2.5 py-1 text-xs font-bold"
                                            style={{
                                              borderColor:
                                                style.panelSoftBorder,
                                              color: style.accent,
                                              background: style.btnBg,
                                            }}
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    {post.readMore !== false && (
                                      <button
                                        className="mt-4 border px-4 py-2 text-sm font-bold transition hover:translate-x-0.5"
                                        style={{
                                          borderColor: style.accent,
                                          color: style.accent,
                                          background: style.btnBg,
                                          boxShadow: style.btnShadow,
                                        }}
                                      >
                                        read more -&gt;
                                      </button>
                                    )}
                                  </div>
                                </motion.article>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </section>
                }
                sidebar={
                  <aside
                    className={`space-y-5 ${section.id === "den_dau" ? "order-2 lg:order-1" : ""}`}
                  >
                    <section
                      className="border p-3 hb-box"
                      style={{
                        background: style.panelSoftBg,
                        borderColor: style.panelSoftBorder,
                        boxShadow: style.panelSoftShadow,
                        "--strip": sidebarStrip,
                      }}
                    >
                      <div className="flex flex-col gap-1.5 text-sm">
                        <a
                          className="footer-link flex items-center gap-2.5"
                          href="https://www.linkedin.com/in/nguyendoan001/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: style.accent }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="shrink-0"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                          </svg>
                          <span className="font-semibold">LinkedIn</span>
                          <span
                            className="ml-auto"
                            aria-hidden="true"
                            style={{ color: style.textMuted }}
                          >
                            ↗
                          </span>
                        </a>
                        <a
                          className="footer-link flex items-center gap-2.5"
                          href="https://github.com/hungngdoan"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: style.accent }}
                        >
                          <svg
                            viewBox="0 0 16 16"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="shrink-0"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                          <span className="font-semibold">GitHub</span>
                          <span
                            className="ml-auto"
                            aria-hidden="true"
                            style={{ color: style.textMuted }}
                          >
                            ↗
                          </span>
                        </a>
                        <a
                          className="footer-link flex items-center gap-2.5"
                          href="https://hungngdoan.github.io/hung-blog/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: style.accent }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                          <span className="font-semibold">Blog Tiếng Anh</span>
                          <span
                            className="ml-auto"
                            aria-hidden="true"
                            style={{ color: style.textMuted }}
                          >
                            ↗
                          </span>
                        </a>
                      </div>
                    </section>

                    {/* Portal target: the music player's visual UI renders here,
                    directly under "Placeholder Title", matching hung-blog. */}
                    <div ref={setMusicSlot} />

                    <section
                      className="border p-4 hb-box"
                      style={{
                        background: style.panelSoftBg,
                        borderColor: style.panelSoftBorder,
                        boxShadow: style.panelSoftShadow,
                        "--strip": sidebarStrip,
                      }}
                    >
                      <div className="font-serif text-xl font-black">
                        {sidebarList.title}
                      </div>
                      <div className="mt-3 space-y-2">
                        {sidebarList.items.map((quest) => {
                          const status = statusLabels[quest.status]
                            ? quest.status
                            : "open";

                          return (
                            <div
                              key={quest.text}
                              className="flex items-center justify-between gap-3 border-b pb-2 text-sm"
                              style={{ borderColor: style.contentBorder }}
                            >
                              {quest.href ? (
                                <a
                                  href={quest.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="footer-link"
                                  style={{ color: style.questColor }}
                                >
                                  {quest.text}
                                </a>
                              ) : (
                                <span style={{ color: style.questColor }}>
                                  {quest.text}
                                </span>
                              )}
                              <span
                                className="shrink-0 font-bold"
                                style={{ color: statusColors[status] }}
                              >
                                {statusLabels[status]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </aside>
                }
              />

              <footer
                className="mt-7 border-t pt-6"
                style={{ borderColor: style.borderSection }}
              >
                <div
                  className="mt-6 text-center"
                  style={{ color: style.textMuted }}
                >
                  <div className="gc-footer-stars" aria-hidden="true">
                    ✦ ✧ ✦ ✧ ✦ ✧ ✦
                  </div>
                  <p className="mt-2 text-sm">
                    Được chế từ <span className="gc-heart">♥</span> và rất nhiều
                    caffeine
                  </p>
                  <p
                    className="mt-2 font-serif text-base font-black"
                    style={{ color: style.accent }}
                  >
                    <span className="gc-blink">Hưng | Đúng, là Hưng</span>
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.3em]">
                    © 2026 Một Góc Đời
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
