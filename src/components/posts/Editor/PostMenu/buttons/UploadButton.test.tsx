import React from "react"; // Add this import
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadButton from "./UploadButton";
import { usePost } from "../../../../PostContext";
import { Auth, Storage } from "aws-amplify";
import usePubSubSubscription from "../../../../../hooks/usePubSubSubscription";

// Mock dependencies
vi.mock("aws-amplify");
vi.mock("../../../../PostContext");
vi.mock("../../../../../hooks/usePubSubSubscription");

describe("UploadButton", () => {
  const mockPostContext = {
    id: "test-id",
    currentFtp: 200,
    gpxFile: "test.gpx",
    setPost: vi.fn(),
    // Add the remaining properties here
  };

  beforeEach(() => {
    vi.mocked(usePost).mockReturnValue(mockPostContext);
    vi.mocked(Auth.currentUserCredentials).mockResolvedValue({
      accessKeyId: "test-access-key",
      sessionToken: "test-session-token",
      secretAccessKey: "test-secret-access-key",
      authenticated: true,
      identityId: "test-identity",
    });
    vi.mocked(usePubSubSubscription).mockImplementation(
      (id, handlePhase) => {}
    );
    vi.mocked(Storage.put).mockResolvedValue({ key: "test-key" });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the UploadButton component", () => {
    render(<UploadButton />);
    screen.debug();
    expect(screen.getByLabelText(/Activity/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload/i)).toBeInTheDocument();
  });

  it("displays the gpxFile from context", () => {
    render(<UploadButton />);
    const inputElement = screen.getByDisplayValue("test.gpx");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls handleFileChange when a file is selected", async () => {
    render(<UploadButton />);
    const file = new File(["file contents"], "test.fit", {
      type: "application/octet-stream",
    });
    const fileInput = screen.getByTestId("gpxFile");

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(Auth.currentUserCredentials).toHaveBeenCalled());

    await waitFor(() => {
      expect(Storage.put).toHaveBeenCalledWith(
        "uploads/test.fit",
        file,
        expect.objectContaining({
          metadata: {
            postId: "test-id",
            currentFtp: "200",
            identityId: "test-identity",
          },
        })
      );
    });
  });

  it("updates progress status during file upload", async () => {
    Storage.put.mockImplementation(
      (
        path: string,
        file: File,
        options: {
          progressCallback?: (progress: {
            loaded: number;
            total: number;
          }) => void;
        }
      ) => {
        if (options.progressCallback) {
          // Simulate progress update
          options.progressCallback({ loaded: 50, total: 100 });
        }
        return Promise.resolve({
          key: path,
          file,
          ...options,
        });
      }
    );

    render(<UploadButton />);
    const file = new File(["file contents"], "test.fit", {
      type: "application/octet-stream",
    });
    const fileInput = screen.getByTestId("gpxFile");

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(Storage.put).toHaveBeenCalled());
    expect(screen.getByTestId("processing-status")).toHaveTextContent("50%");
  });

  it("displays a spinner while processing the file", () => {
    render(<UploadButton />);
    const file = new File(["file contents"], "test.fit", {
      type: "application/octet-stream",
    });
    const fileInput = screen.getByTestId("gpxFile");

    fireEvent.change(fileInput, { target: { files: [file] } });
    // fireEvent.click(screen.getByText(/Upload/i));

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeVisible(); // Spinner
  });

  it("calls handlePhase when a pubsub message is received", async () => {
    // Mock the usePubSubSubscription to call handlePhase
    (usePubSubSubscription as Mock).mockImplementation(
      (_: any, callback: Function) => {
        // handlePhase("go-start-processing");
        // Simulate subscription callback
        setTimeout(() => {
          callback({ phase: "go-start-processing" });
        }, 0); // Ensure it runs asynchronously

        return () => {}; // Return a cleanup function as expected
      }
    );

    render(<UploadButton />);

    await waitFor(() => {
      expect(screen.getByTestId("processing-status")).toHaveTextContent(
        "Analyzing Fit file"
      );
    });
  });
});
