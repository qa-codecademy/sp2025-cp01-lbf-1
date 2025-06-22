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

  static createLecturer(lecturer) {
    const lecturers = JSON.parse(localStorage.getItem("lecturers")) || [];
    lecturer.id = (lecturers.length + 1).toString();
    lecturers.push(lecturer);
    localStorage.setItem("lecturers", JSON.stringify(lecturers));
    return "Успешно креиран професор";
  }

  static deleteLecturer(lecturerId) {
    const id = lecturerId.toString();
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
    if (!lecturers) {
      return "Проблем во земање на професорите";
    }
    const filteredLecturers = lecturers.filter(
      (lecturer) => lecturer.id !== id
    );
    if (filteredLecturers.length === lecturers.length) {
      return "Професорот не постои";
    }
    localStorage.setItem("lecturers", JSON.stringify(filteredLecturers));
    return "Успешно избришан професор";
  }

  static updateLecturer(lecturerId, lecturer) {
    const id = lecturerId.toString();
    const lecturers = JSON.parse(localStorage.getItem("lecturers"));
    if (!lecturers) {
      return "Проблем во земање на професорите";
    }
    const lecturerIndex = lecturers.findIndex((lecturer) => lecturer.id === id);
    if (lecturerIndex === -1) {
      return "прфоесорот кој сакаш да го смениш не постои";
    }
    lecturer.id = id;
    lecturers[lecturerIndex] = { ...lecturers[lecturerIndex], ...lecturer };
    localStorage.setItem("lecturers", JSON.stringify(lecturers));
    return "Успешно апдејтиран професор";
  }
}