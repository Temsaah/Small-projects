const billPrice = document.querySelector(".bill-result");
const tipBtns = document.querySelectorAll(".tip-btn");
const customTip = document.querySelector(".custom-tip");
const peopleNumber = document.querySelector(".people-num-result");
const resetBtn = document.querySelector(".reset-btn");

const tipResult = document.querySelector(".tip-result");
const totalResult = document.querySelector(".total-result");

let tip = null;
let bill = null;
let numberOfPeople = null;

[billPrice, customTip, peopleNumber].forEach((input) => {
  input.addEventListener("keyup", () => {
    if (input == customTip) {
      tip = null;
      toggleBtn(tipBtns);
    }
    calculateTip();
  });
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtn(tipBtns, btn);
    customTip.value = "";
    tip = parseInt(btn.textContent) / 100;
    calculateTip();
  });
});

resetBtn.addEventListener("click", () => {
  resetAll();
});

function calculateTip() {
  bill = Number(billPrice.value);
  tip = tip ? tip : Number(customTip.value) / 100;
  numberOfPeople = Number(peopleNumber.value);

  if (tip >= 0 && bill >= 0 && numberOfPeople > 0) {
    let tipPerPerson = (bill * tip) / numberOfPeople;
    let billPerPerson = bill / numberOfPeople;
    tipResult.textContent = `${tipPerPerson.toFixed(2)}`;
    totalResult.textContent = `${(tipPerPerson + billPerPerson).toFixed(2)}`;
  }
}

function resetAll() {
  bill = null;
  tip = null;
  numberOfPeople = null;

  billPrice.value = "";
  customTip.value = "";
  peopleNumber.value = "";
  toggleBtn(tipBtns);

  tipResult.textContent = "0.00";
  totalResult.textContent = "0.00";
}

function toggleBtn(Btns, btn = null) {
  Btns.forEach((btn) => {
    if (btn.classList.contains("bg-primary-strong-cyan")) {
      btn.classList.remove("bg-primary-strong-cyan");
      btn?.classList.replace("text-neutral-vdark-cyan", "text-white");
    }
  });

  btn?.classList.toggle("bg-primary-strong-cyan");
  btn?.classList.replace("text-white", "text-neutral-vdark-cyan");
}
