"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// form validation imports
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// custom components
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

//other imports
import { DeleteAccountSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { deleteAccount } from "@/server/actions/form/deleteAccount";

import { useRouter } from "next/navigation";

export const DeleteAccountForm = ({
  isOauth,
  userId,
}: {
  isOauth: boolean | null;
  userId: string;
}) => {
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      password: undefined,
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * image action with the form data and sets the error and success states
   * based on the response.
   * @param {z.infer<typeof LoginSchema>} values - The form data.
   */
  const onSubmit = (values: z.infer<typeof DeleteAccountSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const accountDeleted = await deleteAccount(values, isOauth, userId);
      setError(accountDeleted?.error ?? "");
      setSuccess(accountDeleted?.success ?? "");

      if (accountDeleted?.success) {
        router.push("/");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {!isOauth ? (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          variant={"destructive"}
        >
          Delete Account
        </Button>
      </form>
    </Form>
  );
};
