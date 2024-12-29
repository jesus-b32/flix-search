import { it, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AvailabilityByCountry from "@/components/detailPage/AvailabilityByCountry";
import {
  mockCountries,
  mockMovieDetails,
  mockTvDetails,
  mockNoWatchProviderData,
} from "@/mockedTestData";

// This is how to mock a component module with a default export
vi.mock("@/components/client/SelectSearch", () => {
  return {
    default: () => <h1>mocked SelectSearch</h1>,
  };
});

describe("AvailabilityByCountry", () => {
  it("should render component with mocked movie data with US selected", () => {
    const mockSelectedCountry = "US";
    render(
      <AvailabilityByCountry
        countries={mockCountries}
        details={mockMovieDetails}
        selectedCountry={mockSelectedCountry}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "Example Movie is available from the following providers in United States:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mocked SelectSearch" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Stream" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Max" })).toBeInTheDocument();
    expect(screen.getByAltText("Max logo")).toBeInTheDocument();
  });

  it("should render component with mocked movie data with GB selected", () => {
    const mockSelectedCountry = "GB";
    render(
      <AvailabilityByCountry
        countries={mockCountries}
        details={mockMovieDetails}
        selectedCountry={mockSelectedCountry}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "Example Movie is available from the following providers in United Kingdom:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mocked SelectSearch" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Stream" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sky Go" })).toBeInTheDocument();
    expect(screen.getByAltText("Sky Go logo")).toBeInTheDocument();
  });

  it("should render component with mocked TV show data with GB selected", () => {
    const mockSelectedCountry = "GB";
    render(
      <AvailabilityByCountry
        countries={mockCountries}
        details={mockTvDetails}
        selectedCountry={mockSelectedCountry}
      />,
    );
    // screen.debug();
    expect(
      screen.getByRole("heading", {
        name: "Example TV show is available from the following providers in United Kingdom:",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mocked SelectSearch" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Buy" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Apple TV" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Apple TV logo")).toBeInTheDocument();
  });

  it("should render default message if no watch provider data", () => {
    const mockSelectedCountry = "US";
    render(
      <AvailabilityByCountry
        countries={mockCountries}
        details={mockNoWatchProviderData}
        selectedCountry={mockSelectedCountry}
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
