import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UserProfileMenu from "./UserProfileMenu";
import { useColorMode } from "theme-ui";
import { IUser } from "../../../../types/common";

// Mock theme-ui and other dependencies globally
const mockToggleDarkMode = vi.fn();

vi.mock("theme-ui", async () => {
  const actual = await vi.importActual("theme-ui");
  return {
    ...actual,
    useColorMode: vi.fn(),
    Divider: ({ sx }: { sx: any }) => <hr data-testid="divider" style={sx} />,
  };
});

vi.mock("@theme-ui/color", () => ({
  darken: vi.fn(),
  lighten: vi.fn(),
}));

vi.mock("../../../layout/BlackBox", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <div data-testid="blackbox" onClick={onClick}>
      {children}
    </div>
  ),
}));

const mockToggleUnit = vi.fn();

vi.mock("../../../UnitProvider", () => ({
  useUnits: () => ({
    toggleUnit: mockToggleUnit,
    unitOfMeasure: "imperial",
  }),
}));

vi.mock("../../../ViewportProvider", () => ({
  useViewport: () => ({
    width: 800,
  }),
}));

vi.mock("./ProfileHeader", () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="profile-header">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("./ToggleSwitch", () => ({
  __esModule: true,
  default: ({
    label,
    isChecked,
    onChange,
  }: {
    label: string;
    isChecked: boolean;
    onChange: () => void;
  }) => (
    <div>
      <label htmlFor="toggle-switch-input">{label}</label>
      <input
        data-testid={label}
        id="toggle-switch-input"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
    </div>
  ),
}));

describe("UserProfileMenu", () => {
  const mockSetProfileOpen = vi.fn();
  const mockUser: IUser = {
    userId: "user-id",
    email: "user@example.com",
    email_verified: true,
    attributes: {
      name: "John Doe",
      preferred_username: "johndoe",
      picture: "profile-picture-url",
      zoneinfo: "metric",
      sub: "",
      profile: "",
    },
  };
  const mockSetColorMode = vi.fn();

  beforeEach(() => {
    vi.mocked(useColorMode).mockReturnValue(["light", mockSetColorMode]);
  });

  const renderComponent = (profileOpen: boolean) => {
    return render(
      <UserProfileMenu
        setProfileOpen={mockSetProfileOpen}
        profileOpen={profileOpen}
      />
    );
  };

  it("renders nothing when profileOpen is false", () => {
    renderComponent(false);
    expect(screen.queryByTestId("blackbox")).not.toBeInTheDocument();
  });

  it("renders the menu when profileOpen is true", () => {
    renderComponent(true);
    expect(screen.getByTestId("blackbox")).toBeInTheDocument();
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    expect(screen.getAllByTestId("divider").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("Dark Mode").length).toBe(1);
    expect(screen.getAllByTestId("Metric Units").length).toBe(1);
  });

  it("calls setProfileOpen(false) when the BlackBox is clicked", () => {
    renderComponent(true);
    const blackBox = screen.getByTestId("blackbox");
    fireEvent.click(blackBox);
    expect(mockSetProfileOpen).toHaveBeenCalledWith(false);
  });

  it("calls setProfileOpen(false) when the close button is clicked", () => {
    renderComponent(true);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(mockSetProfileOpen).toHaveBeenCalledWith(false);
  });

  it("toggles dark mode", () => {
    renderComponent(true);
    const darkModeToggle = screen.getByTestId("Dark Mode");
    fireEvent.click(darkModeToggle);
    expect(mockSetColorMode).toHaveBeenCalledWith("dark");
  });

  it("toggles light mode", () => {
    vi.mocked(useColorMode).mockReturnValue(["dark", mockSetColorMode]);
    renderComponent(true);
    const darkModeToggle = screen.getByTestId("Dark Mode");
    fireEvent.click(darkModeToggle);
    expect(mockSetColorMode).toHaveBeenCalledWith("light");
  });

  it("toggles units of measurement", () => {
    renderComponent(true);
    const unitToggle = screen.getByTestId("Metric Units");
    fireEvent.click(unitToggle);
    expect(mockToggleUnit).toHaveBeenCalled();
  });
});
