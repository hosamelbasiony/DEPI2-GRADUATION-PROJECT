import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest';
import Todos from "../../src/components/Todos";
import { BrowserRouter } from 'react-router-dom';

describe("Todos", () => {
  it("should render Hello with the name when name is provided", () => {
    render(
        <BrowserRouter>
          <Todos />
        </BrowserRouter>
      );

    const heading = screen.getByText(/unauthorized/i);
    expect(heading).toBeInTheDocument();
  });
});
