import { CardWrapper } from "@/components/auth/card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabels="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      login form
    </CardWrapper>
  );
};
