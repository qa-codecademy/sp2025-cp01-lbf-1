import ProgramService from "../services/program.service.js";

// Fetch all programs from the service
let allPrograms = ProgramService.getAll().data;

// Images and colors for each program
const programImages = [
  "./img/business-kids(6-9 years).jpg",
  "./img/business-kids(10-14 years).jpg",
  "./img/business-kids(15-18 years).jpg",
];
const programColors = ["#CC4541", "#A26702", "#44597A"];

// Section where cards will be shown
const cardsContainer = document.getElementById("programSection");

// Show all programs as cards
function displayPrograms(programs) {
  cardsContainer.innerHTML = ""; 

  //[21.4rem]

  programs.forEach((program) => {
    const color = programColors[program.id - 1];
    const image = programImages[program.id - 1];

    const article = document.createElement("article");
    article.className = `rounded-[35px] w-4/4 [@media(min-width:410px)]:w-[22rem] h-[25rem] flex flex-col bg-[${color}] justify-center items-center duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`;
    article.id = program.id;

    // Adding content to the card
    article.innerHTML = `
      <div class="relative mt-2" id="image${program.id}">
        <img class="w-4/4 [@media(min-width:410px)]:w-[21.4rem] h-[12rem] rounded-[35px] z-0"
             src="${image}"
             alt="${program.name} image" />
        <div class="absolute top-2 right-3 z-10 bg-[${color}] w-[7.5rem] h-[2rem] rounded-[35px] text-xs flex justify-center items-center"
             id="program${program.id}-ageLimit"></div>
      </div>

      <div class="text-center mt-2 mb-2">
        <h3 class="mb-1 text-xl" id="program${program.id}-title"></h3>
        <p class="text-xs leading-5 mx-5 font-[500] tracking-wide"
           id="program${program.id}-description"
           style="font-family: 'M PLUS Rounded 1c', sans-serif"></p>
        <button id="btn-${program.id}">▼</button>
      </div>

      <div class="flex items-center gap-24 mb-4 mt-2 text-xs">
        <p id="program${program.id}-price"></p>
        <a href="#" class="bg-white rounded-[35px] text-[${color}] w-[7.3rem] h-[2rem] flex justify-center items-center">
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

    if (programId === "2") {
      /*document
          .getElementById("description-div")
          .classList.toggle("mt-7", expanded);*/
      document
        .getElementById("btn-2")
        .classList.toggle("mt-5", expandedDescription);
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

// Add program names
function assigningPrograms(program) {
  const programOptionValue = program.name.toLowerCase().replace(/\s+/g, "-");

  let programOptions = `
    <option value="${programOptionValue}">${program.name}</option>
  `;

  const programSelect = document.getElementById("programSelect");
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

assigningInstructors();

// Track selected instructors
let selectedInstructors = [];

const checkboxes = document.querySelectorAll('input[name="instructor"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    let instructor = e.target.value;

    if (!selectedInstructors.includes(instructor)) {
      selectedInstructors.push(instructor);
    } else {
      selectedInstructors = selectedInstructors.filter(
        (name) => name !== instructor
      );
    }
  });
})

allPrograms.forEach(assigningPrograms);

// for (let program of allPrograms) {
//   assigningPrograms(program);
// }

// Sort option values
let sortBy, direction;

const sortOptions = {
  sortByNameAsc: { sortBy: "name", direction: "asc" },
  sortByNameDesc: { sortBy: "name", direction: "desc" },
  sortByPriceAsc: { sortBy: "price", direction: "asc" },
  sortByPriceDesc: { sortBy: "price", direction: "desc" },
};

// Change sort value
document.getElementById("programSortSelect").addEventListener("change", (e) => {
  const selected = sortOptions[e.target.value];

  if (selected) {
    ({ sortBy, direction } = selected);
  }
});

// Reset inputs on page load
const programSortSelect = document.getElementById("programSortSelect");

const selectedProgramValue = programSortSelect.value; 
const selected = sortOptions[selectedProgramValue];

if (selected) {
  ({ sortBy, direction } = selected);
}

document.getElementById("priceFromInput").value = "";
document.getElementById("priceToInput").value = "";
document.getElementById("ageInput").value = "";


// When user clicks filter button
document.getElementById("filterBtn").addEventListener("click", () => {
  const programSelect = document.getElementById("programSelect");
  let selectedValue = programSelect.value.replace(/-/g, " ");
  if (selectedValue === "програма") {
    selectedValue = "";
  }

  let priceFrom = document.getElementById("priceFromInput").value;
  let priceTo = document.getElementById("priceToInput").value;
  let ageNum = document.getElementById("ageInput").value;

  // Get filtered programs
  let filteredPrograms = ProgramService.getAll({
    name: selectedValue,
    PriceFrom: priceFrom,
    PriceTo: priceTo,
    instructors: selectedInstructors,
    sortBy: sortBy,
    age: ageNum,
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
  const programSection = document.getElementById("programSection");

  let layoutClass =
    "grid gap-20 px-6 lg:px-24 text-white mt-16 tracking-wide justify-items-center";

  if (filteredPrograms.length === 1) {
    layoutClass += "grid-cols-1";
  } else if (filteredPrograms.length === 2) {
    layoutClass += "grid-cols-1 md:grid-cols-2";
  } else {
    layoutClass += "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  }

  programSection.className = layoutClass;

  // Show new results
  displayPrograms(filteredPrograms);
});

