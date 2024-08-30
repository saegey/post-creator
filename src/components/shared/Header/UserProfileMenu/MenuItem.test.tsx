import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MenuItem from "./MenuItem";

// Mock the next/link module
// vi.mock("next/link", () => {
//   return {
//     __esModule: true,
//     default: ({ children }: { children: React.ReactNode }) => {
//       return <a>{children}</>;
//     },
//   };
// });

describe("MenuItem", () => {
  it("renders a link when href is provided", () => {
    render(<MenuItem href="/profile">Profile</MenuItem>);

    const linkElement = screen.getByText("Profile");
    screen.debug();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A"); // Check if it's a link element
    expect(linkElement).toHaveAttribute("href", "/profile");
  });

  it("renders a span when href is not provided", () => {
    render(<MenuItem>Profile</MenuItem>);

    const spanElement = screen.getByText("Profile");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.tagName).toBe("SPAN"); // Check if it's a span element
  });

  it("calls onClick when provided and clicked", () => {
    const handleClick = vi.fn();
    render(<MenuItem onClick={handleClick}>Click me</MenuItem>);

    const spanElement = screen.getByText("Click me");
    fireEvent.click(spanElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when href is provided", () => {
    const handleClick = vi.fn();
    render(
      <MenuItem href="/profile" onClick={handleClick}>
        Profile
      </MenuItem>
    );

    const linkElement = screen.getByText("Profile");
    fireEvent.click(linkElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  // it("applies the correct variant class", () => {
  //   render(<MenuItem variant="customVariant">Custom</MenuItem>);

  //   const spanElement = screen.getByText("Custom");
  //   expect(spanElement).toHaveClass("customVariant");
  // });
});
