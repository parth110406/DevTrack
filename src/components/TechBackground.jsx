import './TechBackground.css';

/**
 * Technical background pattern — Graphite + Amber identity.
 * ~70% neutral/dark network elements, ~30% amber-highlighted paths and nodes.
 * Intentional amber clusters in upper-right, upper-center, and lower-left.
 */
export default function TechBackground() {
  return (
    <div className="tech-bg" aria-hidden="true">
      <svg
        className="tech-bg__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Base radial — slightly warmer center */}
          <radialGradient id="bgFade" cx="55%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#1c1c22" />
            <stop offset="100%" stopColor="#141416" />
          </radialGradient>

          {/* Tight amber glow — small, localized */}
          <radialGradient id="gA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4943a" stopOpacity="0.30" />
            <stop offset="70%" stopColor="#d4943a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#d4943a" stopOpacity="0" />
          </radialGradient>

          {/* Medium amber glow */}
          <radialGradient id="gB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4943a" stopOpacity="0.22" />
            <stop offset="80%" stopColor="#d4943a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#d4943a" stopOpacity="0" />
          </radialGradient>

          {/* Subtle amber glow */}
          <radialGradient id="gC" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4943a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#d4943a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base */}
        <rect width="1440" height="900" fill="url(#bgFade)" />

        {/* ═══════════════════════════════════════════════════
            LAYER 1 — Structural grid (very faint, neutral)
            ═══════════════════════════════════════════════════ */}
        <g stroke="#2e2e36" strokeWidth="0.4" opacity="0.35">
          <line x1="0" y1="150" x2="1440" y2="150" />
          <line x1="0" y1="300" x2="1440" y2="300" />
          <line x1="0" y1="450" x2="1440" y2="450" />
          <line x1="0" y1="600" x2="1440" y2="600" />
          <line x1="0" y1="750" x2="1440" y2="750" />
          <line x1="240" y1="0" x2="240" y2="900" />
          <line x1="480" y1="0" x2="480" y2="900" />
          <line x1="720" y1="0" x2="720" y2="900" />
          <line x1="960" y1="0" x2="960" y2="900" />
          <line x1="1200" y1="0" x2="1200" y2="900" />
        </g>

        {/* ═══════════════════════════════════════════════════
            LAYER 2 — Neutral gray network (~70%)
            ═══════════════════════════════════════════════════ */}

        {/* Gray primary connections */}
        <g stroke="#42424c" strokeWidth="0.9" fill="none" opacity="0.6">
          {/* Central horizontal band */}
          <polyline points="160,420 320,380 480,430 640,395" />
          <polyline points="640,395 800,450 960,405" />

          {/* Lower band */}
          <polyline points="700,560 860,610 1020,565" />
          <polyline points="440,590 580,550 700,560" />

          {/* Bottom area */}
          <polyline points="500,720 660,690 820,730" />
          <polyline points="820,730 980,700 1140,740" />

          {/* Mid-left descending */}
          <polyline points="120,280 240,320 360,290 480,330" />

          {/* Right mid area */}
          <polyline points="1200,400 1320,370 1400,410" />
          <polyline points="1180,520 1300,490 1400,530" />
        </g>

        {/* Gray cross connections */}
        <g stroke="#3c3c46" strokeWidth="0.7" fill="none" opacity="0.5">
          <line x1="320" y1="380" x2="360" y2="290" />
          <line x1="480" y1="430" x2="440" y2="590" />
          <line x1="800" y1="450" x2="820" y2="730" />
          <line x1="960" y1="405" x2="1020" y2="565" />
          <line x1="640" y1="395" x2="700" y2="560" />
          <line x1="1320" y1="370" x2="1300" y2="490" />
          <line x1="660" y1="690" x2="580" y2="550" />
          <line x1="980" y1="700" x2="1020" y2="565" />
          <line x1="240" y1="320" x2="160" y2="420" />
        </g>

        {/* Gray dashed secondary connections */}
        <g stroke="#38383f" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="4 6">
          <polyline points="80,500 180,470 280,510 380,480" />
          <polyline points="1040,800 1160,770 1280,810 1380,780" />
          <polyline points="60,660 160,630 260,670" />
          <polyline points="1250,620 1350,590 1420,620" />
          <line x1="480" y1="330" x2="480" y2="430" />
          <line x1="1140" y1="740" x2="1200" y2="400" />
        </g>

        {/* Gray nodes */}
        <g fill="#4a4a55">
          <circle cx="160" cy="420" r="2.5" />
          <circle cx="480" cy="430" r="2.5" />
          <circle cx="960" cy="405" r="2.5" />
          <circle cx="440" cy="590" r="2" />
          <circle cx="700" cy="560" r="2.5" />
          <circle cx="1020" cy="565" r="2.5" />
          <circle cx="500" cy="720" r="2" />
          <circle cx="820" cy="730" r="2.5" />
          <circle cx="1140" cy="740" r="2" />
          <circle cx="120" cy="280" r="2" />
          <circle cx="360" cy="290" r="2.5" />
          <circle cx="480" cy="330" r="2" />
          <circle cx="1200" cy="400" r="2.5" />
          <circle cx="1400" cy="410" r="2" />
          <circle cx="1180" cy="520" r="2" />
          <circle cx="1400" cy="530" r="2" />
          <circle cx="980" cy="700" r="2" />
        </g>

        {/* Gray junction nodes — slightly larger */}
        <g fill="#555560">
          <circle cx="320" cy="380" r="3" />
          <circle cx="640" cy="395" r="3" />
          <circle cx="800" cy="450" r="3" />
          <circle cx="580" cy="550" r="3" />
          <circle cx="860" cy="610" r="3" />
          <circle cx="660" cy="690" r="3" />
          <circle cx="240" cy="320" r="3" />
          <circle cx="1320" cy="370" r="3" />
          <circle cx="1300" cy="490" r="3" />
        </g>

        {/* ═══════════════════════════════════════════════════
            LAYER 3 — Amber network (~30%)
            ═══════════════════════════════════════════════════ */}

        {/* ── CLUSTER A: Upper-right (strongest) ──────────── */}
        <g stroke="#d4943a" strokeWidth="0.9" fill="none" opacity="0.32">
          <polyline points="980,80 1080,120 1180,75 1280,110" />
          <polyline points="1280,110 1370,80 1420,110" />
          <polyline points="1080,120 1140,180 1240,160 1340,200" />
          <polyline points="1240,160 1280,110" />
          <polyline points="1180,75 1220,40 1320,60 1400,35" />
          <polyline points="1320,60 1340,200" />
          <line x1="980" y1="80" x2="940" y2="140" />
          <line x1="1370" y1="80" x2="1400" y2="35" />
          <line x1="1140" y1="180" x2="1080" y2="120" />
        </g>

        {/* Upper-right cross connections */}
        <g stroke="#d4943a" strokeWidth="0.6" fill="none" opacity="0.22">
          <line x1="1080" y1="120" x2="1040" y2="200" />
          <line x1="1340" y1="200" x2="1380" y2="280" />
          <line x1="1180" y1="75" x2="1160" y2="20" />
          <line x1="1420" y1="110" x2="1440" y2="160" />
          <line x1="1220" y1="40" x2="1200" y2="10" />
        </g>

        {/* Upper-right amber nodes */}
        <g fill="#d4943a">
          <circle cx="980" cy="80" r="2.5" opacity="0.55" />
          <circle cx="1180" cy="75" r="2.5" opacity="0.6" />
          <circle cx="1280" cy="110" r="3" opacity="0.7" />
          <circle cx="1370" cy="80" r="2" opacity="0.5" />
          <circle cx="1420" cy="110" r="2" opacity="0.45" />
          <circle cx="1220" cy="40" r="2" opacity="0.5" />
          <circle cx="1320" cy="60" r="2.5" opacity="0.55" />
          <circle cx="1400" cy="35" r="2" opacity="0.45" />
          <circle cx="1240" cy="160" r="2.5" opacity="0.6" />
          <circle cx="1340" cy="200" r="2.5" opacity="0.55" />
          <circle cx="940" cy="140" r="2" opacity="0.45" />
          <circle cx="1040" cy="200" r="2" opacity="0.4" />
        </g>

        {/* Bright amber nodes with localized glow — upper-right */}
        <g>
          <circle cx="1080" cy="120" r="24" fill="url(#gA)" />
          <circle cx="1080" cy="120" r="3.5" fill="#d4943a" opacity="0.85" />

          <circle cx="1140" cy="180" r="18" fill="url(#gB)" />
          <circle cx="1140" cy="180" r="3" fill="#d4943a" opacity="0.75" />

          <circle cx="1280" cy="110" r="20" fill="url(#gB)" />
          {/* node already drawn above */}
        </g>

        {/* ── CLUSTER B: Upper-center ─────────────────────── */}
        <g stroke="#d4943a" strokeWidth="0.8" fill="none" opacity="0.28">
          <polyline points="560,100 680,140 800,105 920,150" />
          <polyline points="680,140 720,210 840,190" />
          <polyline points="800,105 840,190" />
          <line x1="560" y1="100" x2="520" y2="160" />
          <line x1="920" y1="150" x2="940" y2="140" />
        </g>

        {/* Upper-center amber nodes */}
        <g fill="#d4943a">
          <circle cx="560" cy="100" r="2.5" opacity="0.5" />
          <circle cx="800" cy="105" r="2.5" opacity="0.55" />
          <circle cx="920" cy="150" r="2" opacity="0.45" />
          <circle cx="520" cy="160" r="2" opacity="0.4" />
          <circle cx="840" cy="190" r="2" opacity="0.45" />
        </g>

        {/* Bright nodes — upper-center */}
        <g>
          <circle cx="680" cy="140" r="22" fill="url(#gA)" />
          <circle cx="680" cy="140" r="3.5" fill="#d4943a" opacity="0.8" />

          <circle cx="720" cy="210" r="16" fill="url(#gC)" />
          <circle cx="720" cy="210" r="2.5" fill="#d4943a" opacity="0.65" />
        </g>

        {/* ── CLUSTER C: Lower-left ───────────────────────── */}
        <g stroke="#d4943a" strokeWidth="0.8" fill="none" opacity="0.26">
          <polyline points="60,640 160,680 280,650 380,690" />
          <polyline points="160,680 200,750 320,730" />
          <polyline points="280,650 320,730" />
          <polyline points="380,690 420,760 340,800" />
          <line x1="60" y1="640" x2="40" y2="580" />
          <line x1="200" y1="750" x2="160" y2="820" />
          <line x1="420" y1="760" x2="460" y2="700" />
        </g>

        {/* Lower-left amber nodes */}
        <g fill="#d4943a">
          <circle cx="60" cy="640" r="2" opacity="0.45" />
          <circle cx="280" cy="650" r="2.5" opacity="0.55" />
          <circle cx="380" cy="690" r="2" opacity="0.45" />
          <circle cx="320" cy="730" r="2" opacity="0.5" />
          <circle cx="420" cy="760" r="2" opacity="0.4" />
          <circle cx="340" cy="800" r="2" opacity="0.4" />
          <circle cx="40" cy="580" r="2" opacity="0.35" />
          <circle cx="160" cy="820" r="2" opacity="0.35" />
          <circle cx="460" cy="700" r="2" opacity="0.35" />
        </g>

        {/* Bright nodes — lower-left */}
        <g>
          <circle cx="160" cy="680" r="20" fill="url(#gA)" />
          <circle cx="160" cy="680" r="3" fill="#d4943a" opacity="0.75" />

          <circle cx="200" cy="750" r="14" fill="url(#gC)" />
          <circle cx="200" cy="750" r="2.5" fill="#d4943a" opacity="0.6" />
        </g>

        {/* ── Amber edge accents — scattered ───────────────── */}
        <g stroke="#d4943a" strokeWidth="0.6" fill="none" opacity="0.2">
          {/* Top-left short path */}
          <polyline points="100,40 200,70 300,45" />
          {/* Left edge */}
          <line x1="20" y1="380" x2="80" y2="400" />
          <line x1="20" y1="380" x2="30" y2="340" />
          {/* Bottom-right */}
          <polyline points="1200,800 1300,770 1380,800" />
          <line x1="1300" y1="770" x2="1320" y2="730" />
          {/* Right edge */}
          <line x1="1430" y1="300" x2="1380" y2="280" />
          <line x1="1430" y1="450" x2="1390" y2="430" />
        </g>

        {/* Amber edge nodes */}
        <g fill="#d4943a">
          <circle cx="200" cy="70" r="2" opacity="0.45" />
          <circle cx="100" cy="40" r="2" opacity="0.35" />
          <circle cx="300" cy="45" r="1.5" opacity="0.3" />
          <circle cx="20" cy="380" r="2" opacity="0.4" />
          <circle cx="1300" cy="770" r="2" opacity="0.4" />
          <circle cx="1380" cy="800" r="1.5" opacity="0.3" />
          <circle cx="1430" cy="300" r="1.5" opacity="0.3" />
          <circle cx="1380" cy="280" r="2" opacity="0.35" />
        </g>

        {/* ── Amber connecting paths between clusters ──────── */}
        <g stroke="#d4943a" strokeWidth="0.5" fill="none" opacity="0.16">
          {/* Upper-center to upper-right */}
          <line x1="920" y1="150" x2="980" y2="80" />
          {/* Upper-right cascading down to gray network */}
          <line x1="1340" y1="200" x2="1320" y2="370" />
          {/* Lower-left connecting to gray center */}
          <line x1="380" y1="690" x2="440" y2="590" />
          <line x1="460" y1="700" x2="500" y2="720" />
        </g>

        {/* ═══════════════════════════════════════════════════
            LAYER 4 — Geometric detail shapes
            ═══════════════════════════════════════════════════ */}

        {/* Gray geometric shapes */}
        <g stroke="#48484f" strokeWidth="0.6" fill="none" opacity="0.4">
          <polygon points="250,310 258,302 266,310 258,318" />
          <polygon points="880,440 888,432 896,440 888,448" />
          <rect x="540" y="545" width="7" height="7" rx="1" />
          <rect x="1240" y="486" width="7" height="7" rx="1" />
          <polygon points="760,695 768,687 776,695" />
          <polygon points="1100,560 1108,552 1116,560" />
        </g>

        {/* Amber geometric shapes — in cluster zones */}
        <g stroke="#d4943a" strokeWidth="0.6" fill="none" opacity="0.35">
          <polygon points="1150,100 1158,92 1166,100 1158,108" />
          <polygon points="1300,140 1308,132 1316,140 1308,148" />
          <rect x="640" y="165" width="6" height="6" rx="1" />
          <rect x="1030" y="156" width="6" height="6" rx="1" />
          <polygon points="240,695 248,687 256,695" />
          <polygon points="360,738 368,730 376,738" />
        </g>

        {/* ═══════════════════════════════════════════════════
            LAYER 5 — Corner patterns
            ═══════════════════════════════════════════════════ */}
        <g stroke="#3a3a44" strokeWidth="0.6" opacity="0.45">
          {/* Top-left */}
          <line x1="25" y1="25" x2="110" y2="25" />
          <line x1="25" y1="25" x2="25" y2="110" />
          <line x1="25" y1="50" x2="70" y2="50" />
          <line x1="50" y1="25" x2="50" y2="70" />

          {/* Top-right — amber-tinted */}
          <line x1="1395" y1="25" x2="1415" y2="25" stroke="#d4943a" opacity="0.3" />
          <line x1="1415" y1="25" x2="1415" y2="95" stroke="#d4943a" opacity="0.3" />
          <line x1="1395" y1="25" x2="1395" y2="55" stroke="#d4943a" opacity="0.25" />
          <line x1="1415" y1="55" x2="1390" y2="55" stroke="#d4943a" opacity="0.25" />

          {/* Bottom-right */}
          <line x1="1340" y1="875" x2="1415" y2="875" />
          <line x1="1415" y1="810" x2="1415" y2="875" />
          <line x1="1380" y1="875" x2="1380" y2="845" />
          <line x1="1415" y1="845" x2="1365" y2="845" />

          {/* Bottom-left — amber-tinted */}
          <line x1="25" y1="860" x2="25" y2="875" stroke="#d4943a" opacity="0.25" />
          <line x1="25" y1="875" x2="85" y2="875" stroke="#d4943a" opacity="0.25" />
          <line x1="25" y1="860" x2="55" y2="860" stroke="#d4943a" opacity="0.2" />
        </g>

        {/* ═══════════════════════════════════════════════════
            LAYER 6 — Peripheral scatter nodes
            ═══════════════════════════════════════════════════ */}
        <g fill="#404048">
          <circle cx="50" cy="180" r="1.5" />
          <circle cx="350" cy="30" r="1.5" />
          <circle cx="700" cy="20" r="1.5" />
          <circle cx="1430" cy="220" r="1.5" />
          <circle cx="1435" cy="400" r="1.5" />
          <circle cx="1420" cy="560" r="1.5" />
          <circle cx="1430" cy="700" r="1.5" />
          <circle cx="600" cy="860" r="1.5" />
          <circle cx="850" cy="870" r="1.5" />
          <circle cx="15" cy="450" r="1.5" />
          <circle cx="20" cy="560" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
