// src/lib/tmdapi.test.ts
import { describe, expect, it, vi } from "vitest";
import { getData } from "@/lib/tmdapi";

vi.mock("../env", () => ({
  env: { TMDB_API_KEY: "mock-tmdb-api-key" },
}));

describe("getData function", () => {
  const fetchSpy = vi.spyOn(global, "fetch");

  it("should return data for a successful response", async () => {
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify({ data: "valid response" }), {
        status: 200,
        statusText: "OK",
        headers: new Headers(),
      }),
    );

    const response = await getData("valid-path");
    expect(response).toEqual({ data: "valid response" });
  });

  it("should throw an error for a bad response", async () => {
    fetchSpy.mockRejectedValue(new Error("Bad response"));

    const response = await getData("invalid-path");
    expect(response).toBeInstanceOf(Error);
  });
});
