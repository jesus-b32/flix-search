"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const router = useRouter();
  // lets you read the current URL's query string.
  const searchParams = useSearchParams();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    //provide type for e.target
    const target = e.target as typeof e.target & {
      searchTerm: { value: string };
    };
    const searchTerm = target.searchTerm.value;

    //create a url friendly search params
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    target.searchTerm.value = "";
    //navigate to search page with search params
    router.push(`/search/movie/?${params.toString()}`);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-3 rounded-md p-2"
      >
        <Input
          type="text"
          name="searchTerm"
          required
          className="text-black"
          placeholder="Search Movies and Series"
        />
        <Button type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </>
  );
}
