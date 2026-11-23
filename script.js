/* =========================================================
   script.js — Ягаан хавтас портфолио
   1. data.js-ийн мэдээллийг HTML-д оруулах
   2. Хавтас нээх / хаах (дарах, ← → товч, URL #hash)
   3. Имэйл хуулах, тамга (easter egg)
   ========================================================= */

const data = window.PORTFOLIO;
const $ = (sel) => document.querySelector(sel);

// Текстийг HTML болгохгүйгээр аюулгүй оруулна
function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- 1. Агуулга оруулах ---------- */

// data-bind="name" гэх мэт элементэд утгыг оруулна
document.querySelectorAll("[data-bind]").forEach((el) => {
  el.textContent = data[el.dataset.bind];
});
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
document.title = `${data.name} · Портфолио`;

// Миний тухай: зураг (байхгүй бол эхний үсгүүд), текст, баримтууд
const photoHTML = data.photo
  ? `<img src="${esc(data.photo)}" alt="${esc(data.name)}" />`
  : `<span>${esc(data.initials)}</span>`;
$("#aboutPhoto").innerHTML = photoHTML;
$("#aboutPeek").innerHTML = data.photo
  ? `<img src="${esc(data.photo)}" alt="" />`
  : `<span class="peek-word">about</span>`;
$("#aboutText").innerHTML = data.about.map((p) => `<p>${esc(p)}</p>`).join("");
$("#facts").innerHTML = (data.facts || [])
  .map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
  .join("");

// Ур чадвар: дугаартай индекс
$("#skillList").innerHTML = data.skills
  .map((s, i) => `<li class="stagger"><span>${String(i + 1).padStart(2, "0")}</span>${esc(s)}</li>`)
  .join("");
$("#skillsPeek").innerHTML = `<div class="peek-list">${data.skills
  .map((s) => `<span class="peek-word">${esc(s)}</span>`)
  .join("")}</div>`;

// Бүтээлүүд
$("#projectList").innerHTML = data.projects
  .map(
    (p, i) => `
  <article class="project stagger">
    <div class="project-img-wrap">
      <img class="project-img" src="${esc(p.image)}" alt="${esc(p.title)} — дэлгэцийн зураг" loading="lazy"
           onerror="this.parentElement.classList.add('no-img'); this.remove();" />
    </div>
    <span class="project-num">№ ${String(i + 1).padStart(2, "0")}</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="project-links">
      ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Сайт үзэх ↗</a>` : ""}
      ${p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
    </div>
  </article>`
  )
  .join("");
if (data.projects[0]) {
  $("#projectsPeek").innerHTML = `<img src="${esc(data.projects[0].image)}" alt="" />`;
}

// Холбоо барих
const c = data.contact;
const emailLink = $("#emailLink");
emailLink.textContent = c.email;
emailLink.href = `mailto:${c.email}`;
const links = [
  c.github && { label: "GitHub", href: c.github },
  c.linkedin && { label: "LinkedIn", href: c.linkedin },
  c.facebook && { label: "Facebook", href: c.facebook },
].filter(Boolean);
$("#contactLinks").innerHTML = links
  .map((l) => `<li><a href="${esc(l.href)}" target="_blank" rel="noopener">
      <span class="label">${l.label} ↗</span>
      <span class="value">${esc(l.href.replace(/^https?:\/\//, ""))}</span></a></li>`)
  .join("");

/* ---------- 2. Хавтас нээх ---------- */

const folders = [...document.querySelectorAll(".folder")];
const ids = folders.map((f) => f.dataset.id);
const isMobile = () => window.matchMedia("(max-width: 760px)").matches;

// .content-ийг JavaScript-ээр фокуслах боломжтой болгоно (Tab дараалалд орохгүй)
folders.forEach((f) => f.querySelector(".content").setAttribute("tabindex", "-1"));

// Зөвхөн нэг хавтас нээлттэй байна: бусдаас нь .open-ийг авна
// focus = true: хэрэглэгч өөрөө нээсэн үед гарын фокусыг шинэ агуулга руу шилжүүлнэ
function openFolder(id, { updateUrl = true, focus = true } = {}) {
  if (!ids.includes(id)) id = "home";
  const folder = folders[ids.indexOf(id)];
  const alreadyOpen = folder.classList.contains("open");

  folders.forEach((f) => {
    const open = f === folder;
    f.classList.toggle("open", open);
    f.querySelector(".spine").setAttribute("aria-expanded", open);
  });
  if (updateUrl && location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);

  const content = folder.querySelector(".content");
  if (!alreadyOpen) content.scrollTop = 0; // шинээр нээгдсэн хавтас дээрээсээ эхэлнэ
  if (focus) content.focus({ preventScroll: true });

  // Гар утсан дээр нээгдсэн хавтас руу гүйлгэнэ
  if (isMobile() && (focus || id !== "home")) {
    setTimeout(() => folder.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }
}

// Нуруу/шошго эсвэл хаалттай хавтасны зурвас дээр дарахад нээгдэнэ
folders.forEach((f) => {
  f.querySelector(".spine").addEventListener("click", () => openFolder(f.dataset.id));
  f.querySelector(".peek").addEventListener("click", () => openFolder(f.dataset.id));
});

// Нүүр хуудасны агуулгын жагсаалт
document.querySelectorAll("[data-open]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    openFolder(a.dataset.open);
  })
);

// ← → товчоор дараагийн / өмнөх хавтас руу, Esc-ээр нүүр рүү шилжинэ
window.addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return; // хөтчийн товчлолд саад болохгүй
  if (e.target instanceof Element && e.target.closest("input, textarea, select")) return;
  const current = ids.indexOf(document.querySelector(".folder.open").dataset.id);
  if (e.key === "ArrowRight" && current < ids.length - 1) openFolder(ids[current + 1]);
  else if (e.key === "ArrowLeft" && current > 0) openFolder(ids[current - 1]);
  else if (e.key === "Escape" && current !== 0) openFolder("home");
});

// Хөтчийн "буцах" товч болон шууд холбоос (жишээ нь .../#projects)
window.addEventListener("popstate", () => openFolder(location.hash.slice(1), { updateUrl: false, focus: false }));
openFolder(location.hash.slice(1) || "home", { updateUrl: false, focus: false });

/* ---------- 3. Жижиг харилцан үйлдлүүд ---------- */

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

// Имэйл хуулах
$("#copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(c.email);
    toast("Имэйл хуулагдлаа ✓");
  } catch {
    toast(c.email);
  }
});

// Easter egg: тамган дээр 3 дарахад "АЖИЛД АВЪЯ!" тамга дарагдана
let stickerClicks = 0;
$("#sticker").addEventListener("click", () => {
  stickerClicks++;
  if (stickerClicks === 3) {
    $("#stamp").classList.add("on");
    toast("Батлагдлаа! 🎉");
  } else if (stickerClicks < 3) {
    toast(`Дахиад ${3 - stickerClicks} удаа…`);
  }
});
