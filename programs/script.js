import ProgramService from "../src/services/program.service.js";

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

// All programs from the service
let allPrograms = ProgramService.getAll().data;

// Images and colors for each program
const programImages = [
  "../src/img/business-kids(6-9 years).jpg",
  "../src/img/business-kids(10-14 years).jpg",
  "../src/img/business-kids(15-18 years).jpg",
];
const programColors = ["#CC4541", "#A26702", "#44597A"];

// Section where cards will be shown
const cardsContainer = document.getElementById("programSection");
const noResultsElement = document.getElementById("noResultsFound");

// Show all programs as cards
function displayPrograms(programs) {
  cardsContainer.innerHTML = "";

  if (programs.length === 0) {
    noResultsElement.classList.remove("hidden");
  } else {
    noResultsElement.classList.add("hidden");
  }

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

// Display programs
displayPrograms(allPrograms);

// Add program content
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

    const programDescription = document.getElementById(
      `program${program.id}-description`
    );

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

const programSelect = document.getElementById("programSelect");

// Add program names
function assigningPrograms(program) {
  const programOptionValue = program.name.toLowerCase().replace(/\s+/g, "-");

  let programOptions = `
    <option value="${programOptionValue}">${program.name}</option>
  `;

  programSelect.innerHTML += programOptions;
}

// Show instructor checkboxes
function assigningInstructors() {
  dropdownMenu.innerHTML = "";

  for (let program of allPrograms) {
    for (let instructorName of program.instructors) {
      let addInstructor = `
        <label class="flex items-center px-4 py-2 hover:bg-gray-200">
          <input type="checkbox" value="${instructorName}" class="mr-2" name="instructor"/>
          ${instructorName}
        </label>
      `;

      dropdownMenu.innerHTML += addInstructor;
    }
  }
}

// Toggle dropdown menu
const dropdownBtn = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

// Assigning instructors
assigningInstructors();

// Track selected instructors
let selectedInstructors = [];

const checkboxes = document.querySelectorAll('input[name="instructor"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    let clickedInstructor = e.target.value;

    if (!selectedInstructors.includes(clickedInstructor)) {
      selectedInstructors.push(clickedInstructor);
    } else {
      selectedInstructors = selectedInstructors.filter(
        (name) => name !== clickedInstructor
      );
    }
  });
});

// Assigning programs
allPrograms.forEach(assigningPrograms);

// Sort option values
let sortBy, direction;

const sortOptions = {
  sortByNameAsc: { sortBy: "name", direction: "asc" },
  sortByNameDesc: { sortBy: "name", direction: "desc" },
  sortByPriceAsc: { sortBy: "price", direction: "asc" },
  sortByPriceDesc: { sortBy: "price", direction: "desc" },
};

// Change sort value
const programSortSelect = document.getElementById("programSortSelect");

programSortSelect.addEventListener("change", (e) => {
  const selectedOption = sortOptions[e.target.value];

  if (selectedOption) {
    ({ sortBy, direction } = selectedOption);
  }
});

// Reset inputs on page load
const selectedProgramValue = programSortSelect.value;
const selectedOption = sortOptions[selectedProgramValue];

if (selectedOption) {
  ({ sortBy, direction } = selectedOption);
}

document.getElementById("priceFromInput").value = "";
document.getElementById("priceToInput").value = "";
document.getElementById("ageInput").value = "";

// When user clicks filter button
document.getElementById("filterBtn").addEventListener("click", () => {
  let programSelectedValue = programSelect.value.replace(/-/g, " ");
  if (programSelectedValue === "програми") {
    programSelectedValue = "";
  }

  dropdownMenu.classList.add("hidden");

  let priceFromInput = document.getElementById("priceFromInput").value;
  let priceToInput = document.getElementById("priceToInput").value;
  let ageInput = document.getElementById("ageInput").value;

  // Get filtered programs
  let filteredPrograms = ProgramService.getAll({
    name: programSelectedValue,
    PriceFrom: priceFromInput,
    PriceTo: priceToInput,
    instructors: selectedInstructors,
    sortBy: sortBy,
    age: ageInput,
    direction: direction,
  }).data;

  // Sort the programs
  if (sortBy === "name") {
    filteredPrograms.sort((a, b) =>
      direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  } else if (sortBy === "price") {
    filteredPrograms.sort((a, b) =>
      direction === "asc" ? a.price - b.price : b.price - a.price
    );
  } else {
    filteredPrograms.sort((a, b) =>
      direction === "asc" ? b.id - a.id : a.id - b.id
    );
  }

  // Set layout based on how many results
  cardsContainer.classList.remove(
    "grid-cols-1",
    "md:grid-cols-2",
    "[@media(min-width:1180px)]:grid-cols-3"
  );

  if (filteredPrograms.length === 1) {
    cardsContainer.classList.add("grid-cols-1");
  } else if (filteredPrograms.length === 2) {
    cardsContainer.classList.add("grid-cols-1", "md:grid-cols-2");
  } else {
    cardsContainer.classList.add(
      "grid-cols-1",
      "md:grid-cols-2",
      "[@media(min-width:1180px)]:grid-cols-3"
    );
  }

  // Show new results
  displayPrograms(filteredPrograms);
});
