const plansContainer = document.querySelector(".plans");

let plans = [
  {
    mostPopular: false,
    name: "Basic",
    price: "199.99",
    storage: "500 GB",
    userCount: "2",
    send: "3 GB",
  },
  {
    mostPopular: true,
    name: "Professional",
    price: "249.99",
    storage: "1 TB",
    userCount: "5",

    send: "10 GB",
  },
  {
    mostPopular: false,
    name: "Basic",
    price: "399.99",
    storage: "2 TB",
    userCount: "10",
    send: "20 GB",
  },
];

function fetchPlans() {
  const plansHTML = "";

  plans.forEach((plan) => {
    plansHTML += `<div
          class="plan text-center grid gap-5 text-primary-dark-grayish-blue p-5"
        >
          <p class="text-primary-grayish-blue font-bold">Basic</p>
          <p class="text-6xl font-bold flex items-center justify-center gap-2">
            <span class="text-4xl">$</span>199.99
          </p>
          <div
            class="plan-features my-5 divide-y divide-primary-light-grayish-blue border-t border-b border-primary-light-grayish-blue text-primary-dark-grayish-blue"
          >
            <div class="storage p-4 text-sm font-bold">
              <p>500 GB Storage</p>
            </div>
            <div class="user-count p-4 text-sm font-bold">
              <p>2 Users Allowed</p>
            </div>
            <div class="send-size p-4 text-sm font-bold">
              <p>Send up to 3 GB</p>
            </div>
          </div>
          <button
            class="bg-primary-gradient p-3 text-primary-very-light-grayish-blue font-bold text-sm rounded-lg uppercase"
          >
            Learn More
          </button>
        </div>`;
  });
}

fetchPlans();
