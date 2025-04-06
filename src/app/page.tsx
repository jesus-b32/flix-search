import Search from "@/components/client/Search";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="mt-4 flex flex-col items-center gap-6">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Welcome</span> to The Flix
          Search
        </h1>
        <p className="text-2xl">Find your next favorite movie or show</p>
      </div>

      {/* search bar component for movies and show searching*/}
      <Search />

      <div className="my-6 flex w-10/12 flex-col items-center gap-4">
        <img
          src="/streamingProviders.jpg"
          className="h-auto w-full"
          alt="Image of some streaming providers"
        />
        <h2 className="text-center text-2xl font-semibold">
          Movie and Show Searching made Easy
        </h2>
        <p className="text-center text-xl">
          The Flix Search helps you find which streaming services have your
          favorite movies and shows with a simple search.
        </p>
      </div>
    </main>
  );
}
