import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/auth/Login";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Login', () => {
  it('should have "Sign in to your account" text', () => {
    render(<Login />); // ARRANGE
  
    const myElement = screen.getByText("Sign in to your account"); // ACT
  
    expect(myElement).toBeInTheDocument(); // ASSERT
  });
})

