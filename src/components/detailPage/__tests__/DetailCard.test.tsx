import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DetailCard from "@/components/detailPage/DetailCard";
import { mockMovieDetails, mockTvDetails } from "@/mockedTestData";
import type { Session } from "next-auth";

vi.mock("@/components/WatchlistButton", () => {
  return {
    default: () => <button>mocked WatchlistButton</button>,
  };
});

//mock the videoList module with movie details, a videoList, and video in detail page not in videoList
vi.mock("@/data/videoList", () => ({
  getVideoList: vi.fn().mockResolvedValue(undefined),
  isVideoInList: vi.fn().mockResolvedValue(false),
  getVideo: vi.fn().mockResolvedValue(undefined),
}));

const session: Session = {
  user: {
    id: "1234",
    name: "John Doe",
    email: "a@a.com",
    image: "https://example.com/image.jpg",
  },
  expires: "2023-01-01",
};

describe("DetailCard", () => {
  it("should render the detail card with movie details and no user logged in", async () => {
    /**
     * Must do this as a workaround for to render async nextjs/react server components
     * This issue is being worked on: https://github.com/testing-library/react-testing-library/issues/1209
     */
    const Result = await DetailCard({
      details: mockMovieDetails,
      session: null,
    });
    render(Result);
    // screen.debug();
    expect(
      screen.getByRole("heading", { name: "Example Movie" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Example Movie poster image"),
    ).toBeInTheDocument();
    expect(screen.getByText("2022-01-01 | 120 minutes")).toBeInTheDocument();
    expect(screen.getByText("Genres: Action, Adventure")).toBeInTheDocument();
    expect(
      screen.getByText("This is an example movie overview."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Login to add to watchlist" }),
    ).toBeInTheDocument();
  });

  it("should render the detail card with movie details and user logged in", async () => {
    const Result = await DetailCard({
      details: mockMovieDetails,
      session: session,
    });
    render(Result);
    // screen.debug();
    expect(
      screen.getByRole("heading", { name: "Example Movie" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Example Movie poster image"),
    ).toBeInTheDocument();
    expect(screen.getByText("2022-01-01 | 120 minutes")).toBeInTheDocument();
    expect(screen.getByText("Genres: Action, Adventure")).toBeInTheDocument();
    expect(
      screen.getByText("This is an example movie overview."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "mocked WatchlistButton" }),
    ).toBeInTheDocument();
  });

  it("should render the detail card with tv details and user logged in", async () => {
    const Result = await DetailCard({
      details: mockTvDetails,
      session: session,
    });
    render(Result);
    // screen.debug();
    expect(
      screen.getByRole("heading", { name: "Example TV show" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Example TV show poster image"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("2022-01-01 | 2 seasons | 10 episodes"),
    ).toBeInTheDocument();
    expect(screen.getByText("Genres: Action, Adventure")).toBeInTheDocument();
    expect(
      screen.getByText("This is an example tv show overview."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "mocked WatchlistButton" }),
    ).toBeInTheDocument();
  });
});
