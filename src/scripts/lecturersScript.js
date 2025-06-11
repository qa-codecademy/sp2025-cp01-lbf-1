const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const profile01 = document.getElementById("profile01");
const profile02 = document.getElementById("profile02");
const profile03 = document.getElementById("profile03");
const profile04 = document.getElementById("profile04");
const card01 = document.getElementById("card01");
const card02 = document.getElementById("card02");
const card03 = document.getElementById("card03");
const card04 = document.getElementById("card04");
const cards = document.getElementById("lecturersHome");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("invisible");
  mobileMenu.classList.toggle("visible");
  mobileMenu.classList.toggle("mb-72");
});

card01.addEventListener("click", () => {
  profile01.style.display = "flex";
  cards.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
});
card02.addEventListener("click", () => {
  profile02.style.display = "flex";
  cards.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
});
card03.addEventListener("click", () => {
  profile03.style.display = "flex";
  cards.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
});
card04.addEventListener("click", () => {
  profile04.style.display = "flex";
  cards.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
});