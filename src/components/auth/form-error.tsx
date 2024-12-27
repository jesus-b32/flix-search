import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message: string;
}

/**
 * FormError displays an error message below a form field or form in a red
 * rounded rectangle with a triangle alert icon. If the message is empty, it
 * returns null.
 *
 * @param {string} message - The error message to display
 * @returns  - The FormError element
 */
export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <TriangleAlert
        className="h-4 w-4"
        role="img"
        aria-label="triangle alert image"
      />
      <p>{message}</p>
    </div>
  );
}
