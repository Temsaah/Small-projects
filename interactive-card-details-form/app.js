let submitBtn = document.querySelector(".submit-btn");
let continueBtn = document.querySelector(".continue-btn");

let cardNameInput = document.querySelector(".cardname-input");
let cardNumberInput = document.querySelector(".cardnum-input");
let expDateMonthInput = document.querySelector(".month-input");
let expDateYearInput = document.querySelector(".year-input");
let cvcInput = document.querySelector(".cvc-input");

let cardCVCBack = document.querySelector(".cvc-card-back");
let cardNumberFront = document.querySelector(".card-front-number");
let cardNameFront = document.querySelector(".card-front-name");
let cardDateFront = document.querySelector(".card-front-date");

let defaultContainer = document.querySelector(".container");
let successContainer = document.querySelector(".success-container");

submitBtn.addEventListener("click", () => {
  let isCardNameValid = IsCardNameValid(cardNameInput.value);
  let isCardNumberValid = IsCardNumberValid(cardNumberInput.value);
  let isCardDateValid = IsCardDateValid(
    expDateMonthInput.value,
    expDateYearInput.value
  );
  let isCardCVCValid = IsCardCVCValid(cvcInput.value);

  showMessage(
    isCardNameValid,
    isCardNumberValid,
    isCardDateValid,
    isCardCVCValid
  );
});

continueBtn.addEventListener("click", () => {
  successContainer.classList.add("hidden");
  defaultContainer.classList.remove("hidden");
});

function IsCardNameValid(cardName) {
  return cardName.length >= 4;
}

function IsCardNumberValid(cardNumber) {
  let regex = /^[0-9]{16}$/;
  return regex.test(cardNumber);
}
function IsCardDateValid(cardMonth, cardYear) {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;

  currentYear = currentYear.toString().slice(-2);

  return (
    cardMonth >= 1 &&
    cardMonth <= 12 &&
    (cardYear > currentYear ||
      (cardYear == currentYear && cardMonth >= currentMonth))
  );
}
function IsCardCVCValid(cardCVC) {
  let regex = /^[0-9]{3}$/;
  return regex.test(cardCVC);
}

function showMessage(
  isCardNameValid,
  isCardNumberValid,
  isCardDateValid,
  isCardCVCValid
) {
  if (
    (isCardNameValid, isCardNumberValid && isCardDateValid && isCardCVCValid)
  ) {
    defaultContainer.classList.add("hidden");
    successContainer.classList.remove("hidden");
    AddCardDetails();
  } else {
    alert("Card details are not valid. Please check and try again.");
  }
}

function AddCardDetails() {
  cardNameFront.textContent = cardNameInput.value;
  cardNumberFront.textContent = cardNumberInput.value
    .replace(/(\d{4})/g, "$1 ")
    .trim();
  cardDateFront.textContent = `${expDateMonthInput.value}/${expDateYearInput.value}`;
  cardCVCBack.textContent = cvcInput.value;
}
