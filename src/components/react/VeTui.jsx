import { motion } from "framer-motion";

/* ================================================================
   "Về tui" -- About Me page for Một Góc Đời
   Card Grid layout. Rendered inside the StyleLab frame on the
   hong_tram tab, so this component does NOT paint a full-page
   background -- the surrounding frame already supplies it.
   ================================================================ */

const P = {
  bg: "#080807",
  text: "#EED9A6",
  soft: "#B8AA91",
  muted: "#6F634E",
  gold: "#C6A15B",
  border: "#2A261D",
  panel: "rgba(18,17,15,0.86)",
};
const SHADOW = "6px 6px 0 rgba(0,0,0,.26)";
const DBL = `3px double ${P.border}`;

/* -- content ---------------------------------------------------- */

const BIO =
  "Hưng, kỹ sư phần mềm. Blog này là góc nhỏ của một người sống xa nhà, viết bằng thứ tiếng mà mình thấy rõ mình nhất.";

const BECOMING = [
  "Làm để sống hay sống để làm?",
  "Kỷ luật là trên hết. (Cái giường phản đối, nhưng nó không có quyền biểu quyết.)",
  "Có lúc vụng về, nhưng luôn muốn học cách yêu thương rõ ràng và có trách nhiệm hơn.",
];

const BECOMING_NOTE =
  "Nếu một ngày có người đồng hành bước vào góc nhỏ này, tôi mong người đó nhìn thấy...";

const FACTS = [
  {
    title: "Ban ngày",
    body: "Kỹ sư phần mềm, chuyên dữ liệu và đám mây. Thạc sĩ AI UT Austin vào tháng 8-2026.",
  },
  {
    title: "Sau giờ làm",
    body: "Gym, dọn nhà.",
  },
  {
    title: "Tôi tin gì",
    body: "Đức năng thắng số",
  },
];

const DETAILS = [
  "Cà phê không đường",
];

const QA = [
  { q: "Cà phê hay trà?", a: "Cà phê. Không đường. Không bàn thêm." },
  {
    q: "Sáng sớm hay đêm khuya?",
    a: "Đêm. Ý tưởng hay đến khi mọi người đã ngủ.",
  },
  {
    q: "Mùi hương yêu thích?",
    a: "Gỗ ấm, da thuộc, vanilla. Loại khiến người ta hỏi lại.",
  },
  {
    q: "Deadlift hay bench?",
    a: "Deadlift. Nhưng bench mới là cái khiến tui mất ngủ.",
  },
  {
    q: "Câu chơi chữ hay nhất?",
    a: "Không chọn được. Đó chính là vấn đề.",
  },
  {
    q: "Viết bằng tiếng nào?",
    a: "Nghĩ bằng tiếng Việt. Code bằng tiếng Anh. Blog bằng cả hai.",
  },
];

const TOPICS = [
  "Suy nghĩ lang thang",
  "Chuyện đời ở xứ người",
  "Bài học không ai dạy",
  "Những thứ nhỏ mà đẹp",
];

/* -- atoms ------------------------------------------------------ */

const Fade = ({ children, d = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: d, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Dots = ({ py = "py-7" }) => (
  <div
    className={`text-center text-sm select-none ${py}`}
    style={{ color: P.muted, letterSpacing: "0.55em" }}
  >
    &bull; &bull; &bull;
  </div>
);

const Lbl = ({ children, center = false }) => (
  <div
    className={`text-[10px] font-semibold mb-1.5 uppercase ${
      center ? "text-center" : ""
    }`}
    style={{ color: P.muted, letterSpacing: "0.18em" }}
  >
    {children}
  </div>
);

const Card = ({ children, className = "", style: sx = {} }) => (
  <div
    className={className}
    style={{
      background: P.panel,
      border: DBL,
      boxShadow: SHADOW,
      padding: "1.25rem",
      ...sx,
    }}
  >
    {children}
  </div>
);

const SectionRule = ({ children }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="flex-1" style={{ borderTop: `1px solid ${P.border}` }} />
    <Lbl center>{children}</Lbl>
    <div className="flex-1" style={{ borderTop: `1px solid ${P.border}` }} />
  </div>
);

/* -- main ------------------------------------------------------- */

export default function VeTui() {
  return (
    <div
      className="relative mx-auto max-w-[1080px] px-0"
      style={{
        color: P.text,
        fontFamily: "'Lora', Georgia, 'Times New Roman', serif",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .vetui ::selection { background: rgba(198,161,91,0.25); color: #EED9A6; }
      ` }} />

      {/* ambient gold glow + faint grid -- the "shiny" backdrop from v2 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(198,161,91,.18), transparent 28%), radial-gradient(circle at 82% 4%, rgba(238,217,166,.10), transparent 26%), linear-gradient(rgba(238,217,166,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(238,217,166,.035) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 28px 28px, 28px 28px",
        }}
      />

      <div className="vetui relative z-10">
        {/* ── bio card ── */}
        <Fade d={0}>
          <Card className="mb-8">
            <Lbl>Giới thiệu</Lbl>
            <p className="leading-[1.85]" style={{ color: P.soft }}>
              {BIO}
            </p>
          </Card>
        </Fade>

        {/* ── fact cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {FACTS.map((f, i) => (
            <Fade key={f.title} d={0.16 + i * 0.06}>
              <Card className="h-full" style={{ padding: "1.1rem" }}>
                <Lbl>{f.title}</Lbl>
                <p
                  className="text-sm leading-[1.75]"
                  style={{ color: P.soft }}
                >
                  {f.body}
                </p>
              </Card>
            </Fade>
          ))}
        </div>

        {/* ── detail pills ── */}
        <Fade d={0.36}>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 mb-2 px-2">
            {DETAILS.map((d, i) => (
              <span
                key={i}
                className="text-[11px] px-3 py-1"
                style={{
                  color: P.muted,
                  border: `1px solid ${P.border}`,
                  letterSpacing: "0.06em",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </Fade>

        <Fade d={0.42}>
          <Dots py="py-6" />
        </Fade>

        {/* ── becoming card ── */}
        <Fade d={0.46}>
          <div
            className="relative mb-2 overflow-hidden"
            style={{
              border: `3px double ${P.gold}`,
              boxShadow: SHADOW,
              padding: "2.25rem 1.75rem",
              background:
                "linear-gradient(135deg, rgba(198,161,91,.10), rgba(18,17,15,.72) 42%, rgba(198,161,91,.07))",
            }}
          >
            <div
              className="pointer-events-none absolute -left-10 -top-12 h-28 w-28 rounded-full blur-2xl"
              style={{ background: "rgba(198,161,91,.12)" }}
            />
            <Lbl center>Mục tiêu</Lbl>
            <div className="relative mt-5 grid gap-4 text-left">
              {BECOMING.map((item, index) => (
                <div key={item} className="grid grid-cols-[2.25rem_1fr] gap-3">
                  <span
                    className="pt-1 text-xs font-semibold tracking-[0.22em]"
                    style={{ color: P.gold }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-[1.8]" style={{ color: P.soft }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p
              className="relative mt-5 border-t pt-4 text-sm italic leading-[1.85]"
              style={{ borderColor: P.border, color: P.text }}
            >
              {BECOMING_NOTE}
            </p>
          </div>
        </Fade>

        <Fade d={0.52}>
          <Dots py="py-6" />
        </Fade>

        {/* ── rapid Q&A ── */}
        <Fade d={0.56}>
          <SectionRule>Hỏi nhanh</SectionRule>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          {QA.map((item, i) => (
            <Fade key={i} d={0.6 + i * 0.05}>
              <div
                className="px-4 py-3"
                style={{
                  border: `1px solid ${P.border}`,
                  background: P.panel,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase mb-1.5"
                  style={{ color: P.gold, letterSpacing: "0.1em" }}
                >
                  {item.q}
                </p>
                <p
                  className="text-sm leading-[1.7]"
                  style={{ color: P.soft }}
                >
                  {item.a}
                </p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade d={0.92}>
          <Dots py="py-6" />
        </Fade>

        {/* ── blog topics ── */}
        <Fade d={0.96}>
          <SectionRule>Tui hay viết về</SectionRule>
        </Fade>

        <Fade d={1.0}>
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {TOPICS.map((t, i) => (
              <span
                key={i}
                className="text-sm italic px-4 py-2"
                style={{
                  color: P.soft,
                  border: DBL,
                  boxShadow: SHADOW,
                  background: P.panel,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
}
