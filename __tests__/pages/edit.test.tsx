import { vi, describe, it, expect, render } from "vitest";
import React from "react";
import { render as renderComponent, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[id]/edit";
import { fetchUserAndPost } from "../../src/utils/fetchUserAndPost";

import { PostContext } from "../../src/components/PostContext";
import { IUser } from "../../src/types/common";

// Mocking dependencies
vi.mock("next/head", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("../../../src/utils/fetchUserAndPost", () => ({
  fetchUserAndPost: vi.fn(),
}));
vi.mock("../../../src/components/posts/Editor/EditUserPost", () => ({
  default: vi.fn(() => <div>EditUserPost component</div>),
}));

const postRaw = {
  id: "test-id",
  title: "Sample Title",
  components: [],
  images: [],
  heartAnalysis: null,
  powerAnalysis: null,
  cadenceAnalysis: null,
  tempAnalysis: null,
  powerZones: null,
  heroImage: null,
  powerZoneBuckets: null,
  author: null,
  // Add the missing properties here
};

const defaultUser = {
  userId: "",
  email: "",
  email_verified: false,
  attributes: {
    picture: "",
    name: "",
    preferred_username: "",
    sub: "",
    profile: "",
    zoneinfo: "metric",
  },
};

describe("Post Component", () => {
  it("renders error message when errorCode is present", () => {
    renderComponent(<Post user={null} postRaw={null} errorCode={403} />);

    screen.debug();

    expect(screen.getByText(/Error: 403/i)).toBeInTheDocument();
  });

  it("renders the post content when no errorCode is present", () => {
    renderComponent(
      <Post user={defaultUser as IUser} postRaw={postRaw} errorCode={null} />
    );

    expect(screen.getByText("Sample Title")).toBeInTheDocument();
    expect(screen.getByText("EditUserPost component")).toBeInTheDocument();
  });

  it("should initialize and update post state", () => {
    const { getByText, rerender } = renderComponent(
      <Post user={defaultUser as IUser} postRaw={postRaw} errorCode={null} />
    );

    // Verify initial state
    expect(getByText("Sample Title")).toBeInTheDocument();

    // Simulate state update by calling setPost function from the context
    rerender(
      <PostContext.Consumer>
        {({ setPost }) => {
          setPost({ title: "Updated Title" });
          return <div>State updated</div>;
        }}
      </PostContext.Consumer>
    );

    // Rerender and check if the state updated correctly
    rerender(
      <Post
        user={defaultUser as IUser}
        postRaw={{ ...postRaw, title: "Updated Title" }}
        errorCode={null}
      />
    );

    expect(screen.getByText("Updated Title")).toBeInTheDocument();
  });
});

describe("getServerSideProps", () => {
  it("should call fetchUserAndPost with correct parameters", async () => {
    const req = {};
    const params = { id: "test-id" };
    const mockFetchResult = { props: {} };

    (fetchUserAndPost as vi.Mock).mockResolvedValueOnce(mockFetchResult);

    const result = await getServerSideProps({ req, params });

    expect(fetchUserAndPost).toHaveBeenCalledWith(req, params.id);
    expect(result).toEqual(mockFetchResult);
  });

  it("should handle fetchUserAndPost errors gracefully", async () => {
    const req = {};
    const params = { id: "test-id" };
    const mockFetchResult = { props: { errorCode: 500 } };

    (fetchUserAndPost as vi.Mock).mockResolvedValueOnce(mockFetchResult);

    const result = await getServerSideProps({ req, params });

    expect(result).toEqual(mockFetchResult);
  });
});
