export default function TamMaoVignette({ theme }) {
  const vignetteStyle = {
    "--tm-accent": theme?.accent || "#8B9FBF",
    "--tm-ink": theme?.text || "#D4DAE8",
    "--tm-soft": theme?.textMuted || "#59647D",
    "--tm-night": theme?.pageBg || "#080B14",
    borderColor: theme?.panelSoftBorder || "#1C2236",
    background: theme?.pageBg || "#080B14",
  };

  return (
    <figure
      className="relative mt-4 h-[190px] max-w-3xl overflow-hidden border sm:h-[210px]"
      style={vignetteStyle}
      aria-label="Minh họa Tam Mao đi chân trần dưới trăng, giữa một thành phố cũ"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 780 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="tam-mao-night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--tm-night)" />
            <stop offset="1" stopColor="#11182A" />
          </linearGradient>
          <radialGradient id="tam-mao-moon" cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor="#F2F5FF" stopOpacity="0.94" />
            <stop offset="0.62" stopColor="#C8D5ED" stopOpacity="0.74" />
            <stop offset="1" stopColor="var(--tm-accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tam-mao-ground" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--tm-accent)" stopOpacity="0.04" />
            <stop offset="0.5" stopColor="var(--tm-accent)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--tm-accent)" stopOpacity="0.03" />
          </linearGradient>
          <filter id="tam-mao-blur">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <rect width="780" height="220" fill="url(#tam-mao-night)" />
        <circle cx="650" cy="56" r="54" fill="url(#tam-mao-moon)" filter="url(#tam-mao-blur)" />
        <circle cx="650" cy="56" r="30" fill="#DDE6F7" fillOpacity="0.74" />
        <circle cx="640" cy="48" r="5" fill="#8B9FBF" fillOpacity="0.14" />
        <circle cx="662" cy="63" r="8" fill="#8B9FBF" fillOpacity="0.12" />

        <g stroke="var(--tm-accent)" strokeOpacity="0.13" strokeWidth="1">
          <path d="M44 18 20 63" />
          <path d="M120 3 78 82" />
          <path d="M183 14 147 82" />
          <path d="M361 0 326 64" />
          <path d="M425 15 391 77" />
          <path d="M516 4 478 75" />
          <path d="M749 8 712 79" />
        </g>

        <g fill="#050811" opacity="0.94">
          <path d="M0 151h58v-32h56v32h42v-48h73v48h39v-27h57v27h55v-52h83v52h46v-35h64v35h42v-61h76v61h43v-42h66v63H0Z" />
          <path d="M11 123h39l-19-17Zm101-2h34l-17-15Zm274-20h68l-34-22Zm231-13h68l-34-23Z" />
        </g>
        <g fill="var(--tm-accent)" opacity="0.16">
          <rect x="71" y="129" width="5" height="8" />
          <rect x="91" y="129" width="5" height="8" />
          <rect x="181" y="114" width="6" height="9" />
          <rect x="205" y="114" width="6" height="9" />
          <rect x="410" y="112" width="7" height="10" />
          <rect x="441" y="112" width="7" height="10" />
          <rect x="650" y="111" width="7" height="11" />
        </g>

        <ellipse cx="246" cy="188" rx="65" ry="9" fill="url(#tam-mao-ground)" />
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M230 83c-3-5-4-11-1-16 6-11 24-14 35-6 9 7 11 22 3 31-7 8-22 10-31 4-5-3-7-8-6-13Z"
            fill="#0A0E19"
            stroke="var(--tm-ink)"
            strokeOpacity="0.72"
            strokeWidth="2"
          />
          <g fill="none" stroke="var(--tm-accent)" strokeWidth="2.7">
            <path d="M240 61c-6-10-5-16-2-22" />
            <path d="M249 58c-1-12 2-18 7-23" />
            <path d="M258 60c5-10 10-13 16-15" />
          </g>
          <circle cx="258" cy="77" r="1.8" fill="var(--tm-ink)" />
          <path d="M264 86c-4 3-8 3-11 1" fill="none" stroke="var(--tm-ink)" strokeOpacity="0.7" strokeWidth="1.6" />
          <path
            d="M236 98c10 5 22 4 31-2l8 48c-12 7-31 7-45 0Z"
            fill="#111827"
            stroke="var(--tm-accent)"
            strokeOpacity="0.64"
            strokeWidth="2"
          />
          <path d="m236 105-23 26 8 6 17-17" fill="none" stroke="var(--tm-ink)" strokeOpacity="0.7" strokeWidth="5" />
          <path d="m266 104 18 25" fill="none" stroke="var(--tm-ink)" strokeOpacity="0.7" strokeWidth="5" />
          <path d="m239 147-8 31" fill="none" stroke="var(--tm-ink)" strokeOpacity="0.75" strokeWidth="6" />
          <path d="m263 147 8 31" fill="none" stroke="var(--tm-ink)" strokeOpacity="0.75" strokeWidth="6" />
          <path d="M231 178c-7 0-12 3-14 7 7 3 13 2 18-1" fill="#0A0E19" stroke="var(--tm-ink)" strokeOpacity="0.68" strokeWidth="2" />
          <path d="M271 178c7 0 12 3 14 7-7 3-13 2-18-1" fill="#0A0E19" stroke="var(--tm-ink)" strokeOpacity="0.68" strokeWidth="2" />
          <path d="m230 119 44 13" fill="none" stroke="var(--tm-soft)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 4" />
        </g>

        <text
          x="515"
          y="146"
          fill="var(--tm-accent)"
          fillOpacity="0.07"
          fontFamily="Georgia, serif"
          fontSize="92"
          fontWeight="700"
          letterSpacing="12"
        >
          三毛
        </text>
        <path d="M0 190H780" stroke="var(--tm-accent)" strokeOpacity="0.18" />
      </svg>

      <figcaption
        className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] sm:px-4"
        style={{
          color: theme?.textSoft || "#9CA6C5",
          borderColor: theme?.panelSoftBorder || "#1C2236",
          background: "rgba(5, 8, 17, 0.88)",
        }}
      >
        <span>Ba sợi tóc · một tuổi thơ không mái nhà</span>
        <span className="hidden font-serif text-base normal-case tracking-normal sm:inline" style={{ color: theme?.accent }}>
          三毛
        </span>
      </figcaption>
    </figure>
  );
}
