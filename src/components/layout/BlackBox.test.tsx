import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import BlackBox from "./BlackBox";

vi.mock("@theme-ui/color", () => ({
  transparentize: vi.fn((color, opacity) => `rgba(${color}, ${opacity})`),
}));

describe("BlackBox Component", () => {
  it("should render children correctly", () => {
    render(
      <BlackBox>
        <div>Child Content</div>
      </BlackBox>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should apply default styles", () => {
    render(
      <BlackBox>
        <div>Child Content</div>
      </BlackBox>
    );

    const blackBox = screen.getByText("Child Content").parentElement;

    expect(blackBox).toHaveStyle({
      position: "fixed",
      top: "0px",
      left: "0px",
      height: "100dvh",
      width: "100%",
      backgroundColor: "rgba(var(--theme-ui-colors-blackBoxColor), .7)",
      zIndex: "30",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    });
  });

  it("should handle noBackground prop", () => {
    render(
      <BlackBox noBackground>
        <div>Child Content</div>
      </BlackBox>
    );

    const blackBox = screen.getByText("Child Content").parentElement;

    expect(blackBox).toHaveStyle({
      backgroundColor: "unset",
    });
  });

  it("should handle fullScreen prop", () => {
    render(
      <BlackBox fullScreen>
        <div>Child Content</div>
      </BlackBox>
    );

    const blackBox = screen.getByText("Child Content").parentElement;

    expect(blackBox).toHaveStyle({
      backgroundColor: "background",
      justifyContent: "center",
      alignItems: "center",
    });
  });

  it("should handle noModal prop", () => {
    render(
      <BlackBox noModal>
        <div>Child Content</div>
      </BlackBox>
    );

    const blackBox = screen.getByText("Child Content").parentElement;

    expect(blackBox).toHaveStyle({
      justifyContent: "unset",
      alignItems: "unset",
    });
  });

  it("should handle custom zIndex", () => {
    render(
      <BlackBox zIndex={50}>
        <div>Child Content</div>
      </BlackBox>
    );

    const blackBox = screen.getByText("Child Content").parentElement;

    expect(blackBox).toHaveStyle({
      zIndex: "50",
    });
  });

  it("should handle custom opacity", () => {
    render(
      <BlackBox opacity="0.5">
        <div>Child Content</div>
      </BlackBox>
    );

    const blackBox = screen.getByText("Child Content").parentElement;

    expect(blackBox).toHaveStyle({
      backgroundColor: "rgba(var(--theme-ui-colors-blackBoxColor), 0.5)",
    });
  });

  it("should call onClick when clicked", () => {
    const onClickMock = vi.fn();

    const { container } = render(
      <BlackBox onClick={onClickMock}>
        <div>Child Content</div>
      </BlackBox>
    );
    const blackBox = container.querySelector(".blackbox");
    if (blackBox) {
      (blackBox as HTMLElement).click(); // Directly trigger the click event
      expect(onClickMock).toHaveBeenCalledTimes(1);
    } else {
      throw new Error("BlackBox element not found");
    }
  });
});
