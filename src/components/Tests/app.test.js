import { render, screen, fireEvent } from "@testing-library/react";
import App from "../app";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([]);

describe("App Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            name: "Brazil Jersey",
            price: 120,
            quantity: 1,
            image: "/nigeria-jersey.jpg"
          },
        ],
      },
    });
  });

  it("renders header, badge, toggles cart drawer", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Le Store.")).toBeInTheDocument();


    expect(screen.getByLabelText("Toggle Cart"));
    const cartButton = screen.getByLabelText("Toggle Cart");
    fireEvent.click(cartButton);

    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', {level: 3, name:"Brazil Jersey"})).toBeInTheDocument();
  });

  it("renders header, badge, closes cart drawer", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Le Store.")).toBeInTheDocument();
    const closeBtn = screen.getByText(/x/i);
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    expect(screen.queryByText("Toggle Cart"));
    expect(screen.queryByText(/Your Cart/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Brazil Jersey" })
    ).toBeInTheDocument();
  });
});
