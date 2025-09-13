"use client";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// form validation
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// custom
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

//other
import { TwoFactorSchema } from "@/schemas/schema";
import { useTransition, useState } from "react";
import { updateTwoFactor } from "@/server/actions/form/updateTwoFactor";

// Next.js Router
import { useRouter } from "next/navigation";

/**
 * A form for updating a user's two factor authentication.
 * Used in the user account page.
 *
 * @param userId - the user id
 * @param isTwoFactorEnabled - whether the user has two factor authentication enabled
 * @returns a update two factor authentication form
 */
export const UpdateTwoFactorForm = ({
  userId,
  isTwoFactorEnabled,
}: {
  userId: string;
  isTwoFactorEnabled: boolean;
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

  const form = useForm<z.infer<typeof TwoFactorSchema>>({
    resolver: zodResolver(TwoFactorSchema),
    defaultValues: {
      twoFactor: isTwoFactorEnabled,
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * image action with the form data and sets the error and success states
   * based on the response.
   */
  const onSubmit = (values: z.infer<typeof TwoFactorSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const twoFactorUpdated = await updateTwoFactor(values, userId);
      setError(twoFactorUpdated?.error ?? "");
      setSuccess(twoFactorUpdated?.success ?? "");

      if (twoFactorUpdated?.success) {
        router.refresh();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="twoFactor"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3">
              <div className="space-y-0.5">
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  Enable two factor authentication for your account.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          variant="secondary"
        >
          Update
        </Button>
      </form>
    </Form>
  );
};
