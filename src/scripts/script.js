import ProgramService from "../services/program.service";

function displayPrograms(programId, prefix) {
  const program = ProgramService.getById(programId);

  // Program name
  document.getElementById(`${prefix}-title`).innerText =
    program.name.toUpperCase();

  // Program description
  const sliceLengths = {
    program1: 155,
    program2: 148,
    program3: 180,
  };

  let expanded = false;
  const btn = document.getElementById(`btn-${programId}`);
  const descriptionElement = document.getElementById(`${prefix}-description`);
  const image = document.getElementById(`image${programId}`);

  const shortDescription = (descriptionElement.innerText =
    ProgramService.generateShortDescription(sliceLengths[prefix], programId) +
    "...");

  btn.addEventListener("click", () => {
    expanded = !expanded;

    descriptionElement.innerText = expanded
      ? program.description
      : shortDescription;

    btn.innerText = expanded ? "▲" : "▼";

    image.style.display = expanded ? "none" : "block";

    if (programId === "2") {
      document
        .getElementById("description-div")
        .classList.toggle("mt-7", expanded);
    }
  });

  // Program price
  document.getElementById(`${prefix}-price`).innerText =
    "MKD " +
    program.price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Program age limit
  document.getElementById(`${prefix}-ageLimit`).innerText = program.forWho
    .replace(prefix === "program3" ? "за млади од" : "за деца од", "")
    .replace("до", "-");
}

// Display programs
displayPrograms("1", "program1");
displayPrograms("2", "program2");
displayPrograms("3", "program3");
