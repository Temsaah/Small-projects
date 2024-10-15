import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

function Header() {
  return (
    <header className="flex items-center p-5">
      <button className="w-10">
        <img
          className=""
          src="/src/images/icon-menu.svg"
          alt="Menu icon "
          aria-hidden="true"
        />
      </button>
      <div>
        <img src="/src/images/logo.svg" alt="" />
      </div>
      <div className="ml-auto flex gap-5">
        <button className="text-white">
          <img
            className="fill-current text-white"
            src="/src/images/icon-cart.svg"
            alt="Shopping cart"
          />
        </button>
        <div className="w-7">
          <img src="/src/images/image-avatar.png" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
}

function Main() {
  return (
    <main className="">
      <ItemPhoto />
      <ItemInfo />
    </main>
  );
}

function ItemPhoto() {
  return (
    <div className="w-full">
      <img
        className="h-[300px] w-full object-cover object-center"
        src="/src/images/image-product-1.jpg"
      ></img>
    </div>
  );
}

function ItemInfo() {
  return (
    <div className="space-y-5 p-7">
      <ItemDescription />
      <ItemPrice />
      <ItemQuantity />
      <button
        className="bg-primary-orange text-neutral-very-dark-blue flex w-full items-center justify-center gap-4 rounded-xl p-4"
        aria-label="Add to cart"
      >
        <svg
          fill="currentColor"
          className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fillRule="nonzero"
          />
        </svg>
        <p className="text-neutral-very-dark-blue font-bold">Add to cart</p>
      </button>
    </div>
  );
}

function ItemDescription() {
  return (
    <div className="space-y-3">
      <p className="text-neutral-dark-grayish-blue text-xs font-bold uppercase tracking-widest">
        Sneaker Company{" "}
      </p>
      <p className="text-3xl font-bold">Fall Limited Edition Sneakers</p>
      <p className="text-neutral-dark-grayish-blue text-[0.93rem]">
        These low-profile sneakers are your perfect casual wear companion.
        Feauting a durable rubber outer sole. they'll withstand everything the
        weather can offer.
      </p>
    </div>
  );
}

function ItemPrice() {
  return (
    <div className="flex items-center gap-5">
      <p className="text-neutral-very-dark-blue text-3xl font-bold">$125.00</p>
      <p className="bg-neutral-very-dark-blue rounded-md px-3 py-0.5 font-bold text-white">
        50%
      </p>
      <p className="text-neutral-dark-grayish-blue ml-auto font-bold line-through">
        $250.00
      </p>
    </div>
  );
}

function ItemQuantity() {
  return (
    <div className="flex justify-between p-5">
      <button>
        <img src="/src/images/icon-minus.svg" alt="" />
      </button>
      <p className="text-neutral-very-dark-blue text-lg font-bold">0</p>
      <button>
        <img src="/src/images/icon-plus.svg" alt="" />
      </button>
    </div>
  );
}

export default App;
