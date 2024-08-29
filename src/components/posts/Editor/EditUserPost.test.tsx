import { describe, it, expect, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Router from "next/router";
import EditUserPost from "./EditUserPost";
import { usePost } from "../../PostContext";
import useEditorState from "../../../hooks/useEditorState";
import { IUser } from "../../../types/common";
import { EditorContext } from "./EditorContext";

// Mocking next/router with all necessary exports
vi.mock("next/router", async () => {
  const actual = await vi.importActual("next/router");
  return {
    ...actual,
    push: vi.fn(),
  };
});

vi.mock("../../PostContext", () => ({
  usePost: vi.fn(),
}));

vi.mock("../../../hooks/useEditorState", () => ({
  default: vi.fn(),
}));

vi.mock("../../shared/Header/Header", () => ({
  default: vi.fn(() => <div>Mocked Header</div>),
}));

vi.mock("./PostEditor", () => ({
  default: vi.fn(() => <div>Mocked PostEditor</div>),
}));

describe("EditUserPost", () => {
  const mockUser: IUser = {
    userId: "user-id-1",
    email: "",
    email_verified: false,
    attributes: {
      sub: "user-id-1",
      picture: "",
      name: "",
      preferred_username: "",
      profile: "",
      zoneinfo: "metric",
    },
  };

  const mockAuthor = {
    id: "user-id-2",
  };

  const mockComponents: any[] = [];

  afterEach(() => {
    vi.clearAllMocks();
    cleanup(); // Ensures that the DOM is cleaned up after each test
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useEditorState.mockReturnValue({
      isGraphMenuOpen: false,
      setIsGraphMenuOpen: vi.fn(),
      // Mock other state values as needed
    });
    usePost.mockReturnValue({
      author: mockAuthor,
      components: mockComponents,
    });
  });

  it("should render Header and PostEditor components", () => {
    render(<EditUserPost user={mockUser} />);

    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Mocked PostEditor")).toBeInTheDocument();
  });

  // it("should redirect to /posts/ if user is not the author", () => {
  //   render(<EditUserPost user={mockUser} />);

  //   expect(Router.push).toHaveBeenCalledWith("/posts/");
  // });

  // it("should not redirect if user is the author", () => {
  //   usePost.mockReturnValue({
  //     author: { id: "user-id-1" }, // Same as user.sub
  //     components: mockComponents,
  //   });

  //   render(<EditUserPost user={mockUser} />);

  //   expect(Router.push).not.toHaveBeenCalled();
  // });
});
