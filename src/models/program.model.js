export default class Program {
  constructor({
    id = null,
    name,
    forWho,
    dateFrom = null,
    dateTo = null,
    totalDays,
    description,
    shortDescription,
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
    this.shortDescription = `${this.description.slice(0, 150)} ...`;
    this.instructors = instructors;
    this.price = price;
  }
}
