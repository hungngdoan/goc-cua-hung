// Goals list shown in the left panel. Defined once and shared across every
// tab so the sidebar reads identically no matter which theme is active.
// status: "done" = finished one-off goal, "open" = in progress / will finish,
// "ongoing" = a habit that is kept up rather than ever "completed".
export const sidebarList = {
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

// The words shown against each status. Kept beside the list because the two
// are edited together: a new status needs a label here and a colour in
// StyleLab's `statusColors`.
export const statusLabels = {
  done: "Xong",
  open: "Đang làm",
  ongoing: "Duy trì",
};
