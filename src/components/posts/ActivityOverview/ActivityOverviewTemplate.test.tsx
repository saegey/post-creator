import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ActivityOverviewTemplate from "./ActivityOverviewTemplate";

describe("ActivityOverviewTemplate", () => {
  it("should render the correct number of items", () => {
    const items = [
      { title: "Normalized Power", value: "250 watts" },
      { title: "Elevation Gain", value: "1500 ft" },
      { title: "Avg Speed", value: "18.5 mph" },
    ];

    render(<ActivityOverviewTemplate items={items} />);

    // Check that the correct number of items are rendered
    const renderedItems = screen.getAllByText(/(watts|ft|mph)/);
    expect(renderedItems).toHaveLength(items.length);
  });

  it("should render the correct titles and values", () => {
    const items = [
      { title: "Normalized Power", value: "250 watts" },
      { title: "Elevation Gain", value: "1500 ft" },
      { title: "Avg Speed", value: "18.5 mph" },
    ];

    render(<ActivityOverviewTemplate items={items} />);

    // Check that the correct titles are rendered
    expect(screen.getByText("Normalized Power")).toBeInTheDocument();
    expect(screen.getByText("Elevation Gain")).toBeInTheDocument();
    expect(screen.getByText("Avg Speed")).toBeInTheDocument();

    // Check that the correct values are rendered
    expect(screen.getByText("250 watts")).toBeInTheDocument();
    expect(screen.getByText("1500 ft")).toBeInTheDocument();
    expect(screen.getByText("18.5 mph")).toBeInTheDocument();
  });
});
