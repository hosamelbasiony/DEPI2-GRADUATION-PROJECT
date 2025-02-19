import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "@/components/auth/SignUp";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Signup', () => {
  it('should have "Create new account" text', () => {
    render(<SignUp />); // ARRANGE
  
    const myElement = screen.getByText("Create new account"); // ACT
  
    expect(myElement).toBeInTheDocument(); // ASSERT
  });
})

