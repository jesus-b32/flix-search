import { it, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AvailabilityByProvider from "@/components/detailPage/AvailabilityByProvider";
import {
  mockCountries,
  mockMovieDetails,
  mockTvDetails,
  mockNoWatchProviderData,
  streamingProviders,
} from "@/mockedTestData";

// This is how to mock a component module with a default export
vi.mock("@/components/client/SelectSearch", () => {
  return {
    default: () => <h1>mocked SelectSearch</h1>,
  };
});

describe("AvailabilityByProvider", () => {
  it("should render component with mocked movie data with Amazon Prime Video selected", () => {
    const mockSelectedProviderId = "9";
    render(
      <AvailabilityByProvider
        streamingProviderList={streamingProviders}
        details={mockMovieDetails}
        selectedStreamingProviderId={mockSelectedProviderId}
        countries={mockCountries}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "Example Movie is available on Amazon Prime Video in the following countries:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mocked SelectSearch" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "United States" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("United States flag")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "United Kingdom" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("United Kingdom flag")).toBeInTheDocument();
  });

  it("should render component with mocked movie data with Max selected", () => {
    const mockSelectedProviderId = "1899";
    render(
      <AvailabilityByProvider
        streamingProviderList={streamingProviders}
        details={mockMovieDetails}
        selectedStreamingProviderId={mockSelectedProviderId}
        countries={mockCountries}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "Example Movie is available on Max in the following countries:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mocked SelectSearch" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "United States" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("United States flag")).toBeInTheDocument();
  });

  it("should render component with mocked TV show data with Netflix selected", () => {
    const mockSelectedProviderId = "8";
    render(
      <AvailabilityByProvider
        streamingProviderList={streamingProviders}
        details={mockTvDetails}
        selectedStreamingProviderId={mockSelectedProviderId}
        countries={mockCountries}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "Example TV show is available on Netflix in the following countries:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mocked SelectSearch" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "United States" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("United States flag")).toBeInTheDocument();
  });

  it("should render default message if no watch provider data", () => {
    const mockSelectedProviderId = "8";
    render(
      <AvailabilityByProvider
        streamingProviderList={streamingProviders}
        details={mockNoWatchProviderData}
        selectedStreamingProviderId={mockSelectedProviderId}
        countries={mockCountries}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "No Streaming data available for Example Movie",
      }),
    ).toBeInTheDocument();
  });
});
