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
import { NewPasswordSchema } from "@/schemas/schema";
import { useTransition, useState } from "react";
import { updatePassword } from "@/server/actions/form/updatePassword";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

/**
 * A form for updating a user's password.
 * Used in the user account page.
 *
 * @param userId - the user id
 * @returns a update password form
 */
export const UpdatePasswordForm = ({ userId }: { userId: string }) => {
  /**
   * useTransition is a React Hook that lets you update the state without blocking the UI.
   * The isPending flag that tells you whether there is a pending Transition. In the form it is used to show a loading state when the form is submitting.
   * The startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  /**
   * onSubmit is a function that is called when the form is submitted. It calls the
   * image action with the form data and sets the error and success states
   * based on the response.
   */
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const passwordUpdated = await updatePassword(values, userId);
      setError(passwordUpdated?.error ?? "");
      setSuccess(passwordUpdated?.success ?? "");

      if (passwordUpdated?.success) {
        // Reset form fields on successful submission
        form.reset({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showCurrentPassword ? "text" : "password"}
                    disabled={isPending}
                    className="text-foreground"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    disabled={isPending}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-foreground" />
                    )}
                    <span className="sr-only">
                      {showCurrentPassword ? "Hide password" : "Show password"}
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
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showNewPassword ? "text" : "password"}
                    disabled={isPending}
                    className="text-foreground"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={isPending}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-foreground" />
                    )}
                    <span className="sr-only">
                      {showNewPassword ? "Hide password" : "Show password"}
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
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={isPending}
                    className="text-foreground"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isPending}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-foreground" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
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
