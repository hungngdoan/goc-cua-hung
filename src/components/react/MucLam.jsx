import "./MucLam.css";

/* ================================================================
   "Mực Lam" -- Ca dao tục ngữ (Vietnamese proverbs) for Một Góc Đời.
   Rendered inside the StyleLab frame on the `giaydo` tab. It receives
   the active theme object as `theme` -- the exact same token set that
   lives in StyleLab's `styles` array -- and forwards it to the
   stylesheet as CSS custom properties, so every colour, shadow, the
   header copy and the divider come straight from the theme. No
   duplicated palette to drift out of sync. The surrounding frame
   already paints the page background.

   Layout is one sheet of ruled paper: see MucLam.css for the vertical
   rhythm the list depends on.
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
    icon: "🥣",
    text: "Một miếng khi đói bằng một gói khi no",
    meaning:
      "Sự giúp đỡ đúng lúc, dù nhỏ, vẫn quý hơn món quà lớn khi người nhận đã đủ đầy.",
    tag: "Đùm bọc",
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
    icon: "🖌️",
    text: "Một chữ cũng là thầy, nửa chữ cũng là thầy",
    tag: "Tôn sư",
  },
  {
    icon: "⚖️",
    text: "Để thành công, bạn phải ích kỷ, nếu không bạn sẽ không bao giờ đạt được thành tựu. Và một khi bạn đã đạt đến thành công cao nhất, bạn buộc phải không ích kỷ.",
    meaning:
      "Lúc gây dựng phải dồn hết cho mục tiêu của mình; nhưng khi đã lên tới đỉnh thì phải biết cho đi, nghĩ cho người khác.",
    tag: "Thành công",
  },
  {
    icon: "🧭",
    text: "Đi một ngày đàng, học một sàng khôn",
    meaning:
      "Đi nhiều, trải nhiều thì khôn ra. Có những điều không sách vở nào dạy nổi.",
    tag: "Trải nghiệm",
  },
  {
    icon: "🐎",
    text: "Đường dài mới biết ngựa hay",
    meaning:
      "Phải qua hành trình dài và thử thách lâu bền mới biết rõ năng lực, bản lĩnh thật sự.",
    tag: "Thử thách",
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
  {
    icon: "🐇",
    text: "Ôm cây đợi thỏ",
    meaning:
      "Một lần thỏ tự đâm vào gốc cây mà được, kẻ kia bỏ cả ruộng đồng ngồi ôm gốc chờ mãi. May mắn tình cờ không bao giờ là kế sinh nhai.",
    tag: "Cầu may",
  },
  {
    icon: "🍐",
    text: "Há miệng chờ sung",
    meaning:
      "Nằm dưới gốc sung, há miệng chờ quả rụng trúng. Không chịu ra tay mà chỉ trông vào trời cho thì có ngày đói.",
    tag: "Ỷ lại",
  },
  {
    icon: "🏞️",
    text: "Đồng Đăng có phố Kỳ Lừa,\nCó nàng Tô Thị, có chùa Tam Thanh.",
    meaning:
      "Gợi nhắc những địa danh nổi tiếng của xứ Lạng: phố Kỳ Lừa, nàng Tô Thị và chùa Tam Thanh.",
    tag: "Xứ Lạng",
  },
  {
    icon: "⛰️",
    text: "Đường vô xứ Nghệ quanh quanh,\nNon xanh nước biếc như tranh họa đồ.",
    meaning:
      "Ca ngợi vẻ đẹp sơn thủy hữu tình trên đường vào xứ Nghệ.",
    tag: "Xứ Nghệ",
  },
  {
    icon: "🌾",
    text: "Cần Thơ gạo trắng nước trong,\nAi đi đến đó lòng không muốn về.",
    meaning:
      "Gợi vẻ trù phú, trong lành và mến khách của vùng đất Tây Đô.",
    tag: "Tây Đô",
  },
  {
    icon: "🪷",
    text: "Đồng Tháp Mười cò bay thẳng cánh,\nNước Tháp Mười lóng lánh cá tôm.",
    meaning:
      "Khắc họa cánh đồng rộng lớn và sản vật dồi dào của vùng Đồng Tháp Mười.",
    tag: "Đồng Tháp",
  },
];

/* -- entrance timing --------------------------------------------
   The list inks in one line after another. The cap keeps the tail of
   a growing list from waiting: at 28ms a step the stagger stops
   growing after the 20th saying instead of trailing off.
   ---------------------------------------------------------------- */
const HEAD_DELAY_MS = 60;
const STEP_MS = 28;
const STEP_CAP_MS = 560;

const entryDelay = (i) => HEAD_DELAY_MS + Math.min(i * STEP_MS, STEP_CAP_MS);
const FOOT_DELAY_MS = entryDelay(PROVERBS.length - 1) + 90;

/* -- atoms ------------------------------------------------------ */

// Faithful copy of StyleLab's own <Divider>: same gap-2 + opacity-80,
// driven by the theme's dividerSymbol / dividerTracking / accent.
const Divider = ({ symbol }) => (
  <div className="ml-divider" aria-hidden="true">
    <span className="ml-divider-line" />
    <span className="ml-divider-mark">{symbol}</span>
    <span className="ml-divider-line" />
  </div>
);

/* -- main ------------------------------------------------------- */

export default function MucLam({ theme }) {
  // The theme object is the single source of truth; the stylesheet
  // reads it through these. `contentBorder` gives the ruled lines and
  // `sealBorder` the dấu son margin rule, both already part of the
  // palette, so nothing new is invented here.
  const tokens = {
    "--ml-text": theme.text,
    "--ml-soft": theme.textSoft,
    "--ml-muted": theme.textMuted,
    "--ml-accent": theme.accent,
    "--ml-accent-soft": theme.accentSoft,
    "--ml-paper": theme.panelBg,
    "--ml-border": theme.panelBorder,
    "--ml-shadow": theme.previewShadow,
    "--ml-rule": theme.contentBorder,
    "--ml-seal": theme.sealBorder,
    "--ml-divider-tracking": theme.dividerTracking,
  };

  return (
    <div
      className="muc-lam relative mx-auto w-full max-w-[860px] xl:max-w-[1200px]"
      style={tokens}
    >
      <div className="ml-sheet">
        {/* ── header: the original "Mực Lam" preview tile, now the head
             of the sheet rather than a detached panel ── */}
        <header className="ml-head ml-fade">
          <h2 className="ml-title font-serif">{theme.name}</h2>
          <p className="ml-subtitle font-serif">{theme.subtitle}</p>
          <Divider symbol={theme.dividerSymbol} />
          <p className="ml-motif">{theme.motif}</p>
        </header>

        {/* ── the sayings ── one per ruled line. A saying that ends
             early leaves the rest of its rule empty, which is what
             writing on ruled paper looks like; a long one simply runs
             on to the next rule. Both cases need no special casing,
             so the four ca dao couplets take two rules each for free.
             The icons sit in the margin, left of the dấu son rule,
             and line up into a column down the page. ── */}
        <ul className="ml-list">
          {PROVERBS.map((p, i) => (
            <li
              key={p.text}
              className="ml-entry font-serif"
              style={{ "--ml-delay": `${entryDelay(i)}ms` }}
            >
              <span className="ml-icon" aria-hidden="true">
                {p.icon}
              </span>
              {p.text}
            </li>
          ))}
        </ul>

        {/* ── closing ── same Divider as the header, kept consistent ── */}
        <footer
          className="ml-foot ml-fade"
          style={{ "--ml-delay": `${FOOT_DELAY_MS}ms` }}
        >
          <Divider symbol={theme.dividerSymbol} />
          <p className="ml-closer font-serif">
            Người xưa nói ngắn, mà ngẫm thì dài.
          </p>
        </footer>
      </div>
    </div>
  );
}
