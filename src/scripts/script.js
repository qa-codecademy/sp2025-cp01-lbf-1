import LecturersService from "../services/lecturers.service.js";
import ProgramService from "../services/program.service.js";

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("invisible");
  mobileMenu.classList.toggle("visible");
  mobileMenu.classList.toggle("mb-96");
});

//Search functionality with the lecturers/programs (The programs need to be commited to the main in order to finish the redirecting to the program cards when clicked in the input bar)
const searchBar = document.getElementById("search");
const dataList = document.getElementById("search-list");

searchBar.addEventListener("keyup", (event) => {
  const inputValue = event.target.value.trim();
  const lecturers = LecturersService.search(inputValue);
  const programs = ProgramService.search(inputValue);

  if (lecturers.length || programs.length) {
    dataList.style.display = "block";
  }

  dataList.innerHTML = "";

  lecturers.forEach((lecturer) => {
    dataList.innerHTML += `<li class="search-option cursor-pointer hover:text-blue-400 pl-2 py-1" data-id=${lecturer.id} data-type="lecturer" value=${lecturer.fullName}>${lecturer.fullName}</li>`;
  });

  programs.forEach((program) => {
    dataList.innerHTML += `<li class="search-option cursor-pointer hover:text-blue-400 pl-2 py-1" data-id=${program.id} data-type="program" value=${program.name}>${program.name}</li>`;
  });

  const searchOptions = document.getElementsByClassName("search-option");

  Array.from(searchOptions).forEach((option) => {
    option.addEventListener("click", openSearchOption);
  });
});

function openSearchOption(event) {
  if (event.target.dataset.type === "lecturer") {
    window.location.href = `/lecturers/?id=${event.target.dataset.id}`;

    dataList.innerHTML = "";
    dataList.style.display = "none";
    searchBar.value = null;
  } else {
    
  }
}
