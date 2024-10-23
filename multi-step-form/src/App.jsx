import { useState } from "react";
import "./App.css";
import Form from "./Form";

function App() {
  const [currStep, setCurrStep] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <div className="grid h-screen w-screen grid-rows-[25vh,1fr]">
      <FormProgress currStep={currStep} />
      <FormContainer currStep={currStep}>
        <Form setFormData={setFormData} />
      </FormContainer>
    </div>
  );
}

function FormProgress({ currStep }) {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(/images/bg-sidebar-mobile.svg)` }}
    >
      <div className="flex items-center justify-center gap-5 p-9">
        <p
          className={
            currStep === 1
              ? "grid aspect-square h-8 w-8 place-items-center rounded-full bg-white text-sm font-medium"
              : "grid h-8 w-8 place-items-center rounded-full border border-white text-sm font-bold text-white"
          }
        >
          1
        </p>
        <p
          className={
            currStep === 2
              ? "grid aspect-square h-8 w-8 place-items-center rounded-full bg-white text-sm font-medium"
              : "grid h-8 w-8 place-items-center rounded-full border border-white text-sm font-bold text-white"
          }
        >
          2
        </p>
        <p
          className={
            currStep === 3
              ? "grid aspect-square h-8 w-8 place-items-center rounded-full bg-white text-sm font-medium"
              : "grid h-8 w-8 place-items-center rounded-full border border-white text-sm font-bold text-white"
          }
        >
          3
        </p>
        <p
          className={
            currStep === 4
              ? "grid aspect-square h-8 w-8 place-items-center rounded-full bg-white text-sm font-medium"
              : "grid h-8 w-8 place-items-center rounded-full border border-white text-sm font-bold text-white"
          }
        >
          4
        </p>
      </div>
    </div>
  );
}

function FormContainer({ children, currStep }) {
  return (
    <div className="flex p-5">
      {children}
      <div className="flex w-full justify-between self-end">
        {currStep > 1 && <button>Go Back</button>}
        <button className="ml-auto">Next Step</button>
      </div>
    </div>
  );
}

export default App;
