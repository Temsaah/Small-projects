let cards = document.querySelectorAll(".card");
const timeLapseBtns = document.querySelectorAll(".timelapse-btn");
const dailyBtn = document.querySelector(".daily-btn");
const weeklyBtn = document.querySelector(".weekly-btn");
const monthlyBtn = document.querySelector(".monthly-btn");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((activity, index) => {
      let card = cards[index];
      let activityTitle = activity.title;
      let timeLapseCurrent = activity.timeframes.weekly.current;
      let timeLapseLast = activity.timeframes.weekly.previous;

      card.querySelector(".title").textContent = activityTitle;
      card.querySelector(".timelapse").textContent = `${timeLapseCurrent}hrs`;
      card.querySelector(
        ".timelapse-last"
      ).textContent = `Last week - ${timeLapseLast}hrs`;
    });
  });

dailyBtn.addEventListener("click", () => {
  getTimeLapse("daily");
  timeLapseBtns.forEach((btn) => {
    if (btn.classList.contains("text-white")) {
      btn.classList.remove("text-white");
    }
  });
  dailyBtn.classList.add("text-white");
});

weeklyBtn.addEventListener("click", () => {
  getTimeLapse("weekly");
  timeLapseBtns.forEach((btn) => {
    if (btn.classList.contains("text-white")) {
      btn.classList.remove("text-white");
    }
  });
  weeklyBtn.classList.add("text-white");
});

monthlyBtn.addEventListener("click", () => {
  getTimeLapse("monthly");
  timeLapseBtns.forEach((btn) => {
    if (btn.classList.contains("text-white")) {
      btn.classList.remove("text-white");
    }
  });
  monthlyBtn.classList.add("text-white");
});

function getTimeLapse(time) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((activity, index) => {
        let card = cards[index];
        let activityTitle = activity.title;
        let timeLapseCurrent = activity["timeframes"][`${time}`]["current"];
        let timeLapseLast = activity["timeframes"][`${time}`]["previous"];

        card.querySelector(".title").textContent = activityTitle;
        card.querySelector(".timelapse").textContent = `${timeLapseCurrent}hrs`;
        card.querySelector(
          ".timelapse-last"
        ).textContent = `Last week - ${timeLapseLast}hrs`;
      });
    });
}
