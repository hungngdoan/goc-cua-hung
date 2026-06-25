import { motion, useReducedMotion } from "framer-motion";

/* ================================================================
   "Mực Lam" -- Ca dao tục ngữ (Vietnamese proverbs) for Một Góc Đời.
   Rendered inside the StyleLab frame on the `giaydo` tab. It receives
   the active theme object as `theme` -- the exact same token set that
   lives in StyleLab's `styles` array -- so every colour, shadow, the
   header copy, and the divider come straight from the theme. No
   duplicated palette to drift out of sync. The surrounding frame
   already paints the page background.
   ================================================================ */

// `meaning` and `tag` are kept as the source-of-truth content (not
// rendered in the current minimal layout) so the gloss/category can be
// restored later without rewriting the list.
const PROVERBS = [
  {
    icon: "🪔",
    text: "Gần mực thì đen, gần đèn thì sáng",
    meaning:
      "Môi trường và bạn bè quanh ta lặng lẽ nhuộm nên con người ta. Chọn người để gần, chọn chỗ để đứng.",
    tag: "Môi trường",
  },
  {
    icon: "🪡",
    text: "Có công mài sắt, có ngày nên kim",
    meaning:
      "Thỏi sắt thô mài mãi rồi cũng thành cây kim. Kiên trì đủ lâu thì việc khó mấy cũng xong.",
    tag: "Kiên trì",
  },
  {
    icon: "🍚",
    text: "Khéo ăn thì no, khéo co thì ấm",
    meaning:
      "Biết liệu cơm gắp mắm, sống vừa sức mình thì lúc nào cũng thấy đủ đầy.",
    tag: "Liệu sức",
  },
  {
    icon: "⛰️",
    text: "Trèo cao ngã đau",
    meaning:
      "Tham vọng càng lớn thì rủi ro càng nhiều. Bước lên cao thì càng phải giữ mình cho vững.",
    tag: "Khiêm nhường",
  },
  {
    icon: "💧",
    text: "Uống nước nhớ nguồn",
    meaning:
      "Hưởng trái ngọt thì đừng quên gốc rễ, nhớ ơn người đi trước đã vun trồng.",
    tag: "Ơn nghĩa",
  },
  {
    icon: "🧭",
    text: "Đi một ngày đàng, học một sàng khôn",
    meaning:
      "Đi nhiều, trải nhiều thì khôn ra. Có những điều không sách vở nào dạy nổi.",
    tag: "Trải nghiệm",
  },
  {
    icon: "🌱",
    text: "Thất bại là mẹ thành công",
    meaning:
      "Vấp ngã không phải dấu chấm hết, mà là bài học dọn đường cho thành công về sau.",
    tag: "Bền chí",
  },
  {
    icon: "🔥",
    text: "Lửa thử vàng, gian nan thử sức",
    meaning:
      "Vàng thật không sợ lửa; người bản lĩnh được tôi luyện qua những ngày gian khó.",
    tag: "Bản lĩnh",
  },
  {
    icon: "🌳",
    text: "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao",
    meaning:
      "Một mình thì chật vật; đồng lòng góp sức thì việc lớn mấy cũng thành.",
    tag: "Đoàn kết",
  },
  {
    icon: "🛡️",
    text: "Nuôi quân 3 năm, dùng 1 lần",
    meaning:
      "Có những việc phải chuẩn bị lâu dài, rèn lực thật kỹ, để đến đúng thời điểm thì một lần ra tay cũng đủ xoay chuyển cục diện.",
    tag: "Chuẩn bị",
  },
  {
    icon: "⭐",
    text: "Có chí thì nên",
    meaning:
      "Còn ý chí và quyết tâm thì rồi việc gì cũng tới ngày làm được.",
    tag: "Ý chí",
  },
];

/* -- atoms ------------------------------------------------------ */

const Fade = ({ children, d = 0, className = "" }) => {
  // Respect prefers-reduced-motion: opt-out users skip the slide/fade-in
  // entrance entirely; the default experience is unchanged.
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: d, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Faithful copy of StyleLab's own <Divider>: same gap-2 + opacity-80,
// driven by the theme's dividerSymbol / dividerTracking / accent.
const Divider = ({ theme }) => (
  <div className="my-1.5 flex items-center gap-2 opacity-80">
    <div className="h-px flex-1" style={{ background: theme.accent }} />
    <div className="text-xs" style={{ color: theme.accent, letterSpacing: theme.dividerTracking }}>
      {theme.dividerSymbol}
    </div>
    <div className="h-px flex-1" style={{ background: theme.accent }} />
  </div>
);

/* -- main ------------------------------------------------------- */

export default function MucLam({ theme }) {
  return (
    <div
      className="muc-lam relative mx-auto w-full max-w-[860px]"
      style={{ color: theme.text }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .muc-lam ::selection { background: ${theme.accentSoft}; color: ${theme.text}; }
        .ml-card {
          transition: transform 200ms ease, box-shadow 220ms ease, border-color 200ms ease;
        }
        .ml-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px ${theme.panelBorder}, ${theme.previewShadow};
        }
        @media (prefers-reduced-motion: reduce) {
          .ml-card { transition: none; }
          .ml-card:hover { transform: none; }
        }
      ` }} />

      {/* ── header: the original "Mực Lam" preview tile, theme-driven ── */}
      <Fade d={0}>
        <div
          className="border p-2.5 sm:p-3"
          style={{
            background: theme.panelBg,
            borderColor: theme.panelBorder,
            boxShadow: theme.previewShadow,
          }}
        >
          <h2
            className="text-center font-serif text-3xl font-black leading-tight sm:text-4xl"
            style={{ color: theme.accent }}
          >
            {theme.name}
          </h2>
          <p
            className="mx-auto mt-1 max-w-3xl text-center font-serif text-base leading-6"
            style={{ color: theme.textSoft }}
          >
            {theme.subtitle}
          </p>
          <Divider theme={theme} />
          <div
            className="text-center text-[11px] uppercase leading-4 tracking-[0.24em]"
            style={{ color: theme.textMuted }}
          >
            {theme.motif}
          </div>
        </div>
      </Fade>

      {/* ── proverbs ── a list of: one cute icon + the quote, nothing else ── */}
      <ul className="mt-5 space-y-2.5">
        {PROVERBS.map((p, i) => (
          <li key={p.text}>
            <Fade d={0.08 + i * 0.04}>
              <div
                className="ml-card flex items-center gap-3 border px-3.5 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
                style={{
                  background: theme.panelBg,
                  borderColor: theme.panelBorder,
                  boxShadow: theme.panelShadow,
                }}
              >
                <span className="shrink-0 text-xl leading-none sm:text-2xl" aria-hidden="true">
                  {p.icon}
                </span>
                <p
                  className="min-w-0 font-serif text-lg font-black leading-snug sm:text-xl"
                  style={{ color: theme.accent }}
                >
                  {p.text}
                </p>
              </div>
            </Fade>
          </li>
        ))}
      </ul>

      {/* ── closing ── same Divider as the header, kept consistent ── */}
      <Fade d={0.16 + PROVERBS.length * 0.04}>
        <div className="mt-6">
          <Divider theme={theme} />
        </div>
      </Fade>
      <Fade d={0.2 + PROVERBS.length * 0.04}>
        <p
          className="mt-3 pb-2 text-center font-serif text-base italic leading-7"
          style={{ color: theme.textMuted }}
        >
          Người xưa nói ngắn, mà ngẫm thì dài.
        </p>
      </Fade>
    </div>
  );
}
