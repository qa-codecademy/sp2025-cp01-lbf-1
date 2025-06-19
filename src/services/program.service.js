import PROGRAMS from "../data/program.data.js";

export default class ProgramService {
  static getAll(filters = {}) {
    const {
      name,
      PriceFrom,
      PriceTo,
      instructors = [],
      sortBy,
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

    const page = 2;
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
    foundProgram.shortDescription = foundProgram.description.slice(
      0,
      charSlice
    );
    if (!foundProgram) {
      throw new Error("Program was not found.");
    }

    return foundProgram;
  }
}
