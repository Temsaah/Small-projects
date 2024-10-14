import { useContext, useRef, useState } from "react";
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
  const { file, setFile, formData, updateFormData, setTicketGenerated } =
    useContext(FormContext);
  const [isDragging, setIsDragging] = useState(false);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function convertFileToSrc(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(e.target.result); // Save the image src (base64 URL)
    };
    reader.readAsDataURL(file);
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
      convertFileToSrc(droppedFile);
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      convertFileToSrc(selectedFile);
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

    setTicketGenerated(true);
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
  const { file, setFile } = useContext(FormContext);
  const inputRef = useRef(null);

  function handleRemoveImage(e) {
    e.preventDefault();
    setFile("");
  }

  function handleChangeImage(e) {
    e.preventDefault();
    inputRef.current.click();
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => setFile(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please upload a valid image file (JPG or PNG).");
    }
  }

  return (
    <>
      <div className="upload-icon w-fit rounded-xl border border-neutral-300/15 bg-neutral-300/15">
        <img
          className="aspect-square w-12 rounded-xl object-cover"
          src={file}
        ></img>
      </div>
      <div className="btns flex gap-2">
        <button
          type="button"
          className="remove-btn rounded-md bg-neutral-700/50 px-2 py-1 text-xs text-gray-300/90 underline underline-offset-2 transition-colors hover:bg-neutral-700"
          onClick={handleRemoveImage}
        >
          Remove image
        </button>
        <button
          type="button"
          className="change-btn rounded-md bg-neutral-700/50 px-2 py-1 text-xs text-gray-300/90 transition-colors hover:bg-neutral-700"
          onClick={handleChangeImage}
        >
          Change image
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}

function GeneratedTicket() {
  const { file, formData } = useContext(FormContext);

  return (
    <main className="px-5">
      <div className="generated-ticket mx-auto grid max-w-[600px] gap-16">
        <div className="intro-text grid gap-5 p-4 text-center">
          <h1 className="text-[1.8rem] font-extrabold leading-tight tracking-tighter text-white md:text-5xl">
            Congrats,
            <span className="bg-gradient-to-r from-gradient-text-from to-gradient-text-to bg-clip-text text-transparent">
              {" "}
              {formData.fullName}
            </span>
            ! Your ticket is ready.
          </h1>
          <p className="text-lg font-semibold text-neutral-300 md:tracking-wider">
            We've emailed your ticket to
            <span className="text-orange-500"> {formData.email}</span> and will
            send updates in the run up to the event.
          </p>
        </div>

        <div className="ticket relative mx-auto w-fit">
          <div className="ticket-img min-w-[320px] max-w-[400px] lg:max-w-[450px]">
            <img src="assets/images/pattern-ticket.svg" alt="" />
          </div>
          <div className="location-info absolute left-5 top-3 flex gap-3">
            <div className="logo w-7 self-center">
              <img src="assets/images/logo-mark.svg" alt="" />
            </div>
            <div className="location-details space-y-1">
              <div className="location-details-name">
                <p className="text-2xl font-bold text-white">Coding Conf</p>
              </div>
              <div className="location-details-date">
                <p className="text-sm text-neutral-300">
                  Jan 31, 2025 / Austin, TX
                </p>
              </div>
            </div>
          </div>
          <div className="personal-info absolute bottom-3 left-5 flex gap-3">
            <div className="personal-img aspect-square w-10 self-center lg:w-14">
              <img
                className="aspect-square rounded-lg object-cover"
                src={file}
                alt=""
              />
            </div>
            <div className="personal-details">
              <div className="personal-details-name">
                <p className="text-lg font-semibold text-white">
                  {formData.fullName}
                </p>
              </div>
              <div className="personal-details-date flex items-center gap-1">
                <img src="assets/images/icon-github.svg" />
                <p className="text-sm text-neutral-300">
                  {formData.githubUsername}
                </p>
              </div>
            </div>
          </div>
          <div className="id absolute right-0 top-1/2 -translate-y-1/2 rotate-90">
            <p className="text-xl font-medium text-neutral-500">#01609</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
