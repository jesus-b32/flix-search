import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormSuccess } from "@/components/auth/form-success";

describe("FormSuccess", () => {
  it("should render the form success with message", () => {
    render(<FormSuccess message="Success message" />);
    // screen.debug();
    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "circle check img",
    );
  });

  it("should not render the form success with empty message", () => {
    const { container } = render(<FormSuccess message="" />);
    // screen.debug();
    expect(container).toBeEmptyDOMElement();
  });
});
