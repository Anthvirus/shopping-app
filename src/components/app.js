"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useSeerbitPayment } from "seerbit-reactjs";
import {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart
} from "../hooks/cartslice";
import Image from "next/image";
import Jerseys from "./jersey";

// const baseURL = "https://pay.seerbitapi.com/77398444";

export default function App() {
  const [itemNo, setItemNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const options = {
    public_key: "SBTESTPUBK_ADBheZyCqBXYhFqJdNDVRv9bwRsPHhQh",
    amount: `${
      cartItems
        .reduce((total, item) => total + item.quantity * item.price * 1500, 0)
        .toFixed(2)
    }`,
    tranref: new Date().getTime(),
    currency: "NGN",
    email: "test@mail.com",
    full_name: "Sam Smith",
    mobile_no: "081234566789",
    description: "test",
    tokenize: false,
    planId: "",
    pocketId: "",
    vendorId: "",
    customization: {
      theme: {
        border_color: "#000000",
        background_color: "#004C64",
        button_color: "#0084A0",
      },
      payment_method: ["card", "account", "transfer", "wallet", "ussd"],
      display_fee: false, // true
      display_type: "embed", //inline
      logo: "logo_url | base64",
    },
  };

  const close = (close) => {
    console.log(close);
    dispatch(resetCart());
  };

  const callback = (response) => {
    console.log(response);
    setTimeout(() => closeCheckout(), 2000);
  };

  const seerbitPay = useSeerbitPayment(options, callback, close);


  useEffect(() => {
    const now = Date.now();
    localStorage.setItem(
      "cartData",
      JSON.stringify({ cart: cartItems, timestamp: now })
    );
  }, [cartItems]);

  useEffect(() => {
    setItemNo(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  return (
    <section className="flex flex-col max-w-screen h-screen bg-gray-200 gap-4 justify-start p-4">
      <div className="flex bg-gray-100 p-4 rounded-xl">
        <div className="text-3xl font-extrabold ml-12 flex items-center">
          <div className="w-10 h-10 rounded-full absolute bg-green-200 -ml-5"></div>
          <div className="w-10 h-10 rounded-full absolute bg-green-200"></div>
          <h1 className="z-10">Le Store.</h1>
        </div>
        <button
          className="ml-auto mr-12 cursor-pointer delay-100 hover:scale-110 transition-all"
          onClick={() => setShowCart(true)}
        >
          <div className="bg-gray-500 text-white rounded-full h-4 w-4 text-xs relative z-10 -m-2 flex justify-center items-center">
            {itemNo}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#121929"
          >
            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
          </svg>
        </button>
      </div>

      <div className="gap-4 w-full h-full bg-gray-300 rounded-xl p-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl mt-2 mx-4">Welcome to The Store</h2>
          <div className="w-full h-[630px] bg-gray-100 rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-scroll">
            {Jerseys.map((jersey, idx) => {
              const itemInCart = cartItems.find(
                (item) => item.name === jersey.name
              );
              const quantity = itemInCart ? itemInCart.quantity : 0;

              return (
                <div
                  key={idx}
                  className="rounded-lg hover:shadow-xl shadow-md gap-4 flex bg-gray-200 items-center p-2 hover:grayscale-25"
                >
                  <Image
                    width={100}
                    height={100}
                    src={jersey.image}
                    alt={jersey.description}
                    className="w-auto h-auto rounded-[inherit]"
                  />
                  <div className="flex flex-col justify-between p-1 w-full h-full">
                    <div className="flex flex-col gap-2 justify-center items-start">
                      <p className="text-xl font-semibold">{jersey.name}</p>
                      <p>{jersey.description}</p>
                    </div>
                    <div className="flex p-2 justify-between items-center">
                      <div className="flex cursor-pointer justify-center delay-200 gap-2 font-semibold group">
                        <button
                          className="delay-200 group flex font-semibold flex-row-reverse p-2 rounded-md gap-2 bg-gray-50 cursor-pointer"
                          onClick={() => dispatch(addToCart(jersey))}
                        >
                          <p className="flex gap-4">
                            Add to Cart
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#121929"
                            >
                              <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                            </svg>
                          </p>
                        </button>
                        <div className="group-hover:flex items-center hidden">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(jersey.name))
                            }
                            className="bg-gray-300 hover:bg-gray-400 h-full text-xl cursor-pointer py-1 px-4 rounded-l-md"
                          >
                            -
                          </button>
                          <span className="text-center bg-gray-500 px-4 h-full flex justify-center items-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(jersey.name))
                            }
                            className="bg-gray-400 hover:bg-gray-300 h-full text-sm cursor-pointer px-4 py-1 rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-semibold text-3xl">£{jersey.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showCart && (
          <div className="fixed right-0 top-0 w-[400px] h-full bg-white shadow-2xl z-50 flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="hover:scale-110 delay-100 text-xl cursor-pointer"
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
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-2"
                  >
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
                          className="bg-gray-300 px-2 rounded hover:scale-110 cursor-pointer delay-100"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.name))}
                          className="bg-gray-300 px-2 rounded hover:scale-110 delay-100 cursor-pointer"
                        >
                          +
                        </button>
                        <button
                          onClick={() => dispatch(removeFromCart(item.name))}
                          className="ml-auto hover:scale-110 delay-100 cursor-pointer rounded-xl bg-red-200 p-2 text-xs"
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
                    .reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                    .toFixed(2)}
                </p>
                <button
                  className="mt-2 w-full bg-gray-600 hover:scale-105 cursor-pointer delay-100 text-white font-semibold py-2 rounded"
                  onClick={seerbitPay}
                >
                  {isLoading ?(<div className="animate-bounce opacity-10 cursor-none">Proceed To Checkout</div>): (<div>Proceed To Checkout</div>)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
