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

// ProgramService.initializeStorage();

// ProgramService.update("123e4567-e89b-12d3-a456-426614174000", {
//   _name: "How To Create Stuff",
//   _dateFrom: "2026-07-05",
//   _dateTo: "2026-07-08",
//   _steps: 4,
//   _description: "Learn the agile framework for project management",
//   _instructors: ["Sirius Black"],
//   _price: 600,
//   dateCreated: 20,
// });

// // ProgramService.create({
// //   name: "How To Create More Stuff",
// //   dateFrom: "2026-07-05",
// //   dateTo: "2026-07-08",
// //   steps: 4,
// //   description: "Learn the agile framework for project management",
// //   instructors: ["Sirius Potter Black"],
// //   price: 600,
// //   dateCreated: 20,
// // });

// ProgramService.delete("123e4567-e89b-12d3-a456-426614174010");

// ProgramService.sortPrograms("asc");

console.log(ProgramService.getAll());
console.log(ProgramService.sortPrograms());

// console.log(ProgramService.getById("123e4567-e89b-12d3-a456-426614174000"));
