import { useState } from "react";
import "./App.css";
import Cart from "./Cart";
import { useCart } from "./CartContext";

function App() {
  const { previewGallery } = useCart();

  return (
    <>
      {previewGallery.isOpen && <GalleryPreview />}
      <div className="grid h-screen max-w-[1150px] grid-rows-[max-content,1fr] md:mx-auto">
        <Header />
        <Main />
      </div>
    </>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showCart } = useCart();

  return (
    <header className="relative flex items-center gap-10 p-5 md:mx-10 md:border-b md:px-0 md:py-10">
      <div className="flex">
        <button
          className="w-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <img
            className=""
            src="src/images/icon-menu.svg"
            alt="Menu icon"
            aria-hidden="true"
          />
        </button>
        <div>
          <img src="src/images/logo.svg" alt="" />
        </div>
      </div>

      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="relative ml-auto flex items-end gap-5 md:items-center md:gap-9">
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
        className={`absolute left-0 top-0 z-40 h-screen w-screen bg-black/70 ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-500 md:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <nav
        className={`absolute left-0 top-0 z-[49] -translate-x-full ${isMobileMenuOpen ? "translate-x-0" : ""} h-screen w-[60%] space-y-10 bg-white p-6 transition-all duration-300 md:relative md:h-auto md:w-auto md:translate-x-0 md:space-y-0 md:bg-transparent md:p-0`}
      >
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img src="src/images/icon-close.svg" alt="" />
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
      className="relative text-neutral-dark-grayish-blue hover:text-black"
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
    <div className="w-7 border-2 border-transparent hover:rounded-full md:w-11 md:hover:border-2 md:hover:border-primary-orange">
      <img src="src/images/image-avatar.png" alt="User Avatar" />
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

function ItemPhoto({ isPreview, children }) {
  const { previewGallery, setPreviewGallery } = useCart();
  const [selectedImage, setSelectedImage] = useState(
    previewGallery.currentPhoto || 1,
  );

  function handlePreviousImg() {
    setSelectedImage((curr) => (curr === 1 ? 4 : --curr));
  }
  function handleNextImg() {
    setSelectedImage((curr) => (curr === 4 ? 1 : ++curr));
  }

  function handlePhotoPreview() {
    setPreviewGallery({ isOpen: true, currentPhoto: selectedImage });
  }

  return (
    <div className="relative w-full md:w-auto md:justify-items-center">
      <CarouselButtons
        handlePreviousImg={handlePreviousImg}
        handleNextImg={handleNextImg}
      />
      <div
        className={`grid justify-items-center md:max-w-[400px] md:space-y-5 ${isPreview && "md:max-w-[600px]"}`}
      >
        <div className="relative w-full">
          <button
            className="pointer-events-none w-full md:pointer-events-auto"
            onClick={handlePhotoPreview}
          >
            <img
              className={`h-[300px] w-full object-cover object-center sm:h-[400px] sm:object-contain md:h-full md:max-h-[500px] md:rounded-xl ${isPreview && "md:h-[600px] md:max-h-full md:object-cover"}`}
              src={`src/images/image-product-${selectedImage}.jpg`}
            ></img>
          </button>
          {isPreview && (
            <CarouselButtons
              isPreview={true}
              handlePreviousImg={handlePreviousImg}
              handleNextImg={handleNextImg}
            />
          )}
        </div>
        <div className="hidden max-w-[400px] gap-5 md:flex">
          <button
            className={`relative after:absolute after:top-0 after:block after:h-full after:w-full after:rounded-xl after:bg-white after:opacity-0 ${
              selectedImage === 1
                ? "rounded-xl border-2 border-primary-orange after:opacity-60"
                : "hover:after:opacity-40"
            }`}
            onClick={() => setSelectedImage(1)}
          >
            <img
              className={`rounded-lg transition-all ${selectedImage === 1 && ""}`}
              src="src/images/image-product-1.jpg"
            ></img>
          </button>
          <button
            onClick={() => setSelectedImage(2)}
            className={`relative after:absolute after:top-0 after:block after:h-full after:w-full after:rounded-xl after:bg-white after:opacity-0 ${
              selectedImage === 2
                ? "rounded-xl border-2 border-primary-orange after:opacity-60"
                : "hover:after:opacity-40"
            }`}
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 2 && "opacity-50"}`}
              src="src/images/image-product-2.jpg"
            ></img>
          </button>
          <button
            onClick={() => setSelectedImage(3)}
            className={`relative after:absolute after:top-0 after:block after:h-full after:w-full after:rounded-xl after:bg-white after:opacity-0 ${
              selectedImage === 3
                ? "rounded-xl border-2 border-primary-orange after:opacity-60"
                : "hover:after:opacity-40"
            }`}
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 3 && "opacity-50"}`}
              src="src/images/image-product-3.jpg"
            ></img>
          </button>
          <button
            onClick={() => setSelectedImage(4)}
            className={`relative after:absolute after:top-0 after:block after:h-full after:w-full after:rounded-xl after:bg-white after:opacity-0 ${
              selectedImage === 4
                ? "rounded-xl border-2 border-primary-orange after:opacity-60"
                : "hover:after:opacity-40"
            }`}
          >
            <img
              className={`rounded-lg transition-all hover:opacity-50 ${selectedImage === 4 && "opacity-50"}`}
              src="src/images/image-product-4.jpg"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemInfo() {
  const [quantity, setQuantity] = useState(0);
  const { addtoCart } = useCart();

  function handleAddToCart() {
    if (quantity < 1) return;
    const item = {
      thumbnail: "src/images/image-product-1-thumbnail.jpg",
      name: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity,
    };

    addtoCart(item);
  }

  return (
    <div className="space-y-6 p-6">
      <ItemDescription />
      <ItemPrice />
      <div className="flex flex-col gap-5 md:grid md:grid-cols-[auto,1fr] md:gap-2">
        <ItemQuantity quantity={quantity} onQuantityChange={setQuantity} />
        <button
          className="flex w-full items-center justify-center gap-4 rounded-xl bg-primary-orange p-4 text-neutral-very-dark-blue hover:bg-primary-orange/70 md:gap-2 md:text-sm lg:gap-4 lg:text-base"
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
    <div className="space-y-4">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-dark-grayish-blue">
        Sneaker Company{" "}
      </p>
      <p className="text-4xl font-bold">Fall Limited Edition Sneakers</p>
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
        className="p-2 text-primary-orange hover:text-primary-orange/70"
        onClick={() =>
          onQuantityChange((quantity) => (quantity > 1 ? --quantity : 1))
        }
      >
        <svg
          width="12"
          height="4"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
              id="a"
            />
          </defs>
          <use fill="currentColor" fillRule="nonzero" xlinkHref="#a" />
        </svg>{" "}
      </button>
      <p className="text-lg font-bold text-neutral-very-dark-blue md:text-base">
        {quantity}
      </p>
      <button
        className="p-2 text-primary-orange hover:text-primary-orange/70"
        onClick={() => onQuantityChange((quantity) => ++quantity)}
      >
        <svg
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
              id="b"
            />
          </defs>
          <use fill="currentColor" fillRule="nonzero" xlinkHref="#b" />
        </svg>
      </button>
    </div>
  );
}

function GalleryPreview() {
  const { setPreviewGallery } = useCart();

  function handleClosePreview() {
    setPreviewGallery((prev) => ({ ...prev, isOpen: false }));
  }

  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center">
      <div
        className="absolute h-screen w-full bg-black/85"
        onClick={handleClosePreview}
      ></div>

      <div className="z-50 flex flex-col gap-6">
        <div className="self-end text-white hover:text-primary-orange">
          <button onClick={handleClosePreview}>
            <svg
              className="scale-125"
              width="14"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <ItemPhoto isPreview={true} />
      </div>
    </div>
  );
}

function CarouselButtons({ isPreview, handlePreviousImg, handleNextImg }) {
  return (
    <div
      className={`absolute top-1/2 z-10 w-full ${isPreview ? "md:block" : "md:hidden"}`}
    >
      <button
        className={`absolute hover:text-primary-orange ${isPreview ? "-left-6 w-12" : "left-4 w-10"} grid aspect-square -translate-y-1/2 place-items-center rounded-full bg-neutral-light-grayish-blue shadow-2xl`}
        onClick={handlePreviousImg}
      >
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>{" "}
      </button>
      <button
        className={`absolute hover:text-primary-orange ${isPreview ? "-right-6 w-12" : "right-4 w-10"} grid aspect-square -translate-y-1/2 place-items-center rounded-full bg-neutral-light-grayish-blue shadow-2xl`}
        onClick={handleNextImg}
      >
        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>{" "}
      </button>
    </div>
  );
}

export default App;
