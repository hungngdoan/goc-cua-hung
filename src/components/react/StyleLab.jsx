import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import bannerRoses from "../../banner_roses.gif?url";
import ThirtySixKe from "./ThirtySixKe.jsx";

const posts = [
  {
    title: "Placeholder Article One",
    date: "Month 00, 0000",
    type: "Sample category",
    seal: "One",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit at sapien varius blandit."
  },
  {
    title: "Placeholder Article Two",
    date: "Month 00, 0000",
    type: "Sample note",
    seal: "Two",
    body: "Praesent commodo libero non lectus facilisis, sed tempor mi luctus. Cras posuere sem a nibh gravida."
  },
  {
    title: "Placeholder Article Three",
    date: "Month 00, 0000",
    type: "Sample update",
    seal: "Tre",
    body: "Aliquam erat volutpat. Donec vitae arcu nec justo dictum pretium quis a augue."
  },
  {
    title: "Placeholder Article Four",
    date: "Month 00, 0000",
    type: "Sample essay",
    seal: "For",
    body: "Sed sit amet tellus at ipsum faucibus gravida. Vivamus luctus erat non quam ultrices placerat."
  },
  {
    title: "Placeholder Article Five",
    date: "Month 00, 0000",
    type: "Sample journal",
    seal: "Fiv",
    body: "Nam dapibus, lorem a porta posuere, ipsum massa facilisis neque, eget pretium sem lorem in est."
  }
];

const styles = [
  {
    id: "giaydo",
    name: "Placeholder Style Eight",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt lorem in quam feugiat.",
    pageBg: "#efe1c3",
    text: "#2a1b10",
    textSoft: "rgba(42,27,16,0.75)",
    textMuted: "rgba(42,27,16,0.60)",
    accent: "#7b2d16",
    accentSoft: "rgba(123,45,22,0.133)",
    borderOuter: "rgba(42,27,16,0.35)",
    borderInner: "rgba(42,27,16,0.20)",
    borderSection: "rgba(42,27,16,0.25)",
    contentBorder: "rgba(42,27,16,0.15)",
    questColor: "#2a1b10",
    questMuted: "#2a1b10",
    frameBg: "rgba(42,27,16,0.025)",
    frameShadow: "none",
    panelBg: "rgba(248,237,207,0.90)",
    panelBorder: "rgba(107,63,33,0.30)",
    panelShadow: "6px 6px 0 rgba(0,0,0,.10)",
    panelSoftBg: "rgba(255,246,220,0.65)",
    panelSoftBorder: "rgba(107,63,33,0.20)",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.10)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.12)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.10)",
    navBg: "rgba(0,0,0,0.02)",
    navBorder: "rgba(42,27,16,0.20)",
    chooserBg: "rgba(0,0,0,0.02)",
    chooserBorder: "rgba(0,0,0,0.18)",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.16)",
    chooserTextInactive: "#2a1b10",
    musicHighlight: "#2a1b10",
    statBg: "rgba(0,0,0,0.025)",
    statBorder: "rgba(42,27,16,0.25)",
    statShadow: "4px 4px 0 rgba(0,0,0,.08)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(0,0,0,.10)",
    tagBg: "transparent",
    tagBorder: "rgba(42,27,16,0.30)",
    tagShadow: "3px 3px 0 rgba(0,0,0,.08)",
    sealBg: "transparent",
    sealBorder: "rgba(42,27,16,0.35)",
    avatarBorder: "rgba(42,27,16,0.40)",
    avatarBg: "rgba(0,0,0,0.04)",
    dividerSymbol: "◇ ◇ ◇",
    dividerTracking: "0.35em",
    pattern: "repeating-linear-gradient(0deg, rgba(42,27,16,.035) 0 1px, transparent 1px 26px), radial-gradient(circle at 12% 10%, rgba(123,45,22,.15), transparent 28%), radial-gradient(circle at 85% 20%, rgba(120,72,28,.12), transparent 25%)",
    motif: "✦  placeholder  ✦  sample  ✦  text  ✦"
  },
  {
    id: "hoian",
    name: "Placeholder Style One",
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
    name: "Placeholder Style Nine",
    subtitle: "Aliquam erat volutpat. Donec vitae arcu nec justo dictum pretium.",
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
    motif: "◈  placeholder  ◈  sample  ◈  text  ◈"
  },
  {
    id: "sapbao_sang",
    name: "Placeholder Style Ten",
    subtitle: "Sed sit amet tellus at ipsum faucibus gravida. Vivamus luctus erat non quam.",
    pageBg: "#ded2b2",
    text: "#201811",
    textSoft: "rgba(32,24,17,0.75)",
    textMuted: "rgba(32,24,17,0.60)",
    accent: "#8a1f16",
    accentSoft: "rgba(138,31,22,0.133)",
    borderOuter: "rgba(32,24,17,0.35)",
    borderInner: "rgba(32,24,17,0.20)",
    borderSection: "rgba(32,24,17,0.25)",
    contentBorder: "rgba(32,24,17,0.15)",
    questColor: "#201811",
    questMuted: "#201811",
    frameBg: "rgba(32,24,17,0.025)",
    frameShadow: "none",
    panelBg: "rgba(238,226,191,0.92)",
    panelBorder: "rgba(32,24,17,0.35)",
    panelShadow: "6px 6px 0 rgba(0,0,0,.10)",
    panelSoftBg: "rgba(247,236,207,0.70)",
    panelSoftBorder: "rgba(32,24,17,0.25)",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.10)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.12)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.10)",
    navBg: "rgba(0,0,0,0.02)",
    navBorder: "rgba(32,24,17,0.20)",
    chooserBg: "rgba(0,0,0,0.02)",
    chooserBorder: "rgba(0,0,0,0.18)",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.16)",
    chooserTextInactive: "#201811",
    musicHighlight: "#201811",
    statBg: "rgba(0,0,0,0.025)",
    statBorder: "rgba(32,24,17,0.25)",
    statShadow: "4px 4px 0 rgba(0,0,0,.08)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(0,0,0,.10)",
    tagBg: "transparent",
    tagBorder: "rgba(32,24,17,0.30)",
    tagShadow: "3px 3px 0 rgba(0,0,0,.08)",
    sealBg: "transparent",
    sealBorder: "rgba(32,24,17,0.35)",
    avatarBorder: "rgba(32,24,17,0.40)",
    avatarBg: "rgba(0,0,0,0.04)",
    dividerSymbol: "◇ ◇ ◇",
    dividerTracking: "0.35em",
    pattern: "repeating-linear-gradient(90deg, rgba(32,24,17,.04) 0 1px, transparent 1px 38px), repeating-linear-gradient(0deg, rgba(32,24,17,.025) 0 1px, transparent 1px 18px)",
    motif: "PLACEHOLDER · SAMPLE · TEXT · NOTES"
  },
  {
    id: "quancoc_sang",
    name: "Placeholder Style Eleven",
    subtitle: "Nam dapibus, lorem a porta posuere, ipsum massa facilisis neque.",
    pageBg: "#d9c28f",
    text: "#24180e",
    textSoft: "rgba(36,24,14,0.72)",
    textMuted: "rgba(36,24,14,0.60)",
    accent: "#2f6b3f",
    accentSoft: "rgba(47,107,63,0.133)",
    borderOuter: "rgba(36,24,14,0.35)",
    borderInner: "rgba(36,24,14,0.20)",
    borderSection: "rgba(36,24,14,0.25)",
    contentBorder: "rgba(36,24,14,0.15)",
    questColor: "#24180e",
    questMuted: "#24180e",
    frameBg: "rgba(36,24,14,0.025)",
    frameShadow: "none",
    panelBg: "rgba(234,214,162,0.90)",
    panelBorder: "rgba(93,59,31,0.35)",
    panelShadow: "6px 6px 0 rgba(0,0,0,.10)",
    panelSoftBg: "rgba(245,228,178,0.70)",
    panelSoftBorder: "rgba(93,59,31,0.25)",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.10)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.12)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.10)",
    navBg: "rgba(0,0,0,0.02)",
    navBorder: "rgba(36,24,14,0.20)",
    chooserBg: "rgba(0,0,0,0.02)",
    chooserBorder: "rgba(0,0,0,0.18)",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.16)",
    chooserTextInactive: "#24180e",
    musicHighlight: "#24180e",
    statBg: "rgba(0,0,0,0.025)",
    statBorder: "rgba(36,24,14,0.25)",
    statShadow: "4px 4px 0 rgba(0,0,0,.08)",
    btnBg: "transparent",
    btnShadow: "3px 3px 0 rgba(0,0,0,.10)",
    tagBg: "transparent",
    tagBorder: "rgba(36,24,14,0.30)",
    tagShadow: "3px 3px 0 rgba(0,0,0,.08)",
    sealBg: "transparent",
    sealBorder: "rgba(36,24,14,0.35)",
    avatarBorder: "rgba(36,24,14,0.40)",
    avatarBg: "rgba(0,0,0,0.04)",
    dividerSymbol: "◇ ◇ ◇",
    dividerTracking: "0.35em",
    pattern: "radial-gradient(circle at 20% 20%, rgba(47,107,63,.16), transparent 24%), repeating-linear-gradient(90deg, rgba(93,59,31,.05) 0 3px, transparent 3px 18px)",
    motif: "☕  placeholder  •  sample  •  text  ☕"
  },
  {
    id: "hong_tram",
    name: "Placeholder Style Two",
    subtitle: "Curabitur posuere, mi sed facilisis varius, nunc massa tempor arcu.",
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
    id: "den_dau",
    name: "Placeholder Style Three",
    subtitle: "Morbi vulputate neque ut massa facilisis, vitae luctus lorem dictum.",
    pageBg: "#0D0906",
    text: "#F0DEC1",
    textSoft: "#A99575",
    textMuted: "#5D4A32",
    accent: "#D09A4E",
    accentSoft: "rgba(208,154,78,0.1)",
    borderOuter: "#342617",
    borderInner: "#342617",
    borderSection: "#342617",
    contentBorder: "#342617",
    questColor: "#A99575",
    questMuted: "#5D4A32",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "rgba(23,16,10,0.72)",
    panelBorder: "#342617",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(23,16,10,0.72)",
    panelSoftBorder: "#342617",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(23,16,10,0.72)",
    navBorder: "#342617",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#342617",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#A99575",
    musicHighlight: "#D09A4E",
    statBg: "rgba(208,154,78,0.1)",
    statBorder: "#342617",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(208,154,78,0.1)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(23,16,10,0.72)",
    tagBorder: "#342617",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(208,154,78,0.1)",
    sealBorder: "#5D4A32",
    avatarBorder: "#5D4A32",
    avatarBg: "rgba(208,154,78,0.1)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(208,154,78,0.12), transparent 18%), radial-gradient(circle at 82% 18%, rgba(208,154,78,0.055), transparent 26%), radial-gradient(circle at 50% 92%, rgba(208,154,78,0.055), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 24px), linear-gradient(135deg, #0D0906, #1E1309 48%, #120D08)",
    motif: "placeholder · sample · text · notes"
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
    name: "Placeholder Style Five",
    subtitle: "Suspendisse vitae tellus sed lorem laoreet porta id at mauris.",
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
    motif: "placeholder · sample · text · notes"
  },
  {
    id: "quan_coc_toi",
    name: "Placeholder Style Six",
    subtitle: "Maecenas suscipit sem vitae sapien rhoncus, non posuere neque tempor.",
    pageBg: "#070D0A",
    text: "#DDE8DC",
    textSoft: "#8EA291",
    textMuted: "#485A4D",
    accent: "#7AA083",
    accentSoft: "rgba(122,160,131,0.1)",
    borderOuter: "#223329",
    borderInner: "#223329",
    borderSection: "#223329",
    contentBorder: "#223329",
    questColor: "#8EA291",
    questMuted: "#485A4D",
    frameBg: "rgba(255,255,255,0.018)",
    frameShadow: "0 0 80px rgba(0,0,0,.38)",
    panelBg: "rgba(16,25,21,0.74)",
    panelBorder: "#223329",
    panelShadow: "6px 6px 0 rgba(0,0,0,.26)",
    panelSoftBg: "rgba(16,25,21,0.74)",
    panelSoftBorder: "#223329",
    panelSoftShadow: "6px 6px 0 rgba(0,0,0,.26)",
    previewShadow: "7px 7px 0 rgba(0,0,0,.30)",
    footerShadow: "5px 5px 0 rgba(0,0,0,.26)",
    navBg: "rgba(16,25,21,0.74)",
    navBorder: "#223329",
    chooserBg: "rgba(255,255,255,0.02)",
    chooserBorder: "#223329",
    chooserShadow: "4px 4px 0 rgba(0,0,0,.35)",
    chooserTextInactive: "#8EA291",
    musicHighlight: "#7AA083",
    statBg: "rgba(122,160,131,0.1)",
    statBorder: "#223329",
    statShadow: "4px 4px 0 rgba(0,0,0,.24)",
    btnBg: "rgba(122,160,131,0.1)",
    btnShadow: "3px 3px 0 rgba(0,0,0,.25)",
    tagBg: "rgba(16,25,21,0.74)",
    tagBorder: "#223329",
    tagShadow: "3px 3px 0 rgba(0,0,0,.22)",
    sealBg: "rgba(122,160,131,0.1)",
    sealBorder: "#485A4D",
    avatarBorder: "#485A4D",
    avatarBg: "rgba(122,160,131,0.1)",
    dividerSymbol: "• • •",
    dividerTracking: "0.28em",
    pattern: "radial-gradient(circle at 12% 8%, rgba(122,160,131,0.11), transparent 18%), radial-gradient(circle at 82% 18%, rgba(122,160,131,0.045), transparent 26%), radial-gradient(circle at 50% 92%, rgba(122,160,131,0.045), transparent 28%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 24px), linear-gradient(135deg, #070D0A, #101B15 48%, #080F0C)",
    motif: "placeholder · sample · text · notes"
  },
  {
    id: "suong_mai",
    name: "Placeholder Style Twelve",
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
    name: "Placeholder Style Seven",
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

const darkRow = ["den_dau", "hong_tram", "hoian", "muc_than", "sap_bao_dem", "quan_coc_toi"].map((id) => styles.find((s) => s.id === id));
const brightRow = ["hoa_dao", "giaydo", "dongho", "sapbao_sang", "quancoc_sang", "suong_mai"].map((id) => styles.find((s) => s.id === id));

const styleIcons = {
  hoian: "🏮",
  hong_tram: "🌹",
  den_dau: "🕯",
  muc_than: "📜",
  sap_bao_dem: "🌙",
  quan_coc_toi: "🍵",
  hoa_dao: "🌸",
  giaydo: "📜",
  dongho: "⏳",
  sapbao_sang: "⛅",
  quancoc_sang: "☕",
  suong_mai: "💧"
};

const quests = ["Placeholder task one", "Placeholder task two", "Placeholder task three", "Placeholder task four", "Placeholder task five", "Placeholder task six"];

function Divider({ style }) {
  return (
    <div className="my-5 flex items-center gap-3 opacity-80">
      <div className="h-px flex-1" style={{ background: style.accent }} />
      <div style={{ color: style.accent, letterSpacing: style.dividerTracking }} className="text-xs">{style.dividerSymbol}</div>
      <div className="h-px flex-1" style={{ background: style.accent }} />
    </div>
  );
}

function WovenStat({ label, value, style }) {
  return (
    <div
      className="border p-4"
      style={{
        background: style.statBg,
        borderColor: style.statBorder,
        boxShadow: style.statShadow
      }}
    >
      <div className="text-[11px] font-bold uppercase leading-4 tracking-[0.12em]" style={{ color: style.textMuted }}>{label}</div>
      <div className="mt-1 text-xl font-black" style={{ color: style.text }}>{value}</div>
    </div>
  );
}

export default function VietnameseBlogStyleLab() {
  const [styleId, setStyleId] = useState("den_dau");
  const style = useMemo(() => styles.find((item) => item.id === styleId) || styles[0], [styleId]);

  const renderTab = (item) => {
    const isActive = item.id === style.id;
    return (
      <button
        key={item.id}
        onClick={() => setStyleId(item.id)}
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
      `}</style>
    <main
      className="min-h-screen"
      style={{ color: style.text, backgroundColor: style.pageBg, backgroundImage: style.pattern }}
    >
      <div className="web-scale-shell mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] px-4 py-5 sm:px-7 lg:px-8 2xl:px-12">
        <div
          className="border-[3px] border-double p-2"
          style={{
            borderColor: style.borderOuter,
            background: style.frameBg,
            boxShadow: style.frameShadow
          }}
        >
          <div className="border p-4 sm:p-6 lg:p-8 2xl:p-12" style={{ borderColor: style.borderInner }}>
            <div
              className="relative mb-7 overflow-hidden border"
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
                style={{ maxWidth: "780px" }}
              />
            </div>
            <header>
              <div>
                <div
                  className="inline-block border px-3 py-1 text-xs uppercase tracking-[0.26em]"
                  style={{
                    borderColor: style.tagBorder,
                    color: style.textSoft,
                    background: style.tagBg,
                    boxShadow: style.tagShadow
                  }}
                >
                  Đời là vô thường
                </div>
                <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(620px,820px)] xl:items-center">
                  <h1 className="max-w-4xl 2xl:max-w-5xl font-serif text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
                    Một Góc Đời
                  </h1>
                  <aside
                    className="grid gap-4 border p-4 sm:grid-cols-[auto_1fr] sm:items-center lg:p-5 xl:grid-cols-[auto_minmax(0,1fr)_auto]"
                    style={{
                      background: style.panelBg,
                      borderColor: style.panelBorder,
                      boxShadow: style.panelShadow
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-double text-2xl font-black tracking-tight"
                        style={{ borderColor: style.avatarBorder, background: style.avatarBg, color: style.accent }}
                      >
                        H
                      </div>
                      <div>
                        <div className="font-serif text-3xl font-black leading-none">Hưng</div>
                        <div className="mt-2 text-sm font-bold uppercase tracking-[0.16em]" style={{ color: style.textMuted }}>
                          Góc riêng
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-lg leading-8 sm:border-l sm:pl-5"
                      style={{ color: style.textSoft, borderColor: style.contentBorder }}
                    >
                      Ghi lại chuyện nhỏ, nếp nghĩ, và những ngày đáng nhớ.
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:col-span-2 xl:col-span-1 xl:w-[250px]">
                      <WovenStat label="Mục tiêu" value="Lưu giữ" style={style} />
                      <WovenStat label="Trạng thái" value="Tích cực" style={style} />
                    </div>
                  </aside>
                </div>
                <p className="mt-5 max-w-2xl font-serif text-lg leading-8" style={{ color: style.textSoft }}>
                  Một góc riêng, để giữ lại và chia sẻ.
                </p>
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

            {style.id === "muc_than" ? (
              <div className="mx-auto mt-6 w-full max-w-[865px]">
                <ThirtySixKe />
              </div>
            ) : (
              <>
            <section className="mt-6 grid gap-5 lg:grid-cols-[310px_1fr] 2xl:grid-cols-[380px_1fr] 2xl:gap-8">
              <aside className="space-y-5">
                <section
                  className="border p-4"
                  style={{
                    background: style.panelSoftBg,
                    borderColor: style.panelSoftBorder,
                    boxShadow: style.panelSoftShadow
                  }}
                >
                  <div className="font-serif text-xl font-black">Placeholder Title</div>
                  <div
                    className="mt-3 border-y py-3 text-2xl font-black"
                    style={{ borderColor: style.contentBorder, color: style.musicHighlight }}
                  >
                    Sample Text
                  </div>
                  <p className="mt-2 text-sm" style={{ color: style.textSoft }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </section>

                <section
                  className="border p-4"
                  style={{
                    background: style.panelSoftBg,
                    borderColor: style.panelSoftBorder,
                    boxShadow: style.panelSoftShadow
                  }}
                >
                  <div className="font-serif text-xl font-black">Placeholder List</div>
                  <div className="mt-3 space-y-2">
                    {quests.map((quest, index) => (
                      <div
                        key={quest}
                        className="flex items-center justify-between border-b pb-2 text-sm"
                        style={{ borderColor: style.contentBorder }}
                      >
                        <span style={{ color: style.questColor }}>{quest}</span>
                        <span className="font-bold" style={{ color: index < 4 ? style.accent : style.questMuted }}>
                          {index < 4 ? "done" : "open"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>

              <section>
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border p-5 sm:p-6"
                  style={{
                    background: style.panelBg,
                    borderColor: style.panelBorder,
                    boxShadow: style.previewShadow
                  }}
                >
                  <div className="text-xs uppercase tracking-[0.3em]" style={{ color: style.textMuted }}>active sample</div>
                  <h2 className="mt-2 font-serif text-4xl font-black sm:text-5xl" style={{ color: style.accent }}>
                    {style.name}
                  </h2>
                  <p className="mt-3 max-w-3xl font-serif text-lg leading-8" style={{ color: style.textSoft }}>
                    {style.subtitle}
                  </p>
                  <Divider style={style} />
                  <div className="text-center text-xs uppercase tracking-[0.32em]" style={{ color: style.textMuted }}>
                    {style.motif}
                  </div>
                </motion.div>

                <div className="mt-5 space-y-4">
                  {posts.map((post, index) => (
                    <motion.article
                      key={post.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="grid gap-4 border p-4 sm:grid-cols-[84px_1fr] sm:p-5"
                      style={{
                        background: style.panelSoftBg,
                        borderColor: style.panelSoftBorder,
                        boxShadow: style.panelSoftShadow
                      }}
                    >
                      <div className="flex sm:block sm:text-center">
                        <div
                          className="grid h-16 w-16 shrink-0 place-items-center border-4 border-double font-serif text-sm font-black"
                          style={{ color: style.accent, borderColor: style.sealBorder, background: style.sealBg }}
                        >
                          {post.seal}
                        </div>
                        <div className="ml-3 sm:ml-0 sm:mt-3">
                          <div className="text-xs uppercase tracking-[0.2em]" style={{ color: style.textMuted }}>
                            {post.type}
                          </div>
                          <div className="mt-1 text-xs" style={{ color: style.textMuted }}>{post.date}</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-black sm:text-3xl">{post.title}</h3>
                        <p className="mt-3 max-w-3xl text-base leading-8" style={{ color: style.textSoft }}>
                          {post.body}
                        </p>
                        <button
                          className="mt-4 border px-4 py-2 text-sm font-bold transition hover:translate-x-0.5"
                          style={{
                            borderColor: style.accent,
                            color: style.accent,
                            background: style.btnBg,
                            boxShadow: style.btnShadow
                          }}
                        >
                          read more →
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            </section>

            <footer className="mt-7 border-t pt-5" style={{ borderColor: style.borderSection }}>
              <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
                <div
                  className="border p-4"
                  style={{
                    background: style.panelSoftBg,
                    borderColor: style.panelSoftBorder,
                    boxShadow: style.footerShadow
                  }}
                >
                  <div className="font-serif text-xl font-black">Placeholder Footer</div>
                  <p className="mt-2 leading-7" style={{ color: style.textSoft }}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae tellus sed lorem."
                  </p>
                </div>
                <div
                  className="border p-4"
                  style={{
                    background: style.panelSoftBg,
                    borderColor: style.panelSoftBorder,
                    boxShadow: style.footerShadow
                  }}
                >
                  <div className="font-serif text-xl font-black">Placeholder Notes</div>
                  <p className="mt-2 leading-7" style={{ color: style.textSoft }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem vitae sapien rhoncus, non posuere neque tempor.
                  </p>
                </div>
              </div>
              <div className="mt-5 text-center text-xs uppercase tracking-[0.35em]" style={{ color: style.textMuted }}>
                {style.motif}
              </div>
            </footer>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
