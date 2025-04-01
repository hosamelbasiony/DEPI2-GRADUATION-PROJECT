
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { it, expect, describe } from 'vitest';

import Register from "../../src/components/Register";

describe("Register", () => {
  it("should render register button", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const button = getByText("Register");
    expect(button).toBeInTheDocument();
  });
});