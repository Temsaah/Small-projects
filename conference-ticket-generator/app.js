const uploadLabel = document.querySelector(".upload-label");
const imgInput = document.querySelector("#img");
const uploadBox = document.querySelector(".upload-box");
const uploadInfo = document.querySelector(".upload-info");
const generateBtn = document.querySelector(".generate-btn");
const mainContent = document.querySelector("main");
const inputs = document.querySelectorAll("input");

const uploadStatus = document.querySelector(".upload-status");
const initialUploadInfo = uploadInfo.innerHTML;
const intialUi = mainContent.outerHTML;

let fullName = "";
let emailAddress = "";
let githubUsername = "";

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleDrag(e) {
  e.preventDefault();

  const isInBoxOrChildrens = e.target.closest(".upload-box");

  if (isInBoxOrChildrens) {
    console.log(e.srcElement);

    if (e.type === "dragover") {
      uploadBox.style.opacity = 0.6;
    } else if (e.type === "dragleave" && e.target === uploadBox) {
      uploadBox.style.opacity = 1;
    }
  }
}

function handleDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];

  addPhotoToUploadBox(file);
  uploadBox.style.opacity = 1;
}

function addPhotoToUploadBox(file) {
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
    } else {
      uploadStatus.innerHTML =
        '<p class="upload-status text-xs text-neutral-300">Upload your photo (JPG or PNG, max size: 500KB).</p>';
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      picSrc = e.target.result;
      const imgPreview = document.createElement("img");
      imgPreview.src = e.target.result;
      imgPreview.alt = "Uploaded Avatar";
      imgPreview.className =
        "w-14 h-14 rounded-xl border border-gray-500 object-cover";

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
}

inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    if (input.className.includes("full-name")) fullName = e.target.value;
    if (input.className.includes("email-address"))
      emailAddress = e.target.value;
    if (input.className.includes("github-username"))
      githubUsername = e.target.value;
  });
});

uploadLabel.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    imgInput.click();
  }
});

imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  addPhotoToUploadBox(file);
});

uploadBox.addEventListener("click", (e) => {
  if (e.target.className.includes("remove-btn")) {
    e.preventDefault();
    picSrc = "";
    uploadInfo.innerHTML = initialUploadInfo;
    imgInput.value = "";
  }

  if (e.target.className.includes("change-btn")) {
    e.preventDefault();
    imgInput.click();
  }
});

generateBtn.addEventListener("click", (e) => {
  if (!picSrc || !fullName || !validateEmail(emailAddress) || !githubUsername)
    return;

  mainContent.outerHTML = `    <main class="px-5 grid justify-items-center gap-16">
      <div class="intro-text py-4 text-center grid gap-5">
        <h1
          class="text-white text-[1.8rem] font-extrabold md:text-5xl leading-tight tracking-tighter"
        >
          Congrats,
          <span
            class="text-transparent bg-gradient-to-r from-gradient-text-from to-gradient-text-to bg-clip-text"
            >${fullName}</span
          >! Your ticket is ready.
        </h1>
        <p class="text-neutral-300 font-semibold text-lg md:tracking-wider">
          We've emailed your ticket to
          <span class="text-orange-500">${emailAddress}</span> and will send updates in
          the run up to the event.
        </p>
      </div>

      <div class="ticket relative">
        <div class="ticket-img max-w-[400px] min-w-[320px]">
          <img src="assets/images/pattern-ticket.svg" alt="" />
        </div>
        <div class="location-info flex gap-3 absolute top-3 left-5">
          <div class="logo w-7 self-center">
            <img src="assets/images/logo-mark.svg" alt="" />
          </div>
          <div class="location-details space-y-1">
            <div class="location-details-name">
              <p class="text-white text-2xl font-bold">Coding Conf</p>
            </div>
            <div class="location-details-date">
              <p class="text-neutral-300 text-sm">Jan 31, 2025 / Austin, TX</p>
            </div>
          </div>
        </div>
        <div class="personal-info flex gap-3 absolute bottom-3 left-5 ">
          <div class="personal-img w-10 self-center rounded-xl">
            <img class='rounded-lg' src='${picSrc}' alt="" />
          </div>
          <div class="personal-details">
            <div class="personal-details-name">
              <p class="text-white text-lg font-semibold">Jonatan Kristof</p>
            </div>
            <div class="personal-details-date flex gap-1 items-center">
              <img src="assets/images/icon-github.svg" />
              <p class="text-neutral-300 text-sm">@${githubUsername}</p>
            </div>
          </div>
        </div>
        <div class="id absolute top-1/2 -translate-y-1/2 right-0 rotate-90">
          <p class="text-xl font-medium text-neutral-500">#01609</p>
        </div>
      </div>
    </main>`;
});

uploadBox.addEventListener("dragenter", handleDrag);
uploadBox.addEventListener("dragover", handleDrag);
uploadBox.addEventListener("dragleave", handleDrag);
uploadBox.addEventListener("drop", handleDrop);
