import { RegisterForm } from "@/components/auth/register-form";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

vi.mock("@/server/actions/auth/login", () => {
  return {
    register: vi.fn(),
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
    nameInputElement: screen.getByLabelText("Name"),
    emailInputElement: screen.getByLabelText("Email"),
    passwordInputElement: screen.getByLabelText("Password"),
    confirmPasswordInputElement: screen.getByLabelText("Confirm Password"),
    registerButton: screen.getByRole("button", { name: "Register" }),
    googleButton: screen.getByRole("button", { name: "Login with Google" }),
    githubButton: screen.getByRole("button", { name: "Login with GitHub" }),
    loginFormLink: screen.getByRole("link", {
      name: "Already have an account?",
    }),
  };
  return elements;
};

describe("RegisterForm", () => {
  // Declare user variable at describe block level so it's accessible in all tests
  let user: UserEvent;

  // beforeEach runs before each test case
  // Used to set up the testing environment in a consistent state
  // This ensures each test starts with fresh DOM and user event instance
  beforeEach(() => {
    user = userEvent.setup();
    render(<RegisterForm />);
  });
  it("should render the register form", () => {
    const {
      emailInputElement,
      passwordInputElement,
      registerButton,
      googleButton,
      githubButton,
      loginFormLink,
    } = getFormElements();

    expect(screen.getByText(/Flix Search/i)).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
    expect(loginFormLink).toBeInTheDocument();
  });

  it("should haves inputs initially empty", () => {
    const {
      nameInputElement,
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();
    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(nameInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
  });

  it("should display input text from user", async () => {
    const {
      nameInputElement,
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(nameInputElement, "John Doe");
    await user.type(emailInputElement, "test@example.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "secret");

    // screen.debug();

    expect(nameInputElement).toHaveValue("John Doe");
    expect(emailInputElement).toHaveValue("test@example.com");
    expect(passwordInputElement).toHaveValue("secret");
    expect(confirmPasswordInputElement).toHaveValue("secret");
  });

  it("should error message when empty form is submitted", async () => {
    const { registerButton } = getFormElements();
    await user.click(registerButton);
    // screen.debug();
    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 8 characters long"),
    ).toBeInTheDocument();
    expect(await screen.findByText("Required")).toBeInTheDocument();
  });

  it("should display matching error if passwords do not match", async () => {
    const {
      passwordInputElement,
      confirmPasswordInputElement,
      registerButton,
    } = getFormElements();

    await user.type(passwordInputElement, "12345678");
    await user.type(confirmPasswordInputElement, "123456789");
    await user.click(registerButton);
    // screen.debug();
    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
  });
});
