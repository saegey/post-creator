import { Box, Container, Link as ThemeLink } from "theme-ui";
import { SlateToReact } from "@slate-serializers/react";
import Link from "next/link";

import Header from "../../shared/Header";
import HeaderPublic from "../../shared/HeaderPublic";
import { CustomElement, IUser, PostViewType } from "../../../types/common";
import EditButton from "./EditButton";
import { Config } from "@slate-serializers/react/lib/config/types";

const PostView = ({
  user,
  components,
  config,
  post,
}: {
  user?: IUser | undefined;
  components: CustomElement[];
  config: Config;
  post: PostViewType;
}) => {
  return (
    <Box as="main">
      {user && <Header user={user} />}
      {!user && <HeaderPublic />}

      <Container
        as="article"
        className="article"
        sx={{
          "&.article>p+p": {
            paddingTop: "30px",
          },
          "&.article>h2+ul": {
            paddingTop: "30px",
          },
          "&.article>ul+h2": {
            paddingTop: "30px",
          },
          "&.article>ol+h2": {
            paddingTop: "30px",
          },
          "&.article>h2+ol": {
            paddingTop: "0px",
          },
          "&.article>p+h2": {
            paddingTop: "30px",
          },
          position: "relative",
          paddingBottom: ["100px", 0, 0],
        }}
      >
        {components && <SlateToReact node={components} config={config} />}

        {user && post.owner === user.attributes.sub && (
          <Box
            sx={{ position: "absolute", top: "20px", right: "20px" }}
            key="user-settings"
          >
            <ThemeLink
              as={Link}
              sx={{ textDecoration: "none" }}
              href={
                post.__typename === "PublishedPost" && post.originalPostId
                  ? `/posts/${post.originalPostId}/edit`
                  : `/posts/${post.id}/edit`
              }
              key={`link-post-${post.id}`}
            >
              <EditButton />
            </ThemeLink>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PostView;
