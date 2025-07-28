import JerseyCard from "../jerseyCard";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { configureStore } from "redux-mock-store";

const mockStore = configureStore([])

describe("JerseyCard Component", () => {
  let store;

  beforeEach(()=>{
    store = mockStore();
  })
  const mockJersey = {
    name: "Brazil Jersey",
    price: 120,
    image: "/brazil-jersey.jpg",
    description: "Official Brazil national team jersey",
  };

  it("renders jersey description, image, name and price", () => {
    render(
      <Provider store={store}>
        <JerseyCard jersey={mockJersey} quantity={1} />
      </Provider>
    );

    expect(screen.getByText("Brazil Jersey")).toBeInTheDocument();

    expect(
      screen.getByText("Official Brazil national team jersey")
    ).toBeInTheDocument();

    expect(screen.getByRole("img")).toBeInTheDocument();

    expect(screen.getByText("£120")).toBeInTheDocument();
  });
});
