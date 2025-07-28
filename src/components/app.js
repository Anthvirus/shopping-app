"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import Cart from "./cartDrawer";
import ProductList from "./productList";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const itemNo = cartItems.reduce((total, item) => total + item.quantity, 0);

  function openCart(){
    setShowCart(true);
  }
  function closeCart(){
    setShowCart(false);
  }

  return (
    <section className="flex flex-col max-w-screen h-screen bg-gray-200 gap-4 justify-start p-4 delay-300">
      <Header toggleCart={openCart} itemNo={itemNo} />
      <ProductList cartItems={cartItems} />
      {showCart && <Cart closeCart={closeCart} showCart={showCart}/>}
    </section>
  );
}
