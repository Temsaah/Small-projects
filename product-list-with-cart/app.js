const itemsContainer = document.querySelector(".items");
const cartContainer = document.querySelector(".cart");

const cartItems = new Map();

async function fetchData() {
  const res = await fetch("data.json");
  const data = await res.json();

  for (let item of data) {
    itemsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="item grid gap-8 " data-name='${
        item.name
      }' data-price='${item.price.toFixed(2)}'>
          <div class="thumbnail relative">
            <img
              class="w-full max-h-[200px] object-cover object-center rounded-lg"
              src="${item.image.mobile}"
              alt=""
            />
            <button
              class="absolute add-cart-btn flex gap-2 text-sm font-medium border px-8 py-3 rounded-full border-primary-rose-900 bg-white left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <img src="assets/images/icon-add-to-cart.svg" /> Add to Cart
            </button>
          </div>
          <div class="item--description grid gap-1">
            <div class="item--category text-sm text-primary-rose-400">
              <p>${item.category}</p>
            </div>
            <div class="item--name font-medium">
              <p>${item.name}</p>
            </div>
            <div class="item--price font-medium text-primary-red text-lg">
              <p>$${item.price.toFixed(2)}</p>
            </div>
          </div>
        </div>`
    );
  }
  console.log("FINISHED FETCHING DATA FUNCTION");
}

fetchData();

function addToCart(name, price) {
  const itemInfo = {
    quantity: 1,
    price,
  };

  if (cartItems.has(name)) {
    cartItems.set(name, {
      ...cartItems.get(name),
      quantity: cartItems.get(name).quantity + 1,
    });
  } else {
    cartItems.set(name, itemInfo);
  }
  console.log("ADDED ITEM");
  console.log(cartItems);

  updateCartUI();
}

function modifyCartQuantity(name, newQuantity) {
  if (cartItems.has(name)) {
    cartItems.set(name, {
      ...cartItems.get(name),
      quantity: newQuantity,
    });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector(".cart-items-container");

  if (!cartItemsContainer) {
    createCartContainer();
  }

  if (cartItems.size > 0) {
    const orderContainer = document.querySelector(".cart--items");

    orderContainer.innerHTML = ""; // RESET Cart

    let totalPrice = 0;

    for (let [name, info] of cartItems) {
      orderContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="cart-item flex justify-between items-center">
              <div class="cart-item--info grid gap-2">
                <div class="cart-item--name">
                  <p class="font-medium">${name}</p>
                </div>
                <div class="cart-item--numbers flex items-center gap-4">
                  <p
                    class="cart-item--quantity text-primary-red font-semibold text-sm"
                  >
                    ${info.quantity}x
                  </p>
                  <p class="cart-item--price text-primary-rose-400 text-sm">
                    @$${info.price}
                  </p>
                  <p
                    class="cart-item--total text-primary-rose-500 font-medium text-sm"
                  >
                    $${(info.price * info.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                class="remove-item-btn border rounded-full border-primary-rose-400 scale-100 p-1"
              >
                <img src="./assets/images/icon-remove-item.svg" />
              </button>
            </div>`
      );

      totalPrice += info.price * info.quantity;
    }

    updateOrderTotalPrice();
  }
}

function updateOrderTotalPrice() {
  const totalPriceEl = document.querySelector(".total-order-price");
  let totalPrice = 0;
  // totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;

  for (let { price, quantity } of cartItems.values()) {
    totalPrice += Number(price * quantity);
  }

  totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
}

function createCartContainer() {
  cartContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="cart-items-container grid gap-7">
        <div class="cart--items grid gap-10 mb-5">
        </div>
        <div class="cart--total flex justify-between items-center">
          <p class="text-sm">Order Total</p>
          <p class="total-order-price text-2xl font-semibold">$0.00</p>
        </div>
        <div class="delivery--info flex justify-center items-center gap-2">
          <img
            src="./assets/images/icon-carbon-neutral.svg"
            alt="tree image"
          />
          <p class="text-sm text-primary-rose-900">
            This is a
            <span class="font-semibold">carbon-neutral</span> delivery
          </p>
        </div>
        <button
          class="bg-primary-red mt-5 p-4 text-white rounded-full font-medium"
        >
          Confirm Order
        </button>
      </div>`
  );
}

itemsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".add-cart-btn")) {
    const item = e.target.closest(".item");
    const itemName = item.dataset.name;
    const itemPrice = item.dataset.price;

    addToCart(itemName, itemPrice);
    updateCartAddBtnUI(e.target.closest(".add-cart-btn"));
  }

  if (e.target.closest(".quantity-decrement")) {
    const decrementBtn = e.target.closest(".quantity-decrement");
    const quantityNumber =
      decrementBtn.parentNode.querySelector(".quantity-number");
    let quantity = +quantityNumber.textContent;

    if (quantity <= 1) return;

    quantity--;
    quantityNumber.textContent = quantity;
    const name = quantityNumber.closest(".item").dataset.name;
    modifyCartQuantity(name, quantity);
  }

  if (e.target.closest(".quantity-increment")) {
    const incrementBtn = e.target.closest(".quantity-increment");
    const quantityNumber =
      incrementBtn.parentNode.querySelector(".quantity-number");
    let quantity = +quantityNumber.textContent;

    quantity++;
    quantityNumber.textContent = quantity;
    const name = quantityNumber.closest(".item").dataset.name;
    modifyCartQuantity(name, quantity);
  }
});

function updateCartAddBtnUI(btn) {
  // const quantitySelectorHTML = `<div
  //             class="quantity-selector px-5 py-3 rounded-full bg-primary-red absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-14 justify-between items-center"
  //           >
  //             <button
  //               class="quantity-decrement border border-primary-rose-100 w-5 h-5 rounded-full flex justify-center items-center"
  //             >
  //               <img
  //                 class=""
  //                 src="./assets/images/icon-decrement-quantity.svg"
  //                 alt=""
  //               />
  //             </button>
  //             <p class="quantity-number text-white">1</p>
  //             <button
  //               class="quantity-increment border border-primary-rose-100 w-5 h-5 rounded-full flex justify-center items-center"
  //             >
  //               <img src="./assets/images/icon-increment-quantity.svg" alt="" />
  //             </button>
  //           </div>`;

  // const tempContainer = document.createElement("div");
  // tempContainer.innerHTML = quantitySelectorHTML;

  // const quantitySelectorEl = tempContainer.firstElementChild;

  // btn.parentNode.replaceChild(quantitySelectorEl, btn);

  btn.classList.add("hidden");
  btn.parentNode.insertAdjacentHTML(
    "beforeend",
    `<div
              class="quantity-selector px-5 py-3 rounded-full bg-primary-red absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-14 justify-between items-center"
            >
              <button
                class="quantity-decrement border border-primary-rose-100 w-5 h-5 rounded-full flex justify-center items-center"
              >
                <img
                  class=""
                  src="./assets/images/icon-decrement-quantity.svg"
                  alt=""
                />
              </button>
              <p class="quantity-number text-white">1</p>
              <button
                class="quantity-increment border border-primary-rose-100 w-5 h-5 rounded-full flex justify-center items-center"
              >
                <img src="./assets/images/icon-increment-quantity.svg" alt="" />
              </button>
            </div>`
  );
}

/*
TO DO

1) Slider to change quantity instead of multiple clicks that syncs with map

2) Order Summary 

*/
