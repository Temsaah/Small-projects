function FormNavigation({ currStep, isFormValid, setCurrStep }) {
  return (
    <div className="flex justify-between self-end">
      {currStep > 1 && (
        <button
          className="text-sm font-medium text-neutral-cool-gray"
          onClick={() => setCurrStep((step) => --step)}
        >
          Go Back
        </button>
      )}
      <button
        className="ml-auto rounded-md bg-primary-marine-blue px-5 py-2 text-sm font-medium text-white"
        onClick={() => isFormValid() && setCurrStep((step) => ++step)}
      >
        Next Step
      </button>
    </div>
  );
}

export default FormNavigation;
