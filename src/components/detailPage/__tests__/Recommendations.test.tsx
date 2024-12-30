import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Recommendations from "@/components/detailPage/Recommendations";
import {
  mockMovieRecommendations,
  mockTvRecommendations,
  mockNoRecommendations,
} from "@/mockedTestData";

describe("Recommendations", () => {
  it("should render the movie recommendations", () => {
    render(<Recommendations recommendations={mockMovieRecommendations} />);
    // screen.debug();
    expect(
      screen.getByAltText("Man of Steel poster image"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Man of Steel" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Suicide Squad poster image"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Suicide Squad" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Captain America: Civil War poster image"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Captain America: Civil War" }),
    ).toBeInTheDocument();
  });

  it("should render the TV show recommendations", () => {
    render(<Recommendations recommendations={mockTvRecommendations} />);
    // screen.debug();
    expect(screen.getByAltText("Dragon Ball poster image")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Dragon Ball" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Dragon Ball GT poster image"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Dragon Ball GT" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Dragon Ball Super poster image"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Dragon Ball Super" }),
    ).toBeInTheDocument();
  });

  it("should render default message if no recommendations", () => {
    render(<Recommendations recommendations={mockNoRecommendations} />);
    // screen.debug();
    expect(
      screen.getByRole("heading", { name: "No Recommendations Available" }),
    ).toBeInTheDocument();
  });
});
