import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Search from "@/components/client/Search";

export default function HomePage() {
  // const form = useForm();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Welcome</span> to Flix Search
      </h1>
      <p className="text-2xl">Find your next movie or series</p>

      <Search />
      {/* <Link
        href="/search"
        className="mt-4 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Search
      </Link> */}
      <div className="mt-4 flex size-6/12 flex-col justify-center">
        <img
          src="/streamingProviders.jpg"
          className="size-full"
          alt="Image of some streaming providers"
        />
        <h3 className="text-center text-2xl">
          Movie and TV Show Searching made Easy
        </h3>
        <p className="text-center">
          Flix Search helps you find which streaming services have your favorite
          movies and series with a simple search.
        </p>
      </div>
    </main>
  );
}
