export const BOOKS = [
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
  },
  {
    id: "truyen-co-grimm",
    title: "Truyện Cổ Grimm",
    author: "Anh em nhà Grimm",
    emoji: "🏰",
    cover: "truyen-co-grimm-cover.webp",
    tag: "Cổ tích",
    blurb:
      "Ngày xửa ngày xưa... những trang sách ru cả một tuổi thơ, dạy ta điều phải trái trước khi ta kịp hiểu đời.",
    // `tales` renders as a storybook grid -- one tale per card with a little
    // emblem, the Vietnamese name, the original German title, and a one-line
    // bài học. Add a tale = add an object.
    tales: [
      { emoji: "👠", vi: "Cô bé Lọ Lem", original: "Aschenputtel", moral: "Lòng nhân hậu rồi cũng tới ngày được đền đáp." },
      { emoji: "🍎", vi: "Nàng Bạch Tuyết", original: "Schneewittchen", moral: "Đố kỵ với cái đẹp, hóa ra tự hại chính mình." },
      { emoji: "🐺", vi: "Cô bé quàng khăn đỏ", original: "Rotkäppchen", moral: "Chớ vội tin lời đường mật của người lạ." },
      { emoji: "🍬", vi: "Hansel và Gretel", original: "Hänsel und Gretel", moral: "Thương lấy nhau thì hiểm nguy nào cũng vượt." },
      { emoji: "🗼", vi: "Nàng Rapunzel", original: "Rapunzel", moral: "Không bức tường nào giam nổi khát khao tự do." },
      { emoji: "🐸", vi: "Hoàng tử Ếch", original: "Der Froschkönig", moral: "Giữ trọn lời hứa, đừng xét người qua vẻ ngoài." },
    ],
  },
];
