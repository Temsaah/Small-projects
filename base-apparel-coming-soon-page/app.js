let submitBtn = document.querySelector(".submit-btn");

let emailInput = document.querySelector(".email-input");

let errorIcon = document.querySelector(".error-icon");

let errorMsg = document.querySelector(".error-msg");

submitBtn.addEventListener("click", () => {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  if (!regex.test(emailInput.value)) {
    errorIcon.classList.remove("hidden");
    errorMsg.classList.remove("hidden");
  } else {
    errorIcon.classList.add("hidden");
    errorMsg.classList.add("hidden");
  }
});
