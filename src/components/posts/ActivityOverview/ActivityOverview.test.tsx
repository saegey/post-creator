// import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ActivityOverview from "./ActivityOverview";
import { useUnits } from "../../UnitProvider";
import { getItemData } from "./ActivityOverview";
import { ActivityData } from "./types";

describe("getItemData", () => {
  const mockUnits = { unitOfMeasure: "metric" };

  const mockData: ActivityData = {
    normalizedPower: 250,
    elevationGain: 1500,
    distance: 30.5,
    heartAnalysis: { "10": 140 },
    elapsedTime: { seconds: 7200 },
    tempAnalysis: { "10": 20 },
    stoppedTime: 600,
    powerAnalysis: { "10": 200 },
    cadenceAnalysis: { "10": 85 },
  };

  it("should return filtered items based on selectedFields", () => {
    const selectedFields = [
      "Normalized Power",
      "Avg Heart Rate",
      "Distance",
      "Elapsed Time",
      "Avg Speed",
    ];
    const items = getItemData(mockData, mockUnits, selectedFields);

    expect(items).toHaveLength(5);
    expect(items[0]).toEqual({ title: "Normalized Power", value: "250 watts" });
    expect(items[2]).toEqual({ title: "Distance", value: "30.50 km" });
    expect(items[1]).toEqual({ title: "Avg Heart Rate", value: "140 bpm" });
    expect(items[3]).toEqual({ title: "Elapsed Time", value: "02:00:00" });
    expect(items[4]).toEqual({ title: "Avg Speed", value: "16.64 km/h" });
  });

  it("should return null items based on selectedFields", () => {
    const selectedFields = [
      "Normalized Power",
      "Avg Heart Rate",
      "Elapsed Time",
      "Moving Time",
      "Avg Power",
      "Time Stopped",
    ];
    const items = getItemData(
      {
        ...mockData,
        normalizedPower: null,
        heartAnalysis: null,
        elapsedTime: null,
        stoppedTime: null,
      },
      mockUnits,
      selectedFields
    );

    expect(items).toHaveLength(6);
    expect(items[0]).toEqual({
      title: "Normalized Power",
      value: "no data",
    });
    expect(items[1]).toEqual({ title: "Avg Heart Rate", value: "-" });
    expect(items[2]).toEqual({ title: "Elapsed Time", value: "-" });

    expect(items[3]).toEqual({ title: "Moving Time", value: "-" });
    expect(items[4]).toEqual({ title: "Avg Power", value: "200 watts" });
    expect(items[5]).toEqual({ title: "Time Stopped", value: "-" });
  });

  it("should format elevation gain correctly based on units", () => {
    const selectedFields = ["Elevation Gain"];
    const items = getItemData(mockData, mockUnits, selectedFields);

    expect(items[0].value).toBe("1500 meters");

    const imperialUnits = { unitOfMeasure: "imperial" };
    const itemsImperial = getItemData(mockData, imperialUnits, selectedFields);

    expect(itemsImperial[0].value).toBe("4,921 ft");
  });

  it("should format speed to mph if units are imperial", () => {
    const selectedFields = ["Avg Speed"];

    const imperialUnits = { unitOfMeasure: "imperial" };
    const itemsImperial = getItemData(mockData, imperialUnits, selectedFields);

    expect(itemsImperial[0].value).toBe("10.34 mph");
  });

  it("should format average temperature correctly based on units", () => {
    const selectedFields = ["Avg Temperature"];
    const items = getItemData(mockData, mockUnits, selectedFields);

    expect(items[0].value).toBe("20 °C");

    const imperialUnits = { unitOfMeasure: "imperial" };
    const itemsImperial = getItemData(mockData, imperialUnits, selectedFields);

    expect(itemsImperial[0].value).toBe("68 °F");
  });

  it("should handle null and undefined values gracefully", () => {
    const selectedFields = ["Avg Power", "Avg Temperature", "Avg Cadence"];
    const incompleteData: ActivityData = {
      ...mockData,
      powerAnalysis: null,
      tempAnalysis: null,
      cadenceAnalysis: null,
    };
    const items = getItemData(incompleteData, mockUnits, selectedFields);

    expect(items.length).toBe(3);
    expect(items[0].value).toBe("-");
    expect(items[1].value).toBe("-");
    expect(items[2].value).toBe("-");
  });
});

// Mocking useUnits hook
vi.mock("../../UnitProvider", () => ({
  useUnits: vi.fn(),
}));

describe("ActivityOverview", () => {
  const mockData: ActivityData = {
    normalizedPower: 250,
    elevationGain: 1500,
    distance: 30.5,
    heartAnalysis: { "10": 140 },
    elapsedTime: { seconds: 7200 },
    tempAnalysis: { "10": 20 },
    stoppedTime: 600,
    powerAnalysis: { "10": 200 },
    cadenceAnalysis: { "10": 85 },
  };

  const mockUnits = { unitOfMeasure: "metric" };
  (useUnits as jest.Mock).mockReturnValue(mockUnits);

  it("should render the correct number of items based on selectedFields", () => {
    const selectedFields = ["Normalized Power", "Distance"];

    render(
      <ActivityOverview data={mockData} selectedFields={selectedFields} />
    );

    expect(screen.getByText("Normalized Power")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
    expect(screen.queryByText("Elevation Gain")).not.toBeInTheDocument();
  });

  it("should display the correct values for the items", () => {
    const selectedFields = ["Normalized Power", "Distance"];

    render(
      <ActivityOverview data={mockData} selectedFields={selectedFields} />
    );

    expect(screen.getByText("250 watts")).toBeInTheDocument();
    expect(screen.getByText("30.50 km")).toBeInTheDocument();
  });
});
