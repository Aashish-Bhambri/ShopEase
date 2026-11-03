import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartSubtotal,
  setCartItemQuantity,
} from '../app/feature/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const formatPrice = (price, currency = 'USD') =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(price);

  if (items.length === 0) {
    return (
      <main className="container py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
          <ShoppingCart size={40} className="text-gray-400" />
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-600">Add something you love and it will show up here.</p>
          <Link to="/shop" className="btn-primary mt-6">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="mt-1 text-sm text-gray-600">
            {items.reduce((count, item) => count + item.quantity, 0)} items
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="text-sm font-medium text-gray-600 underline hover:text-gray-900 cursor-pointer"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4" aria-label="Cart items">
          {items.map((item) => {
            const id = item._id ?? item.id;
            return (
              <article
                key={id}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:gap-6 shadow-xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl bg-gray-100 object-cover sm:h-32 sm:w-32 shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs uppercase font-bold tracking-wider text-gray-400">
                      {item.brand}
                    </p>
                    <h2 className="mt-1 font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-2 font-bold text-gray-900">
                      {formatPrice(item.price, item.currency)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() =>
                          dispatch(setCartItemQuantity({ id, quantity: item.quantity - 1 }))
                        }
                        className="p-2 text-gray-600 hover:text-gray-900 transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() =>
                          dispatch(setCartItemQuantity({ id, quantity: item.quantity + 1 }))
                        }
                        className="p-2 text-gray-600 hover:text-gray-900 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => dispatch(removeFromCart(id))}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
          <div className="mt-5 flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">
              {formatPrice(subtotal, items[0]?.currency)}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Shipping and taxes are calculated at checkout.
          </p>
          <div className="my-5 border-t border-gray-200" />
          <div className="flex justify-between font-bold text-gray-900 text-base">
            <span>Estimated Total</span>
            <span>{formatPrice(subtotal, items[0]?.currency)}</span>
          </div>

          <Link
            to="/checkout"
            className="btn-primary mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
