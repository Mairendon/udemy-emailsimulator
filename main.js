document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    issue: "",
    message: "",
  };

  const inputEmail = document.querySelector("#email");
  const inputIssue = document.querySelector("#issue");
  const inputMessage = document.querySelector("#message");
  const formulario = document.querySelector("#form");
  const btnSubmit = document.querySelector(`#form button[type="submit"]`);
  const btnReset = document.querySelector(`#form button[type="reset"]`);
  const spinner = document.querySelector("#spinner");

  inputEmail.addEventListener("input", valueFunction);
  inputIssue.addEventListener("input", valueFunction);
  inputMessage.addEventListener("input", valueFunction);

  formulario.addEventListener("submit", sendEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetForm();
  });

  function valueFunction(e) {
    //console.log(e.target.parentElement.nextElementSibling);
    if (e.target.value.trim() === "") {
      showAlert(
        `el campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      checkEmail();
      return;
    }
    if (e.target.id === "email" && !validateEmail(e.target.value)) {
      showAlert("email is not valid", e.target.parentElement);
      email[e.target.name] = "";
      checkEmail();
      return;
    }
    cleanAlert(e.target.parentElement);

    email[e.target.name] = e.target.value.trim().toLowerCase();

    checkEmail();
  }

  function showAlert(message, reference) {
    cleanAlert(reference);

    const alert = reference.querySelector(".bg-red-600");
    if (alert) {
      alert.remove();
    }

    //console.log("hubo un error");
    const error = document.createElement("P");
    error.textContent = message;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    reference.appendChild(error);
  }

  function cleanAlert(reference) {
    const alert = reference.querySelector(".bg-red-600");
    if (alert) {
      alert.remove();
    }
  }

  function validateEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  }

  function checkEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function sendEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");
    setTimeout(() => {
      resetForm();

      const exitAlert = document.createElement("P");
      exitAlert.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      exitAlert.textContent = "Email send successfuly";

      formulario.appendChild(exitAlert);

      setTimeout(() => {
        exitAlert.remove();
      }, 3000);
    }, 3000);
  }
  function resetForm() {
    email.email = "";
    email.issue = "";
    email.message = "";
    formulario.reset();
    spinner.classList.remove("flex");
    spinner.classList.add("hidden");
  }
});
