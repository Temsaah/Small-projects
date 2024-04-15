let cards = document.querySelectorAll(".card");
const timeLapseBtns = document.querySelectorAll(".timelapse-btn");
const dailyBtn = document.querySelector(".daily-btn");
const weeklyBtn = document.querySelector(".weekly-btn");
const monthlyBtn = document.querySelector(".monthly-btn");
const ellipsisBtns = document.querySelectorAll(".ellipsis-btn");
const deleteBtns = document.querySelector(".delete-btn");

async function fetchData(timeframe) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((activity, index) => {
      let card = cards[index];
      let activityTitle = activity.title;
      let timeLapseCurrent = activity["timeframes"][`${timeframe}`]["current"];
      let timeLapseLast = activity["timeframes"][`${timeframe}`]["previous"];

      card.querySelector(".title").textContent = activityTitle;
      card.querySelector(".timelapse").textContent = `${timeLapseCurrent}hrs`;
      card.querySelector(
        ".timelapse-last"
      ).textContent = `Last week - ${timeLapseLast}hrs`;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function addEventListenerToButton(button, timeframe) {
  button.addEventListener("click", () => {
    fetchData(timeframe);
    timeLapseBtns.forEach((btn) => {
      if (btn.classList.contains("text-white")) {
        btn.classList.remove("text-white");
      }
    });
    button.classList.add("text-white");
  });
}

["daily", "weekly", "monthly"].forEach((timeframe) => {
  addEventListenerToButton(
    document.querySelector(`.${timeframe}-btn`),
    timeframe
  );
});

ellipsisBtns.forEach((btn) => {
  const deleteBtn = btn.parentElement.querySelector(".delete-btn");
  btn.addEventListener("click", () => {
    deleteBtn.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    deleteBtn.closest(".card").remove();
  });
});
