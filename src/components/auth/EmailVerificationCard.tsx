"use client";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { emailVerification } from "@/server/actions/auth/emailVerification";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { CgSpinnerTwo } from "react-icons/cg";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

/**
 * Card that is displayed when user clicks confirm email link.
 * Will retrieve the email verification token from url and verify it.
 * Displays a spinner while token is being validated.
 * Will display success message if token is valid.
 * Otherwise will display an error message.
 */
export const EmailVerificationCard = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const data = await emailVerification(token);
      setSuccess(data.success);
      setError(data.error);
    } catch (error) {
      setError("Something went wrong!");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabels="Confirming your Verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && (
          <CgSpinnerTwo className="h-20 w-20 animate-spin" />
        )}
        <FormSuccess message={success ? success : ""} />
        <FormError message={error ? error : ""} />
      </div>
    </CardWrapper>
  );
};
