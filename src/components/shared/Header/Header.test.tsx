import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import { PostContext } from "../../PostContext";
import useStickyHeader from "../../../hooks/useStickyHeader";
import { IUser } from "../../../types/common";

// Mock the useStickyHeader hook
vi.mock("../../../hooks/useStickyHeader", () => ({
  default: vi.fn(),
}));

// Mock ProfileSection and SettingsSection components
vi.mock("./ProfileSection", () => ({
  default: vi.fn(() => (
    <div data-testid="profile-section">Profile Section</div>
  )),
}));

vi.mock("./SettingsSection", () => ({
  default: vi.fn(() => (
    <div data-testid="settings-section">Settings Section</div>
  )),
}));

describe("Header", () => {
  const mockUser: IUser = {
    userId: "user-id-1",
    email: "user@example.com",
    email_verified: true,
    attributes: {
      picture: "",
      name: "",
      preferred_username: "",
      sub: "",
      profile: "",
      zoneinfo: "metric",
    },
  };

  const mockPostContext = {
    id: "post-id-1",
    elevations: null,
    setPost: () => {},
    components: [],
    images: null,
    heartAnalysis: null,
    powerAnalysis: null,
    cadenceAnalysis: null,
    tempAnalysis: null,
    powerZones: null,
    heroImage: null,
    powerZoneBuckets: null,
    author: null,
    title: "this is a title",
    activity: null,
  };

  it("renders ProfileSection and SettingsSection when post ID is present", () => {
    render(
      <PostContext.Provider value={mockPostContext}>
        <Header user={mockUser} />
      </PostContext.Provider>
    );

    // Assert that ProfileSection and SettingsSection are rendered
    expect(screen.getByTestId("profile-section")).toBeInTheDocument();
    expect(screen.getByTestId("settings-section")).toBeInTheDocument();
  });

  it("renders ProfileSection but not SettingsSection when post ID is absent", () => {
    render(
      <PostContext.Provider value={{ ...mockPostContext, id: "" }}>
        <Header user={mockUser} />
      </PostContext.Provider>
    );

    // Assert that ProfileSection is rendered
    expect(screen.getByTestId("profile-section")).toBeInTheDocument();

    // Assert that SettingsSection is not rendered
    expect(screen.queryByTestId("settings-section")).not.toBeInTheDocument();
  });

  it("calls useStickyHeader hook", () => {
    render(
      <PostContext.Provider value={mockPostContext}>
        <Header user={mockUser} />
      </PostContext.Provider>
    );

    // Assert that the useStickyHeader hook is called
    expect(useStickyHeader).toHaveBeenCalled();
  });
});
