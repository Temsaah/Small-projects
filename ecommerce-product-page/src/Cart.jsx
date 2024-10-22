import { useCart } from "./CartContext";

function Cart() {
  const { cartItems } = useCart();

  return (
    <div className="animation-slide-in absolute right-2 top-20 md:top-24 z-30 flex min-h-64 w-[95%] max-w-[400px] -translate-x-1/2 flex-col rounded-xl bg-white shadow-xl sm:right-0 2xl:!translate-x-1/3">
      <div className="border-b px-7 py-5">
        <p className="font-bold">Cart</p>
      </div>
      {cartItems.length > 0 ? (
        <CartItems />
      ) : (
        <div className="!mt-0 grid flex-1 place-items-center font-bold text-neutral-dark-grayish-blue">
          <p>Your Cart is empty.</p>
        </div>
      )}
    </div>
  );
}

function CartItems() {
  const { cartItems } = useCart();

  return (
    <div className="grid gap-6 p-6">
      {cartItems.map((item) => (
        <CartItem key={item.name} item={item} />
      ))}
      <button className="rounded-xl bg-primary-orange p-4 font-bold text-neutral-very-dark-blue">
        Checkout
      </button>
    </div>
  );
}

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  function handleDeleteItem() {
    removeFromCart(item.name);
  }

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div>
        <img className="w-12 rounded-lg" src={item.thumbnail}></img>
      </div>
      <div className="grid gap-1">
        <p className="text-neutral-dark-grayish-blue">{item.name}</p>
        <div className="flex gap-3">
          <p className="text-neutral-dark-grayish-blue">
            ${item.price.toFixed(2)}
          </p>
          <p className="text-neutral-dark-grayish-blue">x {item.quantity}</p>
          <p className="font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <button onClick={handleDeleteItem}>
        <img src="/src/images/icon-delete.svg"></img>
      </button>
    </div>
  );
}

export default Cart;
