import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import SettingsSection from "./SettingsSection";
import { EditorContext } from "../../posts/Editor/EditorContext";

// Mocking the SettingsIcon and PostSettings components
vi.mock("../../posts/Editor/PostMenu/buttons/SettingsIcon", () => ({
  __esModule: true,
  default: () => <div data-testid="settings-icon">Settings Icon</div>,
}));

vi.mock("../../posts/Editor/PostSettings", () => ({
  __esModule: true,
  default: () => <div data-testid="post-settings">Post Settings Modal</div>,
}));

describe("SettingsSection", () => {
  const renderComponent = (contextValue: any) => {
    return render(
      <EditorContext.Provider value={contextValue}>
        <SettingsSection />
      </EditorContext.Provider>
    );
  };

  it("displays the saving status when saving a post", () => {
    renderComponent({
      isSavingPost: true,
      savingStatus: "Saving...",
      setIsSettingsModalOpen: vi.fn(),
      isSettingsModalOpen: false,
    });

    const savingStatus = screen.getByText("Saving...");
    expect(savingStatus).toBeInTheDocument();
  });

  it("does not display saving status when not saving a post", () => {
    renderComponent({
      isSavingPost: false,
      savingStatus: "",
      setIsSettingsModalOpen: vi.fn(),
      isSettingsModalOpen: false,
    });

    const savingStatus = screen.queryByText("Saving...");
    expect(savingStatus).not.toBeInTheDocument();
  });
});
