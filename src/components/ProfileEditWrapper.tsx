//shadcn ui components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileFormProps {
  valueBeingEdited: "name" | "image" | "password" | "email";
  isOauth: boolean | null;
  children: React.ReactNode;
}

export default function ProfileEditWrapper({
  valueBeingEdited,
  children,
}: ProfileFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          {valueBeingEdited === "image"
            ? "Update Profile Image"
            : `Update ${valueBeingEdited}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {valueBeingEdited === "image"
              ? "Change Profile Image"
              : `Change ${valueBeingEdited}`}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
