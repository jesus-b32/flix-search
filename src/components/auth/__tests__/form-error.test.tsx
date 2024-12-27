import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormError } from "@/components/auth/form-error";

describe("FormError", () => {
  it("should render the form error with message", () => {
    render(<FormError message="Error message" />);
    // screen.debug();
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "triangle alert image",
    );
  });

  it("should not render the form error with empty message", () => {
    const { container } = render(<FormError message="" />);
    // screen.debug();
    expect(container).toBeEmptyDOMElement();
  });
});
