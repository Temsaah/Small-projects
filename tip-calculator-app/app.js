const billPrice = document.querySelector(".bill-result");
const tipBtns = document.querySelectorAll(".tip-btn");
const customTip = document.querySelector(".custom-tip");
const peopleNumber = document.querySelector(".people-num-result");

const tipResult = document.querySelector(".tip-result");
const totalResult = document.querySelector(".total-result");

let tip = null;
let bill = null;
let numberOfPeople = null;

billPrice.addEventListener("keyup", (e) => {
  bill = Number(billPrice.value);
  calculateTip();
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtn(tipBtns, btn);
    customTip.value = "";
    tip = parseInt(btn.textContent) / 100;
    calculateTip();
  });
});

customTip.addEventListener("keyup", () => {
  toggleBtn(tipBtns);
  tip = Number(customTip.value) / 100;
  calculateTip();
});

peopleNumber.addEventListener("keyup", (e) => {
  numberOfPeople = Number(peopleNumber.value);
  calculateTip();
});

function toggleBtn(Btns, btn = null) {
  Btns.forEach((btn) => {
    if (btn.classList.contains("bg-primary-strong-cyan")) {
      btn.classList.remove("bg-primary-strong-cyan");
    }
  });

  btn?.classList.toggle("bg-primary-strong-cyan");
}

function calculateTip() {
  if (tip && bill && numberOfPeople) {
    let tipPerPerson = (bill * tip) / numberOfPeople;
    let billPerPerson = bill / numberOfPeople;
    tipResult.textContent = `${tipPerPerson.toFixed(2)}`;
    totalResult.textContent = `${(tipPerPerson + billPerPerson).toFixed(2)}`;
  }
}
