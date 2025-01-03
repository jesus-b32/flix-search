import { LoginForm } from "@/components/auth/login-form";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

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

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByLabelText("Email"),
    passwordInputElement: screen.getByLabelText("Password"),
    loginButton: screen.getByRole("button", { name: "Login" }),
    googleButton: screen.getByRole("button", { name: "Login with Google" }),
    githubButton: screen.getByRole("button", { name: "Login with GitHub" }),
    registerFormLink: screen.getByRole("link", {
      name: "Don't have an account?",
    }),
  };
  return elements;
};

describe("LoginForm", () => {
  // Declare user variable at describe block level so it's accessible in all tests
  let user: UserEvent;

  // beforeEach runs before each test case
  // Used to set up the testing environment in a consistent state
  // This ensures each test starts with fresh DOM and user event instance
  beforeEach(() => {
    user = userEvent.setup();
    render(<LoginForm />);
  });
  it("should render the login form", () => {
    const {
      emailInputElement,
      passwordInputElement,
      loginButton,
      googleButton,
      githubButton,
      registerFormLink,
    } = getFormElements();

    expect(screen.getByText(/Flix Search/i)).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
    expect(registerFormLink).toBeInTheDocument();
  });

  it("should haves inputs initially empty", () => {
    const { emailInputElement, passwordInputElement } = getFormElements();
    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
  });

  it("should display input text from user", async () => {
    const { emailInputElement, passwordInputElement } = getFormElements();

    await user.type(emailInputElement, "test@example.com");
    await user.type(passwordInputElement, "secret");

    // screen.debug();

    expect(emailInputElement).toHaveValue("test@example.com");
    expect(passwordInputElement).toHaveValue("secret");
  });

  it("should error message when empty form is submitted", async () => {
    const { loginButton } = getFormElements();
    await user.click(loginButton);
    // screen.debug();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });
});
