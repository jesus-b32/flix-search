import { CardWrapper } from "@/components/auth/CardWrapper";
import { TriangleAlert } from "lucide-react";

/**
 * A special card for when something goes wrong with authentication.
 * Used for displaying an error message when a user is redirected to the error page.
 *
 * It displays a red error triangle, a header that says "Oops, something went
 * wrong.", and a button that says "Back to login" that redirects you to the
 * login page.
 *
 * @param headerLabels - the labels to display in the header
 * @param backButtonLabel - the label to display in the back button
 * @param backButtonHref - the URL to navigate to when the back button is clicked
 * @param showSocial - whether to display the social buttons
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
