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

  static getById(programId) {
    const programs = ProgramService.getAll();

    const id = programId.toString();

    const foundProgram = programs.find((program) => program.id === id);

    if (!foundProgram) {
      throw new Error("Program was not found.");
    }

    return foundProgram;
  }

  static generateShortDescription(charNum, programId) {
    const id = programId.toString();

    const program = this.getById(id);

    program.shortDescription = program.description.slice(0, charNum);

    return program.shortDescription;
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
// ProgramService.getById(2);
// ProgramService.sortPrograms("desc", "price");
// ProgramService.generateShortDescription(150, 2);
