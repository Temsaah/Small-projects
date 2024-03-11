let formBtn = document.querySelector(".form-btn");
let emailInput = document.querySelector(".email-input");

let errorMsg = document.querySelector(".error-msg");

formBtn.addEventListener("click", () => {
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!emailInput.value.match(emailRegex)) {
    errorMsg.classList.remove("hidden");
  } else errorMsg.classList.add("hidden");
});
