import { Provider } from "react-redux";
import ProductList from "../productList";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import CartReducer from "@/hooks/cartslice"
import "@testing-library/jest-dom";


const mockStore = configureStore();

describe("ProductList Component", () => {
  let store;

  const mockProducts = [{name: "Brazil Jersey", price: 23, quantity: 0}];

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: mockProducts,
      },
    });
    jest.spyOn(store, 'dispatch')
  });

  it("renders all products", () => {
    render(
      <Provider store={store}>
        <ProductList onDecrement={()=>{}} onIncrement={()=>{}}/>
      </Provider>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    const incrementButtons = screen.getAllByText("+");
    const decrementButtons = screen.getAllByText("-");

    fireEvent.click(incrementButtons[0]);
    fireEvent.click(decrementButtons[0]);

    expect(store.dispatch).toHaveBeenCalled();

    expect(incrementButtons.length).toBeGreaterThan(0);
    expect(decrementButtons.length).toBeGreaterThan(0);
  });
});
