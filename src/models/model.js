export default class Program {
  constructor(name, dateFrom, dateTo, steps, description, instructors, price) {
    this.name = name;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.totalDays = 0;
    this.steps = steps;
    this.description = description;
    this.instructors = instructors;
    this.price = price;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    value.length > 1 ? (this._name = value) : (this._name = "Program Name");
  }

  get dateFrom() {
    return this._dateFrom;
  }
  set dateFrom(value) {
    const currentDate = value;
    const inputDate = new Date(value);

    if (inputDate < currentDate) {
      throw new Error(
        "The selected date cannot be in the past, please enter a valid date"
      );
    }

    this._dateFrom = inputDate;
  }

  get dateTo() {
    return this._dateTo;
  }

  set dateTo(value) {
    const currentDate = this._dateFrom;
    const inputDate = new Date(value);

    if (!currentDate) {
      throw new Error("Please set 'dateFrom' before setting 'dateTo'.");
    }

    if (inputDate < currentDate) {
      throw new Error("The 'dateTo' cannot be earlier than 'dateFrom'.");
    }

    this._dateTo = inputDate;
  }

  get steps() {
    return this._steps;
  }

  set steps(value) {
    if (Number.isInteger(value) && value > 0) {
      this._steps = value;
    } else {
      throw new Error(
        "Please enter a valid number value for the number of steps in the course"
      );
    }
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (typeof value === "string" && value.length > 1) {
      this._description = value;
    } else {
      throw new Error("Not a valid description");
    }
  }

  get instructors() {
    return this._instructors;
  }

  set instructors(value) {
    if (value.length >= 1) {
      this._instructors = value;
    } else {
      throw new Error("Please enter at least 1 instructor for the course");
    }
  }

  get price() {
    return this._price;
  }

  set price(value) {
    if (typeof value === "number" && isFinite(value) && value > 0) {
      this._price = value;
    } else {
      throw new Error("Please enter a valid price");
    }
  }

  calculateTotalDays() {
    const startDate = new Date(this._dateFrom);
    const endDate = new Date(this._dateTo);
    const oneDay = 24 * 60 * 60 * 1000;
    this.totalDays = Math.round(Math.abs((endDate - startDate) / oneDay));

    console.log(this.totalDays);
  }
}

const today = new Date();
const upcoming = new Date();
upcoming.setDate(today.getDate() + 7);

let program = new Program(
  "Некоја си програма",
  today,
  upcoming,
  2,
  "Програма за бизнис деца претприемачи од 6 до 18 години",
  ["Eden", "Dva"],
  225
);

console.log(program);
