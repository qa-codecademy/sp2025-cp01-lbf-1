import { PROGRAMS } from "../data/program.data.js";

export default class ProgramService {
  static getAll() {
    return PROGRAMS;
  }

  static getById(id) {
    const foundProgram = PROGRAMS.filter((program) => program.id === id);
    return foundProgram;
  }
}

// console.log(ProgramService.getAll());
console.log(ProgramService.getById("123e4567-e89b-12d3-a456-426614174001"));
