import { Provider } from "react-redux";
import Header from "../header";
import { fireEvent, screen, render } from "@testing-library/react";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Header", () => {
  let store;
  let toggleCart;

  beforeEach(() => {
    store = mockStore({ cart: { items: [] } });
    toggleCart = jest.fn();
  });

  it("renders store name and cart icon, and handles click", () => {
    const itemNo = 3;

    render(
      <Provider store={store}>
        <Header toggleCart={toggleCart} itemNo={itemNo} />
      </Provider>
    );

    expect(screen.getByText(/le store/i)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(toggleCart).toHaveBeenCalledTimes(1);
  });
});
