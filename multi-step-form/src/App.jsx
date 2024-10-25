import { useState } from "react";
import "./App.css";
import Form from "./form/PersonalInfoForm";
import PersonalInfoForm from "./form/PersonalInfoForm";
import PlanSelectionForm from "./form/PlanSelectionForm";

function App() {
  const [currStep, setCurrStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    billing: "monthly",
  });

  return (
    <div className="grid h-screen w-screen grid-rows-[23vh,1fr]">
      <FormProgress currStep={currStep} />
      <FormContainer
        currStep={currStep}
        setCurrStep={setCurrStep}
        formData={formData}
        setFormData={setFormData}
      />
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

function FormContainer({
  children,
  currStep,
  setCurrStep,
  formData,
  setFormData,
}) {
  return (
    <div className="relative grid grid-rows-[auto,1fr] bg-neutral-magnolia p-5 pt-0">
      {currStep === 1 && (
        <PersonalInfoForm
          currStep={currStep}
          setCurrStep={setCurrStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currStep === 2 && (
        <PlanSelectionForm
          currStep={currStep}
          setCurrStep={setCurrStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}

export default App;
