import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardWrapper } from "@/components/auth/CardWrapper";

describe("CardWrapper", () => {
  it("should render the card wrapper", () => {
    render(
      <CardWrapper
        headerLabels="Wrapper Header"
        backButtonLabel="Back Button Link"
        backButtonHref="ref for back button"
      >
        <h2>render test</h2>
      </CardWrapper>,
    );

    expect(
      screen.getByRole("heading", { name: "render test", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Flix Search", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Wrapper Header")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back Button Link" }),
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should render the card wrapper with socials", () => {
    render(
      <CardWrapper
        headerLabels="Wrapper Header"
        backButtonLabel="Back Button Link"
        backButtonHref="ref for back button"
        showSocial
      >
        <h2>render test with social</h2>
      </CardWrapper>,
    );

    // screen.debug();

    expect(
      screen.getByRole("heading", {
        name: "render test with social",
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Flix Search", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Wrapper Header")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back Button Link" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
