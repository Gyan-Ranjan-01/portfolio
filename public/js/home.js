window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 150);
});

window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function showSection(sectionId) {
  var sections = document.querySelectorAll("section");
  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  var navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  event.target.classList.add("active");
  document.getElementById("navLinks").classList.remove("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

document.addEventListener("click", function (e) {
  var navLinks = document.getElementById("navLinks");
  var menuBtn = document.querySelector(".mobile-menu-btn");
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});