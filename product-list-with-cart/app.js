const itemsContainer = document.querySelector(".items");

async function fetchData() {
  const res = await fetch("data.json");
  const data = await res.json();
  console.log(data);

  for (let item of data) {
    itemsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="item grid gap-8">
          <div class="thumbnail relative">
            <img
              class="w-full max-h-[200px] object-cover object-center rounded-lg"
              src="${item.image.mobile}"
              alt=""
            />
            <button
              class="absolute flex gap-2 text-sm font-medium border px-8 py-3 rounded-full border-primary-rose-900 bg-white left-1/2 -translate-x-1/2 -translate-y-1/2"
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
}

fetchData();
