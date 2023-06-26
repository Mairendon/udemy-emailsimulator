document.addEventListener("DOMContentLoaded", function () {
  const inputEmail = document.querySelector("#email");
  const inputIssue = document.querySelector("#issue");
  const inputMessage = document.querySelector("#message");
  const formulario = document.querySelector("#form");

  inputEmail.addEventListener("blur", valueFunction);
  inputIssue.addEventListener("blur", valueFunction);
  inputMessage.addEventListener("blur", valueFunction);

  function valueFunction(e) {
    console.log(e.target.parentElement.nextElementSibling);
    if (e.target.value.trim() === "") {
      showAlert(
        `el campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
    } else {
      console.log("si hay algo");
    }
  }

  function showAlert(message, reference) {
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
});
