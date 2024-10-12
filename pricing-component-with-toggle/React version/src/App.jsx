import { useEffect, useState } from "react";

function App() {
  const [billingOption, setBillingOption] = useState("Annually");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      const data = await fetch("./data.json");
      const res = await data.json();
      setPlans(res);
    }
    fetchPlans();
  }, []);

  return (
    <div className="mx-auto grid max-w-[500px] gap-16 px-6 py-12 lg:h-screen lg:max-w-max lg:content-center lg:py-0">
      <BillingOption>
        <Switch billingOption={billingOption} onSwitch={setBillingOption} />
      </BillingOption>
      <Plans billingOption={billingOption} plans={plans}></Plans>
    </div>
  );
}

function BillingOption({ children }) {
  return (
    <div className="space-y-10">
      <h1 className="text-center text-3xl font-bold text-primary-grayish-blue">
        Our Pricing
      </h1>
      <div className="flex items-center justify-center gap-5">
        <p className="text-sm font-bold text-primary-light-grayish-blue">
          Annually
        </p>
        {children}
        <p className="text-sm font-bold text-primary-light-grayish-blue">
          Monthly
        </p>
      </div>
    </div>
  );
}

function Switch({ billingOption, onSwitch }) {
  function handleBillingSwitch() {
    onSwitch((bill) => (bill === "Monthly" ? "Annually" : "Monthly"));
  }

  return (
    <>
      <button className="active:opacity-50" onClick={handleBillingSwitch}>
        <div className="relative flex h-7 w-12 items-center rounded-full bg-primary-gradient px-1">
          <div
            className={`absolute h-5 w-5 bg-primary-very-light-grayish-blue ${billingOption === "Monthly" ? "translate-x-full" : "translate-x-0"} rounded-full px-2 transition-all duration-200`}
          ></div>
        </div>
      </button>
    </>
  );
}

function Plans({ plans, billingOption }) {
  return (
    <div className="grid gap-10 lg:flex lg:items-center lg:gap-0">
      {plans.map((plan) => (
        <Plan billingOption={billingOption} key={plan.name} plan={plan} />
      ))}
    </div>
  );
}

function Plan({ plan, billingOption }) {
  return (
    <div
      className={`plan grid gap-5 rounded-lg px-5 py-8 text-center lg:w-[340px] ${
        plan.mostPopular
          ? "bg-primary-gradient text-white lg:py-14"
          : "bg-white"
      }`}
    >
      <p
        className={`${
          plan.mostPopular ? "text-white" : "text-primary-grayish-blue"
        } font-bold`}
      >
        {plan.name}
      </p>
      <p
        key={billingOption}
        className={`price flex items-center justify-center gap-2 text-6xl font-bold ${
          plan.mostPopular
            ? "text-primary-very-light-grayish-blue"
            : "text-primary-dark-grayish-blue"
        }`}
      >
        <span className="text-4xl">$</span>
        <span>
          {billingOption === "Annually"
            ? plan.price
            : Math.floor((plan.price / 10) * 100) / 100}
        </span>
      </p>

      <div
        className={`plan-features my-5 divide-y divide-primary-light-grayish-blue/70 border-b border-t border-primary-light-grayish-blue/70 ${
          plan.mostPopular ? "text-white" : "text-primary-dark-grayish-blue"
        }`}
      >
        <div className="storage p-4 text-sm font-bold">
          <p>{plan.storage} Storage</p>
        </div>
        <div className="user-count p-4 text-sm font-bold">
          <p>{plan.userCount} Users Allowed</p>
        </div>
        <div className="send-size p-4 text-sm font-bold">
          <p>Send up to {plan.send}</p>
        </div>
      </div>
      <button
        className={`box-content rounded-lg border p-3 text-xs font-bold uppercase tracking-widest ${
          plan.mostPopular
            ? "text-primary-light-blue bg-primary-very-light-grayish-blue hover:border-primary-very-light-grayish-blue hover:bg-transparent hover:text-primary-very-light-grayish-blue"
            : "hover:text-primary-light-blue hover:border-primary-light-blue bg-primary-gradient text-primary-very-light-grayish-blue hover:bg-transparent hover:bg-none"
        }`}
      >
        Learn More
      </button>
    </div>
  );
}

export default App;
