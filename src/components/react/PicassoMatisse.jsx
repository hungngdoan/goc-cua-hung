import { useId, useState } from "react";

// Artwork for the Picasso / Matisse post. Three figures, one visual argument:
// the two languages side by side, then the same room spoken in each of them,
// then the room where Picasso finally borrows Matisse's light.
//
// These deliberately do NOT take their colours from the active theme. The post
// is about colour being set free, so the palettes are the historical ones:
// Matisse's fauve reds, emeralds and cadmiums, Picasso's ochre and bone. What
// the theme does own is the frame: border, caption bar and ground, so the
// figures still sit inside the night register of the Đêm Huyền tab.
const NIGHT = "#080B14";
const NIGHT_EDGE = "#1C2236";
const PAPER = "#F7F1E4";

function frameStyle(theme) {
  return {
    borderColor: theme?.panelSoftBorder || NIGHT_EDGE,
    background: theme?.pageBg || NIGHT,
  };
}

function captionStyle(theme) {
  return {
    color: theme?.textSoft || "#9CA6C5",
    borderColor: theme?.panelSoftBorder || NIGHT_EDGE,
    background: "rgba(5, 8, 17, 0.88)",
  };
}

// ---------------------------------------------------------------------------
// I. Hai ngôn ngữ — the two vocabularies, uncut, facing each other.
// Left: paper cut with scissors. Right: paper torn and glued back down.
// ---------------------------------------------------------------------------
export function TwoLanguages({ theme }) {
  const id = useId().replace(/:/g, "");

  return (
    <figure
      className="mt-5 max-w-3xl overflow-hidden border"
      style={frameStyle(theme)}
      aria-label="Hai ngôn ngữ tạo hình đặt cạnh nhau: bên trái là những mảng giấy cắt cong mềm rực màu của Matisse, bên phải là những mặt cắt gãy góc màu đất của Picasso, ở giữa là một con bồ câu trắng"
    >
      <svg
        className="block h-auto w-full"
        viewBox="0 0 780 220"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${id}-night`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#080B14" />
            <stop offset="1" stopColor="#11182A" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={PAPER} stopOpacity=".24" />
            <stop offset="1" stopColor={PAPER} stopOpacity="0" />
          </radialGradient>
          <clipPath id={`${id}-left`}>
            <rect x="0" y="0" width="378" height="220" />
          </clipPath>
          <clipPath id={`${id}-right`}>
            <rect x="402" y="0" width="378" height="220" />
          </clipPath>
        </defs>

        <rect width="780" height="220" fill={`url(#${id}-night)`} />

        <g clipPath={`url(#${id}-left)`}>
          <rect x="0" y="0" width="378" height="220" fill="#1B3A6B" />
          <path d="M0 0h378v54C296 30 232 22 170 26 108 30 50 48 0 78Z" fill="#22497F" />
          <path d="M0 220h378v-38c-70 22-140 30-208 24C110 201 54 188 0 168Z" fill="#14305A" />
          <path
            d="M-10 156c56-34 92 4 148-18 52-20 78-58 136-54 40 3 68 24 108 22v20c-44 2-72-18-110-20-46-3-72 34-124 54-58 22-100-18-158 10Z"
            fill="#F1E7D2"
            opacity=".82"
          />
          <path
            transform="translate(-6 12) scale(0.85)"
            d="M242 112A70 70 0 0 1 212 149A120 120 0 0 1 182 191A55 55 0 0 1 137 166A100 100 0 0 1 97 138A45 45 0 0 1 117 94A130 130 0 0 1 127 41A60 60 0 0 1 178 53A90 90 0 0 1 222 67A50 50 0 0 1 242 112Z"
            fill="#D8452F"
          />
          <path d="M30 32c40-6 68 26 64 64-4 30-28 50-54 44 30-24 34-70 8-98-6-6-12-10-18-10Z" fill="#1F7A5E" />
          <path d="M312 18c6 30 18 42 48 48-30 6-42 18-48 48-6-30-18-42-48-48 30-6 42-18 48-48Z" fill="#EDB92E" />
          <path
            transform="translate(6 -8)"
            d="M280 150A44 44 0 0 1 324 158A32 32 0 0 1 314 198A48 48 0 0 1 274 186A36 36 0 0 1 280 150Z"
            fill="#E4788E"
          />
          <path d="M338 96A34 34 0 0 1 372 118A40 40 0 0 1 342 146A30 30 0 0 1 338 96Z" fill="#1F7A5E" />
          <path
            d="M0 88c56 20 104 14 146-2"
            fill="none"
            stroke="#F1E7D2"
            strokeOpacity=".26"
            strokeWidth="1"
            strokeDasharray="5 6"
          />
        </g>

        <g clipPath={`url(#${id}-right)`}>
          <rect x="402" y="0" width="378" height="220" fill="#17100A" />
          <path d="M402 0h122l-40 220H402Z" fill="#22180F" />
          <path d="M726 0h54v220h-34Z" fill="#0F0A06" />
          <g stroke="#E6DCC6" strokeOpacity=".16" strokeWidth="1" fill="none">
            <path d="M402 60H780" />
            <path d="M402 152H780" />
            <path d="M600 0V220" />
            <path d="M462 0 706 220" />
            <path d="M726 0 494 220" />
          </g>
          <g stroke="#0C0805" strokeWidth="2.4" strokeLinejoin="round">
            <path d="M540 96 468 38 480 22 558 78Z" fill="#8A6A4F" />
            <g stroke="#E6DCC6" strokeOpacity=".35" strokeWidth="1.4" fill="none">
              <path d="M492 46 484 58" />
              <path d="M508 59 500 71" />
              <path d="M524 72 516 84" />
            </g>
            <path d="M646 18 724 40 710 82 632 60Z" fill="#EFE7D4" />
            <g stroke="#5A5248" strokeOpacity=".72" strokeWidth="1.4" fill="none">
              <path d="M650 36 712 53" />
              <path d="M647 47 708 64" />
              <path d="M644 58 690 71" />
            </g>
            <path d="M498 58 566 26 600 74 528 100Z" fill="#66727F" />
            <path d="M566 26 638 40 624 88 600 74Z" fill="#D2953F" />
            <path d="M638 40 694 68 668 104 624 88Z" fill="#CFC3A8" />
            <path d="M528 100 600 74 612 140 546 158Z" fill="#B4533B" />
            <path d="M600 74 624 88 668 104 654 152 612 140Z" fill="#CFC3A8" />
            <path d="M498 58 528 100 488 128 476 82Z" fill="#8A6A4F" />
            <path d="M546 158 612 140 596 188 538 180Z" fill="#2E251C" />
            <path d="M654 152 694 136 704 176 666 184Z" fill="#D2953F" />
            <path d="M462 138 496 128 490 158Z" fill="#D2953F" />
            <path d="M700 92 730 106 712 132Z" fill="#B4533B" />
            <circle cx="578" cy="116" r="18" fill="#17100A" />
            <ellipse
              cx="578"
              cy="116"
              rx="31"
              ry="9"
              fill="none"
              stroke="#F1E7D2"
              strokeOpacity=".6"
              strokeWidth="1.6"
            />
            <g stroke="#F1E7D2" strokeOpacity=".5" strokeWidth="1.3" fill="none">
              <path d="M548 88 596 168" />
              <path d="M558 84 606 164" />
              <path d="M568 80 616 160" />
            </g>
            <path
              d="M488 128c32 40 88 54 134 34"
              fill="none"
              stroke="#F1E7D2"
              strokeOpacity=".45"
              strokeWidth="2"
            />
          </g>
        </g>

        <rect x="378" y="0" width="24" height="220" fill={NIGHT} />
        <rect x="318" y="46" width="144" height="136" fill={`url(#${id}-glow)`} />
        <g stroke="#8B9FBF" strokeOpacity=".38" strokeWidth="1">
          <path d="M378 0V220" />
          <path d="M402 0V220" />
        </g>

        <g stroke="#0B1220" strokeWidth="2" strokeLinejoin="round">
          <path
            d="M342 130c2-19 18-31 41-31h21c11 0 19 6 19 14l17-6-14 13c0 19-20 33-43 31l-27-3c-11-1-16-9-14-18Z"
            fill={PAPER}
          />
          <path d="M342 130 310 143 346 147Z" fill="#E2DAC8" />
          <path d="M364 116c11-9 31-8 41 4-13 11-33 9-41-4Z" fill="#C9C4B7" strokeWidth="1.5" />
          <path d="M440 107 457 113 438 120Z" fill="#EDB92E" strokeWidth="1.5" />
          <circle cx="427" cy="107" r="2.6" fill="#141210" stroke="none" />
        </g>

        <text
          x="16"
          y="26"
          fill={PAPER}
          fillOpacity=".8"
          fontFamily="Georgia, serif"
          fontSize="11"
          letterSpacing="3"
        >
          MATISSE · MÀU SẮC
        </text>
        <text
          x="764"
          y="26"
          textAnchor="end"
          fill="#E6DCC6"
          fillOpacity=".8"
          fontFamily="Georgia, serif"
          fontSize="11"
          letterSpacing="3"
        >
          HÌNH THỂ · PICASSO
        </text>
      </svg>

      <figcaption
        className="flex items-center justify-between gap-4 border-t px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] sm:px-4"
        style={captionStyle(theme)}
      >
        <span>Hai ngôn ngữ · một thời đại</span>
        <span className="hidden font-serif text-[11px] normal-case tracking-normal sm:inline">
          Kéo cắt và dán · 1906
        </span>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// II. Hai cách nhìn — one room, two grammars, with the reader holding the seam.
// The two layers share every anchor: table edge, sill, window opening, the bird.
// Sliding the handle is the whole argument of the essay in one gesture.
// ---------------------------------------------------------------------------
export function TwoWaysOfSeeing({ theme }) {
  const id = useId().replace(/:/g, "");
  const [split, setSplit] = useState(52);

  return (
    <figure className="mt-5 max-w-3xl overflow-hidden border" style={frameStyle(theme)}>
      <div className="relative" style={{ aspectRatio: "800 / 420" }}>
        <div className="absolute inset-0">
          <svg className="block h-full w-full" viewBox="0 0 800 420" aria-hidden="true" focusable="false">
            <rect width="800" height="420" fill="#17100A" />
            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M0 0 300 0 250 210 0 180Z" fill="#6B5A46" />
              <path d="M0 0 120 0 92 98 0 76Z" fill="#CFC3A8" />
              <path d="M300 0 560 0 520 150 250 210Z" fill="#2A231C" />
              <path d="M560 0 800 0 800 120 520 150Z" fill="#8A6A4F" />
              <path d="M0 180 250 210 230 352 0 352Z" fill="#3A3129" />
              <path d="M250 210 520 150 800 120 800 352 230 352Z" fill="#241C15" />
              <path d="M250 212 372 192 352 300 244 300Z" fill="#B4533B" />
              <path d="M0 352 230 352 180 420 0 420Z" fill="#5E4E3D" />
              <path d="M230 352 800 352 800 420 180 420Z" fill="#3A2F25" />
            </g>

            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M430 46 745 62 745 286 430 286Z" fill="#1B232B" />
              <path d="M452 34 766 46 758 268 452 274Z" fill="#232C36" opacity=".92" />
              <path d="M452 34 766 46 760 150 596 176 452 140Z" fill="#66727F" />
              <path d="M452 140 596 176 588 274 452 274Z" fill="#4E5A67" />
              <path d="M596 176 760 150 758 268 588 274Z" fill="#2F3A45" />
              <path d="M600 60 700 52 690 118 606 128Z" fill="#D2953F" opacity=".85" />
              <path d="M470 60 560 52 566 122 476 130Z" fill="#8A6A4F" opacity=".7" />
              <g fill="#E3D8C0">
                <path d="M596 40 612 40 604 276 588 276Z" />
                <path d="M446 146 766 152 766 166 446 160Z" />
              </g>
              <path d="M430 46 745 62 745 286 430 286Z" fill="none" stroke="#E3D8C0" strokeWidth="9" />
            </g>

            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M418 286 762 286 762 304 418 304Z" fill="#E3D8C0" />
              <path d="M404 304 748 304 776 286 432 286Z" fill="#B4533B" />
            </g>

            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M55 300 500 300 500 336 55 336Z" fill="#8A6A4F" />
              <path d="M92 268 536 282 500 336 55 322Z" fill="#D2953F" />
              <path d="M96 336 112 420 138 420 128 336Z" fill="#5E4A38" />
              <path d="M430 336 448 420 474 420 458 336Z" fill="#5E4A38" />
            </g>

            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M158 300c-2-30 8-50 12-70 2-16-4-24 4-32h17v102Z" fill="#E3D8C0" />
              <path d="M199 292V190h16c8 8 2 16 4 32 4 20 14 40 12 70Z" fill="#66727F" />
              <path d="M186 190 186 140" fill="none" stroke="#8A6A4F" strokeWidth="4" />
              <path d="M186 140 156 118 186 122Z" fill="#B4533B" />
              <path d="M186 132 218 112 190 148Z" fill="#D2953F" />
            </g>

            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M296 278 372 278 362 310 306 310Z" fill="#B4533B" />
              <ellipse cx="334" cy="278" rx="42" ry="13" fill="none" stroke="#E3D8C0" strokeWidth="2.4" />
              <circle cx="316" cy="266" r="14" fill="#D2953F" />
              <path d="M348 254 364 262 360 278 342 280 334 266Z" fill="#8A6A4F" />
            </g>

            <g stroke="#0C0805" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M566 286 578 256 610 246 634 256 646 274 630 286Z" fill="#E3D8C0" />
              <path d="M566 286 534 294 572 294Z" fill="#CFC3A8" />
              <path d="M586 262 622 254 604 278Z" fill="#66727F" />
              <path d="M616 234 640 240 634 258 612 252Z" fill="#E3D8C0" />
              <path d="M640 240 660 247 638 254Z" fill="#D2953F" />
              <circle cx="630" cy="242" r="2.6" fill="#141210" />
            </g>

            <g stroke="#E3D8C0" strokeOpacity=".18" strokeWidth="1" fill="none">
              <path d="M0 150H800" />
              <path d="M0 300H800" />
              <path d="M400 0V420" />
              <path d="M0 0 800 420" />
              <path d="M800 0 0 420" />
            </g>
            <text
              x="776"
              y="42"
              textAnchor="end"
              fill="#E3D8C0"
              fillOpacity=".8"
              fontFamily="Georgia, serif"
              fontSize="13"
              letterSpacing="3"
            >
              HÌNH THỂ · PICASSO
            </text>
          </svg>
        </div>

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <svg className="block h-full w-full" viewBox="0 0 800 420" aria-hidden="true" focusable="false">
            <rect width="800" height="420" fill="#B23A2F" />
            <g stroke="#0B1220" strokeWidth="2.6" strokeLinejoin="round">
              <g stroke="none">
                <path d="M30 54c36-18 70 8 64 44-6 32-46 50-64 24-14-19-15-60 0-68Z" fill="#8E2B22" />
                <path d="M292 86c28-14 54 8 48 36-6 24-36 38-50 18-11-15-10-48 2-54Z" fill="#C9564A" />
                <path d="M100 172c26-14 50 6 44 30-6 22-34 34-46 16-10-14-9-42 2-46Z" fill="#8E2B22" />
                <path d="M38 368c28-16 54 6 48 34-6 24-38 40-52 20-12-16-10-48 4-54Z" fill="#C9564A" />
                <path d="M330 26c22-12 42 6 38 26-4 18-28 30-38 14-8-12-8-34 0-40Z" fill="#1F7A5E" opacity=".85" />
                <path
                  transform="translate(30 -132)"
                  d="M356 210c20-10 36 6 32 24-4 16-26 26-34 10-7-12-6-30 2-34Z"
                  fill="#EDB92E"
                  opacity=".85"
                />
              </g>
              <path d="M0 352h800v68H0Z" fill="#7C2A26" />

              <path d="M430 46h315v240H430Z" fill="#4FA3D8" />
              <path d="M430 200h315v86H430Z" fill="#23509B" />
              <circle cx="676" cy="102" r="30" fill="#EDB92E" />
              <path d="M430 236c48-16 88 12 138 0s86-26 177-8v58H430Z" fill="#1B4384" />
              <g fill="#1F7A5E">
                <path d="M596 46h14v240h-14Z" />
                <path d="M430 152h315v13H430Z" />
              </g>
              <path d="M430 46h315v240H430Z" fill="none" stroke="#1F7A5E" strokeWidth="12" />

              <path d="M414 286h366v20H414Z" fill="#EDB92E" />

              <path d="M55 300h445v40H55Z" fill="#EDB92E" />
              <path d="M55 340h445v14H55Z" fill="#C4901F" />
              <path d="M96 354h32v66H96Z" fill="#8A5A16" />
              <path d="M430 354h32v66h-32Z" fill="#8A5A16" />

              <path d="M158 300c-2-30 10-50 14-70 2-16-6-24 4-32h48c10 8 2 16 4 32 4 20 16 40 14 70Z" fill="#1F7A5E" />
              <g stroke="none" fill="#F1E7D2" opacity=".8">
                <path d="M176 236c14-8 28 4 26 18-2 12-18 20-26 10-6-8-6-24 0-28Z" />
                <path d="M212 268c12-6 22 4 20 15-2 10-16 16-22 8-5-7-5-20 2-23Z" />
              </g>
              <path d="M196 198v-58" fill="none" stroke="#1F7A5E" strokeWidth="6" />
              <path d="M196 140c-22-6-34-22-30-38 18 2 32 16 30 38Z" fill="#E4788E" />
              <path d="M196 132c20-10 36-6 42 6-16 12-34 12-42-6Z" fill="#EDB92E" />

              <path d="M292 276h84c0 22-18 36-42 36s-42-14-42-36Z" fill="#D8452F" />
              <circle cx="312" cy="266" r="15" fill="#EDB92E" />
              <circle cx="342" cy="262" r="17" fill="#E4788E" />
              <circle cx="366" cy="272" r="12" fill="#EDB92E" />

              <path
                d="M566 286c-6-20 8-36 34-40 14-2 24 4 28 12 14 10 14 26 0 28h-48c-8 0-12 0-14 0Z"
                fill={PAPER}
              />
              <path d="M566 286 534 294 572 294Z" fill="#E2DAC8" />
              <path d="M584 264c14-10 34-6 40 6-14 10-34 6-40-6Z" fill="#CBC7BC" strokeWidth="1.6" />
              <circle cx="626" cy="246" r="14" fill={PAPER} />
              <path d="M638 244 658 249 637 254Z" fill="#EDB92E" strokeWidth="1.6" />
              <circle cx="631" cy="242" r="2.6" fill="#123A34" stroke="none" />
            </g>
            <text
              x="24"
              y="42"
              fill={PAPER}
              fillOpacity=".85"
              fontFamily="Georgia, serif"
              fontSize="13"
              letterSpacing="3"
            >
              MATISSE · MÀU SẮC
            </text>
          </svg>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-px"
          style={{ left: `${split}%`, background: "rgba(247,241,228,.7)" }}
          aria-hidden="true"
        >
          <span
            className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-bold"
            style={{ background: PAPER, color: "#17100A", boxShadow: "0 2px 10px rgba(0,0,0,.55)" }}
          >
            ↔
          </span>
        </div>
      </div>

      <figcaption className="border-t px-3 py-2.5 sm:px-4" style={captionStyle(theme)}>
        <label
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          htmlFor={`${id}-split`}
        >
          <span className="hidden sm:inline">Màu sắc</span>
          <input
            id={`${id}-split`}
            className="h-1 w-full min-w-0 flex-1 cursor-ew-resize appearance-none rounded-full accent-[#EDB92E]"
            style={{ background: "linear-gradient(90deg,#D8452F,#EDB92E,#8A6A4F,#66727F)" }}
            type="range"
            min="0"
            max="100"
            step="1"
            value={split}
            onChange={(event) => setSplit(Number(event.target.value))}
            aria-label="Kéo để chuyển cùng một căn phòng giữa cách nhìn của Matisse và cách nhìn của Picasso"
            aria-valuetext={`${split} phần trăm Matisse, ${100 - split} phần trăm Picasso`}
          />
          <span className="hidden sm:inline">Hình thể</span>
        </label>
        <p className="mt-2 text-[11px] leading-5 tracking-normal">
          Cùng một căn phòng, cùng một chiếc bàn, cùng một con chim. Bên trái là căn phòng nếu Matisse vẽ nó:
          màu phẳng, đường cong, không có bóng đổ. Bên phải là căn phòng nếu Picasso vẽ nó: chiếc bình bị bổ
          đôi, cái bát vừa nhìn từ trên vừa nhìn từ ngang, phối cảnh gãy vụn. Kéo thanh trượt để thấy chỗ nối.
        </p>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// III. Xưởng vẽ · bồ câu — Cannes, 1957. The two languages in one room at last:
// Picasso's faceted walls and construction lines, lit by Matisse's window.
// ---------------------------------------------------------------------------
export function StudioPigeons({ theme }) {
  const id = useId().replace(/:/g, "");

  return (
    <figure
      className="mt-5 max-w-3xl overflow-hidden border"
      style={frameStyle(theme)}
      aria-label="Xưởng vẽ ở Cannes: bức tường đỏ vỡ thành từng mảng, một khung cửa vòm mở ra biển Địa Trung Hải, một giá vẽ với bức tranh chim bồ câu đang dở, và năm con bồ câu trắng trong phòng"
    >
      <svg className="block h-auto w-full" viewBox="0 0 800 440" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`${id}-win`}>
            <path d="M414 360V190a146 146 0 0 1 292 0v170Z" />
          </clipPath>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F6D97A" />
            <stop offset="1" stopColor="#EDB92E" />
          </linearGradient>
          <linearGradient id={`${id}-shaft`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FBE7AA" stopOpacity=".9" />
            <stop offset="1" stopColor="#F6DC93" stopOpacity="0" />
          </linearGradient>

          <g id={`${id}-dove`} stroke="#2A1008" strokeWidth="2.2" strokeLinejoin="round">
            <path
              d="M-26 6c0-11 12-17 26-17h16c8 0 14 4 14 10l14-6-10 10c0 12-14 20-30 20l-18-2c-8-1-12-7-12-15Z"
              fill={PAPER}
            />
            <path d="M-26 6-52 14-24 17Z" fill="#E6DFCE" />
            <path d="M-6-8c4-22 20-32 36-28-8 14-20 24-34 30Z" fill="#EFE7D4" />
            <path d="M44-6 58-2 42 2Z" fill="#EDB92E" />
            <circle cx="26" cy="-4" r="2.4" fill="#2A1008" />
          </g>

          <g id={`${id}-dove-cut`} stroke="#2A1008" strokeWidth="2.2" strokeLinejoin="round">
            <path d="M-26 8-10-16 18-22 36-12 42 8 26 22-6 24Z" fill="#EDE4CE" />
            <path d="M-26 8-52 16-24 19Z" fill="#CFC3A8" />
            <path d="M-8-8 26-16 8 10Z" fill="#8FA0AE" />
            <path d="M22-30 44-24 38-8 18-14Z" fill={PAPER} />
            <path d="M44-24 62-18 42-12Z" fill="#EDB92E" />
            <circle cx="34" cy="-22" r="2.4" fill="#2A1008" />
          </g>

          <g
            id={`${id}-dove-line`}
            fill="none"
            stroke="#2A1008"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M-26 6c0-11 12-17 26-17h16c8 0 14 4 14 10l14-6-10 10c0 12-14 20-30 20l-18-2c-8-1-12-7-12-15Z" />
            <path d="M-26 6-52 14-24 17" />
            <path d="M-6-8c4-22 20-32 36-28-8 14-20 24-34 30Z" />
          </g>
        </defs>

        <g stroke="#2A1008" strokeWidth="2.4" strokeLinejoin="round">
          <path d="M0 0 380 0 340 200 0 170Z" fill="#D06052" />
          <path d="M380 0 800 0 800 96 340 200Z" fill="#B23A2F" />
          <path d="M0 170 340 200 320 356 0 356Z" fill="#872720" />
          <path d="M340 200 800 96 800 356 320 356Z" fill="#9A2E25" />
          <path d="M0 356 800 356 800 440 0 440Z" fill="#D2953F" />
          <path d="M0 356 210 356 156 440 0 440Z" fill="#B87F32" />
        </g>
        <g stroke="none">
          <path d="M330 66c26-14 50 6 44 32-5 22-34 36-46 16-10-14-9-44 2-48Z" fill="#8E2B22" />
          <path d="M756 146c22-12 42 6 36 28-5 18-32 30-42 12-8-14-6-36 6-40Z" fill="#D8695B" opacity=".62" />
          <path d="M304 292c18-10 34 4 30 20-4 14-24 22-32 8-6-10-6-24 2-28Z" fill="#1F7A5E" opacity=".7" />
          <path d="M36 224c24-12 46 6 40 30-5 20-32 32-42 14-9-14-8-40 2-44Z" fill="#8E2B22" />
        </g>
        <path d="M420 356 700 356 800 440 302 440Z" fill={`url(#${id}-shaft)`} />

        <g clipPath={`url(#${id}-win)`}>
          <rect x="410" y="30" width="300" height="336" fill={`url(#${id}-sky)`} />
          <circle cx="648" cy="112" r="34" fill="#FBEFC0" />
          <path d="M410 252c46-12 84 8 136-2s96-20 164-4v120H410Z" fill="#2A5FA8" />
          <path d="M410 292c58-10 96 10 148 0s94-14 162-2v76H410Z" fill="#1B4384" />
          <path d="M428 362c-2-54 2-96 12-132l16 4c-10 34-14 76-12 128Z" fill="#2F6B4F" />
          <g fill="#17614A" stroke="#0D3D2E" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M448 230c-44-20-78-10-94 14 34-12 70-12 94-6Z" transform="rotate(-150 448 230)" />
            <path d="M448 230c-44-20-78-10-94 14 34-12 70-12 94-6Z" transform="rotate(-108 448 230)" />
            <path d="M448 230c-44-20-78-10-94 14 34-12 70-12 94-6Z" transform="rotate(-66 448 230)" />
            <path d="M448 230c-44-20-78-10-94 14 34-12 70-12 94-6Z" transform="rotate(-24 448 230)" />
            <path d="M448 230c-44-20-78-10-94 14 34-12 70-12 94-6Z" transform="rotate(18 448 230)" />
            <path d="M448 230c-44-20-78-10-94 14 34-12 70-12 94-6Z" transform="rotate(60 448 230)" />
            <circle cx="448" cy="230" r="8" fill="#0D3D2E" stroke="none" />
          </g>
        </g>

        <g stroke="#2A1008" strokeWidth="2.4" strokeLinejoin="round" fill="#F1E7D2">
          <path d="M414 190h292v13H414Z" />
          <path d="M553 196h14v164h-14Z" />
          <path d="M414 272h292v12H414Z" />
          <g>
            <path d="M556 190 553 44h14l-3 146Z" />
            <path d="M556 190 494 61l12-6 63 133Z" />
            <path d="M564 190 627 61l-12-6-63 133Z" />
            <path d="M552 192 424 132l6-12 129 60Z" />
            <path d="M568 192 696 132l-6-12-129 60Z" />
          </g>
          <path d="M400 360V190a160 160 0 0 1 320 0v170h-14V190a146 146 0 0 0-292 0v170Z" />
          <path d="M394 356h332v16H394Z" />
        </g>

        <g stroke="#2A1008" strokeWidth="2.4" strokeLinejoin="round">
          <path d="M170 150 108 432h18l58-282Z" fill="#6B4A2E" />
          <path d="M188 150 250 432h-18l-58-282Z" fill="#5A3D25" />
          <path d="M92 124 274 106 286 300 104 318Z" fill="#F1E7D2" />
          <use href={`#${id}-dove-line`} transform="translate(196 224) rotate(-4) scale(1.32)" />
          <path d="M120 286c22-8 40-6 54 4-18 8-40 6-54-4Z" fill="#D8452F" opacity=".85" />
          <path d="M232 140c16-8 30-2 30 12s-16 22-28 14c-8-6-9-22-2-26Z" fill="#1F7A5E" opacity=".85" />
          <path d="M124 300h150v14H124Z" fill="#6B4A2E" />
        </g>

        <use href={`#${id}-dove`} transform="translate(352 396) scale(1.05)" />
        <use href={`#${id}-dove-cut`} transform="translate(486 418) scale(1.05) scale(-1 1)" />
        <use href={`#${id}-dove`} transform="translate(612 338) scale(0.86)" />
        <use href={`#${id}-dove`} transform="translate(486 128) scale(0.78) rotate(-8)" />
        <use href={`#${id}-dove`} transform="translate(660 224) scale(0.62) rotate(6)" />

        <g stroke="#F1E7D2" strokeOpacity=".24" strokeWidth="1" fill="none">
          <path d="M0 190H800" />
          <path d="M0 356H800" />
          <path d="M560 0V440" />
          <path d="M0 0 800 440" />
          <path d="M800 0 0 440" />
        </g>

        <text
          x="24"
          y="40"
          fill={PAPER}
          fillOpacity=".85"
          fontFamily="Georgia, serif"
          fontSize="13"
          letterSpacing="3"
        >
          XƯỞNG VẼ · BỒ CÂU · CANNES 1957
        </text>
      </svg>

      <figcaption
        className="border-t px-3 py-2.5 text-[11px] leading-5 sm:px-4"
        style={captionStyle(theme)}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Cannes · 1957</span>
        <p className="mt-1.5">
          Tường vẫn vỡ thành từng mảng, nét dựng hình vẫn hằn dưới lớp màu: đó là Picasso. Nhưng ánh sáng
          tràn vào qua một khung cửa mở, và bảng màu thì rực rỡ hơn mọi thứ ông từng vẽ: đó là Matisse. Con
          bồ câu gãy góc dưới sàn là của Picasso; những con còn lại là quà của người bạn đã khuất.
        </p>
      </figcaption>
    </figure>
  );
}
