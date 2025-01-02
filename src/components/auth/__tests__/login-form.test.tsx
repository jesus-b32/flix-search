import { LoginForm } from "@/components/auth/login-form";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/server/actions/auth/login", () => {
  return {
    login: vi.fn(),
  };
});

vi.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: () => {
        return "";
      },
    }),
  };
});

describe("LoginForm", () => {
  it("should render the login form", () => {
    render(<LoginForm />);
    // screen.debug();
    expect(screen.getByText(/Flix Search/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login with Google" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login with GitHub" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Don't have an account?" }),
    ).toBeInTheDocument();
  });
});
