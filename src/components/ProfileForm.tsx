import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileFormProps {
  valueBeingEdited: "name" | "image" | "password" | "email";
  isOauth: boolean | null;
}

export default function ProfileForm({
  valueBeingEdited,
  isOauth,
}: ProfileFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
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
        <div className="grid gap-4 py-4">
          {/* oAuth accounts won't have a password */}
          {!isOauth ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Enter Your Password
              </Label>
              <Input id="password" className="col-span-3 text-black" />
            </div>
          ) : null}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={valueBeingEdited} className="text-right">
              {`New ${valueBeingEdited}`}
            </Label>
            <Input id={valueBeingEdited} className="col-span-3 text-black" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={"secondary"}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
