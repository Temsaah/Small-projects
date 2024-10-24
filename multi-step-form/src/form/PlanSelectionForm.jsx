import { useState } from "react";
import FormNavigation from "../FormNavigation";

function PlanSelectionForm({ formData, setFormData, currStep, setCurrStep }) {
  const [plan, setPlan] = useState(null);
  const [isValid, setIsValid] = useState(false);

  function isFormValid() {}

  return (
    <>
      <form className="relative -top-20 rounded-xl bg-white p-7 shadow-xl">
        <fieldset className="space-y-3">
          <legend className="text-2xl font-bold text-primary-marine-blue">
            Select your plan
          </legend>
          <p className="text-neutral-cool-gray">
            You have the option of monthly or yearly billing.
          </p>

          <div className="grid gap-5">
            <button
              className={`flex gap-3 rounded-xl border ${plan === "Arcade" ? "border-primary-marine-blue" : "border-neutral-light-gray"} p-5`}
            >
              <img src="/public/images/icon-arcade.svg" alt="" />
              <span className="flex flex-col gap-2 text-start">
                <span className="font-semibold text-primary-marine-blue">
                  Arcade
                </span>
                <span className="text-sm font-medium text-neutral-cool-gray">
                  $90/yr
                </span>
                <span className="text-xs">2 months free</span>
              </span>
            </button>
            <button
              className={`flex gap-3 rounded-xl border ${plan === "Arcade" ? "border-primary-marine-blue" : "border-neutral-light-gray"} p-5`}
            >
              <img src="/public/images/icon-advanced.svg" alt="" />
              <span className="flex flex-col gap-2 text-start">
                <span className="font-semibold text-primary-marine-blue">
                  Advanced
                </span>
                <span className="text-sm font-medium text-neutral-cool-gray">
                  $120/yr
                </span>
                <span className="text-xs">2 months free</span>
              </span>
            </button>
            <button
              className={`flex gap-3 rounded-xl border ${plan === "Arcade" ? "border-primary-marine-blue" : "border-neutral-light-gray"} p-5`}
            >
              <img src="/public/images/icon-pro.svg" alt="" />
              <span className="flex flex-col gap-2 text-start">
                <span className="font-semibold text-primary-marine-blue">
                  Pro
                </span>
                <span className="text-sm font-medium text-neutral-cool-gray">
                  $150/yr
                </span>
                <span className="text-xs">2 months free</span>
              </span>
            </button>
          </div>
          <div className="flex justify-center p-10">
            <p>Monthly</p>
            <div></div>
            <p>Yearly</p>
          </div>
        </fieldset>
      </form>
      <FormNavigation
        currStep={currStep}
        isFormValid={isFormValid}
        setCurrStep={setCurrStep}
      />
    </>
  );
}

export default PlanSelectionForm;
