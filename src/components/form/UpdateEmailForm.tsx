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
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

//other imports
import { NewEmailSchema } from "@/schemas/schema";
import { useTransition, useState } from "react";
import { updateEmail } from "@/server/actions/form/updateEmail";

import { useRouter } from "next/navigation";

export const UpdateEmailForm = ({ userId }: { userId: string }) => {
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof NewEmailSchema>>({
    resolver: zodResolver(NewEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * image action with the form data and sets the error and success states
   * based on the response.
   */
  const onSubmit = (values: z.infer<typeof NewEmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const changeEmail = await updateEmail(values, userId);
      setError(changeEmail?.error ?? "");
      setSuccess(changeEmail?.success ?? "");

      if (changeEmail?.success) {
        router.refresh();
      }
    });
  };
  return (
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
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};
