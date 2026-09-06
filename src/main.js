const header = document.querySelector("[data-header]");
const menuBtn = document.querySelector("[data-menu-btn]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const revealBtn = document.querySelector("[data-reveal-btn]");
const revealName = document.querySelector("[data-reveal-name]");
const revealFace = document.querySelector("[data-reveal-face]");
const menuLabel = menuBtn?.querySelector(".sr-only");

const setStuck = () => {
  header?.classList.toggle("is-stuck", window.scrollY > 8);
};

let stuckFrame = 0;
const onScroll = () => {
  if (stuckFrame) return;
  stuckFrame = requestAnimationFrame(() => {
    stuckFrame = 0;
    setStuck();
  });
};

setStuck();
window.addEventListener("scroll", onScroll, { passive: true });

const debounce = (fn, ms) => {
  let timer = 0;
  return () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(fn, ms);
  };
};

const setMenu = (open) => {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
  if (menuLabel) menuLabel.textContent = open ? "بستن منو" : "باز کردن منو";
};

const closeMenu = () => setMenu(false);

menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  setMenu(!open);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener(
  "resize",
  debounce(() => {
    if (window.matchMedia("(min-width: 720px)").matches) closeMenu();
  }, 120),
  { passive: true },
);

revealBtn?.addEventListener("click", () => {
  const revealed = revealBtn.getAttribute("aria-pressed") === "true";
  if (revealed) {
    revealName.textContent = "هویت مخفی";
    revealFace.textContent = "؟";
    revealFace.classList.add("anon");
    revealBtn.textContent = "آشکار کردن هویت برای این گفتگو";
    revealBtn.setAttribute("aria-pressed", "false");
    return;
  }

  revealName.textContent = "نگار";
  revealFace.textContent = "نگ";
  revealFace.classList.remove("anon");
  revealBtn.textContent = "پنهان کردن هویت";
  revealBtn.setAttribute("aria-pressed", "true");
});

const ring = document.querySelector("[data-ring]");
const travelPath = document.querySelector("#travel-path");
const travelSlip = document.querySelector("[data-travel-slip]");
const travelVia = document.querySelector("[data-travel-via]");
const ringStage = document.querySelector(".ring-stage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const hops = [
  { at: 0.12, name: "یاسمن" },
  { at: 0.38, name: "سارا" },
  { at: 0.86, name: "مریم" },
];

const TRAVEL_MS = 9200;
const HOLD_MS = 1600;
const VIEWBOX = 640;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const hopAt = (t) => {
  let current = hops[0];
  for (const hop of hops) {
    if (t >= hop.at - 0.12) current = hop;
  }
  return current;
};

const metrics = {
  length: 0,
  scale: 1,
  slipW: 0,
  slipH: 0,
};

const measureTravel = () => {
  if (!travelPath || !travelSlip || !ringStage) return false;
  const box = travelSlip.getBoundingClientRect();
  metrics.length = travelPath.getTotalLength();
  metrics.scale = ringStage.clientWidth / VIEWBOX;
  metrics.slipW = Math.max(travelSlip.offsetWidth, box.width);
  metrics.slipH = Math.max(travelSlip.offsetHeight, box.height);
  return metrics.length > 0 && metrics.slipW >= 8;
};

const afterLayout = (fn) => {
  requestAnimationFrame(() => requestAnimationFrame(fn));
};

let liveName = "";

const placeSlip = (t) => {
  if (!travelPath || !travelSlip || !ringStage) return;
  if (metrics.slipW < 8 && !measureTravel()) return;
  if (!metrics.length || metrics.slipW < 8) return;
  const point = travelPath.getPointAtLength(metrics.length * t);
  const pad = 8;
  const slipW = metrics.slipW;
  const slipH = metrics.slipH;
  const stageW = ringStage.clientWidth;
  const stageH = ringStage.clientHeight;
  const cx = stageW / 2;
  const cy = stageH / 2;
  const desktop = window.matchMedia("(min-width: 720px)").matches;
  const keepOut = stageW * (desktop ? 0.48 : 0.2);

  let x = point.x * metrics.scale - slipW / 2;
  let y = point.y * metrics.scale - slipH / 2;

  const dx = x + slipW / 2 - cx;
  const dy = y + slipH / 2 - cy;
  const dist = Math.hypot(dx, dy) || 1;
  const need = keepOut + Math.hypot(slipW, slipH) * (desktop ? 0.34 : 0.18);
  if (dist < need) {
    const k = need / dist;
    x = cx + dx * k - slipW / 2;
    y = cy + dy * k - slipH / 2;
  }

  const overflow = desktop ? Math.round(slipW * 0.42) : 0;
  const maxX = Math.max(pad, stageW - slipW - pad + overflow);
  const maxY = Math.max(pad, stageH - slipH - pad + overflow);
  x = Math.min(maxX, Math.max(pad - overflow, x));
  y = Math.min(maxY, Math.max(pad - overflow, y));
  travelSlip.style.transform = `translate(${x}px, ${y}px)`;
  travelPath.style.strokeDasharray = `${metrics.length}`;
  travelPath.style.strokeDashoffset = `${metrics.length * (1 - t)}`;

  const hop = hopAt(t);
  if (travelVia && liveName !== hop.name) {
    liveName = hop.name;
    travelVia.textContent = `از طریق ${hop.name}`;
    ring?.querySelectorAll("[data-person]").forEach((node) => {
      node.classList.toggle("is-live", node.getAttribute("data-person") === hop.name);
    });
  }
};

const restAtMaryam = () => {
  measureTravel();
  placeSlip(0.84);
};

if (ring && travelPath && travelSlip && ringStage) {
  ring.classList.add("is-scripted");

  if (reduceMotion.matches) {
    afterLayout(restAtMaryam);
  } else {
    let raf = 0;
    let running = false;
    let clock = 0;
    let lastNow = 0;

    const frame = (now) => {
      if (!running) return;
      if (!lastNow) lastNow = now;
      clock += now - lastNow;
      lastNow = now;
      const elapsed = clock % (TRAVEL_MS + HOLD_MS);
      const t = elapsed <= TRAVEL_MS ? easeInOut(elapsed / TRAVEL_MS) : 1;
      placeSlip(t);
      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running || reduceMotion.matches || document.hidden) return;
      running = true;
      lastNow = 0;
      measureTravel();
      placeSlip(0);
      ring.classList.add("is-traveling");
      raf = requestAnimationFrame(frame);
    };

    const pause = () => {
      running = false;
      lastNow = 0;
      cancelAnimationFrame(raf);
      ring.classList.remove("is-traveling");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else pause();
      },
      { threshold: 0 },
    );

    observer.observe(ring);
    afterLayout(play);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause();
      else if (ring.getBoundingClientRect().bottom > 80) play();
    });
    reduceMotion.addEventListener("change", () => {
      pause();
      if (reduceMotion.matches) restAtMaryam();
      else play();
    });
    window.addEventListener(
      "resize",
      debounce(() => {
        measureTravel();
        if (!running) placeSlip(reduceMotion.matches ? 0.84 : 0.48);
      }, 120),
      { passive: true },
    );
  }
}
