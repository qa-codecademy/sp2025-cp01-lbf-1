import PROGRAMS from "../data/program.data.js";
import Program from "../models/program.model.js";
import { v4 as uuid } from "uuid";

export default class ProgramService {
  static getAll() {
    return PROGRAMS;
  }

  static getById(id) {
    const foundProgram = PROGRAMS.find((program) => program.id === id);

    if (!foundProgram) {
      throw new Error("Program was not found.");
    }

    return foundProgram;
  }

  static create(data) {
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

    PROGRAMS.push(newProgram);
    return newProgram;
  }

  static update(id, data) {
    const index = PROGRAMS.findIndex((program) => program.id === id);

    if (index < 0) {
      throw new Error("Program was not found.");
    }

    PROGRAMS[index] = { ...PROGRAMS[index], ...data };

    return PROGRAMS[index];
  }

  static delete(id) {
    const index = PROGRAMS.findIndex((program) => program.id === id);

    if (index < 0) {
      throw new Error("Program was not found.");
    }

    PROGRAMS.splice(index, 1);

    return { message: "Program deleted successfully" };
  }
}
// ProgramService.create({
//   name: "How To Create Stuff",
//   dateFrom: "2026-07-05",
//   dateTo: "2026-07-08",
//   steps: 4,
//   description: "Learn the agile framework for project management",
//   instructors: ["Sirius Black"],
//   price: 600,
//   dateCreated: 20,
// });

// console.log(ProgramService.getAll());

// console.log(ProgramService.getById("2081762a-6e25-4330-aa1f-ecf78b4277b0"));

// ProgramService.update({
//   name: "How To Create Stuff",
//   dateFrom: "2026-07-05",
//   dateTo: "2026-07-08",
//   steps: 4,
//   description: "Learn the agile framework for project management",
//   instructors: ["Sirius Black"],
//   price: 600,
//   dateCreated: 20,
// });
