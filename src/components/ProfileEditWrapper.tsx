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
  buttonName: string;
  children: React.ReactNode;
}

export default function ProfileEditWrapper({
  buttonName,
  children,
}: ProfileFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>{buttonName}</Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{buttonName}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
