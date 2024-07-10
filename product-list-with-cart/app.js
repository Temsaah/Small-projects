const itemsContainer = document.querySelector(".items");
const cartContainer = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");

const cartItems = new Map();
updateCartUI();

async function fetchData() {
  const res = await fetch("data.json");
  const data = await res.json();

  let itemsHTML = "";

  for (let item of data) {
    itemsHTML += `<div class="item grid gap-8 " data-name='${
      item.name
    }' data-category='${item.category.toLowerCase()}' data-price='${item.price.toFixed(
      2,
    )}'>
          <div class="thumbnail relative">
            <picture> <source srcset="${
              item.image.desktop
            }" media="(min-width: 1024px)"> <source srcset="${
              item.image.tablet
            }" media="(min-width: 768px) and (max-width: 1023px)"> <source srcset="${
              item.image.mobile
            }" media="(max-width: 767px)"> <img class="item-image w-full max-h-[200px] lg:max-h-[300px] object-cover object-center rounded-lg" src="${
              item.image.mobile
            }" alt="${item.name}"> </picture>
            <button
              class="transition-all absolute add-cart-btn flex justify-center items-center whitespace-nowrap gap-2 text-sm lg:text-sm font-medium border px-10 py-3 rounded-full border-primary-rose-500 bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 hover:text-primary-red hover:border-r-primary-red"
            >
              <img src="assets/images/icon-add-to-cart.svg" /> <p>Add to Cart</p>
            </button>
            <div
              class="hidden quantity-selector transition-all duration-200 px-5 py-3 rounded-full bg-primary-red absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10 lg:gap-9  justify-between items-center"
            >
              <button
                class="quantity-decrement text-white hover:text-primary-red  border border-primary-rose-100 w-5 h-5 rounded-full flex justify-center items-center hover:bg-white"
              >
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/></svg>
              </button>
              <p class="quantity-number text-white">1</p>
              <button
                class="quantity-increment text-white hover:text-primary-red border border-primary-rose-100 w-5 h-5 rounded-full flex justify-center items-center hover:bg-white"
              >
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </button>
            </div>
          </div>
          <div class="item--description grid gap-1">
            <div class="item--category text-sm  text-primary-rose-500">
              <p>${item.category}</p>
            </div>
            <div class="item--name font-medium">
              <p>${item.name}</p>
            </div>
            <div class="item--price font-semibold text-primary-red text-md">
              <p>$${item.price.toFixed(2)}</p>
            </div>
          </div>
        </div>`;
  }

  itemsContainer.innerHTML = itemsHTML;
}

fetchData();

function addToCart(name, category, price) {
  const itemInfo = {
    quantity: 1,
    price: Number(price).toFixed(2),
    category,
  };

  cartItems.set(name, itemInfo);

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

function removeCartItem(name) {
  if (cartItems.has(name)) {
    cartItems.delete(name);
  }

  updateCartUI();
  updateMenuBtn("Add to cart", name);
  resetImageBorder(name);
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector(".cart-items-container");
  const emptyCartContainer = document.querySelector(".empty-cart");

  if (cartItems.size === 0) {
    cartItemsContainer?.remove();

    const cartContainer = document.querySelector(".cart");
    cartContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="empty-cart flex flex-col items-center gap-5">
          <div>
            <img src="assets/images/illustration-empty-cart.svg" />
          </div>
          <p class="text-primary-rose-500 lg:text-sm font-medium">Your added items will appear here</p>
        </div>`,
    );

    updateCartItemsCount();

    return;
  }

  emptyCartContainer?.remove();

  if (!cartItemsContainer) {
    createCartContainer();
  }

  const orderContainer = document.querySelector(".cart--items");

  orderContainer.innerHTML = ""; // RESET Cart

  let cartItemsHTML = "";
  let totalPrice = 0;

  for (let [name, info] of cartItems) {
    cartItemsHTML += `<div class="cart-item flex justify-between items-center" data-name='${name}'>
              <div class="cart-item--info grid gap-2">
                <div class="cart-item--name">
                  <p class="font-medium text-sm">${name}</p>
                </div>
                <div class="cart-item--numbers flex items-center gap-4">
                  <p
                    class="cart-item--quantity text-primary-red font-semibold text-sm"
                  >
                    ${info.quantity}x
                  </p>
                  <p class="cart-item--price text-primary-rose-400 text-sm">
                    @ $${info.price}
                  </p>
                  <p
                    class="cart-item--total text-primary-rose-500 font-medium text-sm"
                  >
                    $${(info.price * info.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                class="remove-item-btn border rounded-full border-primary-rose-400 text-[#CAAFA7] hover:text-primary-rose-900  hover:border-primary-rose-900 scale-100 p-1"
              >
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
              </button>
            </div>`;

    totalPrice += info.price * info.quantity;

    const removeItemBtn = document.querySelectorAll(".remove-item-btn");

    removeItemBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const removePermission = confirm(
          "Are you sure you want to delete item?",
        );

        if (removePermission) {
          const name = btn.closest(".cart-item").dataset.name;
          removeCartItem(name);
        }
      });
    });

    updateCartItemsCount();
    updateOrderTotalPrice();
  }

  orderContainer.innerHTML = cartItemsHTML;
}

function updateCartItemsCount() {
  const cartCountElement = document.querySelector(".cart-number");
  let cartCount = 0;

  for (let { quantity } of cartItems.values()) {
    cartCount += quantity;
  }

  cartCountElement.textContent = cartCount;
}

function calculateOrderPrice() {
  let totalPrice = 0;

  for (let { price, quantity } of cartItems.values()) {
    totalPrice += Number(price * quantity);
  }

  return totalPrice;
}

function updateOrderTotalPrice() {
  const totalPriceEl = document.querySelector(".total-order-price");

  const totalPrice = calculateOrderPrice();

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
          <p class="total-order-price text-2xl font-bold">$0.00</p>
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
          class="confirm-order-btn bg-primary-red hover:bg-red-800 mt-5 p-4 text-white rounded-full font-medium"
        >
          Confirm Order
        </button>
      </div>`,
  );
}

itemsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".add-cart-btn")) {
    const item = e.target.closest(".item");
    const itemName = item.dataset.name;
    const itemCategory = item.dataset.category.split(" ").join("-");
    const itemPrice = item.dataset.price;
    const itemImage = item.querySelector(".item-image");

    addToCart(itemName, itemCategory, itemPrice);
    updateMenuBtn("Quantity selector", itemName);
    addBorderToItemImage(itemImage);
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

cartContainer.addEventListener("click", (e) => {
  if (e.target.closest(".confirm-order-btn")) {
    confirmOrder();
  }
});

function confirmOrder() {
  document.body.classList.add("overflow-hidden"); // prevent scrolling
  overlay.classList.remove("hidden");
  // show the order confirmed container
  // create order summary

  createOrderSummaryContainer();
  calculateOrderSummary();
}

function createOrderSummaryContainer() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div
      class="order-confirmed transition-all duration-700 lg:duration-500 fixed z-20 -bottom-full  lg:translate-y-1/2 w-full lg:w-auto bg-white px-5 lg:px-10 py-10 grid gap-7 rounded-t-xl lg:rounded-t-lg lg:rounded-b-lg"
    >
      <img
        src="./assets/images/icon-order-confirmed.svg"
        alt="order confirmed"
      />
      <div class="success-msg grid gap-3">
        <h2 class="text-4xl font-bold leading-10 mr-10">
          Order Confirmed
        </h2>
        <p class="text-primary-rose-500 text-sm">
          We hope you enjoy your food!
        </p>
      </div>
      <div class="order-summary max-h-[300px] overflow-scroll grid gap-10 p-5"></div>
      <button class="new-order-btn bg-primary-red p-4 lg:py-3 rounded-full text-white font-medium hover:bg-red-800">
        Start New Order
      </button>
    </div>`,
  );

  const orderConfirmedContainer = document.querySelector(".order-confirmed");
  const newOrderBtn = document.querySelector(".new-order-btn");

  newOrderBtn.addEventListener("click", () => {
    resetApp();
  });

  setTimeout(() => {
    if (window.innerWidth >= 1024) {
      orderConfirmedContainer.classList.replace("-bottom-full", "bottom-1/2");
    } else {
      orderConfirmedContainer.classList.replace("-bottom-full", "bottom-0");
    }
  }, 0);
}

function calculateOrderSummary() {
  const orderSummaryContainer = document.querySelector(".order-summary");

  for (let [name, info] of cartItems) {
    orderSummaryContainer.insertAdjacentHTML(
      "beforeend",
      `
          <div class="order-summary-item flex items-center gap-5">
            <div class="item-thumbnail w-12">
              <img
                class="rounded-lg lg:rounded-sm"
                src="./assets/images/image-${info.category}-thumbnail.jpg"
                alt=""
              />
            </div>
            <div class="item-info text-sm flex flex-col justify-between gap-3">
              <p class="item-name font-medium">${name}</p>
              <div class="item-info-quantity-price flex gap-5 lg:mr-64">
                <p class="item-quantity text-primary-red font-semibold">${
                  info.quantity
                }x</p>
                <p class="item-price-per-one font-medium text-primary-rose-500">@ $${
                  info.price
                }
                </p>
              </div>
            </div>
            <div class="item-total-price ml-auto self-center">
              <p class="font-medium text-sm">$${(
                info.price * info.quantity
              ).toFixed(2)}</p>
            </div>
          </div>
        `,
    );
  }

  orderSummaryContainer.insertAdjacentHTML(
    "afterend",
    `<div class="order-total p-5 flex justify-between items-center">
            <p class="text-sm">Order total</p>
            <p class="text-2xl font-bold">$${calculateOrderPrice().toFixed(
              2,
            )}</p>
          </div>`,
  );
}

function updateMenuBtn(newBtn, itemName = null) {
  if (!itemName) {
    const items = document.querySelectorAll(".item");
    newBtn = "Add to cart";
    items.forEach((item) => {
      item.querySelector(".add-cart-btn").classList.remove("hidden");
      item.querySelector(".quantity-selector").classList.add("hidden");
    });
    return;
  }

  const itemContainer = document.querySelector(`[data-name='${itemName}']`);
  const addToCartBtn = itemContainer.querySelector(".add-cart-btn");
  const quantitySelector = itemContainer.querySelector(".quantity-selector");
  const quantityNumber = quantitySelector.querySelector(".quantity-number");

  if (newBtn === "Quantity selector") {
    quantitySelector.classList.remove("hidden");
    addToCartBtn.classList.add("hidden");
  } else if (newBtn === "Add to cart") {
    addToCartBtn.classList.remove("hidden");
    quantitySelector.classList.add("hidden");
    quantityNumber.textContent = 1;
  }
}

function addBorderToItemImage(image) {
  image.classList.add("border-2", "border-primary-red");
}

function resetImageBorder(name) {
  const itemImages = document.querySelectorAll(".item-image");

  if (!name) {
    itemImages.forEach((image) => {
      const itemName = image.closest(".item").dataset.name;
      if (image.classList.contains("border-2")) {
        image.classList.remove("border-2", "border-primary-red");
      }
    });
    return;
  }

  itemImages.forEach((image) => {
    const itemName = image.closest(".item").dataset.name;
    if (image.classList.contains("border-2") && itemName == name) {
      image.classList.remove("border-2", "border-primary-red");
    }
  });
}

function resetApp() {
  const quantitySelectorNumbers = document.querySelectorAll(".quantity-number");

  const orderConfirmedContainer = document.querySelector(".order-confirmed");
  orderConfirmedContainer.classList.replace("bottom-0", "-bottom-full");

  orderConfirmedContainer.remove();
  overlay.classList.add("hidden");

  document.body.classList.remove("overflow-hidden");

  cartItems.clear();

  quantitySelectorNumbers.forEach((selector) => {
    selector.textContent = 1;
  });

  updateMenuBtn();
  resetImageBorder();
  updateCartUI();
}
