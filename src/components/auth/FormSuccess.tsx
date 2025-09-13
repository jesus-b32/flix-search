import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
  message: string;
}

/**
 * Displays a success message in a green rounded rectangle with
 * a check icon. If the message is empty, it returns null.
 *
 * @param message - the success message to display
 * @returns a form success component with a message
 */
export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null;
  }
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CircleCheck
        className="h-4 w-4"
        role="img"
        aria-label="circle check img"
      />
      <p>{message}</p>
    </div>
  );
}
