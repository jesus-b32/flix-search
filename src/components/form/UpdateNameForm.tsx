"use client";

// UI Components
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

// form validation
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// custom
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

//other
import { NewNameSchema } from "@/schemas/schema";
import { useTransition, useState } from "react";
import { updateName } from "@/server/actions/form/updateName";

import { useRouter } from "next/navigation";

/**
 * A form for updating a user's name.
 * Used in the user account page.
 *
 * @param userId - the user id
 * @returns a update name form
 */
export const UpdateNameForm = ({ userId }: { userId: string }) => {
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof NewNameSchema>>({
    resolver: zodResolver(NewNameSchema),
    defaultValues: {
      name: "",
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * image action with the form data and sets the error and success states
   * based on the response.
   */
  const onSubmit = (values: z.infer<typeof NewNameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const uploadName = await updateName(values, userId);
      setError(uploadName?.error ?? "");
      setSuccess(uploadName?.success ?? "");

      if (uploadName?.success) {
        // Reset form fields on successful submission
        form.reset({
          name: "",
        });
        router.refresh();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Doe"
                  type="text"
                  disabled={isPending}
                  className="text-foreground"
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
