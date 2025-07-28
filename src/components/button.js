import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "@/hooks/cartslice";

export default function Button({quantity, jersey}) {
  const dispatch = useDispatch();
  return (
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
      <div className="group-hover:flex items-center hidden delay-200">
        <button
          onClick={() => dispatch(decreaseQuantity(jersey.name))}
          className="bg-gray-300 hover:bg-gray-400 h-full text-xl cursor-pointer py-1 px-4 rounded-l-md delay-200"
        >
          -
        </button>
        <span className="text-center bg-gray-500 px-4 h-full flex justify-center items-center">
          {quantity}
        </span>
        <button
          onClick={() => dispatch(increaseQuantity(jersey.name))}
          className="bg-gray-400 hover:bg-gray-300 h-full text-sm cursor-pointer px-4 py-1 rounded-r-md delay-200"
        >
          +
        </button>
      </div>
    </div>
  );
}
