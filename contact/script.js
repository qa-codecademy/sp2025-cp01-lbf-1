const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("invisible");

  if (isHidden) {
    mobileMenu.classList.remove("opacity-0", "invisible");
    mobileMenu.classList.add("opacity-100", "visible");
  } else {
    mobileMenu.classList.remove("opacity-100", "visible");
    mobileMenu.classList.add("opacity-0", "invisible");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  const fields = [
    {
      id: "ime",
      message: "Ве молиме внесете го вашето име.",
    },
    {
      id: "prezime",
      message: "Ве молиме внесете го вашето презиме.",
    },
    {
      id: "emailField",
      message: "Ве молиме внесете валидна е-маил адреса.",
    },
    {
      id: "naslov",
      message: "Ве молиме внесете наслов на пораката.",
    },
    {
      id: "poraka",
      message: "Ве молиме внесете ја вашата порака.",
    },
  ];

  form.addEventListener("submit", function (e) {
    let isValid = true;

    fields.forEach(({ id, message }) => {
      const input = document.getElementById(id);
      const errorDiv = document.getElementById(`${id}-error`);

      if (!input.checkValidity()) {
        errorDiv.textContent = message;
        isValid = false;
      } else {
        errorDiv.textContent = "";
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  });

  fields.forEach(({ id }) => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      const errorDiv = document.getElementById(`${id}-error`);
      errorDiv.textContent = "";
    });
  });
});
