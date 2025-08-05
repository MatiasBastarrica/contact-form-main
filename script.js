const form = document.querySelector("form");
const inputContainers = document.querySelectorAll(".input-container");

function changeBorderClr(input) {
  input.classList.add("border-invalid");
}

inputContainers.forEach((inputContainer) => {
  const inputs = inputContainer.querySelectorAll("input");
  const textarea = inputContainer.querySelector("textarea");
  const errorMessage = inputContainer.querySelector(".error-message");

  if (textarea) {
    textarea.addEventListener("invalid", (e) => {
      e.preventDefault();
      errorMessage.classList.remove("hide");
      errorMessage.textContent = "This field is required";
      changeBorderClr(textarea);
    });

    textarea.addEventListener("input", (e) => {
      if (textarea.validity.valid) {
        errorMessage.classList.add("hide");
        textarea.style.borderColor = "unset";
      }
    });
  }

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      changeBorderClr(input);

      errorMessage.classList.remove("hide");

      if (
        input.validity.valueMissing &&
        input.getAttribute("type") === "checkbox"
      ) {
        errorMessage.textContent =
          "To submit this form, please consent to being contacted";
      } else if (
        input.validity.typeMismatch &&
        input.getAttribute("type") === "email"
      ) {
        errorMessage.textContent = "Please enter a valid email address";
      } else if (
        input.getAttribute("type") === "radio" &&
        input.validity.valueMissing
      ) {
        errorMessage.textContent = "Please select a query type";
      } else {
        errorMessage.textContent = "This field is required";
      }
    });

    input.addEventListener("input", () => {
      if (input.validity.valid) {
        errorMessage.classList.add("hide");
        input.style.borderColor = "unset";
      }
    });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll("input");
  const textarea = document.querySelector("textarea");
  const errorMessages = document.querySelectorAll(".error-message");
  const dialog = document.querySelector("dialog");

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.style.borderColor = "unset";
    if (
      input.getAttribute("type") === "radio" ||
      input.getAttribute("type") === "checkbox"
    ) {
      input.checked = false;
    } else {
      clearInput(input);
    }
  }

  textarea.style.borderColor = "unset";
  clearInput(textarea);

  errorMessages.forEach((errorMessage) => {
    errorMessage.classList.add("hide");
  });

  dialog.show();
});

function clearInput(input) {
  input.value = "";
}
