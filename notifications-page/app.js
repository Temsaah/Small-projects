let notifyNum = document.querySelector(".notify-number");
let markReadBtn = document.querySelector(".mark-read-btn");

let notifications = document.querySelectorAll(".notify");

notifications.forEach((notify) => {
  notify.addEventListener("click", () => {
    notifyCircle = notify.querySelector(".notify-read");
    notifyCircle.classList.toggle("hidden");
    updateNotificationNumber();
  });
});

markReadBtn.addEventListener("click", () => {
  notifications.forEach((notify) => {
    notifyCircle = notify.querySelector(".notify-read");
    if (!notifyCircle.classList.contains("hidden")) {
      notifyCircle.classList.add("hidden");
    }
    updateNotificationNumber();
  });
});

function updateNotificationNumber() {
  let currentNotifyNum = 0;

  notifications.forEach((notify) => {
    notifyCircle = notify.querySelector(".notify-read");

    if (!notifyCircle.classList.contains("hidden")) currentNotifyNum++;
  });

  notifyNum.textContent = currentNotifyNum;
}
