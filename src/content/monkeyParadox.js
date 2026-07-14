export const MONKEY_PARADOX_TITLE = "Nghịch Lý Con Khỉ Vô Hạn";

const capitalize = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

const prose = {
  opener: "Để tôi kể bạn nghe một câu chuyện nghe qua tưởng về lũ khỉ. Nhưng không phải.",
  oneCharacter: "Hãy tưởng tượng bạn đang dò một mật khẩu. Một ký tự thôi, vỏn vẹn 64 khả năng, bạn đoán đại rồi cũng trúng.",
  twoCharacters: "Hai ký tự thì lâu hơn, nhưng rồi vẫn ra.",
  millionQuestion: "Còn một triệu ký tự thì sao?",
  millionScale: "Số khả năng lớn đến mức viết riêng con số ấy ra đã dài tới 1,8 triệu chữ số",
  nearlyZero: "xác suất đoán trúng nhỏ đến gần như bằng không. Gần như thôi. Chưa hẳn là không.",
  strangeTurn: "Và đây mới là chỗ kỳ lạ.",
  infinitePassword: "Có trong tay vô hạn lần thử, việc dò ra mật khẩu một triệu ký tự ấy không chỉ trở nên rất có thể, mà thành điều gần như chắc chắn.",
  infiniteRule: "Với vô hạn lần thử, mọi điều có thể xảy ra rồi sẽ xảy ra.",
  monkeys: "Đặt vô số con khỉ trước vô số chiếc máy đánh chữ, để chúng gõ phím loạn xạ trong vô tận thời gian",
  shakespeare: "rồi sẽ có một con gõ ra trọn vẹn toàn bộ tác phẩm của Shakespeare.",
  noIntent: "Không phải vì lũ khỉ thông minh, cũng chẳng phải vì chúng cố gắng, chỉ vì thời gian vô hạn khiến cả điều tưởng như bất khả thi nhất trở thành gần như chắc chắn.",
  continues: "Và nó không dừng lại ở đó.",
  everyBook: "Mọi cuốn sách từng được viết rồi sẽ xuất hiện. Cả những cuốn chưa ai viết. Cả những cuốn kể về chuyện còn chưa xảy ra.",
  forgottenTurn: "Nhưng câu chuyện thường bỏ quên một điều.",
  brokenCopies: "cùng cái vô hạn gõ ra Shakespeare ấy cũng gõ ra hàng tỉ bản lỗi: vẫn vở kịch đó nhưng sai một câu, lệch một ngày tháng, một lời dối đặt đúng vào chỗ đáng lẽ phải là sự thật.",
  masterpiece: "Kiệt tác nằm đâu đó trong ấy, chôn vùi giữa một bãi rác vô tận của những thứ nghe gần như thật.",
  reader: "Vậy nên thứ hiếm hoi chưa bao giờ là trang sách, mà là người đọc đủ tỉnh để nhận ra. Bạn không cần mọi cuốn sách có thể có; bạn chỉ cần cuốn đáng để mang theo.",
  question: "Nếu mọi thứ đều có thể xuất hiện, vậy điều gì khiến một thứ trở thành thật với riêng bạn?",
  conclusionTitle: "Nghịch lý này không thực sự nói về lũ khỉ.",
  conclusionSubject: "Nó nói về sự vô hạn.",
  conclusionPoetic: "Vô hạn không có nghĩa là rất rất lớn, mà có nghĩa là điều có thể trở thành điều tất yếu.",
  probabilityCaveat: "Trong mô hình các lần thử độc lập và đáp án có cùng xác suất khác 0 ở mỗi lần, xác suất tìm thấy đáp án tiến tới 1. Đây là “gần như chắc chắn” trong xác suất, không phải biến điều bất khả thi về logic thành có thể.",
  finalCaveat: "Nói chặt hơn: qua vô hạn lần thử độc lập, nếu đáp án có cùng xác suất khác 0 ở mỗi lần, xác suất tìm thấy nó ít nhất một lần tiến tới 1; điều bất khả thi vẫn là bất khả thi."
};

export const monkeyParadoxPost = {
  title: MONKEY_PARADOX_TITLE,
  date: "18/6/2026",
  type: "Câu chuyện",
  seal: "🐒",
  sealLarge: true,
  experience: "monkey-paradox",
  body: [
    prose.opener,
    `${prose.oneCharacter} ${prose.twoCharacters} ${prose.millionQuestion} ${prose.millionScale}; ${prose.nearlyZero}`,
    `${prose.strangeTurn} ${prose.infinitePassword} ${prose.infiniteRule}`,
    `${prose.monkeys}, ${prose.shakespeare} Từng chữ, từng vở kịch, từng bài thơ, hoàn hảo. ${prose.noIntent}`,
    `${prose.continues} ${prose.everyBook}`,
    `${prose.forgottenTurn} ${prose.brokenCopies} ${prose.masterpiece} ${prose.reader}`,
    prose.question
  ],
  lesson: `♾️ ${prose.conclusionTitle} ${prose.conclusionSubject} ${prose.conclusionPoetic} ${prose.finalCaveat}`,
  tags: ["#VôHạn", "#NghịchLý"],
  readMore: false
};

export const monkeyParadoxScenes = [
  {
    id: "mot-ky-tu",
    marker: "01 · MỘT KÝ TỰ",
    title: prose.opener,
    body: [prose.oneCharacter],
    statement: "1 trong 64 khả năng",
    visual: "single-key",
    density: 1
  },
  {
    id: "them-mot-ky-tu",
    marker: "02 · THÊM MỘT KÝ TỰ",
    title: "Mật khẩu dài thêm.",
    body: [prose.twoCharacters],
    statement: "64 × 64 = 4.096 khả năng.",
    visual: "two-keys",
    density: 2
  },
  {
    id: "mot-trieu-ky-tu",
    marker: "03 · QUY MÔ",
    title: "Rồi kéo nó dài tới một triệu ký tự.",
    body: [`${prose.millionScale}.`],
    statement: "64 mũ 1.000.000",
    visual: "million",
    density: 4
  },
  {
    id: "gan-nhu-khong",
    marker: "04 · RANH GIỚI",
    title: "Gần như bằng không chưa phải là không.",
    body: [capitalize(prose.nearlyZero)],
    statement: "Gần như không ≠ Không thể",
    visual: "distinction",
    density: 3
  },
  {
    id: "vo-han-lan-thu",
    marker: "05 · BƯỚC NGOẶT",
    title: prose.strangeTurn,
    body: [prose.infinitePassword, prose.infiniteRule],
    note: prose.probabilityCaveat,
    visual: "attempts",
    density: 4
  },
  {
    id: "may-danh-chu",
    marker: "06 · NGHỊCH LÝ",
    title: "Vô số khỉ. Vô số máy đánh chữ.",
    body: [`${prose.monkeys}.`],
    statement: "Không ngừng gõ.",
    visual: "typewriters",
    density: 5
  },
  {
    id: "shakespeare",
    marker: "07 · KIỆT TÁC",
    title: "Rồi Shakespeare xuất hiện.",
    body: [capitalize(prose.shakespeare)],
    beats: ["Từng chữ.", "Từng vở kịch.", "Từng bài thơ.", "Hoàn hảo."],
    visual: "folio",
    density: 5
  },
  {
    id: "khong-chu-dich",
    marker: "08 · ĐIỀU BỊ BỎ QUA",
    title: "Không trí tuệ. Không chủ đích.",
    body: [prose.noIntent],
    visual: "without-intent",
    density: 2
  },
  {
    id: "moi-bien-the",
    marker: "09 · MỌI BIẾN THỂ",
    title: prose.continues,
    body: [prose.everyBook, capitalize(prose.brokenCopies)],
    visual: "variations",
    density: 8
  },
  {
    id: "nguoi-doc",
    marker: "10 · NGƯỜI ĐỌC",
    title: prose.forgottenTurn,
    body: [prose.masterpiece, prose.reader],
    question: prose.question,
    visual: "reader",
    density: 9
  },
  {
    id: "dieu-con-lai",
    marker: "11 · ĐIỀU CÒN LẠI",
    title: prose.conclusionTitle,
    body: [prose.conclusionSubject, prose.conclusionPoetic],
    note: prose.finalCaveat,
    visual: "finale",
    density: 0
  }
];
