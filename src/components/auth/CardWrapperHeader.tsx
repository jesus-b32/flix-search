// import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

// const font = Poppins({
//   weight: "600",
//   subsets: ["latin"],
// });

interface HeaderProps {
  label: string;
}

/**
 * Header component that displays a title and a label for CardWrapper component.
 * The title has a dynamic classname that includes a Poppins font style.
 * The label is displayed below the title with muted styling.
 */
export const CardWrapperHeader = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      {/* makes the classname dynamic */}
      {/* <h1 className={cn("text-3xl font-semibold", font.className)}> */}
      <h1 className={cn("text-3xl font-semibold")}>Flix Search</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
