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
  removeCardDetails();
});

function IsCardNameValid(cardName) {
  if (!/\d/.test(cardName) && cardName.length >= 4) {
    return true;
  } else {
    return false;
  }
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
    isCardNameValid &&
    isCardNumberValid &&
    isCardDateValid &&
    isCardCVCValid
  ) {
    defaultContainer.classList.add("hidden");
    successContainer.classList.remove("hidden");
    setTimeout(() => successContainer.classList.add("opacity-100"), 0);
    AddCardDetails();
  } else {
    showError(
      isCardNameValid,
      isCardNumberValid,
      isCardDateValid,
      isCardCVCValid
    );
  }
}

function showError(
  isCardNameValid,
  isCardNumberValid,
  isCardDateValid,
  isCardCVCValid
) {
  if (!isCardNameValid) {
    if (cardNameInput.value < 4) {
      document.querySelector(".name-errormsg").textContent =
        "Wrong format, name should be more than 3 letters";
      cardNameInput.classList.add("border-red-700");
    } else {
      document.querySelector(".name-errormsg").textContent =
        "Wrong format, name should contain no digits";
      cardNameInput.classList.add("border-red-700");
    }
  } else {
    document.querySelector(".name-errormsg").textContent = "";
    cardNameInput.classList.remove("border-red-700");
  }

  if (!isCardNumberValid) {
    if (cardNumberInput.value.length < 16) {
      document.querySelector(".number-errormsg").textContent =
        "Wrong format, card number should contain 16 digits";
      cardNumberInput.classList.add("border-red-700");
    } else if (/[a-zA-Z]/.test(cardNumberInput.value)) {
      document.querySelector(".number-errormsg").textContent =
        "Wrong format, numbers only";
      cardNumberInput.classList.add("border-red-700");
    }
  } else {
    document.querySelector(".number-errormsg").textContent = "";
    cardNumberInput.classList.remove("border-red-700");
  }

  if (!isCardDateValid) {
    if (expDateMonthInput.value.length === 0) {
      document.querySelector(".month-errormsg").textContent = "Cant be blank";
      expDateMonthInput.classList.add("border-red-700");
    }

    if (expDateYearInput.value.length === 0) {
      document.querySelector(".year-errormsg").textContent = "Cant be blank";
      expDateYearInput.classList.add("border-red-700");
    }
  } else {
    document.querySelector(".month-errormsg").textContent = "";
    document.querySelector(".year-errormsg").textContent = "";
    expDateMonthInput.classList.remove("border-red-700");
    expDateYearInput.classList.remove("border-red-700");
  }

  if (!isCardCVCValid) {
    if (cvcInput.value.length === 0) {
      document.querySelector(".cvc-errormsg").textContent = "Can't be blank";
      cvcInput.classList.add("border-red-700");
    } else if (cvcInput.value.length < 3) {
      document.querySelector(".cvc-errormsg").textContent =
        "Must contain 3 digits";
      ("must contain 3 digits");
    }
  } else {
    document.querySelector(".cvc-errormsg").textContent = "";
    cvcInput.classList.remove("border-red-700");
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

function removeCardDetails() {
  cardNameFront.textContent = "Jane Appleseed";
  cardNumberFront.textContent = "0000 0000 0000 0000";
  cardDateFront.textContent = "00/00";
  cardCVCBack.textContent = "000";
}
