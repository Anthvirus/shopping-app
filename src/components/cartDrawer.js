import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart,
} from "@/hooks/cartslice";
import Image from "next/image";
import { useSeerbitPayment } from "seerbit-reactjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Cart({ closeCart, showCart }) {
  const [rate, setRate] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  async function fetchRate() {
    try {
      const response = await axios.get(
        "https://v6.exchangerate-api.com/v6/e0d6e1f47cf0cf574d31eb88/pair/GBP/NGN"
      );
      const exchangeRate = response.data.conversion_rate;
      setRate(exchangeRate);
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
    }
  }

  useEffect(()=>{
    fetchRate();
    const interval = setInterval(fetchRate, 24*60*60*1000);
    return() => clearInterval(interval)
}, [])

  function closeCheckout() {
    dispatch(resetCart());
  }

  const options = {
    public_key: "SBTESTPUBK_ADBheZyCqBXYhFqJdNDVRv9bwRsPHhQh",
    amount: `${cartItems
      .reduce((total, item) => total + item.quantity * item.price * rate, 0)
      .toFixed(2)}`,
    tranref: new Date().getTime(),
    currency: "NGN",
    email: "test@mail.com",
    full_name: "Sam Smith",
    mobile_no: "081234566789",
    description: "test",
    tokenize: false,
    customization: {
      theme: {
        border_color: "#000000",
        background_color: "#004C64",
        button_color: "#0084A0",
      },
      payment_method: ["card", "account", "transfer", "wallet", "ussd"],
      display_fee: false,
      display_type: "embed",
      logo: "logo_url",
    },
  };

  const close = () => {};
  const callback = (response) => {
    setTimeout(() => closeCheckout(), 2000);
  };
  const seerbitPay = useSeerbitPayment(options, callback, close);

  if (!showCart) return null;

  return (
    <div className="fixed right-0 top-0 w-[400px] h-full bg-white shadow-2xl z-50 flex flex-col p-4 delay-300 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={closeCart}
          className="hover:scale-105 delay-200 text-xl cursor-pointer"
        >
          ✕
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-700 font-semibold mt-8 text-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-2">
              <Image
                src={item.image}
                width={60}
                height={60}
                alt={item.name}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-lg font-semibold text-gray-600">
                  £{item.price}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.name))}
                    className="bg-gray-300 px-2 rounded hover:scale-110 cursor-pointer delay-200"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.name))}
                    className="bg-gray-300 px-2 rounded hover:scale-110 delay-200 cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    aria-label="Remove Item"
                    onClick={() => dispatch(removeFromCart(item.name))}
                    className="ml-auto hover:scale-110 delay-200 cursor-pointer rounded-xl bg-red-200 p-2 text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#EF2F2A"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="font-bold text-lg">
            Total: £
            {cartItems
              .reduce((total, item) => total + item.quantity * item.price, 0)
              .toFixed(2)}
          </p>
          <button
            className="mt-2 w-full bg-gray-600 hover:scale-[101%] cursor-pointer delay-200 text-white font-semibold py-2 rounded"
            onClick={seerbitPay}
          >
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  );
}
