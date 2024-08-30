import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleSwitch from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  const mockOnChange = vi.fn();

  const renderComponent = (props: any) => {
    return render(<ToggleSwitch {...props} />);
  };

  it("renders the toggle switch with label", () => {
    renderComponent({
      label: "Dark Mode",
      isChecked: false,
      onChange: mockOnChange,
    });

    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders the toggle switch with muted text", () => {
    renderComponent({
      label: "Units",
      isChecked: false,
      onChange: mockOnChange,
      mutedText: "imperial/metric",
    });

    expect(screen.getByText("Units")).toBeInTheDocument();
    expect(screen.getByText("imperial/metric")).toBeInTheDocument();
  });

  it("calls onChange when the switch is clicked", () => {
    renderComponent({
      label: "Dark Mode",
      isChecked: false,
      onChange: mockOnChange,
    });

    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("shows the switch in the correct checked state", () => {
    const { rerender } = renderComponent({
      label: "Dark Mode",
      isChecked: true,
      onChange: mockOnChange,
    });

    let switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeChecked();

    rerender(
      <ToggleSwitch
        label="Dark Mode"
        isChecked={false}
        onChange={mockOnChange}
      />
    );

    switchElement = screen.getByRole("checkbox");
    expect(switchElement).not.toBeChecked();
  });
});
