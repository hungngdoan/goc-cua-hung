import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import bannerRoses from "../../banner_roses.gif?url";
import MusicPlayer from "./MusicPlayer.jsx";
import TaoThao from "./TaoThao.jsx";
import ThirtySixKe from "./ThirtySixKe.jsx";
import VeTui from "./VeTui.jsx";
import MucLam from "./MucLam.jsx";
import TuSach from "./TuSach.jsx";

const postsByStyle = {
  den_dau: [
    {
      title: "Hai Mũi Tên",
      date: "31/5/2026",
      type: "Cập nhật",
      seal: "🏹",
      sealLarge: true,
      body: [
        "⛰️ Một người nọ lên núi tìm đại sư để thỉnh giáo. Đại sư hỏi: \"Có hai con quỷ muốn ăn thịt ngươi. Quỷ đỏ 👹 chỉ cần một mũi tên là bị tiêu diệt. Quỷ xanh 😈 cần tới tận hai mũi tên. Nhưng trong tay ngươi chỉ có hai mũi tên. Ngươi làm sao để sống sót?\"",
        "Người nọ nhìn thẳng vào mắt đại sư, gằn giọng nói: \"Đơn giản thôi, tôi sẽ bắn con quỷ xanh một mũi trước. Mũi tên còn lại, kẻ nào dám tấn công tôi, tôi sẽ bắn kẻ đó!\""
      ],
      lesson:
        "🎯 Khi bị dồn vào đường cùng với nguồn lực hạn hẹp, đừng cố tìm cách an toàn tuyệt đối. Hãy dùng đòn phủ đầu để răn đe kẻ mạnh nhất. Giữ lại con bài cuối cùng để kẻ thù khiếp sợ mà không manh động. 🛡️",
      tags: ["#Trí"],
      readMore: false
    }
  ],
  sap_bao_dem: [
    {
      title: "Mạnh Bà",
      centered: true,
      body: [
        "Bỉ ngạn hoa nở bên bờ sinh tử\nSông Vong Xuyên nhuộm đỏ cả một dòng\nCanh Mạnh Bà, là ai quên ai nhớ\nCầu Nại Hà, là ai ngóng ai trông",
        "\"Mạnh Bà chưa uống đã say\nHà chi Nguyệt Lão cắt dây tơ hồng\nNhân gian một cõi hư không\nCanh thừa, dây đứt khiến lòng ngỗn ngang.\""
      ],
      readMore: false
    }
  ],
  quan_coc_toi: [
    {
      title: "Liên Minh Huyền Thoại",
      type: "Trò chơi",
      image: `${import.meta.env.BASE_URL}/img/leage_icon.jpg`,
      body: [
        "Chơi từ hồi gà rán Garena còn khuyến mãi"
      ],
      readMore: false
    },
    {
      title: "Megaman X4 / Rockman X4",
      type: "Trò chơi",
      image: `${import.meta.env.BASE_URL}/img/mgx4.png`,
      body: [
        "Chơi trong giờ tin học"
      ],
      readMore: false
    }
  ],
  hoa_dao: [
    {
      title: "Đối lập với yêu thương là sự thờ ơ",
      small: true,
      body: [],
      readMore: false
    }
  ]
};

const styles = [
  {
    id: "giaydo",
    name: "Mực Lam",
    subtitle: "Nền giấy sáng, mực xanh lam, một dấu son nhỏ giữ nhịp.",
    pageBg: "#eaf2ed",
    text: "#132c35",
    textSoft: "rgba(19,44,53,0.74)",
    textMuted: "rgba(19,44,53,0.58)",
    accent: "#1d5b73",
    accentSoft: "rgba(29,91,115,0.135)",
    borderOuter: "rgba(19,44,53,0.30)",
    borderInner: "rgba(19,44,53,0.18)",
    borderSection: "rgba(19,44,53,0.22)",
    contentBorder: "rgba(19,44,53,0.14)",
    questColor: "#132c35",
    questMuted: "#5f7880",
    frameBg: "rgba(29,91,115,0.035)",
    frameShadow: "none",
    panelBg: "rgba(253,250,239,0.94)",
    panelBorder: "rgba(29,91,115,0.28)",
    panelShadow: "6px 6px 0 rgba(29,91,115,.10)",
    panelSoftBg: "rgba(255,255,247,0.74)",
    panelSoftBorder: "rgba(29,91,115,0.18)",
    panelSoftShadow: "6px 6px 0 rgba(29,91,115,.08)",
    previewShadow: "7px 7px 0 rgba(29,91,115,.12)",
    footerShadow: "5px 5px 0 rgba(29,91,115,.10)",
    navBg: "rgba(29,91,115,0.05)",
    navBorder: "rgba(29,91,115,0.20)",
    chooserBg: "rgba(255,255,255,0.22)",
    chooserBorder: "rgba(29,91,115,0.22)",
    chooserShadow: "4px 4px 0 rgba(29,91,115,.14)",
    chooserTextInactive: "#132c35",
    musicHighlight: "#b63a34",
    statBg: "rgba(29,91,115,0.055)",
    statBorder: "rgba(29,91,115,0.24)",
    statShadow: "4px 4px 0 rgba(29,91,115,.08)",
    btnBg: "rgba(29,91,115,0.045)",
    btnShadow: "3px 3px 0 rgba(29,91,115,.10)",
    tagBg: "rgba(182,58,52,0.06)",
    tagBorder: "rgba(182,58,52,0.32)",
    tagShadow: "3px 3px 0 rgba(182,58,52,.08)",
    sealBg: "rgba(182,58,52,0.08)",
    sealBorder: "rgba(182,58,52,0.48)",
    avatarBorder: "rgba(29,91,115,0.42)",
    avatarBg: "rgba(29,91,115,0.07)",
    dividerSymbol: "✒ ✒ ✒",
    dividerTracking: "0.35em",
    pattern: "linear-gradient(90deg, rgba(182,58,52,0.10) 0 2px, transparent 2px 78px), repeating-linear-gradient(0deg, rgba(29,91,115,0.055) 0 1px, transparent 1px 30px), radial-gradient(circle at 82% 16%, rgba(182,58,52,0.13), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.46), rgba(222,236,232,0.38) 100%)",
    motif: "mực lam · giấy sáng · dấu son · ghi chú"
  },
  {
    id: "hoian",
    name: "Tào Tháo",
    subtitle: "Praesent commodo libero non lectus facilisis, sed tempor mi luctus.",
    pageBg: "#28140d",
    text: "#ffe7b3",
    textSoft: "rgba(255,231,179,0.75)",
    textMuted: "rgba(255,231,179,0.60)",
    accent: "#f4b860",
    accentSoft: "rgba(244,184,96,0.133)",
    borderOuter: "rgba(255,231,179,0.35)",
    borderInner: "rgba(255,231,179,0.20)",
    borderSection: "rgba(255,231,179,0.25)",
    contentBorder: "rgba(255,231,179,0.15)",
    questColor: "#ffe7b3",
    questMuted: "#ffe7b3",
    frameBg: "rgba(255,231,179,0.025)",
    frameShadow: "none",
    panelBg: "rgba(58,29,18,0.88)",
    panelBorder: "rgba(244,184,96,0.35)",
    panelShadow: "6px 6px 0 rgba(0,0,0,.10)",
    panelSoftBg: "rgba(81,35,21,0.55)",
    panelSoftBorder: "rgba(244,184,96,0.25)",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.10)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.12)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.10)",
    navBg: "rgba(0,0,0,0.02)",
    navBorder: "rgba(255,231,179,0.20)",
    chooserBg: "rgba(0,0,0,0.02)",
    chooserBorder: "rgba(0,0,0,0.18)",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.16)",
    chooserTextInactive: "#ffe7b3",
    musicHighlight: "#ffe7b3",
    statBg: "rgba(0,0,0,0.025)",
    statBorder: "rgba(255,231,179,0.25)",
    statShadow: "4px 4px 0 rgba(0,0,0,.08)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(0,0,0,.10)",
    tagBg: "transparent",
    tagBorder: "rgba(255,231,179,0.30)",
    tagShadow: "3px 3px 0 rgba(0,0,0,.08)",
    sealBg: "transparent",
    sealBorder: "rgba(255,231,179,0.35)",
    avatarBorder: "rgba(255,231,179,0.40)",
    avatarBg: "rgba(0,0,0,0.04)",
    dividerSymbol: "◇ ◇ ◇",
    dividerTracking: "0.35em",
    pattern: "radial-gradient(circle at 18% 12%, rgba(244,184,96,.24), transparent 16%), radial-gradient(circle at 78% 8%, rgba(209,75,51,.18), transparent 18%), linear-gradient(90deg, rgba(244,184,96,.06) 1px, transparent 1px)",
    motif: "◆  placeholder  ◆  sample  ◆  text  ◆"
  },
  {
    id: "dongho",
    name: "Tủ sách",
    subtitle: "Những cuốn sách đã đọc, và đôi dòng đọng lại sau khi gấp trang cuối.",
    pageBg: "#f3d68a",
    text: "#331d10",
    textSoft: "rgba(51,29,16,0.70)",
    textMuted: "rgba(51,29,16,0.60)",
    accent: "#b21f13",
    accentSoft: "rgba(178,31,19,0.133)",
    borderOuter: "rgba(51,29,16,0.35)",
    borderInner: "rgba(51,29,16,0.20)",
    borderSection: "rgba(51,29,16,0.25)",
    contentBorder: "rgba(51,29,16,0.15)",
    questColor: "#331d10",
    questMuted: "#331d10",
    frameBg: "rgba(51,29,16,0.025)",
    frameShadow: "none",
    panelBg: "rgba(247,226,162,0.95)",
    panelBorder: "rgba(51,29,16,0.55)",
    panelShadow: "6px 6px 0 rgba(0,0,0,.10)",
    panelSoftBg: "rgba(255,240,189,0.70)",
    panelSoftBorder: "rgba(51,29,16,0.35)",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.10)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.12)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.10)",
    navBg: "rgba(0,0,0,0.02)",
    navBorder: "rgba(51,29,16,0.20)",
    chooserBg: "rgba(0,0,0,0.02)",
    chooserBorder: "rgba(0,0,0,0.18)",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.16)",
    chooserTextInactive: "#331d10",
    musicHighlight: "#331d10",
    statBg: "rgba(0,0,0,0.025)",
    statBorder: "rgba(51,29,16,0.25)",
    statShadow: "4px 4px 0 rgba(0,0,0,.08)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(0,0,0,.10)",
    tagBg: "transparent",
    tagBorder: "rgba(51,29,16,0.30)",
    tagShadow: "3px 3px 0 rgba(0,0,0,.08)",
    sealBg: "transparent",
    sealBorder: "rgba(51,29,16,0.35)",
    avatarBorder: "rgba(51,29,16,0.40)",
    avatarBg: "rgba(0,0,0,0.04)",
    dividerSymbol: "◇ ◇ ◇",
    dividerTracking: "0.35em",
    pattern: "repeating-linear-gradient(45deg, rgba(51,29,16,.045) 0 2px, transparent 2px 12px), radial-gradient(circle at 90% 15%, rgba(178,31,19,.18), transparent 22%)",
    motif: "tủ sách · trang giấy · đôi dòng · đọng lại"
  },
  {
    id: "sapbao_sang",
    name: "Trà Sáng",
    subtitle: "Giấy màu trà ấm, xanh sâu, vàng rang và mực nâu trầm.",
    pageBg: "#dfc894",
    text: "#2c1d12",
    textSoft: "rgba(44,29,18,0.75)",
    textMuted: "rgba(44,29,18,0.58)",
    accent: "#315c3d",
    accentSoft: "rgba(49,92,61,0.14)",
    borderOuter: "rgba(44,29,18,0.32)",
    borderInner: "rgba(49,92,61,0.20)",
    borderSection: "rgba(49,92,61,0.23)",
    contentBorder: "rgba(44,29,18,0.15)",
    questColor: "#2c1d12",
    questMuted: "#6f5a3a",
    frameBg: "rgba(49,92,61,0.035)",
    frameShadow: "none",
    panelBg: "rgba(247,229,179,0.90)",
    panelBorder: "rgba(49,92,61,0.30)",
    panelShadow: "6px 6px 0 rgba(44,29,18,.12)",
    panelSoftBg: "rgba(250,236,196,0.72)",
    panelSoftBorder: "rgba(49,92,61,0.20)",
    panelSoftShadow: "6px 6px 0 rgba(44,29,18,.09)",
    previewShadow: "7px 7px 0 rgba(44,29,18,.13)",
    footerShadow: "5px 5px 0 rgba(44,29,18,.10)",
    navBg: "rgba(49,92,61,0.05)",
    navBorder: "rgba(49,92,61,0.22)",
    chooserBg: "rgba(255,244,212,0.24)",
    chooserBorder: "rgba(49,92,61,0.24)",
    chooserShadow: "4px 4px 0 rgba(44,29,18,.15)",
    chooserTextInactive: "#2c1d12",
    musicHighlight: "#9b6a24",
    statBg: "rgba(49,92,61,0.06)",
    statBorder: "rgba(49,92,61,0.26)",
    statShadow: "4px 4px 0 rgba(44,29,18,.09)",
    btnBg: "rgba(49,92,61,0.05)",
    btnShadow: "3px 3px 0 rgba(44,29,18,.11)",
    tagBg: "rgba(155,106,36,0.08)",
    tagBorder: "rgba(155,106,36,0.34)",
    tagShadow: "3px 3px 0 rgba(44,29,18,.08)",
    sealBg: "rgba(155,106,36,0.09)",
    sealBorder: "rgba(155,106,36,0.44)",
    avatarBorder: "rgba(49,92,61,0.44)",
    avatarBg: "rgba(49,92,61,0.08)",
    dividerSymbol: "☵ ◇ ☵",
    dividerTracking: "0.35em",
    pattern: "radial-gradient(circle at 16% 14%, rgba(155,106,36,0.18), transparent 22%), radial-gradient(circle at 84% 18%, rgba(49,92,61,0.16), transparent 24%), radial-gradient(circle at 52% 94%, rgba(44,29,18,0.08), transparent 30%), repeating-linear-gradient(0deg, rgba(44,29,18,0.04) 0 1px, transparent 1px 30px), linear-gradient(180deg, rgba(255,238,190,0.42), rgba(190,157,95,0.26) 100%)",
    motif: "trà sáng · xanh sâu · vàng rang · mực nâu"
  },
  {
    id: "quancoc_sang",
    name: "Lụa Sen",
    subtitle: "Hồng sen nhạt, nền ngà, xanh sage và mực mận trầm.",
    pageBg: "#eee2dc",
    text: "#382338",
    textSoft: "rgba(56,35,56,0.74)",
    textMuted: "rgba(56,35,56,0.56)",
    accent: "#72866f",
    accentSoft: "rgba(114,134,111,0.145)",
    borderOuter: "rgba(56,35,56,0.28)",
    borderInner: "rgba(114,134,111,0.18)",
    borderSection: "rgba(114,134,111,0.22)",
    contentBorder: "rgba(56,35,56,0.13)",
    questColor: "#382338",
    questMuted: "#766472",
    frameBg: "rgba(114,134,111,0.035)",
    frameShadow: "none",
    panelBg: "rgba(255,250,241,0.92)",
    panelBorder: "rgba(114,134,111,0.28)",
    panelShadow: "6px 6px 0 rgba(77,55,71,.10)",
    panelSoftBg: "rgba(250,244,235,0.76)",
    panelSoftBorder: "rgba(114,134,111,0.18)",
    panelSoftShadow: "6px 6px 0 rgba(77,55,71,.08)",
    previewShadow: "7px 7px 0 rgba(77,55,71,.11)",
    footerShadow: "5px 5px 0 rgba(77,55,71,.09)",
    navBg: "rgba(114,134,111,0.045)",
    navBorder: "rgba(114,134,111,0.20)",
    chooserBg: "rgba(255,250,241,0.28)",
    chooserBorder: "rgba(114,134,111,0.22)",
    chooserShadow: "4px 4px 0 rgba(77,55,71,.13)",
    chooserTextInactive: "#382338",
    musicHighlight: "#9d6375",
    statBg: "rgba(114,134,111,0.055)",
    statBorder: "rgba(114,134,111,0.24)",
    statShadow: "4px 4px 0 rgba(77,55,71,.08)",
    btnBg: "rgba(114,134,111,0.045)",
    btnShadow: "3px 3px 0 rgba(77,55,71,.10)",
    tagBg: "rgba(157,99,117,0.07)",
    tagBorder: "rgba(157,99,117,0.30)",
    tagShadow: "3px 3px 0 rgba(157,99,117,.08)",
    sealBg: "rgba(157,99,117,0.08)",
    sealBorder: "rgba(157,99,117,0.42)",
    avatarBorder: "rgba(114,134,111,0.42)",
    avatarBg: "rgba(114,134,111,0.07)",
    dividerSymbol: "✿ ◇ ✿",
    dividerTracking: "0.35em",
    pattern: "radial-gradient(circle at 18% 14%, rgba(216,166,181,0.22), transparent 24%), radial-gradient(circle at 84% 18%, rgba(114,134,111,0.16), transparent 22%), radial-gradient(circle at 50% 94%, rgba(56,35,56,0.055), transparent 28%), repeating-linear-gradient(135deg, rgba(114,134,111,0.035) 0 1px, transparent 1px 24px), linear-gradient(180deg, rgba(255,250,241,0.62), rgba(238,226,220,0.42) 100%)",
    motif: "lụa sen · nền ngà · xanh sage · mực mận"
  },
  {
    id: "hong_tram",
    name: "Về tui",
    subtitle: "Morbi vulputate neque ut massa facilisis, vitae luctus lorem dictum.",
    pageBg: "#080807",
    text: "#EED9A6",
    textSoft: "#B8AA91",
    textMuted: "#6F634E",
    accent: "#C6A15B",
    accentSoft: "rgba(198,161,91,0.12)",
    borderOuter: "#2A261D",
    borderInner: "#2A261D",
    borderSection: "#2A261D",
    contentBorder: "#2A261D",
    questColor: "#B8AA91",
    questMuted: "#6F634E",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "rgba(18,17,15,0.86)",
    panelBorder: "#2A261D",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(20,18,15,0.78)",
    panelSoftBorder: "#2A261D",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(18,17,15,0.86)",
    navBorder: "#2A261D",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#2A261D",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#B8AA91",
    musicHighlight: "#C6A15B",
    statBg: "rgba(198,161,91,0.12)",
    statBorder: "#2A261D",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(198,161,91,0.12)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(18,17,15,0.86)",
    tagBorder: "#2A261D",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(198,161,91,0.12)",
    sealBorder: "#6F634E",
    avatarBorder: "#6F634E",
    avatarBg: "rgba(198,161,91,0.12)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(198,161,91,0.105), transparent 18%), radial-gradient(circle at 82% 18%, rgba(198,161,91,0.055), transparent 26%), radial-gradient(circle at 50% 92%, rgba(198,161,91,0.045), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.016) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.010) 0 1px, transparent 1px 24px), linear-gradient(135deg, #080807, #12110F 48%, #090806)",
    motif: "placeholder · sample · text · notes"
  },
  {
    id: "den_dau",
    name: "Đêm Huyền",
    subtitle: "Câu chuyện dưới ánh trăng.",
    pageBg: "#080B14",
    text: "#D4DAE8",
    textSoft: "#7A839A",
    textMuted: "#454D63",
    accent: "#8B9FBF",
    accentSoft: "rgba(139,159,191,0.1)",
    borderOuter: "#1C2236",
    borderInner: "#1C2236",
    borderSection: "#1C2236",
    contentBorder: "#1C2236",
    questColor: "#7A839A",
    questMuted: "#454D63",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "#0E1220",
    panelBorder: "#1C2236",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(14,18,32,0.74)",
    panelSoftBorder: "#1C2236",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(14,18,32,0.74)",
    navBorder: "#1C2236",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#1C2236",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#7A839A",
    musicHighlight: "#8B9FBF",
    statBg: "rgba(139,159,191,0.1)",
    statBorder: "#1C2236",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(139,159,191,0.1)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(14,18,32,0.74)",
    tagBorder: "#1C2236",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(139,159,191,0.1)",
    sealBorder: "#454D63",
    avatarBorder: "#454D63",
    avatarBg: "rgba(139,159,191,0.1)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(100,140,200,0.05), transparent 18%), radial-gradient(circle at 82% 18%, rgba(139,159,191,0.12), transparent 26%), radial-gradient(circle at 50% 92%, rgba(100,140,200,0.05), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 24px), linear-gradient(135deg, #080B14, #0F1528 48%, #0A0E1A)",
    motif: "ánh trăng · chuyện nhỏ · đêm khuya · riêng mình"
  },
  {
    id: "muc_than",
    name: "36 Kế",
    subtitle: "Ba mươi sáu mưu kế cổ điển.",
    pageBg: "#080808",
    text: "#E7DFD0",
    textSoft: "#9A907D",
    textMuted: "#555047",
    accent: "#AFA084",
    accentSoft: "rgba(175,160,132,0.1)",
    borderOuter: "#2A2722",
    borderInner: "#2A2722",
    borderSection: "#2A2722",
    contentBorder: "#2A2722",
    questColor: "#9A907D",
    questMuted: "#555047",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "rgba(18,18,18,0.78)",
    panelBorder: "#2A2722",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(18,18,18,0.78)",
    panelSoftBorder: "#2A2722",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(18,18,18,0.78)",
    navBorder: "#2A2722",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#2A2722",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#9A907D",
    musicHighlight: "#AFA084",
    statBg: "rgba(175,160,132,0.1)",
    statBorder: "#2A2722",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(175,160,132,0.1)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(18,18,18,0.78)",
    tagBorder: "#2A2722",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(175,160,132,0.1)",
    sealBorder: "#555047",
    avatarBorder: "#555047",
    avatarBg: "rgba(175,160,132,0.1)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(175,160,132,0.10), transparent 18%), radial-gradient(circle at 82% 18%, rgba(175,160,132,0.045), transparent 26%), radial-gradient(circle at 50% 92%, rgba(175,160,132,0.045), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 24px), linear-gradient(135deg, #080808, #15120D 48%, #0B0A09)",
    motif: "placeholder · sample · text · notes"
  },
  {
    id: "sap_bao_dem",
    name: "Nhạc Khuya",
    subtitle: "Nhạc khuya, nghe để buồn, chỉ là buồn một mình.",
    pageBg: "#0F0C09",
    text: "#EAD8C2",
    textSoft: "#A48D76",
    textMuted: "#5A493A",
    accent: "#BE6F5D",
    accentSoft: "rgba(190,111,93,0.1)",
    borderOuter: "#33261C",
    borderInner: "#33261C",
    borderSection: "#33261C",
    contentBorder: "#33261C",
    questColor: "#A48D76",
    questMuted: "#5A493A",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "rgba(24,19,14,0.74)",
    panelBorder: "#33261C",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(24,19,14,0.74)",
    panelSoftBorder: "#33261C",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(24,19,14,0.74)",
    navBorder: "#33261C",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#33261C",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#A48D76",
    musicHighlight: "#BE6F5D",
    statBg: "rgba(190,111,93,0.1)",
    statBorder: "#33261C",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(190,111,93,0.1)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(24,19,14,0.74)",
    tagBorder: "#33261C",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(190,111,93,0.1)",
    sealBorder: "#5A493A",
    avatarBorder: "#5A493A",
    avatarBg: "rgba(190,111,93,0.1)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(190,111,93,0.11), transparent 18%), radial-gradient(circle at 82% 18%, rgba(190,111,93,0.05), transparent 26%), radial-gradient(circle at 50% 92%, rgba(190,111,93,0.05), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 24px), linear-gradient(135deg, #0F0C09, #1B120D 48%, #100C09)",
    motif: "đêm khuya · nhạc nhẹ · nhớ một người · thương một đời"
  },
  {
    id: "quan_coc_toi",
    name: "Trò chơi điện tử",
    subtitle: "Maecenas suscipit sem vitae sapien rhoncus, non posuere neque tempor.",
    pageBg: "#0C090B",
    text: "#E8D8DD",
    textSoft: "#9A858C",
    textMuted: "#5C4A52",
    accent: "#B07080",
    accentSoft: "rgba(176,112,128,0.1)",
    borderOuter: "#2E2226",
    borderInner: "#2E2226",
    borderSection: "#2E2226",
    contentBorder: "#2E2226",
    questColor: "#9A858C",
    questMuted: "#5C4A52",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "rgba(22,18,20,0.74)",
    panelBorder: "#2E2226",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(22,18,20,0.74)",
    panelSoftBorder: "#2E2226",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(22,18,20,0.74)",
    navBorder: "#2E2226",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#2E2226",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#9A858C",
    musicHighlight: "#B07080",
    statBg: "rgba(176,112,128,0.1)",
    statBorder: "#2E2226",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(176,112,128,0.1)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(22,18,20,0.74)",
    tagBorder: "#2E2226",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(176,112,128,0.1)",
    sealBorder: "#5C4A52",
    avatarBorder: "#5C4A52",
    avatarBg: "rgba(176,112,128,0.1)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(176,112,128,0.12), transparent 18%), radial-gradient(circle at 82% 18%, rgba(176,112,128,0.05), transparent 26%), radial-gradient(circle at 50% 92%, rgba(176,112,128,0.05), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 24px), linear-gradient(135deg, #0C090B, #1A1218 48%, #100C0E)",
    motif: "placeholder · sample · text · notes"
  },
  {
    id: "suong_mai",
    name: "Cơn Mưa",
    subtitle: "Morning mist over still water, cool and quiet.",
    pageBg: "#A9B8B8",
    text: "#142226",
    textSoft: "rgba(20,34,38,0.76)",
    textMuted: "rgba(20,34,38,0.58)",
    accent: "#315F64",
    accentSoft: "rgba(49,95,100,0.16)",
    borderOuter: "rgba(20,34,38,0.42)",
    borderInner: "rgba(20,34,38,0.24)",
    borderSection: "rgba(20,34,38,0.28)",
    contentBorder: "rgba(20,34,38,0.18)",
    questColor: "#142226",
    questMuted: "rgba(20,34,38,0.68)",
    frameBg: "rgba(20,34,38,0.025)",
    frameShadow: "none",
    panelBg: "rgba(213,222,220,0.88)",
    panelBorder: "rgba(31,69,74,0.36)",
    panelShadow: "6px 6px 0 rgba(20,34,38,.10)",
    panelSoftBg: "rgba(224,229,222,0.68)",
    panelSoftBorder: "rgba(31,69,74,0.26)",
    panelSoftShadow: "6px 6px 0 rgba(20,34,38,.08)",
    previewShadow: "7px 7px 0 rgba(20,34,38,.12)",
    footerShadow: "5px 5px 0 rgba(20,34,38,.10)",
    navBg: "rgba(20,34,38,0.035)",
    navBorder: "rgba(20,34,38,0.22)",
    chooserBg: "rgba(20,34,38,0.035)",
    chooserBorder: "rgba(20,34,38,0.20)",
    chooserShadow: "4px 4px 0 rgba(20,34,38,.14)",
    chooserTextInactive: "#142226",
    musicHighlight: "#315F64",
    statBg: "rgba(49,95,100,0.10)",
    statBorder: "rgba(31,69,74,0.28)",
    statShadow: "4px 4px 0 rgba(20,34,38,.08)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(20,34,38,.08)",
    tagBg: "transparent",
    tagBorder: "rgba(20,34,38,0.34)",
    tagShadow: "3px 3px 0 rgba(20,34,38,.08)",
    sealBg: "transparent",
    sealBorder: "rgba(20,34,38,0.36)",
    avatarBorder: "rgba(49,95,100,0.46)",
    avatarBg: "rgba(49,95,100,0.10)",
    dividerSymbol: "≈ ≈ ≈",
    dividerTracking: "0.35em",
    pattern: "radial-gradient(circle at 18% 16%, rgba(232,220,208,0.22), transparent 28%), radial-gradient(circle at 78% 58%, rgba(49,95,100,0.18), transparent 30%), repeating-linear-gradient(90deg, rgba(20,34,38,0.035) 0 1px, transparent 1px 42px), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(20,34,38,0.08) 100%)",
    motif: "≈  placeholder  ≈  sample  ≈  text  ≈"
  },
  {
    id: "hoa_dao",
    name: "Góc Hồng",
    subtitle: "Peach blossom in spring, soft and full of longing.",
    pageBg: "#E8B0BE",
    text: "#4A1F2A",
    textSoft: "rgba(74,31,42,0.72)",
    textMuted: "rgba(74,31,42,0.55)",
    accent: "#B6455D",
    accentSoft: "rgba(182,69,93,0.133)",
    borderOuter: "rgba(74,31,42,0.30)",
    borderInner: "rgba(74,31,42,0.18)",
    borderSection: "rgba(74,31,42,0.22)",
    contentBorder: "rgba(74,31,42,0.14)",
    questColor: "#4A1F2A",
    questMuted: "#4A1F2A",
    frameBg: "rgba(255,255,255,0.06)",
    frameShadow: "none",
    panelBg: "rgba(252,228,232,0.92)",
    panelBorder: "rgba(123,40,60,0.30)",
    panelShadow: "6px 6px 0 rgba(76,20,32,.08)",
    panelSoftBg: "rgba(254,238,241,0.75)",
    panelSoftBorder: "rgba(123,40,60,0.22)",
    panelSoftShadow: "6px 6px 0 rgba(76,20,32,.08)",
    previewShadow: "7px 7px 0 rgba(76,20,32,.10)",
    footerShadow: "5px 5px 0 rgba(76,20,32,.08)",
    navBg: "rgba(255,255,255,0.04)",
    navBorder: "rgba(74,31,42,0.18)",
    chooserBg: "rgba(255,255,255,0.04)",
    chooserBorder: "rgba(74,31,42,0.16)",
    chooserShadow: "4px 4px 0 rgba(76,20,32,.14)",
    chooserTextInactive: "#4A1F2A",
    musicHighlight: "#4A1F2A",
    statBg: "rgba(255,255,255,0.04)",
    statBorder: "rgba(74,31,42,0.22)",
    statShadow: "4px 4px 0 rgba(76,20,32,.06)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(76,20,32,.08)",
    tagBg: "transparent",
    tagBorder: "rgba(74,31,42,0.28)",
    tagShadow: "3px 3px 0 rgba(76,20,32,.06)",
    sealBg: "transparent",
    sealBorder: "rgba(74,31,42,0.32)",
    avatarBorder: "rgba(74,31,42,0.38)",
    avatarBg: "rgba(255,255,255,0.04)",
    dividerSymbol: "♡ ♡ ♡",
    dividerTracking: "0.40em",
    pattern: "repeating-linear-gradient(0deg, rgba(74,31,42,0.10) 0 1px, transparent 1px 28px), radial-gradient(circle at 15% 10%, rgba(255,182,193,0.55), transparent 28%), radial-gradient(circle at 85% 20%, rgba(255,200,210,0.40), transparent 24%), radial-gradient(circle at 50% 90%, rgba(182,69,93,0.10), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.10), transparent 60%)",
    motif: "♡  placeholder  ♡  sample  ♡  text  ♡"
  }
];

const darkRow = ["den_dau", "hong_tram", "muc_than", "hoian", "sap_bao_dem", "quan_coc_toi"].map((id) => styles.find((s) => s.id === id));
const brightRow = ["hoa_dao", "giaydo", "dongho", "sapbao_sang", "quancoc_sang", "suong_mai"].map((id) => styles.find((s) => s.id === id));

const DEFAULT_STYLE_ID = "den_dau";
const styleIds = new Set(styles.map((s) => s.id));

const styleIcons = {
  hoian: "🏮",
  hong_tram: "🕯",
  den_dau: "🌙",
  muc_than: "📜",
  sap_bao_dem: "🎶",
  quan_coc_toi: "🎮",
  hoa_dao: "🌸",
  giaydo: "✒️",
  dongho: "📚",
  sapbao_sang: "🍵",
  quancoc_sang: "🪷",
  suong_mai: "💧"
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
    { text: "Học Pytorch", status: "done", href: "https://www.learnpytorch.io/" },
    { text: "Đại số tuyến tính", status: "open" },
    { text: "Tập Gym", status: "ongoing" }
  ]
};

const statusLabels = {
  done: "Xong",
  open: "Đang làm",
  ongoing: "Duy trì"
};

function Divider({ style }) {
  return (
    <div className="my-1.5 flex items-center gap-2 opacity-80">
      <div className="h-px flex-1" style={{ background: style.accent }} />
      <div style={{ color: style.accent, letterSpacing: style.dividerTracking }} className="text-xs">{style.dividerSymbol}</div>
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

export default function VietnameseBlogStyleLab() {
  const [styleId, setStyleId] = useState(DEFAULT_STYLE_ID);
  const style = useMemo(() => styles.find((item) => item.id === styleId) || styles[0], [styleId]);

  // The active tab lives in the URL hash so a refresh or a shared link
  // restores it, and back/forward walk through previously visited tabs.
  // Applied after mount (not in the initial state) to keep the hydrated
  // markup identical to the prerendered HTML.
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.slice(1);
      if (styleIds.has(id)) {
        setStyleId(id);
      } else if (!id) {
        setStyleId(DEFAULT_STYLE_ID);
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

  const selectTab = (id) => {
    setStyleId(id);
    if (window.location.hash.slice(1) !== id) {
      window.history.pushState(null, "", `#${id}`);
    }
  };
  const tabPosts = postsByStyle[style.id] || [];
  // Per-status color, resolved against the active theme so each tab keeps its
  // own palette while the labels stay identical everywhere.
  const statusColors = {
    done: style.accent,
    open: style.text,
    ongoing: style.textMuted
  };
  // Portal target for the music player: the visual UI portals into this sidebar
  // slot, which now exists on every tab.
  const [musicSlot, setMusicSlot] = useState(null);

  // On Đêm Huyền the sidebar boxes use the colorful hung-blog neon strip to
  // match the music box; every other tab uses its own accent color.
  const sidebarStrip =
    style.id === "den_dau"
      ? "linear-gradient(90deg, #ff69b4, #00ffff, #ffd700)"
      : style.accent;

  const renderTab = (item) => {
    const isActive = item.id === style.id;
    return (
      <button
        key={item.id}
        onClick={() => selectTab(item.id)}
        className={`style-tab flex flex-1 items-center justify-center border px-3 py-2 ${isActive ? "is-active" : ""}`}
        style={{
          minWidth: "140px",
          borderColor: isActive ? item.accent : style.navBorder,
          background: isActive ? style.accentSoft : style.navBg,
          color: isActive ? style.text : style.textSoft,
          fontWeight: isActive ? 800 : 600,
          "--glow": item.accent,
          "--glow-soft": item.accentSoft
        }}
      >
        <span className="tab-icon" aria-hidden="true">{styleIcons[item.id]}</span>
        {item.name}
      </button>
    );
  };

  return (
    <>
      <style>{`
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
        .banner-img {
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
      `}</style>
    <main
      className="min-h-screen"
      style={{ color: style.text, backgroundColor: style.pageBg, backgroundImage: style.pattern }}
    >
      <div className="web-scale-shell mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] px-4 pt-2 pb-3 sm:px-7 lg:px-8 2xl:px-12">
        <div
          className="border-[3px] border-double p-2"
          style={{
            borderColor: style.borderOuter,
            background: style.frameBg,
            boxShadow: style.frameShadow
          }}
        >
          <div className="border p-3 sm:p-4 lg:p-6 2xl:p-8 pt-2 sm:pt-2 lg:pt-3 2xl:pt-4" style={{ borderColor: style.borderInner }}>
            <div
              className="relative mb-3 overflow-hidden border"
              style={{
                borderColor: style.panelBorder,
                boxShadow: style.previewShadow,
                background:
                  "radial-gradient(120% 80% at 50% 115%, rgba(244,184,96,0.12), transparent 60%), linear-gradient(180deg, #05040a 0%, #0a0710 58%, #050409 100%)"
              }}
            >
              <div className="banner-stars" aria-hidden="true" />
              <img
                src={bannerRoses}
                alt="Đêm sao: hai đứa trẻ và chú chó ngồi trên bãi cỏ, khóm hồng nở bên phải"
                className="banner-img relative z-10 mx-auto block h-auto w-full"
                style={{ maxWidth: "620px" }}
              />
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
                    boxShadow: style.tagShadow
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
                {darkRow.map(renderTab)}
              </nav>
              <nav className="mt-2 flex flex-wrap gap-2 text-sm font-semibold">
                {brightRow.map(renderTab)}
              </nav>
            </div>

            {/* Mounted once here, outside the tab switch, so the audio never
                unmounts. Its visual UI portals into the sidebar slot below. */}
            {/* Đêm Huyền keeps the colorful hung-blog controls but matches its
                box background to the neighboring boxes; other tabs fully theme. */}
            <MusicPlayer portalTarget={musicSlot} theme={style} colorful={style.id === "den_dau"} />

            <section className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr] 2xl:grid-cols-[320px_1fr] 2xl:gap-8">
              <aside className="space-y-5">
                <section
                  className="border p-3 hb-box"
                  style={{
                    background: style.panelSoftBg,
                    borderColor: style.panelSoftBorder,
                    boxShadow: style.panelSoftShadow,
                    "--strip": sidebarStrip
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
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="shrink-0" aria-hidden="true" focusable="false">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      <span className="font-semibold">LinkedIn</span>
                      <span className="ml-auto" aria-hidden="true" style={{ color: style.textMuted }}>↗</span>
                    </a>
                    <a
                      className="footer-link flex items-center gap-2.5"
                      href="https://github.com/hungngdoan"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: style.accent }}
                    >
                      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="shrink-0" aria-hidden="true" focusable="false">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      <span className="font-semibold">GitHub</span>
                      <span className="ml-auto" aria-hidden="true" style={{ color: style.textMuted }}>↗</span>
                    </a>
                    <a
                      className="footer-link flex items-center gap-2.5"
                      href="https://hungngdoan.github.io/hung-blog/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: style.accent }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true" focusable="false">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span className="font-semibold">Blog Tiếng Anh</span>
                      <span className="ml-auto" aria-hidden="true" style={{ color: style.textMuted }}>↗</span>
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
                    "--strip": sidebarStrip
                  }}
                >
                  <div className="font-serif text-xl font-black">{sidebarList.title}</div>
                  <div className="mt-3 space-y-2">
                    {sidebarList.items.map((quest) => {
                      const status = statusLabels[quest.status] ? quest.status : "open";

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
                            <span style={{ color: style.questColor }}>{quest.text}</span>
                          )}
                          <span className="shrink-0 font-bold" style={{ color: statusColors[status] }}>
                            {statusLabels[status]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </aside>

              <section className="min-w-0">
                {style.id === "muc_than" ? (
                  <div className="mx-auto w-full max-w-[1080px]">
                    <ThirtySixKe />
                  </div>
                ) : style.id === "hoian" ? (
                  <div className="mx-auto w-full max-w-[1080px]">
                    <TaoThao />
                  </div>
                ) : style.id === "hong_tram" ? (
                  <VeTui />
                ) : style.id === "giaydo" ? (
                  <MucLam theme={style} />
                ) : style.id === "dongho" ? (
                  <TuSach theme={style} />
                ) : (
                  <>
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border p-2.5 sm:p-3"
                  style={{
                    background: style.panelBg,
                    borderColor: style.panelBorder,
                    boxShadow: style.previewShadow
                  }}
                >
                  <h2
                    className={`text-center font-serif text-3xl font-black leading-tight sm:text-4xl ${style.id === "sap_bao_dem" ? "flex items-center justify-center gap-3" : ""}`}
                    style={{ color: style.accent }}
                  >
                    {style.id === "sap_bao_dem" && <MusicWave />}
                    {style.name}
                  </h2>
                  <p className="mx-auto mt-1 max-w-3xl text-center font-serif text-base leading-6" style={{ color: style.textSoft }}>
                    {style.subtitle}
                  </p>
                  <Divider style={style} />
                  <div className="text-center text-[11px] uppercase leading-4 tracking-[0.24em]" style={{ color: style.textMuted }}>
                    {style.motif}
                  </div>
                </motion.div>

                {tabPosts.length > 0 && (
                <div className="mt-5 space-y-4">
                  {tabPosts.map((post, index) => {
                    const bodyBlocks = Array.isArray(post.body) ? post.body : [post.body];

                    return (
                      <motion.article
                        key={post.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                        className={`grid gap-4 border ${post.small ? "p-3 sm:p-3.5" : "p-4 sm:p-5"} ${post.centered ? "text-center" : post.small ? "" : "sm:grid-cols-[84px_1fr]"}`}
                        style={{
                          background: style.panelSoftBg,
                          borderColor: style.panelSoftBorder,
                          boxShadow: style.panelSoftShadow
                        }}
                      >
                        {(post.image || post.seal || post.type || post.date) && (
                        <div className={post.centered ? "text-center" : "flex sm:block sm:text-center"}>
                          <div
                            className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden border-4 border-double font-serif font-black ${post.sealLarge ? "text-xl" : "text-sm"} ${post.centered ? "mx-auto" : ""}`}
                            style={{ color: style.accent, borderColor: style.sealBorder, background: style.sealBg }}
                          >
                            {post.image ? (
                              <img className="h-full w-full object-cover" src={post.image} alt="" />
                            ) : (
                              post.seal
                            )}
                          </div>
                          <div className={post.centered ? "mt-3" : "ml-3 sm:ml-0 sm:mt-3"}>
                            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: style.textMuted }}>
                              {post.type}
                            </div>
                            <div className="mt-1 text-xs" style={{ color: style.textMuted }}>{post.date}</div>
                          </div>
                        </div>
                        )}
                        <div>
                          <h3 className={`font-serif ${post.small ? "text-base font-normal leading-6" : "text-2xl font-black sm:text-3xl"}`}>{post.title}</h3>
                          {bodyBlocks.length > 0 && (
                          <div className={`mt-3 max-w-3xl space-y-3 text-base leading-8 ${post.centered ? "mx-auto" : ""}`} style={{ color: style.textSoft }}>
                            {bodyBlocks.map((paragraph) => (
                              <p key={paragraph}>
                                {paragraph.split("\n").map((line, lineIndex, lines) => (
                                  <React.Fragment key={line}>
                                    {line}
                                    {lineIndex < lines.length - 1 && <br />}
                                  </React.Fragment>
                                ))}
                              </p>
                            ))}
                          </div>
                          )}
                          {post.lesson && (
                            <>
                              <div className="my-4 flex items-center gap-3 opacity-70">
                                <div className="h-px flex-1" style={{ background: style.accent }} />
                                <div className="text-xs" style={{ color: style.accent, letterSpacing: style.dividerTracking }}>
                                  {style.dividerSymbol}
                                </div>
                                <div className="h-px flex-1" style={{ background: style.accent }} />
                              </div>
                              <p
                                className="max-w-3xl border-l-4 py-2 pl-4 font-serif text-lg leading-8"
                                style={{ borderColor: style.accent, color: style.text }}
                              >
                                {post.lesson}
                              </p>
                            </>
                          )}
                          {post.mood && (
                            <div
                              className="mt-4 border-y py-2 text-xs uppercase tracking-[0.16em]"
                              style={{ borderColor: style.panelSoftBorder, color: style.textMuted }}
                            >
                              {post.mood}
                            </div>
                          )}
                          {post.tags && (
                            <div className={`mt-3 flex flex-wrap gap-2 ${post.centered ? "justify-center" : ""}`}>
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="border px-2.5 py-1 text-xs font-bold"
                                  style={{ borderColor: style.panelSoftBorder, color: style.accent, background: style.btnBg }}
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
                                boxShadow: style.btnShadow
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
            </section>

            <footer className="mt-7 border-t pt-6" style={{ borderColor: style.borderSection }}>
              <div className="mt-6 text-center" style={{ color: style.textMuted }}>
                <div className="gc-footer-stars" aria-hidden="true">✦ ✧ ✦ ✧ ✦ ✧ ✦</div>
                <p className="mt-2 text-sm">
                  Được chế từ <span className="gc-heart">♥</span> và rất nhiều caffeine
                </p>
                <p className="mt-2 font-serif text-base font-black" style={{ color: style.accent }}>
                  <span className="gc-blink">Hưng | Đúng, là Hưng</span>
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em]">© 2026 Một Góc Đời</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
