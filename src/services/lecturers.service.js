import LECTURERS from "../data/lecturers.data.js";

export default class LecturersService {
  static getAll(filters = {}) {
    const {
      name,
      sortBy,
      direction = "asc",
      lecturersPerPage = 4,
      page = 1,
    } = filters;
    const storedData = localStorage.getItem("lecturers");
    if (!storedData) {
      localStorage.setItem("lecturers", JSON.stringify(LECTURERS));
      return {
        data: [],
        currentPage: 1,
        totalLecturers: 0,
        totalPages: 0,
      };
    }
    // Parsed Data
    let parsedData = LECTURERS;
    try {
      parsedData = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {
        data: [],
        currentPage: 1,
        totalLecturers: 0,
        totalPages: 0,
      };
    }
    // Fiilters
    if (name) {
      parsedData = parsedData.filter((lecturer) =>
        lecturer.fullName.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "name") {
      parsedData.sort((a, b) => {
        if (direction === "asc") {
          return a.fullName.localeCompare(b.fullName, "mk", {
            sensitivity: "base",
          });
        } else if (direction === "desc") {
          return b.fullName.localeCompare(a.fullName, "mk", {
            sensitivity: "base",
          });
        }
      });
    }

    // Pagination
    const totalLecturers = parsedData.length;
    const totalPages = Math.ceil(totalLecturers / lecturersPerPage);
    const startPagination = (page - 1) * lecturersPerPage;
    const endPagination = startPagination + lecturersPerPage;
    const paginationData = parsedData.slice(startPagination, endPagination);

    return {
      data: paginationData,
      currentPage: page,
      totalLecturers: totalLecturers,
      totalPages: totalPages,
    };
  }

  static search(name) {
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      return [];
    }
    const lecturers = LECTURERS;

    const filteredLecturers = lecturers.filter(
      (lecturer) =>
        lecturer.fullName.toLowerCase().search(name.toLowerCase()) !== -1
    );

    return filteredLecturers;
  }

  static getById(id) {
    const lecturersJson = localStorage.getItem("lecturers");

    const lecturers = JSON.parse(lecturersJson);
    const lecturerId = id.toString();

    const foundLecturer = lecturers.find(
      (lecturer) => lecturer.id === lecturerId
    );
    if (!foundLecturer) {
      throw new Error("Lecturer was not found.");
    }
    return foundLecturer;
  }
}
