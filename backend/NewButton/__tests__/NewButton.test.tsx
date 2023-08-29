import { NewButton } from "../NewButton";

import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

describe("NewButton", () => {
  it('should render a button with the label "Click me"', () => {
    const { getByText } = render(<NewButton />);
    expect(getByText("Click me")).toBeInTheDocument();
  });
});
