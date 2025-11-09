"use client";

// form validation imports
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//shadcn ui components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// custom components
import { CardWrapper } from "@/components/auth/CardWrapper";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

//other imports
import { useTransition, useState, useEffect } from "react";
import { NewPasswordFromEmailSchema } from "@/schemas/schema";
import { resetPassword } from "@/server/actions/auth/resetPassword";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

/**
 * ResetPasswordForm is a component that renders a forgot password form with a password and
 * confirm password field. It uses the react-hook-form library to handle form state
 * and validation. The form uses Better Auth's resetPassword API to reset the password.
 * Better Auth redirects users with either ?token=VALID_TOKEN or ?error=INVALID_TOKEN.
 * The form displays any errors that occur during password reset, and also displays
 * a success message when the password reset is successful.
 */
export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check for Better Auth error parameter (invalid/expired token) or missing token
  useEffect(() => {
    if (errorParam === "INVALID_TOKEN") {
      setError(
        "Invalid or expired token. Please request a new password reset.",
      );
    } else if (!token && !errorParam) {
      // No token and no error param means user navigated directly to the page
      setError("Missing reset token. Please use the link from your email.");
    }
  }, [errorParam, token]);

  const form = useForm<z.infer<typeof NewPasswordFromEmailSchema>>({
    resolver: zodResolver(NewPasswordFromEmailSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * forgot password action with the form data and sets the error and success states
   * based on the response.
   * @param {z.infer<typeof ResetSchema>} values - The form data.
   */
  const onSubmit = (values: z.infer<typeof NewPasswordFromEmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await resetPassword(values, token);
        setError(data.error ?? "");
        setSuccess(data.success ?? "");
      } catch (error) {
        setError("Something went wrong during password reset.");
      }
    });
  };
  return (
    <CardWrapper
      headerLabels="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={isPending}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isPending}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !token || errorParam === "INVALID_TOKEN"}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
