export default class Program {
  constructor({
    id = null,
    name,
    forWho,
    dateFrom = null,
    dateTo = null,
    totalDays,
    description,
    instructors = [],
    price,
  }) {
    this.id = id;
    this.name = name;
    this.forWho = forWho;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.totalDays = totalDays;
    this.description = description;
    this.instructors = instructors;
    this.price = price;
  }
}
