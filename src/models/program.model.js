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
    ageRange
  }) {
    this.id = id;
    this.name = name;
    this.forWho = forWho;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.totalDays = totalDays;
    this.description = description;
    this.shortDescription = shortDescription;
    this.instructors = instructors;
    this.price = price;
    this.ageRange = ageRange
  }
}
