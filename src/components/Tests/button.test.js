import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../button";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as cartActions from "@/hooks/cartslice";

const mockStore = configureStore();

describe("Button Component", () => {
  let store;
  const mockJersey = {
    name: "Nigeria Home Jersey",
    price: 120,
    description:
      "Support the super eagles with the all new Nike wingtip jersey.",
  };

  beforeEach(() => {
    store = mockStore({});
    jest.spyOn(store, "dispatch");
  });

  it("renders Add to Cart button", () => {
    render(
      <Provider store={store}>
        <Button quantity={1} jersey={mockJersey} />
      </Provider>
    );
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
  });

  it("dispatches addToCart when main button is clicked", () => {
    render(
      <Provider store={store}>
        <Button quantity={1} jersey={mockJersey} />
      </Provider>
    );
    fireEvent.click(screen.getByText(/Add to Cart/i));
    const actions = store.getActions();
    expect(actions[0]).toEqual(cartActions.addToCart(mockJersey));
  });

  it("dispatches increaseQuantity and decreaseQuantity when +/- buttons clicked", () => {
    render(
      <Provider store={store}>
        <Button quantity={1} jersey={mockJersey} />
      </Provider>
    );

    fireEvent.mouseOver(screen.getByText(/Add to Cart/i));

    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    

    const types = store.getActions().map((a) => a.type);
    expect(types).toContain(cartActions.increaseQuantity(mockJersey.name).type);
    expect(types).toContain(cartActions.decreaseQuantity(mockJersey.name).type);
  });
});
