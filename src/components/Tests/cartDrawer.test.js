import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../cartDrawer";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

describe("Cart with items", () => {
  let store;

  const mockCartItems = [
    {
      name: "Brazil Jersey",
      description: "Home kit 2024",
      price: 45,
      image: "/brazil.png",
      quantity: 1,
    },
  ];

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: mockCartItems,
      },
    });
    jest.spyOn(store, "dispatch");
  });

  it("displays cart items and checkout button", () => {
    render(
      <Provider store={store}>
        <Cart closeCart={() => {}} showCart={true} />
      </Provider>
    );

    mockCartItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`£${item.price}`)).toBeInTheDocument();
    });

    const increaseQuantityBtn = screen.getByText("+");
    const decreaseQuantityBtn = screen.getByText("-");
    const removeBtn = screen.getByLabelText(/remove item/i);

    expect(increaseQuantityBtn).toBeInTheDocument();
    expect(decreaseQuantityBtn).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();

    fireEvent.click(increaseQuantityBtn);
    fireEvent.click(decreaseQuantityBtn);
    fireEvent.click(removeBtn)

    expect(store.dispatch).toHaveBeenCalled();

    expect(
      screen.getByRole("button", { name: /proceed to checkout/i })
    ).toBeInTheDocument();

    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
  });

  it("does not display cart content when showCart is false", () => {
    render(
      <Provider store={store}>
        <Cart closeCart={() => {}} showCart={false} />
      </Provider>
    );

    expect(screen.queryByText(/Brazil Jersey/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/£45/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /proceed to checkout/i })
    ).not.toBeInTheDocument();
  });

  it("shows empty cart state when no items exist", () => {
    const emptyStore = mockStore({
      cart: {
        items: [],
      },
    });

    render(
      <Provider store={emptyStore}>
        <Cart closeCart={() => {}} showCart={true} />
      </Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
