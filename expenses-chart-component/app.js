const daysExpenses = document.querySelectorAll(".day-expenses");
let highestBar;

function setPrices(data, dayExpenses, index) {
  let priceEl = dayExpenses.querySelector(".hover-price");
  const price = data[index].amount;
  priceEl.textContent = `$${price}`;
  priceEl.dataset.price = price;
}

// function setBarHeight(data, dayExpenses, index) {
//   let bar = dayExpenses.querySelector(".bar");
//   let barHeight = parseInt(data[index].amount * 2);
//   bar.classList.add(`h-[${barHeight}]px`);
// }

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    daysExpenses.forEach((dayExpenses, index) => {
      setPrices(data, dayExpenses, index);
      // setBarHeight(data, dayExpenses, index);
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

      bar.addEventListener("mouseenter", () => {
        hoverPrice.classList.remove("hidden");
        setTimeout(() => {
          hoverPrice.classList.replace("opacity-0", "opacity-100");
          hoverPrice.classList.replace("-top-6", "-top-8");
        }, 0);
      });

      bar.addEventListener("mouseleave", () => {
        hoverPrice.classList.add("hidden");
        hoverPrice.classList.replace("opacity-100", "opacity-0");
        hoverPrice.classList.replace("-top-8", "-top-6");
      });
    });
  });

function getHeighestBar(daysExpenses) {
  let highestBar = null;
  let highestPrice = 0;

  daysExpenses.forEach((dayExpenses, index) => {
    let priceEl = dayExpenses.querySelector(".hover-price");

    price = parseFloat(priceEl.dataset.price);

    if (price > highestPrice) {
      highestPrice = price;
      highestBar = dayExpenses.querySelector(".bar");
    }
  });

  return highestBar;
}
