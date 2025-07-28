import { useSelector } from "react-redux";
import JerseyCard from "./jerseyCard";
import Jerseys from "./jersey";

export default function ProductList({ onIncrement, onDecrement }) {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl mt-2 mx-4">Welcome to The Store</h2>
      <div className="w-full h-[630px] bg-gray-100 rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-scroll">
        {Jerseys.map((jersey, idx) => {
          const itemInCart = cartItems.find(
            (item) => item.name === jersey.name
          );
          const quantity = itemInCart ? itemInCart.quantity : 0;

          return (
            <JerseyCard
              key={idx}
              jersey={jersey}
              quantity={quantity}
              onIncrement={() => onIncrement(jersey.name)}
              onDecrement={() => onDecrement(jersey.name)}
            />
          );
        })}
      </div>
    </div>
  );
}
