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
    name: "Master",
    price: "399.99",
    storage: "2 TB",
    userCount: "10",
    send: "20 GB",
  },
];

function fetchPlans() {
  plansContainer.innerHTML = "";
  let plansHTML = "";

  plans.forEach((plan) => {
    plansHTML += `<div
          class="plan ${
            plan.mostPopular ? "bg-primary-gradient" : "bg-white"
          } text-center grid gap-5 ${
      plan.mostPopular ? "text-white" : "bg-white"
    } px-5 py-8 rounded-lg"
        >
          <p class="${
            plan.mostPopular ? "text-white" : "text-primary-grayish-blue"
          } font-bold">${plan.name}</p>
          <p class="text-6xl font-bold flex items-center justify-center gap-2 ${
            plan.mostPopular
              ? "text-primary-very-light-grayish-blue "
              : "text-primary-dark-grayish-blue"
          }">
            <span class="text-4xl">$</span>${plan.price}
          </p>
          <div
            class="plan-features my-5 divide-y divide-primary-light-grayish-blue/70 border-t border-b border-primary-light-grayish-blue/70 ${
              plan.mostPopular ? "text-white" : "text-primary-dark-grayish-blue"
            }"
          >
            <div class="storage p-4 text-sm font-bold">
              <p>${plan.storage} Storage</p>
            </div>
            <div class="user-count p-4 text-sm font-bold">
              <p>${plan.userCount} Users Allowed</p>
            </div>
            <div class="send-size p-4 text-sm font-bold">
              <p>Send up to ${plan.send}</p>
            </div>
          </div>
          <button
            class="p-4  font-bold text-xs rounded-lg uppercase tracking-widest  ${
              plan.mostPopular
                ? "text-primary-light-blue bg-primary-very-light-grayish-blue "
                : "bg-primary-gradient text-primary-very-light-grayish-blue "
            }"
          >
            Learn More
          </button>
        </div>`;
  });

  plansContainer.innerHTML = plansHTML;
}

fetchPlans();
