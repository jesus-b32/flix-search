"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/server/actions/auth/new-verification";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

import { CgSpinnerTwo } from "react-icons/cg";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    // if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
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
        {/* {!success && <FormError message={error ? error : ""} />} */}
      </div>
    </CardWrapper>
  );
};
