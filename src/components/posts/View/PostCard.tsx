import { Box, Link as ThemeLink, Flex, Text } from "theme-ui";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

import { CloudinaryImage } from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";

interface PostCardProps {
  post: {
    id: string;
    author: {
      username: string;
      fullName: string;
      image: string;
    };
    title: string;
    privacyStatus?: string;
    imagesObj: Array<CloudinaryImage>;
  };
  showAuthor?: boolean;
}

const PostCard = ({ post, showAuthor = true }: PostCardProps) => {
  return (
    <Box
      sx={{ listStyleType: "none", "&:hover": { cursor: "pointer" } }}
      key={`post-${post.id}`}
    >
      <ThemeLink
        as={Link}
        sx={{ textDecoration: "none" }}
        href={
          post.privacyStatus === "draft"
            ? `/posts/${post.id}/edit`
            : `/j/${post.id}`
        }
        key={`link-post-${post.id}`}
      >
        <Flex
          sx={{
            height: "240px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "postCardBorder",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            backgroundColor: "postCardDefaultImage",
          }}
        >
          {post.imagesObj && post.imagesObj.length > 0 && (
            <CldImage
              width="400"
              height="300"
              src={post.imagesObj[0].public_id}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                marginTop: "auto",
                marginBottom: "auto",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
              underlay={post.imagesObj[0].public_id}
              quality={90}
              sizes="100vw"
              alt="Description of my image"
              config={{
                cloud: {
                  cloudName: cloudUrl,
                },
              }}
            />
          )}
          {!post.imagesObj && (
            <Box
              sx={{
                width: "100%",
              }}
            />
          )}
        </Flex>
        <Box
          sx={{
            backgroundColor: "postCardTextBackground",
            padding: "10px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "postCardBorder",
            borderLeftStyle: "solid",
            borderLeftWidth: "1px",
            borderLeftColor: "postCardBorder",
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderRightColor: "postCardBorder",
          }}
        >
          <Text
            as="div"
            sx={{ fontWeight: 600, color: post.title ? "text" : "gray" }}
          >
            {post.title ? post.title : "Untitled"}
          </Text>
          {showAuthor && post.author && (
            <Flex sx={{ gap: "10px", marginTop: "5px" }}>
              <Box sx={{ height: "40px", width: "40px" }}>
                {post.author?.image && (
                  <CldImage
                    width="400"
                    height="300"
                    src={post.author?.image}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      marginTop: "auto",
                      marginBottom: "auto",
                      borderRadius: "100%",
                    }}
                    // preserveTransformations
                    // underlay={post.author?.image}
                    quality={90}
                    sizes="100vw"
                    alt="Description of my image"
                    config={{
                      cloud: {
                        cloudName: cloudUrl,
                      },
                    }}
                  />
                )}
                {!post.author?.image && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "defaultAvatarBackground",
                      borderRadius: "100%",
                    }}
                  />
                )}
              </Box>
              <Flex sx={{ flexDirection: "column" }}>
                <Text
                  as="div"
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "text",
                  }}
                >
                  {post.author?.username}
                </Text>
                <Text
                  as="div"
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "text",
                  }}
                >
                  {post.author?.fullName}
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </ThemeLink>
    </Box>
  );
};

export default PostCard;
