import PROGRAMS from "../data/program.data.js";

export default class ProgramService {
  static getAll(filters = {}) {
    const {
      name,
      PriceFrom,
      PriceTo,
      instructors = [],
      sortBy,
      age,
      direction = "asc",
      ProgramsPerPage = 3,
    } = filters;

    const storedData = localStorage.getItem("programs");
    if (!storedData) {
      localStorage.setItem("programs", JSON.stringify(PROGRAMS));
      return {
        data: [],
        currentPage: 1,
        totalPrograms: 0,
        totalPages: 0,
      };
    }

    // Парсирање на Data

    let parsedData;
    try {
      parsedData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {
        data: [],
        currentPage: 1,
        totalPrograms: 0,
        totalPages: 0,
      };
    }

    // Додавање на shortDescription

    parsedData.forEach(
      (program) =>
        (program.shortDescription = program.description.slice(0, 155))
    );

    // Филтри за програми

    if (name) {
      parsedData = parsedData.filter((program) =>
        program.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (PriceFrom) {
      parsedData = parsedData.filter((program) => program.price >= PriceFrom);
    }
    if (PriceTo) {
      parsedData = parsedData.filter((program) => program.price <= PriceTo);
    }
    if (instructors.length > 0) {
      parsedData = parsedData.filter((program) =>
        instructors.some((instructor) =>
          program.instructors.includes(instructor)
        )
      );
    }
    if (age) {
      parsedData = parsedData.filter(
        (program) => age >= program.ageRange.from && age <= program.ageRange.to
      );
    }

    // Сортирање на Програми

    if (sortBy === "name") {
      parsedData.sort((a, b) => {
        if (direction === "asc") {
          return a.name.localeCompare(b.name, "mk", { sensitivity: "base" });
        } else if (direction === "desc") {
          return b.name.localeCompare(a.name, "mk", { sensitivity: "base" });
        }
      });
    } else if (sortBy === "price") {
      parsedData.sort((a, b) => {
        if (direction === "asc") {
          return a.price - b.price;
        } else if (direction === "desc") {
          return b.price - a.price;
        }
      });
    }

    // Пагинација на Програми

    const page = 1;
    const totalPrograms = parsedData.length;
    const totalPages = Math.ceil(totalPrograms / ProgramsPerPage);
    const startPagination = (page - 1) * ProgramsPerPage;
    const endPagination = startPagination + ProgramsPerPage;
    const paginationData = parsedData.slice(startPagination, endPagination);

    return {
      data: paginationData,
      currentPage: page,
      totalPrograms: totalPrograms,
      totalPages: totalPages,
    };
  }

  static getById(programId, charSlice) {
    const programs = ProgramService.getAll();

    const id = programId.toString();

    const foundProgram = programs.find((program) => program.id === id);
    if (!foundProgram) {
      throw new Error("Program was not found.");
    }
    foundProgram.shortDescription = foundProgram.description.slice(
      0,
      charSlice
    );

    return foundProgram;
  }
  static createProgram(program) {
    const programs = JSON.parse(localStorage.getItem("programs")) || [];
    program.id = (programs.length + 1).toString();
    programs.push(program);
    localStorage.setItem("programs", JSON.stringify(programs));
    return "Успешно креирана програма";
  }

  static updateProgram(programId, program) {
    const id = programId.toString();
    const programs = JSON.parse(localStorage.getItem("programs"));
    if (!programs) {
      return "Проблем во земање на програмите";
    }
    const programIndex = programs.findIndex((program) => program.id === id);
    if (programIndex === -1) {
      return "Програмата која сакаш да ја смениш не постои";
    }
    program.id = id;
    programs[programIndex] = { ...programs[programIndex], ...program };
    localStorage.setItem("programs", JSON.stringify(programs));
    return "Успешно апдејтирана програма";
  }

  static deleteProgram(programId) {
    const id = programId.toString();
    const programs = JSON.parse(localStorage.getItem("programs"));
    if (!programs) {
      return "Проблем во земање на програмите";
    }
    const filteredPrograms = programs.filter((program) => program.id !== id);
    if (filteredPrograms.length === programs.length) {
      return "Програмата не постои";
    }
    localStorage.setItem("programs", JSON.stringify(filteredPrograms));
    return "Успешно избришана програма";
  }
}
