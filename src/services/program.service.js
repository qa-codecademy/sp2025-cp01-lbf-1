import PROGRAMS from "../data/program.data.js";

export default class ProgramService {
  static getAll() {
    const storedData = localStorage.getItem("programs");

    if (!storedData) {
      localStorage.setItem("programs", JSON.stringify(PROGRAMS));
      return [];
    }

    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  }

  static getById(id) {
    const programs = ProgramService.getAll();
    const foundProgram = programs.find((program) => program.id === id);

    if (!foundProgram) {
      throw new Error("Program was not found.");
    }

    return foundProgram;
  }

  static sortPrograms(direction, sortBy) {
    const programs = ProgramService.getAll();
    let sorted = [];
    if (sortBy === "name") {
      if (direction === "asc") {
        sorted = [...programs].sort((a, b) =>
          a.name.localeCompare(b.name, "mk", { sensitivity: "base" })
        );
      } else if (direction === "desc") {
        sorted = [...programs].sort((a, b) =>
          b.name.localeCompare(a.name, "mk", { sensitivity: "base" })
        );
      }
    } else if (sortBy === "price") {
      if (direction === "asc") {
        sorted = [...programs].sort((a, b) => a.price - b.price);
      } else if (direction === "desc") {
        sorted = [...programs].sort((a, b) => b.price - a.price);
      }
    } else {
      sorted = programs;
    }
    localStorage.setItem("programs", JSON.stringify(sorted));
    return sorted;
  }
}

// ProgramService.getAll();
// ProgramService.sortPrograms("desc", "price");
