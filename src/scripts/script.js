import LecturersService from "../services/lecturers.service.js";
import ProgramService from "../services/program.service.js";

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("invisible");
  mobileMenu.classList.toggle("visible");
  mobileMenu.classList.toggle("mb-96");;
});

const programImages = [
  "./src/img/business-kids(6-9 years).jpg",
  "./src/img/business-kids(10-14 years).jpg",
  "./src/img/business-kids(15-18 years).jpg",
];
const programColors = ["#CC4541", "#A26702", "#44597A"];
const cardsContainer = document.getElementById("programSection");
const programs = ProgramService.getAll().data;
programs.forEach((program, index) => {
  const color = programColors[index];
  const image = programImages[index];
  const article = document.createElement("article");
  article.className = `rounded-[35px] w-[22rem] h-[25rem] flex flex-col bg-[${color}] justify-center items-center duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`;
  article.innerHTML = `
    <div class="relative mt-2" id="image${program.id}">
      <img
        class="w-[21.4rem] h-[12rem] rounded-[35px] z-0"
        src="${image}"
        alt="${program.name} image"
      />
      <div
        class="absolute top-2 right-3 z-10 bg-[${color}] w-[7.5rem] h-[2rem] rounded-[35px] text-xs flex justify-center items-center "
        id="program${program.id}-ageLimit"
      ></div>
    </div>
    <div class="text-center mt-2 mb-2">
      <h3 class="mb-1 text-xl" id="program${program.id}-title"></h3>
      <p style="font-family: 'M PLUS Rounded 1c', sans-serif" class="text-xs font-[M_PLUS_Rounded_1c] leading-5 mx-5 font-[500] tracking-wide" id="program${program.id}-description"></p>
      <button id="btn-${program.id}">▼</button>
    </div>
    <div class="flex items-center gap-24 mb-4 mt-2 text-xs">
      <p id="program${program.id}-price"></p>
      <a href="../../contact/index.html" class="bg-white rounded-[35px] text-[${color}] w-[7.3rem] h-[2rem] flex justify-center items-center">
        ПРИЈАВИ СЕ
      </a>
    </div>
  `;
  cardsContainer.appendChild(article);
  displayProgram(program.id, program);
});
function displayProgram(programId, program) {
  document.getElementById(`program${programId}-title`).innerText =
    program.name.toUpperCase();
  let expanded = false;
  const btn = document.getElementById(`btn-${programId}`);
  const descriptionElement = document.getElementById(
    `program${programId}-description`
  );
  const image = document.getElementById(`image${programId}`);
  const shortDescription = (descriptionElement.innerText =
    program.shortDescription + "...");
  btn.addEventListener("click", () => {
    expanded = !expanded;
    descriptionElement.innerText = expanded
      ? program.description
      : shortDescription;
    btn.innerText = expanded ? "▲" : "▼";
    image.style.display = expanded ? "none" : "block";
  });
  document.getElementById(`program${programId}-price`).innerText =
    "MKD " +
    program.price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  document.getElementById(`program${programId}-ageLimit`).innerText =
    program.forWho
      .replace(
        `program${programId}` === "program3" ? "за млади од" : "за деца од",
        ""
      )
      .replace("до", "-");
}

// Lecturers
const { data: lecturers } = LecturersService.getAll();

const lecturersData = lecturers.map(({ id, fullName, photoUrl, role }) => ({
  id,
  fullName,
  photoUrl,
  role,
}));

const lecturersDiv = document.getElementById("lecturersCards");

// Colors
const colors = ["#cc4541", "#44597a", "#a26702", "#387b88"];

lecturersData.forEach((lecturer) => {
  let html = `
  <div class="flex justify-center ">
    <div class="w-60 text-center">
      <img
        src="${lecturer.photoUrl}"
        alt="${lecturer.fullName}"
        class="w-60 h-60 object-cover rounded-full border-4 border-[${
          colors[Number(lecturer.id) - 1]
        }] mx-auto"
      />
      <div class="mt-5">
      <p class="text-[${
        colors[Number(lecturer.id) - 1]
      }] text-lg lg:text-2xl font-bold">
        ${lecturer.fullName.toUpperCase()}
      </p>
      <p class="font-bold text-sm mt-1">${lecturer.role}</p>
     </div>
    </div>
    </div>
  `;
  lecturersDiv.innerHTML += html;
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
