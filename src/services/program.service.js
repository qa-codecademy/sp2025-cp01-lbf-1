import Program from "../models/program.model.js";
import PROGRAMS from "../data/program.data.js";
import { v4 as uuid } from "https://jspm.dev/uuid";

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

  static create(data) {
    const programs = ProgramService.getAll();
    const { name, dateFrom, dateTo, steps, description, instructors, price } =
      data;

    const newProgram = new Program({
      id: uuid(),
      name,
      dateFrom,
      dateTo,
      steps,
      description,
      instructors,
      price,
    });

    programs.push(newProgram);

    localStorage.setItem("programs", JSON.stringify(programs));

    return newProgram;
  }

  static update(id, data) {
    const programs = ProgramService.getAll();
    const index = programs.findIndex((program) => program.id === id);

    if (index < 0) {
      throw new Error("Program was not found.");
    }

    programs[index] = { ...programs[index], ...data };

    localStorage.setItem("programs", JSON.stringify(programs));

    return programs[index];
  }

  static delete(id) {
    const programs = ProgramService.getAll();

    const updatedPrograms = programs.filter((program) => program.id !== id);

    if (programs.length === updatedPrograms.length) {
      throw new Error("Program was not found.");
    }

    localStorage.setItem("programs", JSON.stringify(updatedPrograms));

    return { message: "Program deleted successfully" };
  }

  static sortPrograms(direction) {
    const programs = ProgramService.getAll();
    let sorted = [];
    if (direction === "asc") {
      sorted = [...programs].sort((a, b) => {
        return new Date(a.dateCreated) - new Date(b.dateCreated);
      });
    } else if (direction === "desc") {
      sorted = [...programs].sort((a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      });
    } else {
      sorted = programs;
    }
    localStorage.setItem("programs", JSON.stringify(sorted));
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

// console.log(ProgramService.getById("123e4567-e89b-12d3-a456-426614174000"));
