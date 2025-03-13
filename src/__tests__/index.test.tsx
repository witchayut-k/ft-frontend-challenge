import { render, screen } from "@testing-library/react";
import HomePage from "src/app/page";

describe("Home", () => {
  it("renders without errors", () => {
    const { container } = render(<HomePage />);
    expect(container).toBeDefined();
  });
});
