const formInputs = document.querySelectorAll("input");
const textArea = document.querySelector("textarea");
const inputContainers = document.querySelectorAll(".input-container");

textArea.addEventListener("invalid", (e) => e.preventDefault());

formInputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    // input.style.border = "3px solid yellow";
  });
});

function changeBorderClr(input) {
  input.classList.add("border-invalid");
}

inputContainers.forEach((inputContainer) => {
  const inputs = inputContainer.querySelectorAll("input");
  const textarea = inputContainer.querySelector("textarea");
  const errorMessage = inputContainer.querySelector(".error-message");

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    changeBorderClr(input);
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
    });
  }

  errorMessage.classList.remove("hide");
  errorMessage.textContent = "This field is required";
});
