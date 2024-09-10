import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProfileSection from "./ProfileSection";
import { EditorContext } from "../../posts/Editor/EditorContext";
import { IUser } from "../../../types/common";
import { UserContext } from "../../UserContext";

// Mock the getCldImageUrl function
vi.mock("next-cloudinary", () => ({
  getCldImageUrl: vi.fn(() => "mocked-image-url"),
}));

// Mock dependencies
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="profile-image" />
  ),
}));

vi.mock("@theme-ui/color", () => ({
  darken: vi.fn(),
  lighten: vi.fn(),
}));

vi.mock("../../icons/AvatarIcon", () => ({
  __esModule: true,
  default: () => <div data-testid="avatar-icon">Avatar Icon</div>,
}));

vi.mock("./UserProfileMenu/UserProfileMenu", () => ({
  __esModule: true,
  default: ({
    setProfileOpen,
    profileOpen,
  }: {
    setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    profileOpen: boolean;
  }) => (
    <div data-testid="user-profile-menu" data-profile-open={profileOpen}>
      User Profile Menu
    </div>
  ),
}));

describe("ProfileSection", () => {
  const mockUser: IUser = {
    userId: "user-id-1",
    email: "user@example.com",
    email_verified: true,
    attributes: {
      picture: "profile-picture-1",
      name: "",
      preferred_username: "",
      sub: "",
      profile: "",
      zoneinfo: "metric",
    },
  };

  const mockSetMobileMenu = vi.fn();

  const renderComponent = (contextValue: any) => {
    return render(
      <UserContext.Provider value={{ user: mockUser, setUser: vi.fn() }}>
        <EditorContext.Provider value={contextValue}>
          <ProfileSection />
        </EditorContext.Provider>
      </UserContext.Provider>
    );
  };

  // it("renders profile image when user has a picture", () => {
  //   renderComponent({
  //     mobileMenu: { display: true },
  //     setMobileMenu: mockSetMobileMenu,
  //   });

  //   const profileImage = screen.getByTestId("profile-image");
  //   expect(profileImage).toBeInTheDocument();
  //   expect(profileImage).toHaveAttribute("src", "mocked-image-url");
  //   expect(profileImage).toHaveAttribute("alt", "Uploaded");
  // });

  // it("renders AvatarIcon when user has no picture", () => {
  //   const userWithoutPicture = {
  //     ...mockUser,
  //     attributes: {
  //       picture: "",
  //       name: "",
  //       preferred_username: "",
  //       sub: "",
  //       profile: "",
  //       zoneinfo: "metric",
  //     },
  //   } as IUser;
  //   renderComponent({
  //     mobileMenu: { display: true },
  //     setMobileMenu: mockSetMobileMenu,
  //   });

  //   render(<ProfileSection user={userWithoutPicture} />);

  //   const avatarIcon = screen.getByTestId("avatar-icon");
  //   expect(avatarIcon).toBeInTheDocument();
  // });

  it("opens UserProfileMenu and hides mobile menu on click", () => {
    renderComponent({
      mobileMenu: { display: true },
      setMobileMenu: mockSetMobileMenu,
    });

    const menuButton = screen.getByLabelText("Toggle Menu");
    fireEvent.click(menuButton);

    expect(screen.getByTestId("user-profile-menu")).toBeInTheDocument();
    expect(screen.getByTestId("user-profile-menu")).toHaveAttribute(
      "data-profile-open",
      "true"
    );
    expect(mockSetMobileMenu).toHaveBeenCalledWith({ display: false });
  });
});
