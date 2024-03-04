let formBtn = document.querySelector(".submit-btn");
let inputArray = document.querySelectorAll(".input-text");
let emailInput = document.querySelector(".email-text");

function toggleVisibility(element, className, isVisible) {
  Array.from(element.children).forEach((child) => {
    if (child.classList.contains(className)) {
      child.classList.toggle("hidden", !isVisible);
    }
  });
}

formBtn.addEventListener("click", () => {
  inputArray.forEach((inputElement) => {
    let isErrorVisible = inputElement.value.length == 0;
    let inputContainer = inputElement.parentElement;
    let formContainer = inputContainer.parentElement;

    inputElement.classList.toggle(
      "focus-visible:outline-red-700",
      isErrorVisible
    );
    toggleVisibility(inputContainer, "error-icon", isErrorVisible);
    toggleVisibility(formContainer, "error-text", isErrorVisible);
  });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  let emailInputContainer = emailInput.parentElement;
  let emailFormContainer = emailInputContainer.parentElement;
  let isErrorVisible =
    emailInput.value.length == 0 || !emailInput.value.match(emailRegex);

  emailInput.classList.toggle("focus-visible:outline-red-700", isErrorVisible);
  toggleVisibility(emailInputContainer, "error-icon", isErrorVisible);
  toggleVisibility(emailFormContainer, "error-text", isErrorVisible);
});
