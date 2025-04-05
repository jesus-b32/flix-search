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
import { useTransition, useState } from "react";
import { NewPasswordFromEmailSchema } from "@/schemas/schema";
import { forgotPassword } from "@/server/actions/auth/forgotPassword";
import { useSearchParams } from "next/navigation";

/**
 * LoginForm is a component that renders a login form with an email and
 * password field. It uses the react-hook-form library to handle form state
 * and validation. The form is submitted to the login action, which is
 * a server-side action that validates the form data and logs in a user.
 * The form displays any errors that occur during login, and also displays
 * a success message when the login is successful.
 */
export const ForgotPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof NewPasswordFromEmailSchema>>({
    resolver: zodResolver(NewPasswordFromEmailSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * login action with the form data and sets the error and success states
   * based on the response.
   * @param {z.infer<typeof ResetSchema>} values - The form data.
   */
  const onSubmit = (values: z.infer<typeof NewPasswordFromEmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await forgotPassword(values, token);
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
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                    />
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
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
