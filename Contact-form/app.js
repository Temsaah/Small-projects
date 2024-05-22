const form = document.querySelector("form");
const fName = document.querySelector("#fname-input");
const lName = document.querySelector("#lname-input");
const email = document.querySelector("#email-input");
const msg = document.querySelector("#message-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const validateInputs = () => {
  const fNameValue = fName.value.trim();
  const lNameValue = lName.value.trim();
  const emailValue = email.value.trim();
  const msgValue = msg.value.trim();

  if (fNameValue.length < 3) {
    console.log("Error: First name must be at least 3 characters long");
  }

  if (lNameValue.length < 3) {
    console.log("Error: Last name must be at least 3 characters long");
  }

  if (!isValidEmail(emailValue)) {
    console.log("Error: Invalid email format");
  }

  // Validate message
  if (msgValue.length === 0) {
    console.log("Error: Message cannot be empty");
  }
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
