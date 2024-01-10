// import { runWithAmplifyServerContext } from "@aws-amplify/adapter-nextjs";
// import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Amplify, Hub, Auth, withSSRContext } from "aws-amplify";
// import awsconfig from "./src/aws-exports";
// Amplify.configure({ ...awsconfig, ssr: true });

// This function can be marked `async` if using `await` inside
const middleware = async (request: NextRequest) => {
  const host = request.headers.get("host");
  if (host === "www.localhost:3000") {
    const url = request.nextUrl.clone();
    url.pathname = "/public";
    return NextResponse.rewrite(url);
  }
  const response = NextResponse.next();
  // const session = await Auth.currentSession();
  // const authenticated = await runWithAmplifyServerContext({
  //   nextServerContext: { request, response },
  //   operation: async (contextSpec) => {
  //     try {
  //       const session = await fetchAuthSession(contextSpec, {});
  //       return session.tokens !== undefined;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
  // });

  // if (authenticated) {
  return response;
  // }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

export { middleware };
