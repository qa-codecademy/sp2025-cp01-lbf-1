import LecturersService from "../services/lecturers.service.js";
import ProgramService from "../services/program.service.js";

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("invisible");

  if (isHidden) {
    mobileMenu.classList.remove("opacity-0", "invisible");
    mobileMenu.classList.add("opacity-100", "visible");
  } else {
    mobileMenu.classList.remove("opacity-100", "visible");
    mobileMenu.classList.add("opacity-0", "invisible");
  }
});

const programImages = [
  "./src/img/business-kids(6-9 years).jpg",
  "./src/img/business-kids(10-14 years).jpg",
  "./src/img/business-kids(15-18 years).jpg",
];
const programColors = ["#CC4541", "#A26702", "#44597A"];
const cardsContainer = document.getElementById("programSection");
const programs = ProgramService.getAll().data;
function displayPrograms(programs) {
  cardsContainer.innerHTML = "";

  programs.forEach((program, index) => {
    const color = programColors[program.id - 1];
    const image = programImages[program.id - 1];

    const article = document.createElement("article");
    article.className = `bg-[${color}] text-sm flex flex-col justify-center items-center duration-500 ease-in-out hover:scale-105 hover:shadow-2xl rounded-[35px] [@media(min-width:410px)]:w-[22rem] `;
    article.id = program.id;

    if (programs.length === 3 && index === programs.length - 1) {
      article.classList.add(
        "md:col-span-2",
        "[@media(min-width:1180px)]:col-span-1"
      );
    }

    // Adding content to the card
    article.innerHTML = `
      <div class="relative mt-1" id="image${program.id}">
        <img class="w-full flex items-center h-[12rem] px-1 rounded-[35px] z-0"
          src="${image}"
          alt="${program.name} image" 
        />

        <div class="absolute top-2 right-3 z-10 px-3 py-2 bg-[${color}] rounded-[35px] flex justify-center items-center"
          id="program${program.id}-ageLimit"></div>
      </div>

      <div class="text-center my-2">
        <h3 class="mb-1 text-xl" id="program${program.id}-title"></h3>

        <p class="text-center leading-5 px-4 font-[500]"
          id="program${program.id}-description"
          style="font-family: 'M PLUS Rounded 1c', sans-serif">
        </p>

        <button id="btn-${program.id}" class="text-base">▼</button>
      </div>

      <div class="flex items-center flex-nowrap mb-4 mt-2 mx-4 flex-col gap-3 [@media(min-width:410px)]:flex-row [@media(min-width:410px)]:gap-20">
        <p id="program${program.id}-price"></p>

        <a href="../contact/index.html" class="bg-white rounded-[35px] text-[${color}] px-3 py-1.5">
          ПРИЈАВИ СЕ
        </a>
      </div>
    `;
    cardsContainer.appendChild(article);
    addProgramContent(program.id, program);
  });
}
displayPrograms(programs)

function addProgramContent(programId, program) {
  document.getElementById(`program${programId}-title`).innerText =
    program.name.toUpperCase();

  let expandedDescription = false;
  const showDescriptionBtn = document.getElementById(`btn-${programId}`);
  const descriptionElement = document.getElementById(
    `program${programId}-description`
  );
  const image = document.getElementById(`image${programId}`);
  const shortDescription = (descriptionElement.innerText =
    program.shortDescription + "...");

  // Toggle full/short description on click
  showDescriptionBtn.addEventListener("click", () => {
    expandedDescription = !expandedDescription;

    descriptionElement.innerText = expandedDescription
      ? program.description
      : shortDescription;

    showDescriptionBtn.innerText = expandedDescription ? "▲" : "▼";

    image.style.display = expandedDescription ? "none" : "block";

    

    const article = document.querySelector("article");

    if (expandedDescription) {
      article.classList.add("h-auto");
    } else {
      article.classList.remove("h-auto");
    }
  });

  // Show program price
  document.getElementById(`program${programId}-price`).innerText =
    "MKD " +
    program.price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Show age range
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
