/*
 * data.js — Сайтын БҮХ хувийн мэдээлэл энд байна.
 * Зөвхөн энэ файлыг өөрчилснөөр сайтын агуулга солигдоно.
 * ("[ ]" доторх утгуудыг өөрийнхөөрөө солиорой.)
 */
window.PORTFOLIO = {
  name: "[Таны Нэр]",
  firstName: "[Нэр]",   // "Сайн байна уу, би ..." хэсэгт гарна
  initials: "ТН",       // Хавтасны зурвас дээр гарах 2 үсэг
  role: "Програм хангамжийн инженер · Frontend хөгжүүлэгч",
  tagline: "Энгийн санааг гоё, ойлгомжтой вэб болгож хувиргадаг.",
  photo: "",            // жишээ: "assets/me.jpg" — хоосон бол үсгээр солигдоно

  // "Миний тухай" хэсгийн товч баримтууд
  facts: [
    { label: "Сургууль", value: "СЭЗИС" },
    { label: "Мэргэжил", value: "Програм хангамж" },
    { label: "Байршил", value: "Улаанбаатар" },
    { label: "Одоо", value: "Дадлага хайж байна" }
  ],

  about: [
    "Би СЭЗИС-ийн Програм хангамжийн инженерчлэлийн [N]-р курсын оюутан. Хэрэглэгчийн өдөр тутмын асуудлыг энгийн, ойлгомжтой вэб шийдлээр шийдэх дуртай.",
    "Чөлөөт цагаараа [хобби 1], [хобби 2] хийж, шинэ технологи туршдаг. Одоогоор дадлагын байр хайж байна."
  ],

  // Ур чадварууд — "Одны орд" хэлбэрээр зурагдана
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git", "Figma"],

  // Хамгийн багадаа 3 бүтээл. image: assets/ хавтас доторх зураг
  projects: [
    {
      title: "[Бүтээл 1] — Хичээлийн хуваарь",
      desc: "Оюутнууд хичээлийн хуваариа чирж тавиад, давхцлыг автоматаар илрүүлдэг вэб апп.",
      image: "assets/project-1.svg",
      tags: ["React", "LocalStorage"],
      demo: "https://example.com",
      code: "https://github.com/your-username/project-1"
    },
    {
      title: "[Бүтээл 2] — Номын сангийн систем",
      desc: "Ном бүртгэх, зээлэх, буцаах үйлдэлтэй REST API болон админ самбар.",
      image: "assets/project-2.svg",
      tags: ["Node.js", "Express", "MySQL"],
      demo: "https://example.com",
      code: "https://github.com/your-username/project-2"
    },
    {
      title: "[Бүтээл 3] — Цаг агаарын самбар",
      desc: "Улаанбаатарын цаг агаар, агаарын чанарыг график хэлбэрээр харуулдаг жижиг самбар.",
      image: "assets/project-3.svg",
      tags: ["JavaScript", "Chart.js", "API"],
      demo: "https://example.com",
      code: "https://github.com/your-username/project-3"
    }
  ],

  contact: {
    email: "your.email@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    facebook: "" // хоосон үлдээвэл харагдахгүй
  }
};
