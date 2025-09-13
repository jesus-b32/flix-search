// Next.js
import { CgSpinnerTwo } from "react-icons/cg";

/**
 * The loading page displayed when the search pages are loading.
 *
 * @returns the loading page
 */
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex h-screen items-center justify-center text-2xl">
      <CgSpinnerTwo className="h-20 w-20 animate-spin" />
    </div>
  );
}
