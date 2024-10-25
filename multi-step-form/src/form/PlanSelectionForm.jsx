import { useState } from "react";
import FormNavigation from "../FormNavigation";
import { Switch } from "@/components/ui/switch";

function PlanSelectionForm({ formData, setFormData, currStep, setCurrStep }) {
  const [isValid, setIsValid] = useState(false);

  function isFormValid() {
    if (formData.plan) return true;
    return false;
  }

  return (
    <>
      <form className="relative -top-[4rem] rounded-xl bg-white p-7 shadow-xl">
        <fieldset className="space-y-3">
          <legend className="text-2xl font-bold text-primary-marine-blue">
            Select your plan
          </legend>
          <p className="text-neutral-cool-gray">
            You have the option of monthly or yearly billing.
          </p>

          <div className="!mt-5 grid gap-3">
            <button
              type="button"
              className={`flex gap-3 rounded-xl border ${formData.plan === "arcade" ? "border-primary-marine-blue" : "border-neutral-light-gray"} p-4 px-5`}
              onClick={() =>
                setFormData((data) => ({ ...data, plan: "arcade" }))
              }
            >
              <img src="/images/icon-arcade.svg" alt="" />
              <span className="flex flex-col gap-0.5 text-start">
                <span className="font-medium text-primary-marine-blue">
                  Arcade
                </span>
                <span className="text-sm text-neutral-cool-gray">
                  {formData.billing === "yearly" ? "$90/yr" : "$9/mo"}
                </span>
                {formData.billing === "yearly" && (
                  <span className="mt-1 text-xs">2 months free</span>
                )}
              </span>
            </button>
            <button
              type="button"
              className={`flex gap-3 rounded-xl border ${formData.plan === "advanced" ? "border-primary-marine-blue" : "border-neutral-light-gray"} p-4 px-5`}
              onClick={() =>
                setFormData((data) => ({ ...data, plan: "advanced" }))
              }
            >
              <img src="/images/icon-advanced.svg" alt="" />
              <span className="flex flex-col gap-0.5 text-start">
                <span className="font-medium text-primary-marine-blue">
                  Advanced
                </span>
                <span className="text-sm text-neutral-cool-gray">
                  {formData.billing === "yearly" ? "$120/yr" : "$12/mo"}
                </span>
                {formData.billing === "yearly" && (
                  <span className="mt-1 text-xs">2 months free</span>
                )}
              </span>
            </button>
            <button
              type="button"
              className={`flex gap-3 rounded-xl border ${formData.plan === "pro" ? "border-primary-marine-blue" : "border-neutral-light-gray"} p-4 px-5`}
              onClick={() => setFormData((data) => ({ ...data, plan: "pro" }))}
            >
              <img src="/images/icon-pro.svg" alt="" />
              <span className="flex flex-col gap-0.5 text-start">
                <span className="font-medium text-primary-marine-blue">
                  Pro
                </span>
                <span className="text-sm text-neutral-cool-gray">
                  {formData.billing === "yearly" ? "$150/yr" : "$15/mo"}
                </span>
                {formData.billing === "yearly" && (
                  <span className="mt-1 text-xs">2 months free</span>
                )}
              </span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-5 p-5">
            <p
              className={`text-sm ${formData.billing === "monthly" ? "text-primary-marine-blue" : "text-neutral-cool-gray"} font-semibold`}
            >
              Monthly
            </p>
            <Switch
              className="!bg-primary-marine-blue"
              checked={formData.billing === "yearly"}
              onCheckedChange={(checked) =>
                setFormData((data) => ({
                  ...data,
                  billing: checked ? "yearly" : "monthly",
                }))
              }
            />
            <p
              className={`text-sm ${formData.billing === "yearly" ? "text-primary-marine-blue" : "text-neutral-cool-gray"} font-semibold`}
            >
              Yearly
            </p>
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
