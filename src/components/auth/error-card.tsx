import { CardWrapper } from "@/components/auth/card-wrapper";
import { TriangleAlert } from "lucide-react";

/**
 * A special card for when something goes wrong with authentication.
 *
 * It displays a red error triangle, a header that says "Oops, something went
 * wrong.", and a button that says "Back to login" that redirects you to the
 * login page.
 */
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
