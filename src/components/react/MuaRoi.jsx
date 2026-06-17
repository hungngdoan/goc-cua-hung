import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ================================================================
   "Cơn Mưa" -- the quiet-reflection tab for Một Góc Đời. Rendered
   inside the StyleLab frame on the `suong_mai` tab and handed the
   active theme as `theme` -- the same token set StyleLab paints every
   other tab with, so every colour, border and shadow stays in sync
   with no duplicated palette. The surrounding frame already paints
   the page background.

   This tab collects short literary pieces (đôi câu chữ nhặt được
   trong ngày mưa), each credited to its source -- the first batch is
   from the page "Sư Tử Tâm".

   ── Adding a new quote = adding one object to QUOTES below. ──
   Each quote carries:
     - id      : unique slug (used as React key).
     - tag      : a short category chip (optional).
     - title    : the heading of the piece.
     - lead     : array of punchy opening lines -- the always-visible
                  "hook". Rendered large and centred.
     - blocks   : the body, revealed under "Đọc tiếp". An ordered list
                  of typed blocks so prose, classical citations and
                  verse each get their own treatment:
                    { type: "p",    text }                  -> a paragraph
                    { type: "cite", lead?, text, after? }   -> a classical saying
                    { type: "verse", lines: [..] }          -> stacked cadence lines
   Everything is data-driven; the list grows without touching layout.
   ================================================================ */

const QUOTES = [
  {
    id: "ha-minh-truoc-ke-ngu",
    tag: "Đối nhân xử thế",
    title: "Hạ Mình Trước Kẻ Ngu",
    lead: [
      "Hạ mình trước kẻ ngu là trí tuệ.",
      "Đấu lý với nó là dại khờ.",
      "Đời này cái hại lớn nhất là mất bình tĩnh.",
    ],
    blocks: [
      {
        type: "p",
        text:
          "Trong thiên hạ, cái hại lớn nhất của người quân tử không phải đến từ kẻ tiểu nhân, mà đến từ việc mất bình tĩnh trước kẻ chẳng đáng để tranh luận.",
      },
      {
        type: "cite",
        lead: "Cổ nhân từng dạy:",
        text: "Trí giả bất ngôn, ngôn giả bất trí.",
      },
      {
        type: "p",
        text:
          "Người thật sự có trí tuệ, ít khi phí lời. Bởi họ biết, có những kẻ tâm trí nhỏ hẹp, kiến thức nông cạn, mắt chỉ thấy một tấc trước mặt. Đối diện với loại người ấy, càng nói càng loạn, càng tranh càng mệt.",
      },
      {
        type: "verse",
        lines: ["Vì sao?", "Vì lý không nằm ở tiếng to,", "mà ở tầm của cái tâm."],
      },
      {
        type: "p",
        text:
          "Kẻ ngu không phải chỉ vì tri thức thấp, mà vì tâm tính cố chấp, không chịu học hỏi, không chịu lắng nghe. Ngươi càng cố giảng giải, hắn càng cho là ngươi đang xúc phạm hắn. Ngươi đem lý tới, hắn đem cảm xúc ra đối. Ngươi dùng sự thật, hắn dùng sự cố chấp. Cãi như vậy, chẳng khác nào hai kẻ hồ đồ đang làm loạn thanh danh bản thân.",
      },
      {
        type: "cite",
        lead: "Cho nên người xưa mới nói:",
        text: "Biết cúi đầu trước đứa ngu, ấy là bậc quân tử.",
        after: "Không phải sợ hãi, mà là trí tuệ của sự nhún nhường.",
      },
      {
        type: "verse",
        lines: ["Người hiểu đạo lấy tĩnh thắng động,", "lấy nhẫn thắng nóng,", "lấy trí thắng ngu."],
      },
      {
        type: "p",
        text: "Khi đối diện kẻ hồ đồ, chỉ cần một nụ cười nhẹ, một bước lùi êm:",
      },
      {
        type: "verse",
        lines: ["Ấy là giữ thân,", "giữ tâm,", "giữ phẩm hạnh,", "chứ không phải thua cuộc."],
      },
    ],
  },
];

/* -- atoms ------------------------------------------------------ */

const Fade = ({ children, d = 0, className = "" }) => {
  // Respect prefers-reduced-motion: opt-out users skip the entrance.
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

// Faithful copy of StyleLab's <Divider>: same gap-2 + opacity-80, driven
// by the theme's dividerSymbol / dividerTracking / accent.
const Divider = ({ theme }) => (
  <div className="my-1.5 flex items-center gap-2 opacity-80">
    <div className="h-px flex-1" style={{ background: theme.accent }} />
    <div className="text-xs" style={{ color: theme.accent, letterSpacing: theme.dividerTracking }}>
      {theme.dividerSymbol}
    </div>
    <div className="h-px flex-1" style={{ background: theme.accent }} />
  </div>
);

/* -- body blocks: prose, classical citation, verse -------------- */

function Block({ theme, block }) {
  if (block.type === "cite") {
    // A classical saying: a small lead label, the line itself in serif
    // italic accent framed by quotation marks, and an optional gloss.
    return (
      <figure className="my-5 text-center">
        {block.lead && (
          <figcaption
            className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: theme.textMuted }}
          >
            {block.lead}
          </figcaption>
        )}
        <blockquote
          className="mx-auto max-w-xl font-serif text-xl italic leading-relaxed sm:text-2xl"
          style={{ color: theme.accent }}
        >
          <span aria-hidden="true">“</span>
          {block.text}
          <span aria-hidden="true">”</span>
        </blockquote>
        {block.after && (
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6" style={{ color: theme.textMuted }}>
            {block.after}
          </p>
        )}
      </figure>
    );
  }

  if (block.type === "verse") {
    // Stacked cadence lines, centred, a touch of accent.
    return (
      <p
        className="my-4 text-center font-serif text-lg italic leading-8"
        style={{ color: theme.text }}
      >
        {block.lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    );
  }

  // Default: a prose paragraph.
  return (
    <p className="my-3 text-base leading-8" style={{ color: theme.textSoft }}>
      {block.text}
    </p>
  );
}

/* -- a single quote card ---------------------------------------- */

function QuoteCard({ theme, quote }) {
  const reduce = useReducedMotion();
  const hasBody = Array.isArray(quote.blocks) && quote.blocks.length > 0;
  const [open, setOpen] = useState(Boolean(quote.defaultOpen && hasBody));

  return (
    <div
      className="mr-card border p-4 sm:p-6"
      style={{
        background: theme.panelBg,
        borderColor: theme.panelBorder,
        boxShadow: theme.previewShadow,
      }}
    >
      {/* ── tag + title ── */}
      <div className="min-w-0">
        {quote.tag && (
          <div
            className="mb-1.5 inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ borderColor: theme.tagBorder, color: theme.accent, background: theme.tagBg }}
          >
            {quote.tag}
          </div>
        )}
        <h3 className="font-serif text-2xl font-black leading-tight sm:text-3xl" style={{ color: theme.text }}>
          {quote.title}
        </h3>
      </div>

      {/* ── lead: the always-visible hook, large and centred, framed by a
          big decorative quotation mark ── */}
      {Array.isArray(quote.lead) && quote.lead.length > 0 && (
        <div className="relative mt-4">
          <span
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-serif text-6xl leading-none opacity-20"
            style={{ color: theme.accent }}
            aria-hidden="true"
          >
            ❝
          </span>
          <div className="relative space-y-1 pt-3 text-center">
            {quote.lead.map((line, i) => (
              <p
                key={i}
                className="font-serif text-xl font-black leading-snug sm:text-2xl"
                style={{ color: theme.text }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* ── expandable body: the full piece ── */}
      {hasBody && (
        <>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mr-toggle inline-flex items-center gap-2 border px-3.5 py-2 text-sm font-bold"
              style={{
                borderColor: theme.accent,
                color: theme.accent,
                background: theme.btnBg,
                boxShadow: theme.btnShadow,
              }}
            >
              <span
                className="mr-caret transition-transform"
                style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
                aria-hidden="true"
              >
                ▸
              </span>
              {open ? "Thu gọn" : "Đọc tiếp"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="body"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="mt-2">
                  <Divider theme={theme} />
                </div>
                <div className="mx-auto mt-3 max-w-2xl">
                  {quote.blocks.map((block, i) => (
                    <Block key={i} theme={theme} block={block} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* -- main ------------------------------------------------------- */

export default function MuaRoi({ theme }) {
  return (
    <div className="mua-roi relative mx-auto w-full max-w-[920px]" style={{ color: theme.text }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .mua-roi ::selection { background: ${theme.accentSoft}; color: ${theme.text}; }
        .mr-card {
          transition: transform 200ms ease, box-shadow 220ms ease, border-color 200ms ease;
        }
        .mr-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px ${theme.panelBorder}, ${theme.previewShadow};
        }
        .mr-toggle { transition: transform 160ms ease, box-shadow 160ms ease; }
        .mr-toggle:hover { transform: translateY(-1px); }
        @media (prefers-reduced-motion: reduce) {
          .mr-card, .mr-toggle, .mr-caret { transition: none; }
          .mr-card:hover, .mr-toggle:hover { transform: none; }
        }
      ` }} />

      {/* ── header: same themed preview tile every other tab uses ── */}
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

      {/* ── the quotes ── */}
      <div className="mt-5 space-y-4">
        {QUOTES.map((quote, i) => (
          <Fade key={quote.id} d={0.08 + i * 0.05}>
            <QuoteCard theme={theme} quote={quote} />
          </Fade>
        ))}
      </div>

      {/* ── closing ── same Divider as the header, kept consistent ── */}
      <Fade d={0.18 + QUOTES.length * 0.05}>
        <div className="mt-6">
          <Divider theme={theme} />
        </div>
      </Fade>
      <Fade d={0.22 + QUOTES.length * 0.05}>
        <p
          className="mt-3 pb-2 text-center font-serif text-base italic leading-7"
          style={{ color: theme.textMuted }}
        >
          Lời hay nhặt được trong ngày mưa, để dành lúc lòng cần tĩnh lại.
        </p>
      </Fade>
    </div>
  );
}
