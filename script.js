
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const toggleBtnMobile = document.getElementById("theme-toggle-mobile");
    const root = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    } else if (systemDark) {
        root.setAttribute("data-theme", "dark");
    }

    updateIcon();

    function updateIcon() {
        const isDark = root.getAttribute("data-theme") === "dark";
        const icon = isDark ? "☀️" : "🌙";
        if (toggleBtn) toggleBtn.textContent = icon;
        if (toggleBtnMobile) toggleBtnMobile.textContent = icon;
    }

    function toggleTheme() {
        const isDark = root.getAttribute("data-theme") === "dark";
        root.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
        updateIcon();
    }

    if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);
    if (toggleBtnMobile) toggleBtnMobile.addEventListener("click", toggleTheme);
});

document.addEventListener("click", (e) => {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (!menu || !icon) return;

    const isClickInside = menu.contains(e.target) || icon.contains(e.target);
    if (!isClickInside && menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
    }
});

function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (!lb || !img) return;
    img.src = src;
    lb.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.remove("active");
    document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
});