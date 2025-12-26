/* ===========================
   NAVIGATION + SECTIONS
=========================== */

const sections = document.querySelectorAll("section");
const navElements = document.querySelectorAll(".nav-element");

// Sauvegarde du contenu original des sections
const sectionClones = {};

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
  // Cloner le contenu de chaque section
  sections.forEach(section => {
    sectionClones[section.id] = section.innerHTML;
  });

  // Init AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
});

// Recharge une section et rejoue AOS
function reloadSection(section) {
  if (!section || !sectionClones[section.id]) return;

  // Réinjecter le HTML original
  section.innerHTML = sectionClones[section.id];

  // Rebind typing animation si présent
  span = document.getElementById("typing");
  resetTyping();

  // Rejouer AOS
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refreshHard();
    }
  }, 50);
}

// Gestion du clic sur le menu
navElements.forEach(nav => {
  nav.addEventListener("click", e => {
    const link = nav.querySelector("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") return;

    e.preventDefault();

    const targetId = href.slice(1);
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // Désactiver toutes les sections
    sections.forEach(sec => sec.classList.remove("active"));

    // Activer la section cible
    targetSection.classList.add("active");

    // Reload + replay animation
    reloadSection(targetSection);

    // Etat actif du menu
    navElements.forEach(n => n.classList.remove("active"));
    nav.classList.add("active");
  });
});

/* ===========================
   TYPING ANIMATION
=========================== */

const texts = [
  "Web Developer",
  "JavaScript Lover",
  "UI Designer"
];

const typingSpeed = 100;
const deletingSpeed = 60;
const delayAfterTyping = 800;

let span = document.getElementById("typing");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function resetTyping() {
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;
  if (span) span.textContent = "";
}

function typeLoop() {
  if (!span) {
    setTimeout(typeLoop, 300);
    return;
  }

  const currentText = texts[textIndex];

  if (!isDeleting) {
    span.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), delayAfterTyping);
    }
  } else {
    span.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
}

// Lancer l'animation typing
typeLoop();
