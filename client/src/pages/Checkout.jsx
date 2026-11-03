import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
} from '../app/feature/cartSlice';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Tag,
  Check,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartSubtotal = useSelector(selectCartSubtotal);

  // Flow State
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    country: 'United States',
    shippingSpeed: 'standard', // standard | express
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | applepay | cod
  const [cardData, setCardData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    nameOnCard: 'Alex Morgan',
    expiry: '12/28',
    cvv: '888',
  });

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const currency = cartItems[0]?.currency || 'USD';
  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);

  const shippingCost = shippingData.shippingSpeed === 'express' ? 15 : 0;
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + estimatedTax);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'SHOPEASE10' || code === 'SAVE10') {
      setDiscountPercent(10);
      setCouponSuccess('10% discount applied successfully!');
    } else if (code === 'FREESHIP') {
      setCouponSuccess('Free express shipping applied!');
      setShippingData((prev) => ({ ...prev, shippingSpeed: 'standard' }));
    } else {
      setCouponError('Invalid coupon code. Try "SHOPEASE10" for 10% off.');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `SE-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setIsOrderPlaced(true);
      dispatch(clearCart());
    }, 1200);
  };

  // If order is placed, show confirmation screen
  if (isOrderPlaced) {
    return (
      <main className="container py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-12 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <CheckCircle2 size={44} />
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            Order Confirmed
          </span>

          <h1 className="mt-4 text-3xl font-black text-gray-900">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We've sent an order confirmation and digital receipt to{' '}
            <span className="font-semibold text-gray-900">{shippingData.email}</span>.
          </p>

          <div className="my-8 rounded-2xl bg-gray-50 p-6 text-left border border-gray-100">
            <div className="flex justify-between items-center text-sm pb-3 border-b border-gray-200">
              <span className="text-gray-500">Order Number</span>
              <span className="font-mono font-bold text-gray-900">{orderId}</span>
            </div>
            <div className="flex justify-between items-center text-sm py-3 border-b border-gray-200">
              <span className="text-gray-500">Estimated Delivery</span>
              <span className="font-semibold text-gray-900">3-5 Business Days</span>
            </div>
            <div className="flex justify-between items-center text-sm py-3 border-b border-gray-200">
              <span className="text-gray-500">Shipping Address</span>
              <span className="font-medium text-gray-900 text-right truncate max-w-[200px]">
                {shippingData.address}, {shippingData.city}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm pt-3">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-gray-900 text-base">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // If cart is empty and order wasn't placed
  if (cartItems.length === 0) {
    return (
      <main className="container py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-10">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            <span>Browse Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-10">
      {/* Checkout Progress Stepper */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          {[
            { num: 1, title: 'Shipping' },
            { num: 2, title: 'Payment' },
            { num: 3, title: 'Review & Confirm' },
          ].map((s, index, arr) => (
            <React.Fragment key={s.num}>
              <button
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                    currentStep === s.num
                      ? 'bg-black text-white shadow-md'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > s.num ? <Check size={16} /> : s.num}
                </div>
                <span
                  className={`hidden sm:inline text-sm font-semibold ${
                    currentStep === s.num ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {s.title}
                </span>
              </button>
              {index < arr.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-4 transition ${
                    currentStep > s.num ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Form Area (Steps) */}
        <section className="lg:col-span-7">
          <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs">
            {/* STEP 1: Shipping Address */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipping Information
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentStep(2);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.firstName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, firstName: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.lastName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, lastName: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingData.address}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, address: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.state}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, state: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.zip}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, zip: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Shipping Speed Selection */}
                  <div className="pt-4">
                    <span className="block text-xs font-semibold text-gray-700 mb-2">
                      Delivery Method
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                          shippingData.shippingSpeed === 'standard'
                            ? 'border-black bg-gray-50 ring-1 ring-black'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingSpeed"
                            value="standard"
                            checked={shippingData.shippingSpeed === 'standard'}
                            onChange={() =>
                              setShippingData({ ...shippingData, shippingSpeed: 'standard' })
                            }
                            className="accent-black"
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-900">Standard Shipping</p>
                            <p className="text-xs text-gray-500">4-6 Business Days</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">FREE</span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                          shippingData.shippingSpeed === 'express'
                            ? 'border-black bg-gray-50 ring-1 ring-black'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingSpeed"
                            value="express"
                            checked={shippingData.shippingSpeed === 'express'}
                            onChange={() =>
                              setShippingData({ ...shippingData, shippingSpeed: 'express' })
                            }
                            className="accent-black"
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-900">Express Priority</p>
                            <p className="text-xs text-gray-500">1-2 Business Days</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-900">$15.00</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: Payment Method */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <ShieldCheck size={16} />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 rounded-xl bg-gray-100 p-1 mb-6">
                  {[
                    { id: 'card', label: 'Credit Card', icon: <CreditCard size={16} /> },
                    { id: 'applepay', label: 'Apple Pay / Digital', icon: <Lock size={16} /> },
                    { id: 'cod', label: 'Cash on Delivery', icon: <Truck size={16} /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPaymentMethod(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition ${
                        paymentMethod === tab.id
                          ? 'bg-white text-gray-900 shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCurrentStep(3);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.cardNumber}
                        onChange={(e) =>
                          setCardData({ ...cardData, cardNumber: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono focus:border-black focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.nameOnCard}
                        onChange={(e) =>
                          setCardData({ ...cardData, nameOnCard: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-black focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={cardData.expiry}
                          onChange={(e) =>
                            setCardData({ ...cardData, expiry: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono focus:border-black focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) =>
                            setCardData({ ...cardData, cvv: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono focus:border-black focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
                      >
                        <ArrowLeft size={16} />
                        <span>Back to Shipping</span>
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                      >
                        <span>Review Order</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {paymentMethod !== 'card' && (
                  <div className="py-8 text-center space-y-4">
                    <p className="text-sm text-gray-600">
                      You will confirm this payment option upon clicking the final confirmation.
                    </p>
                    <div className="flex justify-between items-center pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
                      >
                        <ArrowLeft size={16} />
                        <span>Back to Shipping</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                      >
                        <span>Review Order</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Review & Place Order */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>

                {/* Recap Cards */}
                <div className="space-y-4 mb-6">
                  <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200/80">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Shipping To
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-black underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {shippingData.firstName} {shippingData.lastName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {shippingData.address}, {shippingData.city}, {shippingData.state} {shippingData.zip}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{shippingData.email}</p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200/80">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Payment Method
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-black underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {paymentMethod === 'card'
                        ? `Credit Card ending in ${cardData.cardNumber.slice(-4)}`
                        : paymentMethod === 'applepay'
                        ? 'Apple Pay / One-Touch'
                        : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Processing Order...</span>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Place Order • {formatPrice(grandTotal)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Order Summary & Cart Items */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary ({cartItems.reduce((acc, it) => acc + it.quantity, 0)} items)
            </h3>

            {/* Items list */}
            <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 pr-1">
              {cartItems.map((item) => {
                const id = item._id || item.id;
                return (
                  <div key={id} className="flex gap-3 py-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-lg bg-gray-100 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="mt-4 pt-4 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Promo or Gift Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SHOPEASE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs uppercase focus:border-black focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-200 transition"
                >
                  Apply
                </button>
              </div>
              {couponSuccess && (
                <p className="mt-1.5 text-xs text-emerald-600 font-semibold">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{couponError}</p>
              )}
            </form>

            {/* Pricing Breakdown */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-base text-gray-900">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
