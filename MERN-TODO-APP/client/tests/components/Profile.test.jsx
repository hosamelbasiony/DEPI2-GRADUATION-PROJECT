import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { it, expect, describe } from 'vitest';
import userEvent from '@testing-library/user-event'

import Profile from "../../src/components/Profile";

describe("Profile", () => {
  it("should render profile button", async() => {
    const { getByText } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
           
    await userEvent.click(screen.getByRole('button'));
    const profileButton = getByText(/profile/i);
    expect(profileButton).toBeInTheDocument();
  });

  it("should render logout button", async() => {
    const { getByText } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
           
    await userEvent.click(screen.getByRole('button'));
   
    const logoutButton = getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });
});