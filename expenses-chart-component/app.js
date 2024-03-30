const daysExpenses = document.querySelectorAll(".day-expenses");
let highestBar;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0]);
    daysExpenses.forEach((dayExpenses, index) => {
      let priceEl = dayExpenses.querySelector(".hover-price");
      priceEl.textContent = `$${data[index].amount}`;
    });
    highestBar = getHeighestBar(daysExpenses);

    daysExpenses.forEach((dayExpenses) => {
      const hoverPrice = dayExpenses.querySelector(".hover-price");
      const bar = dayExpenses.querySelector(".bar");

      if (bar == highestBar) {
        bar.classList.add("bg-primary-cyan", "hover:bg-primary-cyan/70");
      } else {
        bar.classList.add(
          "bg-primary-soft-red",
          "hover:bg-primary-soft-red/70"
        );
      }

      dayExpenses.addEventListener("mouseenter", () => {
        hoverPrice.classList.remove("hidden");
      });

      dayExpenses.addEventListener("mouseleave", () => {
        hoverPrice.classList.add("hidden");
      });
    });
  });

function getHeighestBar(daysExpenses) {
  let result = 0;
  let highestIndex = 0;

  daysExpenses.forEach((dayExpenses, index) => {
    let price = dayExpenses.querySelector(".hover-price").textContent;

    price = parseFloat(price.replace(/[^0-9.-]+/g, ""));

    if (price > result) {
      result = price;
      highestIndex = index;
    }
  });

  return daysExpenses[highestIndex].querySelector(".bar");
}
