
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/components/Login";
import { it, expect, describe } from 'vitest';

describe("Demonstrating some useNavigate() tests ", () => {
  it("Renders the About component", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // const button = getByText(/contact us/i);
    // expect(button).toBeInTheDocument();
    // fireEvent.click(button);

    const button = getByText("Login");
    // screen.debug();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});