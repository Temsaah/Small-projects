function Cart() {
  return (
    <div className="animation-slide-in absolute left-1/2 top-20 flex min-h-64 w-[90%] -translate-x-1/2 flex-col space-y-2 rounded-xl bg-white">
      <div className="border-b px-7 py-5">
        <p className="font-bold">Cart</p>
      </div>
      <div className="!mt-0 grid flex-1 place-items-center font-bold text-neutral-dark-grayish-blue">
        <p>Your Cart is empty.</p>
      </div>
    </div>
  );
}

export default Cart;
