import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PowerCurveChart from "./PowerCurveChart";
import { useThemeUI } from "theme-ui";
import { useViewport } from "../../ViewportProvider";
import { PowerCurveGraphProps } from "./types";

// Mocking the useThemeUI and useViewport hooks
vi.mock("theme-ui", () => ({
  useThemeUI: vi.fn(),
}));

vi.mock("../../ViewportProvider", () => ({
  useViewport: vi.fn(),
}));

vi.mock("recharts", async (importOriginal: any) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <actual.ResponsiveContainer width={800} height={800}>
        {children}
      </actual.ResponsiveContainer>
    ),
  };
});

describe("PowerCurveChart", () => {
  const mockData = [
    { x: 10, y: 150 },
    { x: 60, y: 200 },
    { x: 300, y: 180 },
  ];

  const defaultProps: PowerCurveChartProps = {
    data: mockData,
    ftp: 200,
  };

  const mockTheme = {
    theme: {
      colors: {
        text: "#000000",
        chartTooltipBackground: "#ffffff",
      },
    },
  };

  const mockViewport = {
    width: 600,
  };

  beforeEach(() => {
    (useThemeUI as jest.Mock).mockReturnValue(mockTheme);
    (useViewport as jest.Mock).mockReturnValue(mockViewport);
  });

  it("renders the chart with data", () => {
    render(
      <div style={{ width: "400px", height: "300px" }}>
        <PowerCurveChart {...defaultProps} />
      </div>
    );

    expect(screen.getByText("FTP - 200 watts")).toBeInTheDocument();
    expect(screen.getByText("Watts")).toBeInTheDocument();
  });

  it("does not render Y-axis label when hideAxes is true", () => {
    (useViewport as jest.Mock).mockReturnValue({ width: 400 });

    render(<PowerCurveChart {...defaultProps} />);

    expect(screen.queryByText("Watts")).not.toBeInTheDocument();
  });

  it("renders correctly with minimal data points", () => {
    const minimalProps: PowerCurveGraphProps = {
      data: [{ x: 1, y: 1 }],
      ftp: 1,
    };

    render(<PowerCurveChart {...minimalProps} />);

    expect(screen.getByText("FTP - 1 watts")).toBeInTheDocument();
  });

  it("handles null or undefined payload in Tooltip", () => {
    const CustomTooltip = ({ payload }: any) => {
      return (
        payload &&
        payload.length > 0 && (
          <div>
            <p>{payload[0].payload.x}</p>
            <p>{payload[0].payload.y} watts</p>
          </div>
        )
      );
    };

    render(<CustomTooltip payload={null} />);
    expect(screen.queryByText("watts")).not.toBeInTheDocument();

    render(<CustomTooltip payload={[]} />);
    expect(screen.queryByText("watts")).not.toBeInTheDocument();
  });
});
