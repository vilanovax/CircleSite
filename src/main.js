const header = document.querySelector("[data-header]");
const menuBtn = document.querySelector("[data-menu-btn]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const revealBtn = document.querySelector("[data-reveal-btn]");
const revealName = document.querySelector("[data-reveal-name]");
const revealFace = document.querySelector("[data-reveal-face]");

const setStuck = () => {
  header?.classList.toggle("is-stuck", window.scrollY > 8);
};

setStuck();
window.addEventListener("scroll", setStuck, { passive: true });

const closeMenu = () => {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
};

menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileNav.hidden = open;
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

revealBtn?.addEventListener("click", () => {
  const revealed = revealBtn.dataset.revealed === "true";
  if (revealed) {
    revealName.textContent = "هویت مخفی";
    revealFace.textContent = "؟";
    revealFace.classList.add("anon");
    revealBtn.textContent = "آشکار کردن هویت برای این گفتگو";
    revealBtn.dataset.revealed = "false";
    return;
  }

  revealName.textContent = "نگار";
  revealFace.textContent = "نگ";
  revealFace.classList.remove("anon");
  revealBtn.textContent = "پنهان کردن هویت";
  revealBtn.dataset.revealed = "true";
});
