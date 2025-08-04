const formInputs = document.querySelectorAll("input");
// const textArea = document.querySelector("textarea");
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

      // errorMessage.textContent = "This field is required";
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
