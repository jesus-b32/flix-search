"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CardWrapperHeader } from "@/components/auth/CardWrapperHeader";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabels: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

/**
 * A pre-styled Card component that wraps the children with a default header
 * and footer. The header shows the given label and the footer shows a back
 * button to the given href and label. If showSocial is true, the footer will
 * also render a Social component.
 */
export const CardWrapper = ({
  children,
  headerLabels,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardWrapperHeader label={headerLabels} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <SocialButtons />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
