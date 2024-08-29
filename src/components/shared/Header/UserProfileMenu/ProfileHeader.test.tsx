import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProfileHeader from "./ProfileHeader";
import { IUser } from "../../../../types/common";

// Mock the CldImage component from next-cloudinary
vi.mock("next-cloudinary", () => ({
  CldImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="profile-picture" />
  ),
}));

// Mock the AvatarIcon component
vi.mock("../../../icons/AvatarIcon", () => ({
  __esModule: true,
  default: () => <div data-testid="avatar-icon">Avatar Icon</div>,
}));

describe("ProfileHeader", () => {
  const mockOnClose = vi.fn();

  const mockUserWithPicture: IUser = {
    userId: "user-id-2",
    email: "user2@example.com",
    email_verified: true,
    attributes: {
      name: "John Doe",
      preferred_username: "johndoe",
      picture: "profile-picture-url",
      sub: "",
      profile: "",
      zoneinfo: "metric",
    },
  };

  const mockUserWithoutPicture: IUser = {
    userId: "user-id-1",
    email: "user@example.com",
    email_verified: true,
    attributes: {
      name: "Jane Doe",
      preferred_username: "janedoe",
      picture: "",
      sub: "",
      profile: "",
      zoneinfo: "metric",
    },
  };

  it("renders the profile picture when user has a picture", () => {
    render(<ProfileHeader user={mockUserWithPicture} onClose={mockOnClose} />);

    const profilePicture = screen.getByTestId("profile-picture");
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toHaveAttribute("src", "profile-picture-url");
    expect(profilePicture).toHaveAttribute("alt", "Profile Picture");
  });

  it("renders the AvatarIcon when user has no picture", () => {
    render(
      <ProfileHeader user={mockUserWithoutPicture} onClose={mockOnClose} />
    );

    const avatarIcon = screen.getByTestId("avatar-icon");
    expect(avatarIcon).toBeInTheDocument();
  });

  it("renders the user name and preferred username", () => {
    render(<ProfileHeader user={mockUserWithPicture} onClose={mockOnClose} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
  });

  it("calls the onClose function when the close button is clicked", () => {
    render(<ProfileHeader user={mockUserWithPicture} onClose={mockOnClose} />);

    const closeButton = screen.getByTestId("close-profile");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
