import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ================================================================
   "Tủ sách" -- the bookshelf tab for Một Góc Đời. Rendered inside the
   StyleLab frame on the `dongho` tab and handed the active theme as
   `theme` -- the same token set StyleLab paints every other tab with,
   so every colour, border and shadow stays in sync with no duplicated
   palette. The surrounding frame already paints the page background.

   Adding a book = adding one object to BOOKS below. A book may carry:
     - `distinctions`: pairs rendered as a "Người giàu vs Người nghèo"
        style contrast table (set `contrast` to label the two columns).
     - `notes`: a plain bullet list of takeaways.
   A book can have either, both, or neither. Everything is data-driven
   so the shelf grows without touching the layout.
   ================================================================ */

const BOOKS = [
  {
    id: "10-dieu-khac-biet",
    title: "10 Điều Khác Biệt Nhất Giữa Người Giàu Và Người Nghèo",
    author: "Keith Cameron Smith",
    emoji: "🧠",
    // Cover lives in public/img/. Store only the filename here; the base
    // URL (the site deploys under /goc-cua-hung) is resolved at render.
    cover: "10DieuKhacBietCover.webp",
    tag: "Tư duy",
    blurb:
      "Cuốn sách đầu tiên tôi đọc, và đến giờ vẫn còn nhớ mãi.",
    // When present, `distinctions` is rendered as a two-column contrast.
    // Replace any line freely -- the layout adapts to whatever text fits.
    contrast: { left: "Người giàu", right: "Người nghèo" },
    distinctions: [
      { rich: "Nghĩ dài hạn.", poor: "Nghĩ ngắn hạn." },
      { rich: "Bàn về ý tưởng.", poor: "Bàn tán về con người và sự việc." },
      { rich: "Đón nhận sự thay đổi.", poor: "Sợ sự thay đổi." },
      { rich: "Chấp nhận rủi ro có tính toán.", poor: "Sợ rủi ro." },
      {
        rich: "Không ngừng học hỏi và lớn lên.",
        poor: "Nghĩ rằng việc học đã xong khi rời ghế nhà trường.",
      },
      { rich: "Làm việc vì lợi nhuận.", poor: "Làm việc vì tiền lương." },
      {
        rich: "Tin rằng mình phải hào phóng.",
        poor: "Nghĩ rằng mình không đủ sức để cho đi.",
      },
      { rich: "Có nhiều nguồn thu nhập.", poor: "Chỉ có một, hai nguồn thu nhập." },
      {
        rich: "Tập trung làm tăng giá trị tài sản ròng.",
        poor: "Tập trung làm tăng tiền lương.",
      },
      {
        rich: "Tự hỏi những câu hỏi tiếp thêm sức mạnh.",
        poor: "Tự hỏi những câu hỏi khiến mình nhụt chí.",
      },
    ],
    defaultOpen: true,
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

/* -- the expandable "10 differences" contrast table ------------- */

function Distinctions({ theme, contrast, items }) {
  return (
    <div className="mt-4">
      {/* column headers: Người giàu | Người nghèo, shown once */}
      <div
        className="hidden grid-cols-[2.4rem_1fr_1fr] gap-x-3 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] sm:grid"
        style={{ color: theme.textMuted }}
      >
        <span />
        <span style={{ color: theme.accent }}>{contrast.left}</span>
        <span>{contrast.right}</span>
      </div>

      <ol className="space-y-2.5">
        {items.map((d, i) => (
          <li
            key={i}
            className="grid grid-cols-1 gap-x-3 gap-y-2 border-t pt-2.5 sm:grid-cols-[2.4rem_1fr_1fr] sm:items-baseline"
            style={{ borderColor: theme.contentBorder }}
          >
            {/* number badge */}
            <span
              className="grid h-7 w-7 place-items-center border font-serif text-xs font-black"
              style={{
                color: theme.accent,
                borderColor: theme.sealBorder,
                background: theme.sealBg,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* rich side -- accent so it pops */}
            <p className="font-serif text-base font-bold leading-snug" style={{ color: theme.accent }}>
              <span
                className="mr-1.5 text-[10px] font-bold uppercase tracking-[0.12em] sm:hidden"
                style={{ color: theme.textMuted }}
              >
                {contrast.left} ·
              </span>
              {d.rich}
            </p>

            {/* poor side -- muted */}
            <p className="text-base leading-snug" style={{ color: theme.textSoft }}>
              <span
                className="mr-1.5 text-[10px] font-bold uppercase tracking-[0.12em] sm:hidden"
                style={{ color: theme.textMuted }}
              >
                {contrast.right} ·
              </span>
              {d.poor}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -- a single book on the shelf --------------------------------- */

// public/img/<file> resolved against the deploy base (/goc-cua-hung) so the
// cover loads both locally and on GitHub Pages. Books with no `cover` fall
// back to the emoji "spine".
const coverUrl = (file) =>
  file ? `${(import.meta.env.BASE_URL || "/").replace(/\/$/, "")}/img/${file}` : null;

function BookCard({ theme, book }) {
  const reduce = useReducedMotion();
  const hasDetail = (book.distinctions && book.distinctions.length > 0) || (book.notes && book.notes.length > 0);
  const [open, setOpen] = useState(Boolean(book.defaultOpen && hasDetail));
  const coverSrc = coverUrl(book.cover);

  return (
    <div
      className="ts-card border p-3.5 sm:p-5"
      style={{
        background: theme.panelBg,
        borderColor: theme.panelBorder,
        boxShadow: theme.previewShadow,
      }}
    >
      {/* ── top row: cover + title block ── */}
      <div className="flex items-start gap-4">
        {coverSrc ? (
          // real cover thumbnail (portrait 2:3), shown on every breakpoint
          <img
            src={coverSrc}
            alt={`Bìa sách: ${book.title}`}
            loading="lazy"
            className="aspect-[2/3] w-[88px] shrink-0 border object-cover sm:w-[104px]"
            style={{ borderColor: theme.panelBorder, boxShadow: theme.panelSoftShadow }}
          />
        ) : (
          // fallback "book spine": a tall block with a thin accent edge + emoji
          <div
            className="relative hidden shrink-0 items-end justify-center overflow-hidden border sm:flex"
            style={{
              width: 58,
              background: theme.panelSoftBg,
              borderColor: theme.panelBorder,
              boxShadow: theme.panelSoftShadow,
            }}
            aria-hidden="true"
          >
            <span className="absolute inset-y-0 left-0" style={{ width: 4, background: theme.accent }} />
            <span className="pb-3 text-2xl">{book.emoji}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          {book.tag && (
            <div
              className="mb-1.5 inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ borderColor: theme.tagBorder, color: theme.accent, background: theme.tagBg }}
            >
              {!coverSrc && <span className="mr-1 sm:hidden">{book.emoji}</span>}
              {book.tag}
            </div>
          )}
          <h3 className="font-serif text-xl font-black leading-tight sm:text-2xl" style={{ color: theme.text }}>
            {book.title}
          </h3>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            ✍︎ {book.author}
          </p>
        </div>
      </div>

      {/* ── blurb ── */}
      {book.blurb && (
        <p className="mt-3 max-w-3xl text-base leading-7" style={{ color: theme.textSoft }}>
          {book.blurb}
        </p>
      )}

      {/* ── expandable detail (the 10 differences / notes) ── */}
      {hasDetail && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="ts-toggle mt-4 inline-flex items-center gap-2 border px-3.5 py-2 text-sm font-bold"
            style={{
              borderColor: theme.accent,
              color: theme.accent,
              background: theme.btnBg,
              boxShadow: theme.btnShadow,
            }}
          >
            <span
              className="ts-caret transition-transform"
              style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              ▸
            </span>
            {book.distinctions
              ? open
                ? "Thu gọn 10 điều khác biệt"
                : "Xem 10 điều khác biệt"
              : open
              ? "Thu gọn"
              : "Đọc ghi chú"}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="detail"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                {book.distinctions && (
                  <Distinctions theme={theme} contrast={book.contrast} items={book.distinctions} />
                )}
                {book.notes && (
                  <ul className="mt-4 space-y-2">
                    {book.notes.map((n, i) => (
                      <li
                        key={i}
                        className="border-l-4 pl-3 text-base leading-7"
                        style={{ borderColor: theme.accent, color: theme.textSoft }}
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* -- main ------------------------------------------------------- */

export default function TuSach({ theme }) {
  return (
    <div className="tu-sach relative mx-auto w-full max-w-[920px]" style={{ color: theme.text }}>
      <style>{`
        .tu-sach ::selection { background: ${theme.accentSoft}; color: ${theme.text}; }
        .ts-card {
          transition: transform 200ms ease, box-shadow 220ms ease, border-color 200ms ease;
        }
        .ts-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px ${theme.panelBorder}, ${theme.previewShadow};
        }
        .ts-toggle { transition: transform 160ms ease, box-shadow 160ms ease; }
        .ts-toggle:hover { transform: translateX(2px); }
        @media (prefers-reduced-motion: reduce) {
          .ts-card, .ts-toggle, .ts-caret { transition: none; }
          .ts-card:hover, .ts-toggle:hover { transform: none; }
        }
      `}</style>

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

      {/* ── the shelf ── */}
      <div className="mt-5 space-y-4">
        {BOOKS.map((book, i) => (
          <Fade key={book.id} d={0.08 + i * 0.05}>
            <BookCard theme={theme} book={book} />
          </Fade>
        ))}
      </div>

      {/* ── closing ── same Divider as the header, kept consistent ── */}
      <Fade d={0.18 + BOOKS.length * 0.05}>
        <div className="mt-6">
          <Divider theme={theme} />
        </div>
      </Fade>
      <Fade d={0.22 + BOOKS.length * 0.05}>
        <p
          className="mt-3 pb-2 text-center font-serif text-base italic leading-7"
          style={{ color: theme.textMuted }}
        >
          Đọc một cuốn sách hay, như gặp lại một người bạn cũ.
        </p>
      </Fade>
    </div>
  );
}
