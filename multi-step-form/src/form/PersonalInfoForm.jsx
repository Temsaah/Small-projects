import { useState } from "react";
import FormNavigation from "../FormNavigation";

function PersonalInfoForm({ formData, setFormData, currStep, setCurrStep }) {
  const [isValid, setIsValid] = useState(false);

  function isFormValid() {
    if (formData.name && validateEmail(formData.email) && formData.phone)
      return true;
    return false;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <>
      <form className="relative -top-14 rounded-xl bg-white p-8 shadow-xl">
        <fieldset className="space-y-3">
          <legend className="text-2xl font-bold text-primary-marine-blue">
            Personal info
          </legend>
          <p className="text-neutral-cool-gray">
            Please provide your name, email address, and phone number.
          </p>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <label
                className="text-xs text-primary-marine-blue"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="min-w-10 rounded-md border border-neutral-light-gray px-5 py-2 font-medium text-primary-marine-blue placeholder:text-sm placeholder:font-semibold focus:outline focus:outline-primary-marine-blue"
                type="text"
                placeholder="e.g. Stephen King"
                id="name"
                name="name"
                value={formData?.name}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, name: e.target.value }))
                }
              ></input>
            </div>

            <div className="grid gap-1">
              <label
                className="text-xs text-primary-marine-blue"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="min-w-10 rounded-md border border-neutral-light-gray px-5 py-2 font-medium text-primary-marine-blue placeholder:text-sm placeholder:font-semibold focus:outline focus:outline-primary-marine-blue"
                type="email"
                id="email"
                name="email"
                placeholder="e.g. stephenking@lorem.com"
                onChange={(e) =>
                  setFormData((data) => ({ ...data, email: e.target.value }))
                }
              ></input>
            </div>

            <div className="grid gap-1">
              <label
                className="text-xs text-primary-marine-blue"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="min-w-10 rounded-md border border-neutral-light-gray px-5 py-2 font-medium text-primary-marine-blue placeholder:text-sm placeholder:font-semibold focus:outline focus:outline-primary-marine-blue"
                type="tel"
                id="phone"
                name="phone"
                placeholder="e.g. +1 234 567 890"
                onChange={(e) =>
                  setFormData((data) => ({ ...data, phone: e.target.value }))
                }
              ></input>
            </div>
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

export default PersonalInfoForm;
