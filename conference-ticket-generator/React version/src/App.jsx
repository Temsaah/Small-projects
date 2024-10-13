import { useContext, useState } from "react";
import "./App.css";
import { FormContext, FormProvider } from "./FormContext";

function App() {
  return (
    <FormProvider>
      <Decorations />
      <Header />
      <Main />
    </FormProvider>
  );
}

function Decorations() {
  return (
    <div className="background absolute top-0 -z-10 h-full w-full overflow-hidden">
      <div className="pattern-line md:absolute md:top-0">
        <img
          className="w-[980px] max-w-max md:w-full"
          src="assets/images/pattern-lines.svg"
          alt=""
        />
      </div>
      <div className="pattern-squiggly-line-top absolute right-0 top-8 md:top-20">
        <img
          className="w-[120px] md:w-[400px]"
          src="assets/images/pattern-squiggly-line-top.svg"
          alt=""
        />
      </div>
      <div className="pattern-circle absolute right-0 top-1/2 translate-x-1/2 md:left-3/4 md:-translate-x-[40%] md:-translate-y-[30%]">
        <img
          className="w-[110px] md:w-[200px]"
          src="assets/images/pattern-circle.svg"
          alt=""
        />
      </div>
      <div className="pattern-circle-desktop absolute left-10 top-0 -translate-y-1/2 sm:hidden md:block">
        <img
          className="w-[110px] md:w-[200px]"
          src="assets/images/pattern-circle.svg"
          alt=""
        />
      </div>
      <div className="pattern-squiggly-line-bottom absolute bottom-0">
        <img
          className="w-[300px] md:w-[600px]"
          src="assets/images/pattern-squiggly-line-bottom.svg"
          alt=""
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-8 grid place-items-center md:my-10">
      <img className="w-[170px]" src="assets/images/logo-full.svg" />
    </header>
  );
}

function Main() {
  const { ticketGenerated } = useContext(FormContext);

  return <>{ticketGenerated ? <GeneratedTicket /> : <MainForm />}</>;
}

function MainForm() {
  const { file, setFile, formData, updateFormData } = useContext(FormContext);
  const [isDragging, setIsDragging] = useState(false);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleDragOver(e) {
    e.preventDefault();

    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();

    console.log(e);
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();

    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (
      droppedFile &&
      (droppedFile.type === "image/jpeg" || droppedFile.type === "image/png")
    ) {
      setFile(droppedFile);
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid image file (JPG or PNG).");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    updateFormData(name, value);
  }

  function handleSubmit() {
    if (
      !formData.fullName ||
      !validateEmail(formData.email) ||
      !formData.githubUsername
    )
      return;
  }

  return (
    <main className="grid justify-items-center px-5">
      <div className="intro-text grid justify-items-center gap-5 p-4 text-center">
        <h1 className="max-w-[25ch] text-[1.8rem] font-extrabold tracking-tighter text-white md:text-5xl md:leading-[1.1]">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <p className="text-lg font-semibold text-neutral-300 md:tracking-wider">
          Secure your spot at next year's biggest coding conference.
        </p>
      </div>

      <form className="grid w-full max-w-[450px] gap-7 py-7" action="">
        <fieldset className="space-y-4">
          <legend className="text-xl font-semibold text-neutral-50">
            Upload Avatar
          </legend>
          <div
            className={`upload-box ${isDragging ? "opacity-60" : "opacity-100"} justify-content-center grid cursor-pointer place-items-center gap-4 rounded-xl border-2 border-dashed border-neutral-50/30 bg-neutral-200/10 focus:outline-none focus:ring-2 focus:ring-neutral-500/70 focus:ring-offset-2 focus:ring-offset-neutral-900 active:bg-neutral-200/20`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button type="button" className="w-full">
              <label
                tabIndex="0"
                htmlFor="img"
                className="upload-label cursor-pointer"
              >
                <div className="upload-info grid justify-items-center gap-5 p-4">
                  {file ? <UploadedPhotoPreview /> : <UploadInterface />}
                </div>
              </label>
            </button>
          </div>

          <input
            tabIndex="-1"
            className="absolute h-[0.1px] w-[0.1px] opacity-0"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="info flex gap-2">
            <img src="assets/images/icon-info.svg" alt="Info" />
            <p className="upload-status text-xs text-neutral-300">
              Upload your photo (JPG or PNG, max size: 500KB).
            </p>
          </div>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-xl font-semibold text-neutral-50">
            Full Name
          </legend>
          <input
            className="full-name w-full rounded-xl border border-neutral-300/50 bg-neutral-300/15 p-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/70 focus:ring-offset-2 focus:ring-offset-neutral-900 active:bg-neutral-300/30 active:ring-0"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-xl font-semibold text-neutral-50">
            Email Address
          </legend>
          <input
            className="email-address w-full rounded-xl border border-neutral-300/50 bg-neutral-300/15 p-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/70 focus:ring-offset-2 focus:ring-offset-neutral-900 active:bg-neutral-300/30 active:ring-0"
            type="text"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-xl font-semibold text-neutral-50">
            Github Username
          </legend>
          <input
            className="github-username w-full rounded-xl border border-neutral-300/50 bg-neutral-300/15 p-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/70 focus:ring-offset-2 focus:ring-offset-neutral-900 active:bg-neutral-300/30 active:ring-0"
            type="text"
            name="githubUsername"
            placeholder="@yourusername"
            value={formData.githubUsername}
            onChange={handleInputChange}
          />
        </fieldset>
        <button
          className="generate-btn rounded-xl bg-orange-700 p-3 font-bold text-neutral-900"
          type="button"
          onClick={handleSubmit}
        >
          Generate My Ticket
        </button>
      </form>
    </main>
  );
}

function UploadInterface() {
  return (
    <>
      <div className="upload-icon w-fit rounded-xl border border-neutral-300/15 bg-neutral-300/15 p-2">
        <img className="w-8" src="assets/images/icon-upload.svg" alt="" />
      </div>
      <p className="text-lg text-neutral-400">
        Drag and drop or click to upload
      </p>
    </>
  );
}

function UploadedPhotoPreview() {
  return (
    <>
      <div className="upload-icon w-fit rounded-xl border border-neutral-300/15 bg-neutral-300/15">
        Photo
      </div>
      <div className="btns">
        <button
          type="button"
          className="remove-btn rounded-md bg-neutral-700/50 px-2 py-1 text-xs text-gray-300/90 underline underline-offset-2 transition-colors hover:bg-neutral-700"
        >
          Remove image
        </button>
        <button
          type="button"
          className="change-btn rounded-md bg-neutral-700/50 px-2 py-1 text-xs text-gray-300/90 transition-colors hover:bg-neutral-700"
        >
          Change image
        </button>
      </div>
    </>
  );
}

function GeneratedTicket() {}

export default App;
