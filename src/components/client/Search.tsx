"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchTerm: { value: string };
    };
    const searchTerm = target.searchTerm.value;
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    router.push(`/search/movie/?${params.toString()}`);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchTerm" required className="text-black" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
