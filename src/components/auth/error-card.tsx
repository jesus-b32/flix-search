import { CardWrapper } from "@/components/auth/card-wrapper";
import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabels="Oops, something went wrong."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <div className="flex w-full items-center justify-center">
        <TriangleAlert className="h-6 w-6 text-destructive" />
      </div>
    </CardWrapper>
  );
};
