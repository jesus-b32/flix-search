// Next.js
import { CgSpinnerTwo } from "react-icons/cg";

/**
 * The loading page displayed when the tv details page is loading.
 *
 * @returns the loading page
 */
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center text-2xl">
      <CgSpinnerTwo className="h-20 w-20 animate-spin" />
    </div>
  );
}
