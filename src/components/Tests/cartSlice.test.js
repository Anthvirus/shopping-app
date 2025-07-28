import {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} from "@/hooks/cartslice";
import cartReducer from "../../hooks/cartslice";
import { configureStore } from "redux-mock-store";

const mockStore = configureStore([]);
describe("Test cartSlice", () => {
  const mockJersey = [
    {
      id: 1,
      name: "Brazil Jersey",
      price: 25,
      quantity: 0,
    },
    {
      id: 2,
      name: "Argetina Jersey",
      price: 125,
      quantity: 0,
    },
  ];
  const initialState = {
    items: [],
  };
  beforeEach(() => {
    const store = mockStore({
      cart: {
        items: [mockJersey],
      },
    });
  });
  it("should set the cart", ()=>{
    const newCart = {
      items: []
    }
    const action = setCart();
    expect(action.type).toBe("cart/setCart")
    expect(action.payload).toEqual();

  })
  it("should increase quantity or add to cart if item doesn't exist yet", () => {
    const action = addToCart(mockJersey);
    const newState = cartReducer(initialState, action);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(1);
    expect(action.type).toBe("cart/addToCart");
    expect(action.payload).toEqual(mockJersey);
  });

  it("should remove from cart if item exists", () => {
    const existingState = {
      items: [{ ...mockJersey, quantity: 12 }],
    };
    const action = removeFromCart(mockJersey);
    const newState = cartReducer(existingState, action);
    expect(newState.items).toHaveLength(0);
    expect(action.type).toBe("cart/removeFromCart");
    expect(action.payload).toEqual(mockJersey);
  });
  it("should decrease quantity or remove to cart if item exists", () => {
    const existingState = {
      items: [{ ...mockJersey, quantity: 3 }],
    };
    const action = decreaseQuantity(mockJersey);
    const newState = cartReducer(existingState, action);
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.items).toHaveLength(1);
    expect(action.type).toBe("cart/decreaseQuantity");
    expect(action.payload).toEqual(mockJersey);
  });
  it("should increase quantity if item exists", () => {
    const existingState = {
      items: [{ ...mockJersey, quantity: 4 }],
    };
    const action = increaseQuantity(mockJersey);
    const newState = cartReducer(existingState, action);
    expect(newState.items[0].quantity).toBe(5);
    expect(newState.items).toHaveLength(1);
    expect(action.type).toBe("cart/increaseQuantity");
    expect(action.payload).toEqual(mockJersey);
  });
  it("should reset cart", () => {
    const existingState = {
      items: [{ ...mockJersey, quantity: 2 }],
    };
    const action = resetCart(mockJersey);
    const newState = cartReducer(existingState, action);
    expect(newState.items).toHaveLength(0);
    expect(action.type).toBe("cart/resetCart");
    expect(action.payload).toEqual(mockJersey);
  });
});
