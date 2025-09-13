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
import { ResetPasswordSchema } from "@/schemas/schema";
import { resetPassword } from "@/server/actions/auth/resetPassword";

/**
 * A form containing an email field.
 * Used for resetting a user's password.
 *
 * @returns a reset password form with an email field
 */
export const ResetPasswordForm = () => {
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * reset password action with the form data and sets the error and success states
   * based on the response.
   *
   * @param {z.infer<typeof ResetPasswordSchema>} values - The form data.
   */
  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await resetPassword(values);
        setError(data.error ?? "");
        setSuccess(data.success ?? "");
      } catch (error) {
        setError("Something went wrong during password reset.");
      }
    });
  };
  return (
    <CardWrapper
      headerLabels="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
