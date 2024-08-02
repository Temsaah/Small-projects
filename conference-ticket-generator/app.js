const uploadLabel = document.querySelector(".upload-label");
const imgInput = document.querySelector("#img");
const uploadBox = document.querySelector(".upload-box");
const uploadInfo = document.querySelector(".upload-info");

console.log("🚀 ~ uploadInfo:", uploadInfo);
const uploadStatus = document.querySelector(".upload-status");
const initialUploadInfo = uploadInfo.innerHTML;
let picSrc;

uploadLabel.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    imgInput.click();
  }
});

imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      uploadStatus.innerHTML = `<p class="text-xs text-red-700">Invalid file type. Please upload a JPG or PNG image.</p>`;

      imgInput.value = "";
      return;
    }

    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      uploadStatus.innerHTML =
        '<p class="text-xs text-red-700">File size exceeds 500KB. Please upload a smaller image.</p>';
      imgInput.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      picSrc = e.target.result;
      const imgPreview = document.createElement("img");
      imgPreview.src = e.target.result;
      imgPreview.alt = "Uploaded Avatar";
      imgPreview.className =
        "w-14 h-14 rounded-lg border border-gray-400 object-cover";

      uploadInfo.innerHTML = `<div
                  class="upload-icon border border-neutral-300/15 bg-neutral-300/15 w-fit rounded-xl"
                >
                  ${imgPreview.outerHTML}
                </div>
                <div class="btns">
                  <button
                    type="button"
                    class="remove-btn text-gray-300/90 bg-neutral-700/50 hover:bg-neutral-700 transition-colors py-1 px-2 rounded-md text-xs underline underline-offset-2"
                  >
                    Remove image
                  </button>
                  <button
                    type="button"
                    class="change-btn text-gray-300/90 bg-neutral-700/50 hover:bg-neutral-700 transition-colors py-1 px-2 rounded-md text-xs"
                  >
                    Change image
                  </button>
                </div>`;
    };

    reader.readAsDataURL(file);
  }
});

uploadBox.addEventListener("click", (e) => {
  if (e.target.className.includes("remove-btn")) {
    e.preventDefault();
    picSrc = "";
    uploadInfo.innerHTML = initialUploadInfo;
    imgInput.value = "";
  }
});
