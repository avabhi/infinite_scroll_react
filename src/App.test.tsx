import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";

window.scrollTo = jest.fn();
test("renders app component", () => {
  const history = createMemoryHistory();
  history.push = jest.fn();
  render(<App />);
  const linkElement = screen.getByText(/My Faviourites List/i);
  expect(linkElement).toBeInTheDocument();
});
