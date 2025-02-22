import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { describe, it, expect } from "vitest";

describe("Login", () => {
  it("Renders 'Do not have an account?' text", () => {
    render(<Login />);
    expect(screen.getByText("Do not have an account?")).toBeInTheDocument();
  });
});
