const uploadBox = document.querySelector(".upload-box");
const imgInput = document.querySelector("#img");
console.log("🚀 ~ imgInput:", imgInput);

uploadBox.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    imgInput.click();
  }
});
