"use strict";

const nav = document.querySelector(".header__nav");
const footerNav = document.querySelector(".footer__nav");
const header = document.querySelector(".header");
const headerAboutButton = document.querySelector(".header__about-link");
const aboutContactButton = document.querySelector(".about-box__btn-contact");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hamburgerNavList = document.querySelector(".hamburger__nav-list");
const overlay = document.querySelector(".overlay");

const aboutSkill = document.querySelector(".skilex__btn--skill");
const aboutExperience = document.querySelector(".skilex__btn--experience");
const skillsBox = document.querySelector(".skilex__skills-box");

aboutSkill.addEventListener("click", function () {
  this.classList.add("skilex__btn--active");
  aboutExperience.classList.remove("skilex__btn--active");
  skillsBox.classList.remove("hidden");
});

aboutExperience.addEventListener("click", function () {
  this.classList.add("skilex__btn--active");
  aboutSkill.classList.remove("skilex__btn--active");
  skillsBox.classList.add("hidden");
});

// const designation = document.querySelector('.header__designaton');

const text = baffle(".header__designation");
text.set({
  characters: "█▓▒░█▓▒░█▓▒░<>/",
  speed: 50,
});

text.start();
text.reveal(5000);

// ------------------ SMOOTH SCROLLING ------------------- //

const scrollTo = function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
};

nav.addEventListener("click", scrollTo);
footerNav.addEventListener("click", scrollTo);
headerAboutButton.addEventListener("click", scrollTo);
aboutContactButton.addEventListener("click", scrollTo);

// ------------------------------------------------------- //

// ------------------ STICKY NAVIGATION ------------------ //

const footer = document.querySelector(".footer");

const sticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${75}px`,
});

headerObserver.observe(header);
headerObserver.observe(footer);

// ------------------------------------------------------- //

// -------------------- SECTION REVEAL ------------------- //

const hiddenSections = document.querySelectorAll(".section-to-hide");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const hiddenSectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  // rootMargin: "20px",
});

hiddenSections.forEach((section) => {
  hiddenSectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// ------------------------------------------------------- //

// ------------------ NAV LINK ACTIVATION ---------------- //

const sections = document.querySelectorAll("section");

const activate = function (entries) {
  entries.forEach((entry) => {
    const navClassTail =
      entry.target === header ? "home" : entry.target.id.split("-")[1];
    const navLink = document.querySelector(
      `.header__nav-link--${navClassTail}`
    );
    if (entry.isIntersecting) {
      navLink.classList.add("header__nav-link--active");
    } else {
      navLink.classList.remove("header__nav-link--active");
    }
  });
};

const sectionObserver = new IntersectionObserver(activate, {
  root: null,
  threshold: 0,
  rootMargin: "-50%",
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  sectionObserver.observe(header);
});

// -------------------------------------------------------- //

// --------------------- HAMBURGER MENU ------------------- //

hamburgerBtn.addEventListener("click", function () {
  this.classList.toggle("open");
});

hamburgerNavList.addEventListener("click", function (e) {
  if (e.target.classList.contains("hamburger__nav-link")) {
    hamburgerBtn.classList.remove("open");
  }
});

overlay.addEventListener("click", function () {
  hamburgerBtn.classList.remove("open");
});

// ------------------------------------------------------- //
