
const projects = [
  {
    title: "PSS Telecom Network Simulator",
    desc: "C++ discrete event engine processing 1.36M events/sec with Dijkstra routing, 1+1 protection switching, and lock-free concurrency. Deployed via Flask REST API, SQLite, and Docker/Kubernetes, scaling to 10K services in a 43.8MB memory footprint.",
    images: [
      { src: "./assets/bms.png", caption: "Simulator API: add links, inject faults, observe packet flow" },
    ],
    tags: ["C++", "Systems", "Docker", "Backend"],
    github: "https://github.com/vatsalmalkari",
    roles: ["backend"],
  },
  {
    title: "Custom C++ Deep Learning Engine",
    desc: "Framework-free engine with a custom DAG autograd graph for backpropagation. A bitwise-aligned memory arena keeps OS heap allocation under 0.1% of thread runtime. Real-time webcam inference in under 100ms.",
    images: [
      { src: "./assets/face_expression.png", caption: "Real-time webcam inference: expression classified in under 100ms" },
      { src: "./assets/cnn_trace.png", caption: "Instruments trace: 43.9% in Tensor::backward, near-zero malloc" },
    ],
    tags: ["C++", "ML", "Performance"],
    github: "https://github.com/vatsalmalkari/Cpp-deep-learning-engine",
    roles: ["ml"],
  },
  {
    title: "Python Interpreter in C",
    desc: "Core compiler components (tokenizer, parser, evaluator) with a security-first design: bounds checking on all buffers, reference counting, and input validation. Zero buffer overflows and zero memory leaks across 40+ tests.",
    images: [
      { src: "./assets/python_compiler.png", caption: "Runs Python in the terminal: no CPython, no dependencies" },
    ],
    tags: ["C", "Systems", "Security"],
    github: "https://github.com/vatsalmalkari/python-compiler",
    roles: ["backend"],
  },
  {
    title: "Low-Level Task Scheduler",
    desc: "C scheduler using a min heap and hash map for O(log N) scheduling and O(1) cancellation. Replaced busy-waiting with pthread condition variables and stress-tested with 2,000 concurrent tasks.",
    images: [
      { src: "./assets/task-scheduler.png", caption: "Concurrent execution: min heap scheduling with pthread sync" },
    ],
    tags: ["C", "Systems", "Concurrency"],
    github: "https://github.com/vatsalmalkari/task-scheduler",
    roles: ["backend"],
  },
  {
    title: "Anime Script AI (RAG)",
    desc: "Semantic search and RAG system using ChromaDB and SentenceTransformers, enabling contextual querying and analysis of large anime script datasets.",
    images: [
      { src: "./assets/aot-fmab-ai.png", caption: "Retrieval-augmented query: LLM grounded in embedded scripts" },
    ],
    tags: ["Python", "ML", "NLP"],
    github: "https://github.com/vatsalmalkari/aot_fmab_jjk_ai",
    roles: ["ml"],
  },
];

const experience = [
  {
    company: "Nokia Bell Labs",
    role: "Software Verification Engineer Co-op",
    dates: "May 2026 – Aug 2026",
    bullets: [
      "Reverse engineered REST API specs with cross-functional teams to build an isolated simulator, enabling safe testing without risking production hardware.",
      "Scripted Python and Shell tools to parse REST JSON payloads for node setup and IP allocation, cutting manual setup from 4+ hours to under 30 minutes.",
      "Built helper tools and workflow pipelines that let AI agents run network creation, link updates, and fault injections from natural language.",
      "Containerized backend automation logic with Docker for reproducible test execution and developer onboarding.",
    ],
    roles: ["backend"],
  },
  {
    company: "NJ Cybersecurity & Communications Integration Cell",
    role: "Data Engineering Extern",
    dates: "Jan 2025 – May 2025",
    bullets: [
      "Built a scalable pipeline on Google Cloud Platform processing 2M+ weekly login events to identify the top 1% high-risk accounts.",
      "Implemented anomaly detection in BigQuery ML, improving threat detection accuracy by 22%.",
      "Automated threat classification using PCA and vectorized workflows, reducing analyst time.",
    ],
    roles: ["ml"],
  },
];

const skills = [
  { category: "Core Languages", items: ["C++", "Python", "C", "Java", "SQL", "JavaScript", "Shell"] },
  { category: "ML & Data", items: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-Learn", "Pandas / NumPy", "OpenCV", "BigQuery ML"] },
  { category: "Backend & Infra", items: ["FastAPI / Flask", "Django", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes", "Git / CI-CD", "ChromaDB"] },
  { category: "Systems & Low-Level", items: ["Multithreading (pthreads)", "Lock-free programming", "Memory management", "OS scheduling", "Linux / Unix"] },
  { category: "CS Foundations", items: ["Data structures & algorithms", "Object-oriented programming", "REST APIs", "System design", "Authentication (JWT)"] },
];

const ROLE_LABELS = {
  backend: "backend",
  ml: "ML",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const root = document.documentElement;
const themeBtns = [$("#theme-toggle")].filter(Boolean);
const osDark = matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return root.getAttribute("data-theme") || (osDark.matches ? "dark" : "light");
}

function updateThemeIcon() {
  const isDark = currentTheme() === "dark";
  themeBtns.forEach((btn) => {
    btn.querySelector("span").textContent = isDark ? "☀️" : "🌙";
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  });
}

function setTheme(theme, persist = true) {
  root.setAttribute("data-theme", theme);
  if (persist) localStorage.setItem("theme", theme);
  updateThemeIcon();
}

themeBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  })
);

// Follow live OS changes only if the visitor hasn't picked a theme
osDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    root.setAttribute("data-theme", e.matches ? "dark" : "light");
    updateThemeIcon();
  }
});

const menuBtn = $("#menu-toggle");
const navLinksEl = $("#nav-links");

function setMenu(open) {
  navLinksEl.classList.toggle("open", open);
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
  setMenu(!navLinksEl.classList.contains("open"));
});

navLinksEl.addEventListener("click", (e) => {
  if (e.target.matches("a")) setMenu(false);
});

document.addEventListener("click", (e) => {
  if (!navLinksEl.classList.contains("open")) return;
  if (!navLinksEl.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});

function renderExperience() {
  const list = $("#experience-list");
  experience.forEach((job) => {
    const card = el("article", "card exp-card");

    const header = el("div", "exp-header");
    const titles = el("div");
    titles.append(el("h3", null, job.company), el("p", "exp-role", job.role));
    header.append(titles, el("span", "exp-date", job.dates));

    const ul = el("ul", "exp-list");
    job.bullets.forEach((b) => ul.append(el("li", null, b)));

    card.append(header, ul);
    list.append(card);
  });
}

function renderSkills() {
  const grid = $("#skills-grid");
  skills.forEach((group) => {
    const card = el("article", "card skill-card");
    card.append(el("h3", null, group.category));
    const ul = el("ul");
    group.items.forEach((item) => ul.append(el("li", null, item)));
    card.append(ul);
    grid.append(card);
  });
}

// Projects: filtering by tag, ordering by ?role=
const activeRole = new URLSearchParams(location.search).get("role");
const filterBar = $("#filter-bar");
const projectsGrid = $("#projects-grid");
let activeFilter = "All";

function sortedProjects() {
  const list = [...projects];
  if (activeRole) {
    list.sort((a, b) => Number(b.roles.includes(activeRole)) - Number(a.roles.includes(activeRole)));
  }
  return list;
}

function renderProjects() {
  projectsGrid.replaceChildren();
  sortedProjects()
    .filter((p) => activeFilter === "All" || p.tags.includes(activeFilter))
    .forEach((p) => {
      const card = el("article", "card project-card");

      const first = p.images[0];
      const figure = el("figure", "project-figure");
      const img = el("img", "project-img gallery-thumb");
      img.src = first.src;
      img.alt = first.caption;
      img.loading = "lazy";
      img.dataset.project = projects.indexOf(p);
      img.dataset.index = 0;
      figure.append(img);
      if (p.images.length > 1) {
        figure.append(el("span", "gallery-count", `+${p.images.length - 1} more`));
      }

      const tags = el("div", "tag-list");
      p.tags.forEach((t) => tags.append(el("span", "badge", t)));

      const link = el("a", "btn btn-outline project-btn", "GitHub");
      link.href = p.github;
      link.target = "_blank";
      link.rel = "noopener";

      card.append(figure, el("h3", "project-title", p.title), tags, el("p", "project-desc", p.desc), link);
      projectsGrid.append(card);
    });
}

function renderFilters() {
  const tags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  filterBar.replaceChildren(
    ...tags.map((t) => {
      const b = el("button", "filter-btn", t);
      b.type = "button";
      b.dataset.tag = t;
      b.setAttribute("aria-pressed", String(t === activeFilter));
      if (t === activeFilter) b.classList.add("active");
      return b;
    })
  );
}

filterBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  activeFilter = btn.dataset.tag;
  renderFilters();
  renderProjects();
});

function applyRole() {
  if (!activeRole || !ROLE_LABELS[activeRole]) return;
  const label = $("#role-label");
  if (label) label.textContent = ROLE_LABELS[activeRole];
}

const lightbox = $("#lightbox");
const lbImg = $("#lightbox-img");
const lbCaption = $("#lightbox-caption");
const lbPrev = $(".lb-prev");
const lbNext = $(".lb-next");
const lbClose = $(".lb-close");
let lbImages = [];
let lbIndex = 0;
let lastFocus = null;

function showLightboxImage(i) {
  lbIndex = (i + lbImages.length) % lbImages.length;
  const { src, caption } = lbImages[lbIndex];
  lbImg.src = src;
  lbImg.alt = caption;
  lbCaption.textContent = `${caption}  (${lbIndex + 1} / ${lbImages.length})`;
  const multi = lbImages.length > 1;
  lbPrev.hidden = !multi;
  lbNext.hidden = !multi;
}

function openLightbox(images, index) {
  lbImages = images;
  lastFocus = document.activeElement;
  showLightboxImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lbClose.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

projectsGrid.addEventListener("click", (e) => {
  const img = e.target.closest(".gallery-thumb");
  if (!img) return;
  const project = projects[Number(img.dataset.project)];
  openLightbox(project.images, Number(img.dataset.index));
});

lbPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  showLightboxImage(lbIndex - 1);
});
lbNext.addEventListener("click", (e) => {
  e.stopPropagation();
  showLightboxImage(lbIndex + 1);
});
lbClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) {
    if (e.key === "Escape" && navLinksEl.classList.contains("open")) setMenu(false);
    return;
  }
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showLightboxImage(lbIndex - 1);
  if (e.key === "ArrowRight") showLightboxImage(lbIndex + 1);
});

const progressBar = $("#progress-bar");
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
addEventListener("scroll", updateProgress, { passive: true });

const navAnchors = $$(".nav-links a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
$$("main section[id]").forEach((s) => spy.observe(s));

document.documentElement.classList.add("js");
const reveal = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
$$("main section").forEach((s) => reveal.observe(s));

function countUp(node) {
  const target = parseFloat(node.dataset.count);
  const decimals = Number(node.dataset.decimals || 0);
  const suffix = node.dataset.suffix || "";
  if (prefersReducedMotion) {
    node.textContent = target.toFixed(decimals) + suffix;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    node.textContent = (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const metricsSection = $(".metrics");
const metricsObserver = new IntersectionObserver(
  (entries, obs) => {
    if (!entries[0].isIntersecting) return;
    $$("[data-count]", metricsSection).forEach(countUp);
    obs.disconnect();
  },
  { threshold: 0.5 }
);
metricsObserver.observe(metricsSection);

updateThemeIcon();
renderExperience();
renderSkills();
renderFilters();
renderProjects();
applyRole();