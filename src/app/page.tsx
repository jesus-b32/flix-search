import Search from "@/components/client/Search";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mt-4 flex flex-col items-center justify-center gap-6">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Welcome</span> to Flix
          Search
        </h1>
        <p className="text-2xl">Find your next movie or series</p>
      </div>

      {/* search bar component for movies and series searching*/}
      <Search />

      <div className="mt-4 flex w-10/12 flex-col items-center justify-center gap-6">
        <img
          src="/streamingProviders.jpg"
          className="h-auto w-full object-cover"
          alt="Image of some streaming providers"
        />
        <h3 className="text-center text-2xl">
          Movie and TV Show Searching made Easy
        </h3>
        <p className="text-left">
          Flix Search helps you find which streaming services have your favorite
          movies and series with a simple search.
        </p>
      </div>
    </main>
  );
}
