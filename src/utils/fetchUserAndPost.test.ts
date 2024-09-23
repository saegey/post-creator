import { vi, describe, it, expect } from "vitest";
import { fetchUserAndPost } from "./fetchUserAndPost";
import { withSSRContext } from "aws-amplify";
import { getPostInitial } from "../graphql/customQueries";

// Mocking withSSRContext
vi.mock("aws-amplify", () => ({
  withSSRContext: vi.fn(),
}));

describe("fetchUserAndPost", () => {
  const req = {};
  const postId = "test-post-id";

  const mockSSRContext = {
    Auth: {
      currentSession: vi.fn(),
    },
    API: {
      graphql: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    withSSRContext.mockReturnValue(mockSSRContext);
  });

  it("should return redirect to /login if user is not authenticated", async () => {
    mockSSRContext.Auth.currentSession.mockRejectedValueOnce(
      new Error("Not authenticated")
    );

    const result = await fetchUserAndPost(req, postId);

    expect(result).toEqual({
      redirect: { destination: "/login", permanent: false },
    });
    expect(mockSSRContext.Auth.currentSession).toHaveBeenCalledTimes(1);
  });

  it("should return props with user and post data when successful", async () => {
    const mockSession = {
      getIdToken: () => ({
        payload: {
          sub: "user-id",
          email: "user@example.com",
          email_verified: true,
          picture: "picture-url",
          name: "User Name",
          preferred_username: "username",
          profile: "profile-url",
          zoneinfo: "zone-info",
        },
      }),
    };
    const mockPostData = {
      getPost: {
        components: JSON.stringify(null),
        images: JSON.stringify([]),
        heartAnalysis: JSON.stringify({ "1": 180, "30": 150, "60": 120 }),
        powerAnalysis: JSON.stringify(null),
        cadenceAnalysis: JSON.stringify(null),
        tempAnalysis: JSON.stringify(null),
        powerZones: JSON.stringify(null),
        heroImage: JSON.stringify(null),
        powerZoneBuckets: JSON.stringify(null),
        raceResults: JSON.stringify(null),
        webscorerResults: JSON.stringify(null),
        crossResults: JSON.stringify(null),
        omniResults: JSON.stringify(null),
        runSignupResults: JSON.stringify(null),
      },
    };

    mockSSRContext.Auth.currentSession.mockResolvedValueOnce(mockSession);
    mockSSRContext.API.graphql.mockResolvedValueOnce({ data: mockPostData });

    const result = await fetchUserAndPost(req, postId);

    expect(result).toEqual({
      props: {
        user: {
          userId: "user-id",
          email: "user@example.com",
          email_verified: true,
          attributes: {
            picture: "picture-url",
            name: "User Name",
            preferred_username: "username",
            sub: "user-id",
            profile: "profile-url",
            zoneinfo: "zone-info",
          },
        },
        postRaw: {
          ...mockPostData.getPost,
          components: null,
          images: [],
          heartAnalysis: { "1": 180, "30": 150, "60": 120 },
          powerAnalysis: null,
          cadenceAnalysis: null,
          tempAnalysis: null,
          powerZones: null,
          heroImage: null,
          powerZoneBuckets: null,
          raceResults: null,
          webscorerResults: null,
          crossResults: null,
          omniResults: null,
          runSignupResults: null,
        },
      },
    });
    expect(mockSSRContext.API.graphql).toHaveBeenCalledWith({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { id: postId },
    });
  });

  it("should handle null values from the api", async () => {
    const mockSession = {
      getIdToken: () => ({
        payload: {
          sub: "user-id",
          email: "user@example.com",
          email_verified: true,
          picture: "picture-url",
          name: "User Name",
          preferred_username: "username",
          profile: "profile-url",
          zoneinfo: "zone-info",
        },
      }),
    };
    const mockPostData = {
      getPost: {
        components: null,
        images: [],
        heartAnalysis: null,
        powerAnalysis: null,
        cadenceAnalysis: null,
        tempAnalysis: null,
        powerZones: null,
        heroImage: null,
        powerZoneBuckets: null,
        raceResults: null,
        webscorerResults: null,
        crossResults: null,
        omniResults: null,
        runSignupResults: null,
      },
    };

    mockSSRContext.Auth.currentSession.mockResolvedValueOnce(mockSession);
    mockSSRContext.API.graphql.mockResolvedValueOnce({ data: mockPostData });

    const result = await fetchUserAndPost(req, postId);

    expect(result).toEqual({
      props: {
        user: {
          userId: "user-id",
          email: "user@example.com",
          email_verified: true,
          attributes: {
            picture: "picture-url",
            name: "User Name",
            preferred_username: "username",
            sub: "user-id",
            profile: "profile-url",
            zoneinfo: "zone-info",
          },
        },
        postRaw: {
          ...mockPostData.getPost,
          components: null,
          images: [],
          heartAnalysis: null,
          powerAnalysis: null,
          cadenceAnalysis: null,
          tempAnalysis: null,
          powerZones: null,
          heroImage: null,
          powerZoneBuckets: null,
          raceResults: null,
          webscorerResults: null,
          crossResults: null,
          omniResults: null,
          runSignupResults: null,
        },
      },
    });
    expect(mockSSRContext.API.graphql).toHaveBeenCalledWith({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { id: postId },
    });
  });

  it("should return errorCode 403 if post is not found", async () => {
    const mockSession = {
      getIdToken: () => ({
        payload: {
          sub: "user-id",
          email: "user@example.com",
        },
      }),
    };
    mockSSRContext.Auth.currentSession.mockResolvedValueOnce(mockSession);
    mockSSRContext.API.graphql.mockResolvedValueOnce({
      data: { getPost: null },
    });

    const result = await fetchUserAndPost(req, postId);

    expect(result).toEqual({ props: { errorCode: 403 } });
    expect(mockSSRContext.API.graphql).toHaveBeenCalledTimes(1);
  });

  it("should return errorCode 403 if unauthorized error is encountered", async () => {
    const mockSession = {
      getIdToken: () => ({
        payload: {
          sub: "user-id",
          email: "user@example.com",
        },
      }),
    };
    const errorResponse = {
      errors: [{ errorType: "Unauthorized", message: "Unauthorized" }],
    };

    mockSSRContext.Auth.currentSession.mockResolvedValueOnce(mockSession);
    mockSSRContext.API.graphql.mockRejectedValueOnce(errorResponse);

    const result = await fetchUserAndPost(req, postId);

    expect(result).toEqual({ props: { errorCode: 403 } });
    expect(mockSSRContext.API.graphql).toHaveBeenCalledTimes(1);
  });

  it("should return errorCode 500 for any other errors", async () => {
    const mockSession = {
      getIdToken: () => ({
        payload: {
          sub: "user-id",
          email: "user@example.com",
        },
      }),
    };

    mockSSRContext.Auth.currentSession.mockResolvedValueOnce(mockSession);
    mockSSRContext.API.graphql.mockRejectedValueOnce(
      new Error("Unknown error")
    );

    const result = await fetchUserAndPost(req, postId);

    expect(result).toEqual({ props: { errorCode: 500 } });
    expect(mockSSRContext.API.graphql).toHaveBeenCalledTimes(1);
  });
});
