import { useState } from "react";
import "./App.css";
import Cart from "./Cart";
import { CartProvider, useCart } from "./CartContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CartProvider>
      <div className="grid h-screen max-w-[1150px] grid-rows-[max-content,1fr] md:mx-auto">
        <Header />
        <Main />
      </div>
    </CartProvider>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showCart, setShowCart } = useCart();

  return (
    <header className="relative flex items-center gap-10 p-5 md:mx-10 md:border-b md:px-0 md:py-10">
      <div className="flex">
        <button
          className="w-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <img
            className=""
            src="/src/images/icon-menu.svg"
            alt="Menu icon"
            aria-hidden="true"
          />
        </button>
        <div>
          <img src="/src/images/logo.svg" alt="" />
        </div>
      </div>

      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="relative ml-auto flex items-end gap-5">
        <CartBtn />
        <User />
      </div>
      {showCart && <Cart />}
    </header>
  );
}

function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  function handleClose(e) {
    e.stopPropagation();
    setIsMobileMenuOpen(false);
  }
  return (
    <>
      <div
        className={`absolute left-0 top-0 z-20 h-screen w-screen bg-black/70 ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-500 md:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <nav
        className={`absolute left-0 top-0 z-30 -translate-x-full ${isMobileMenuOpen ? "translate-x-0" : ""} h-screen w-[60%] space-y-10 bg-white p-6 transition-all duration-300 md:relative md:h-auto md:w-auto md:translate-x-0 md:space-y-0 md:bg-transparent md:p-0`}
      >
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img src="/src/images/icon-close.svg" alt="" />
        </button>
        <ul className="flex flex-col gap-5 text-lg font-semibold md:flex-row md:text-base md:font-normal md:text-neutral-dark-grayish-blue">
          <li className="relative">
            <a
              className="hover:text-neutral-very-dark-blue md:after:absolute md:after:bottom-[-2.6rem] md:after:left-0 md:after:h-[4px] md:after:w-0 md:after:bg-primary-orange md:after:transition-all md:after:duration-300 hover:md:after:w-full"
              href="#"
            >
              Collections
            </a>
          </li>
          <li className="relative">
            <a
              className="hover:text-neutral-very-dark-blue md:after:absolute md:after:bottom-[-2.6rem] md:after:left-0 md:after:h-[4px] md:after:w-0 md:after:bg-primary-orange md:after:transition-all md:after:duration-300 hover:md:after:w-full"
              href="#"
            >
              Men
            </a>
          </li>
          <li className="relative">
            <a
              className="hover:text-neutral-very-dark-blue md:after:absolute md:after:bottom-[-2.6rem] md:after:left-0 md:after:h-[4px] md:after:w-0 md:after:bg-primary-orange md:after:transition-all md:after:duration-300 hover:md:after:w-full"
              href="#"
            >
              Women
            </a>
          </li>
          <li className="relative">
            <a
              className="hover:text-neutral-very-dark-blue md:after:absolute md:after:bottom-[-2.6rem] md:after:left-0 md:after:h-[4px] md:after:w-0 md:after:bg-primary-orange md:after:transition-all md:after:duration-300 hover:md:after:w-full"
              href="#"
            >
              About
            </a>
          </li>
          <li className="relative">
            <a
              className="hover:text-neutral-very-dark-blue md:after:absolute md:after:bottom-[-2.6rem] md:after:left-0 md:after:h-[4px] md:after:w-0 md:after:bg-primary-orange md:after:transition-all md:after:duration-300 hover:md:after:w-full"
              href="#"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

function CartBtn() {
  const { cartItems, setShowCart } = useCart();

  return (
    <button
      className="relative text-black"
      onClick={() => setShowCart((show) => !show)}
    >
      <svg
        fill="currentColor"
        className="w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
          fillRule="nonzero"
        />
      </svg>
      {cartItems.length > 0 && (
        <span className="absolute -top-2.5 left-2 rounded-full bg-primary-orange px-2 text-xs font-semibold text-white">
          {cartItems.length}
        </span>
      )}
    </button>
  );
}

function User() {
  return (
    <div className="w-7">
      <img src="/src/images/image-avatar.png" alt="User Avatar" />
    </div>
  );
}

function Main() {
  return (
    <main className="md:grid md:grid-cols-2 md:items-center md:gap-10 md:p-16">
      <ItemPhoto />
      <ItemInfo />
    </main>
  );
}

function ItemPhoto() {
  const [selectedImage, setSelectedImage] = useState(1);

  function handlePreviousImg() {
    setSelectedImage((curr) => (curr === 1 ? 4 : --curr));
  }
  function handleNextImg() {
    setSelectedImage((curr) => (curr === 4 ? 1 : ++curr));
  }

  return (
    <div className="relative w-full md:justify-items-center">
      <div className="absolute top-1/2 w-full md:hidden">
        <button
          className="absolute left-4 grid aspect-square w-10 -translate-y-1/2 place-items-center rounded-full bg-neutral-light-grayish-blue shadow-2xl"
          onClick={handlePreviousImg}
        >
          <img src="/src/images/icon-previous.svg"></img>
        </button>
        <button
          className="absolute right-4 grid aspect-square w-10 -translate-y-1/2 place-items-center rounded-full bg-neutral-light-grayish-blue shadow-2xl"
          onClick={handleNextImg}
        >
          <img src="/src/images/icon-next.svg"></img>
        </button>
      </div>
      <div className="md:max-w-[400px] md:space-y-5">
        <div className="">
          <img
            className="h-[350px] w-full object-cover object-center sm:h-[400px] sm:object-contain md:h-full md:max-h-[500px] md:rounded-xl"
            src={`/src/images/image-product-${selectedImage}.jpg`}
          ></img>
        </div>
        <div className="hidden gap-5 md:flex">
          <button
            className={
              selectedImage === 1
                ? "rounded-xl border-2 border-primary-orange"
                : ""
            }
            onClick={() => setSelectedImage(1)}
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 1 && "opacity-50"}`}
              src="/src/images/image-product-1.jpg"
            ></img>
          </button>
          <button
            onClick={() => setSelectedImage(2)}
            className={
              selectedImage === 2
                ? "rounded-xl border-2 border-primary-orange"
                : ""
            }
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 2 && "opacity-50"}`}
              src="/src/images/image-product-2.jpg"
            ></img>
          </button>
          <button
            onClick={() => setSelectedImage(3)}
            className={
              selectedImage === 3
                ? "rounded-xl border-2 border-primary-orange"
                : ""
            }
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 3 && "opacity-50"}`}
              src="/src/images/image-product-3.jpg"
            ></img>
          </button>
          <button
            onClick={() => setSelectedImage(4)}
            className={
              selectedImage === 4
                ? "rounded-xl border-2 border-primary-orange"
                : ""
            }
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 4 && "opacity-50"}`}
              src="/src/images/image-product-4.jpg"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemInfo() {
  const [quantity, setQuantity] = useState(1);
  const { addtoCart } = useCart();

  function handleAddToCart() {
    const item = {
      thumbnail: "src/images/image-product-1-thumbnail.jpg",
      name: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity,
    };

    addtoCart(item);
  }

  return (
    <div className="space-y-6 p-7">
      <ItemDescription />
      <ItemPrice />
      <div className="flex flex-col gap-5 md:grid md:grid-cols-[auto,1fr] md:gap-2">
        <ItemQuantity quantity={quantity} onQuantityChange={setQuantity} />
        <button
          className="flex w-full items-center justify-center gap-4 rounded-xl bg-primary-orange p-4 text-neutral-very-dark-blue md:gap-2 md:text-sm lg:gap-4 lg:text-base"
          aria-label="Add to cart"
          onClick={handleAddToCart}
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
          <p className="font-bold text-neutral-very-dark-blue">Add to cart</p>
        </button>
      </div>
    </div>
  );
}

function ItemDescription() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-dark-grayish-blue">
        Sneaker Company{" "}
      </p>
      <p className="text-3xl font-bold">Fall Limited Edition Sneakers</p>
      <p className="text-[0.93rem] leading-7 text-neutral-dark-grayish-blue md:!mt-10">
        These low-profile sneakers are your perfect casual wear companion.
        Feauting a durable rubber outer sole. they'll withstand everything the
        weather can offer.
      </p>
    </div>
  );
}

function ItemPrice() {
  return (
    <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-3">
      <div className="flex items-center gap-5">
        <p className="text-3xl font-bold text-neutral-very-dark-blue">
          $125.00
        </p>
        <p className="rounded-md bg-neutral-very-dark-blue px-3 py-0.5 font-bold text-white">
          50%
        </p>
      </div>
      <p className="ml-auto font-bold text-neutral-dark-grayish-blue line-through md:ml-0">
        $250.00
      </p>
    </div>
  );
}

function ItemQuantity({ quantity, onQuantityChange }) {
  return (
    <div className="flex justify-between p-5 md:items-center md:gap-3 md:p-0 lg:gap-10">
      <button
        className="p-2"
        onClick={() =>
          onQuantityChange((quantity) => (quantity > 1 ? --quantity : 1))
        }
      >
        <img className="md:w-3" src="/src/images/icon-minus.svg" alt="" />
      </button>
      <p className="text-lg font-bold text-neutral-very-dark-blue md:text-base">
        {quantity}
      </p>
      <button
        className="p-2"
        onClick={() => onQuantityChange((quantity) => ++quantity)}
      >
        <img className="md:w-3" src="/src/images/icon-plus.svg" alt="" />
      </button>
    </div>
  );
}

export default App;
