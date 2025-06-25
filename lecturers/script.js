import LecturersService from "../src/services/lecturers.service.js";
// history.pushState({}, "", "/lecturers");

// Navbar elements
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Lecture Page elements
const lecturersSection = document.getElementById("lecturers");
const lecturersHomeSection = document.getElementById("lecturersHome");
const profilesSection = document.getElementById("profiles");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const currentPageSpan = document.getElementById("currentPage");
const maxPageSpan = document.getElementById("maxPage");
const pagination = document.getElementById("pagination");

// Navbar
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("invisible");
  mobileMenu.classList.toggle("visible");
  mobileMenu.classList.toggle("mb-72");
});

// colors for cards and profiles
const colors = ["#cc4541", "#44597a", "#a26702", "#387b88"];

// CARDS
let lecturersCards = (lecturers) => {
  lecturers.forEach((lecturer) => {
    let html = `<article
            id=${lecturer.id} 
            class="relative w-60 h-100 transform transition duration-300 md:hover:scale-105 cursor-pointer"
          >
            <img
              src="${lecturer.photoUrl}"
              class="relative w-60 h-80 object-cover rounded-lg z-10"
              alt="${lecturer.fullName}"
              style="box-shadow: 8px 8px 10px ${
                colors[Number(lecturer.id) - 1]
              }"
            />
            <div class="text-center relative top-5">
              <p
                class="text-[${
                  colors[Number(lecturer.id) - 1]
                }] text-base md:text-lg lg:text-xl leading-relaxed"
              >
                ${lecturer.fullName.toUpperCase()}
              </p>
              <p>${lecturer.role}</p>
            </div>
          </article>`;
    lecturersSection.innerHTML += html;
  });
  // CARD EVENTS
  let articles = lecturersSection.getElementsByTagName("ARTICLE");
  for (let article of articles) {
    article.addEventListener("click", (e) => {
      const lecturerId = e.currentTarget.id;
      const foundLecturer = LecturersService.getById(lecturerId);
      if (foundLecturer) {
        history.pushState({ id: lecturerId }, null, `?id=${lecturerId}`);
        profilesSection.style.display = "flex";
        lecturersHomeSection.style.display = "none";
        window.scrollTo({ top: 0, behavior: "smooth" });
        getLecturerProfile(foundLecturer);
      }
      console.log(LecturersService.getById(e.currentTarget.id));
    });
  }
};

// PROFILES
export function getLecturerProfile(lecturer) {
  let lecturerHTML = `<article
        id="profile${lecturer.id}" "
        class="flex flex-col md:flex-row justify-center gap-5 m-8 md:m-20 -mt-64"
      >
        <section class="md:absolute md:left-8 lg:left-32 justify-items-center">
          <img
            src="${lecturer.photoUrl}"
            class="md:w-72 md:h-72 w-40 h-40 md:mx-auto object-cover rounded-full border-4 border-[${
              colors[Number(lecturer.id) - 1]
            }]"
            alt="${lecturer.fullName}"
          />
          <div class="relative top-5 text-center">
            <p
              class="text-[${
                colors[Number(lecturer.id) - 1]
              }] text-xl md:text-2xl lg:text-3xl leading-relaxed"
            >
              ${lecturer.fullName.toUpperCase()}
            </p>
            <p class="text-[#1E1E1E]">${lecturer.role}</p>
            <div class="grid justify-items-start gap-2 mt-4 justify-center">
              <div class="flex flex-row justify-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/qa-codecademy/sp2025-cp01-lbf-1/refs/heads/main/src/img/mail%20(1).png"
                  alt="mail"
                  class="md:w-6 md:h-6 w-4 h-4"
                />
                <p class="relative text-[#2196F3] text-sm">example@email.com</p>
              </div>
              <div class="flex flex-row justify-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/qa-codecademy/sp2025-cp01-lbf-1/refs/heads/main/src/img/linkedin.png"
                  alt="linkedin"
                  class="md:w-6 md:h-6 w-4 h-4"
                />
                <p class="relative text-[#2196F3] text-sm">
                  <a
                    href="${lecturer.linkedInUrl}"
                    target="_blank"
                    >${lecturer.fullName}</a
                  >
                </p>
              </div>
          </div>
          <nav class="my-10 flex justify-center text-[${
            colors[Number(lecturer.id) - 1]
          }] text-left">
            <ul>
              <li
                class="pb-3 hover:scale-105 transition transform duration-300"
              >
                <a href="#biography${lecturer.id}" class="hover:text-[#1E1E1E]"
                  >Биографија</a
                >
              </li>
              <li
                class="pb-3 hover:scale-105 transition transform duration-300"
              >
                <a href="#education${lecturer.id}" class="hover:text-[#1E1E1E]"
                  >Образование</a
                >
              </li>
              <li
                class="pb-3 hover:scale-105 transition transform duration-300"
              >
                <a href="#career${
                  lecturer.id
                }" class="hover:text-[#1E1E1E]">Кариера</a>
              </li>
              <li
                class="pb-3 hover:scale-105 transition transform duration-300"
              >
                <a href="#programs${
                  lecturer.id
                }" class="hover:text-[#1E1E1E]">Програми</a>
              </li>
            </ul>
          </nav>
        </section>
        <section
          class="flex flex-wrap justify-center md:gap-32 md:ml-72 lg:ml-96 gap-24"
        >
          <!-- БИОГРАФИЈА -->
          <section
            id="biography${lecturer.id}"
            class="w-full max-w-[800px] min-w-[200px] rounded-3xl bg-white scroll-mt-20 lg:scroll-mt-32 mx-auto"
          >
            <div class="flex flex-row m-4 flex-wrap">
              <img
                src="https://raw.githubusercontent.com/qa-codecademy/sp2025-cp01-lbf-1/refs/heads/main/src/img/writer${
                  lecturer.id
                }.png"
                alt="writer"
                class="md:w-10 md:h-10 mt-1 w-8 h-8 relative left-5"
              />
              <h1
                class="relative left-5 ml-4 mt-2 text-[${
                  colors[Number(lecturer.id) - 1]
                }] text-lg md:text-xl lg:text-2xl align-center"
              >
                БИОГРАФИЈА
              </h1>
            </div>

            <div class="m-8 text-[#1E1E1E] md:text-lg text-sm">
             ${lecturer.biography}
            </div>
          </section>
          <!-- ОБРАЗОВАНИЕ -->
          <section
            id="education${lecturer.id}"
            class="w-full max-w-[800px] min-w-[200px] rounded-3xl bg-white scroll-mt-20 gap-10 lg:scroll-mt-32 mx-auto"
          >
            <div class="flex flex-row m-4 flex-wrap">
              <img
                src="https://raw.githubusercontent.com/qa-codecademy/sp2025-cp01-lbf-1/refs/heads/main/src/img/mortarboard${
                  lecturer.id
                }.png"
                alt="mortarboard"
                class="md:w-10 md:h-10 mt-1 w-8 h-8 relative left-5"
              />
              <h1
                class="relative left-5 ml-4 mt-2 text-[${
                  colors[Number(lecturer.id) - 1]
                }] text-lg md:text-xl lg:text-2xl align-center"
              >
                ОБРАЗОВАНИЕ
              </h1>
            </div>`;
  lecturerHTML += lecturer.education
    .map((education) => {
      return `<section class="m-10 text-[#1E1E1E] flex flex-col flex-wrap">

              <div class="w-auto text-left">${education.period}</div>
              <div class="max-w-[600px]">
                ${education.institution} <br />
                ${education.degree} <br />
                ${education.notes || ""}
              </div>
            </section>`;
    })
    .join("");
  lecturerHTML += `
          </section>
          <!-- КАРИЕРА -->
          <section
            id="career${lecturer.id}"
            class="w-full max-w-[800px] min-w-[200px] rounded-3xl bg-white scroll-mt-20 lg:scroll-mt-32 mx-auto"
          >
            <div class="flex flex-row m-4 flex-wrap">
              <img
                src="https://raw.githubusercontent.com/qa-codecademy/sp2025-cp01-lbf-1/refs/heads/main/src/img/career${
                  lecturer.id
                }.png"
                alt="career"
                class="md:w-10 md:h-10 mt-1 w-8 h-8 relative left-5"
              />
              <h1
                class="relative left-5 ml-4 mt-2 text-[${
                  colors[Number(lecturer.id) - 1]
                }] text-lg md:text-xl lg:text-2xl align-center"
              >
                КАРИЕРА
              </h1>
            </div>
            `;
  lecturerHTML += lecturer.career
    .map((career) => {
      return `<section class="m-10 text-[#1E1E1E] flex flex-col flex-wrap">
              <div class="w-auto text-left">${career.period}</div>
              <div class="max-w-[600px]">
                ${career.position} - ${career.company}
              </div>
            </section>`;
    })
    .join("");

  lecturerHTML += `
          </section>
          <!-- ПРОГРАМИ -->
          <section
            id="programs${lecturer.id}"
            class="w-full max-w-[800px] min-w-[200px] rounded-3xl bg-white scroll-mt-20 lg:scroll-mt-32 mx-auto"
          >
            <div class="flex flex-row m-4 flex-wrap">
              <img
                src="https://raw.githubusercontent.com/qa-codecademy/sp2025-cp01-lbf-1/refs/heads/main/src/img/notebook${
                  lecturer.id
                }.png"
                alt="notebook"
                class="md:w-10 md:h-10 mt-1 w-8 h-8 relative left-5"
              />
              <h1
                class="relative left-5 ml-4 mt-2 text-[${
                  colors[Number(lecturer.id) - 1]
                }] text-lg md:text-xl lg:text-2xl align-center"
              >
                ПРОГРАМИ
              </h1>
            </div>
            <div class="m-10 text-[#1E1E1E]">
              <p class="pb-3">Предавач на следните програми:</p>`;

  lecturerHTML += lecturer.programs.map((program) => {
    return `<p>
              <span class="text-[${colors[Number(lecturer.id) - 1]}]">
                <a href="../programs/index.html">${program.title} </a>
              </span><span> ${program.ageGroup}</span>
              <span class="text-sm">${program.description}</span>
            </p>`;
  });
  lecturerHTML += ` </div>
          </section>
        </section>
      </article>`;

  profilesSection.innerHTML = lecturerHTML;
}

// PAGINATION

let currentPageGobal = 1;

function renderPage(page) {
  const { totalPages, currentPage, data, totalLecturers } =
    LecturersService.getAll({ page });
  currentPageSpan.innerText = currentPage;
  maxPageSpan.innerText = totalPages;
  currentPageGobal = currentPage;
  lecturersSection.innerHTML = "";
  lecturersCards(data);
  if (totalLecturers <= 4) {
    pagination.style.display = "none";
  } else {
    pagination.style.display = "flex";
  }
}

// RENDERING CARDS
renderPage(currentPageGobal);
prevBtn.addEventListener("click", () => {
  if (currentPageGobal > 1) {
    currentPageGobal--;
    renderPage(currentPageGobal);
  }
});

nextBtn.addEventListener("click", () => {
  let { totalPages } = LecturersService.getAll();

  if (currentPageGobal < totalPages) {
    currentPageGobal++;
    renderPage(currentPageGobal);
  }
});

// EVENTS
// Run this on page load
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get("id");

  if (idFromUrl) {
    const lecturer = LecturersService.getById(idFromUrl);
    if (lecturer) {
      profilesSection.style.display = "flex";
      lecturersHomeSection.style.display = "none";
      getLecturerProfile(lecturer);
    }
  }
});

// Handle back/forward navigation
window.addEventListener("popstate", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get("id");

  if (idFromUrl) {
    const lecturer = LecturersService.getById(idFromUrl);
    if (lecturer) {
      profilesSection.style.display = "flex";
      lecturersHomeSection.style.display = "none";
      getLecturerProfile(lecturer);
    }
  } else {
    profilesSection.style.display = "none";
    lecturersHomeSection.style.display = "block";
  }
});

//Used for smoother loading of the lecturers personal profiles
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get("id");

  if (idFromUrl) {
    const lecturer = LecturersService.getById(idFromUrl);
    if (lecturer) {
      profilesSection.style.display = "flex";
      lecturersHomeSection.style.display = "none";
      getLecturerProfile(lecturer);
    }
  } else {
    profilesSection.style.display = "none";
    lecturersHomeSection.style.display = "block";
  }
});
