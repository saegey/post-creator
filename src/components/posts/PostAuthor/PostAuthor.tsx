import { Flex, Box, Text } from "theme-ui";
import moment from "moment";
import React from "react";
import { CldImage } from "next-cloudinary";

import AvatarIcon from "../../icons/AvatarIcon";
import { cloudUrl } from "../../../utils/cloudinary";
import { useViewport } from "../../ViewportProvider";
import { PostContext } from "../../PostContext";

const PostAuthor = () => {
  const { width } = useViewport();
  const { author, createdAt } = React.useContext(PostContext);

  return (
    <div contentEditable={false}>
      <Box
        sx={{
          position: width < 1015 ? "relative" : "absolute",
          marginTop: ["20px", "0px", "0px"],
          maxWidth: "690px",

          "@media only screen and (max-width: 1315px) and (min-width: 1015px)":
            {
              marginX: "60px",
            },
          marginX: width < 1015 ? "auto" : "200px",
          width: width < 1015 ? "690px" : "150px",
          height: "100%",
          marginBottom: ["20px", "30px", "60px"],
        }}
      >
        <Flex
          sx={{
            flexDirection: ["row", "row", "column"],
            alignItems: "flex-start",
            gap: "20px",
            marginLeft: ["10px", 0, 0],
          }}
        >
          {author && author.image && (
            <Box
              sx={{
                width: ["60px", "80px", "80px"],
                height: ["60px", "80px", "80px"],
              }}
            >
              <CldImage
                priority={true}
                width="400"
                height="300"
                src={author.image}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  marginTop: "auto",
                  marginBottom: "auto",
                  borderRadius: "100%",
                }}
                config={{
                  cloud: {
                    cloudName: cloudUrl,
                  },
                }}
                // quality={90}
                sizes="100vw"
                alt="Description of my image"
              />
            </Box>
          )}
          {author && !author.image && <AvatarIcon />}
          <Flex sx={{ flexDirection: "column" }}>
            <Text
              as="span"
              sx={{
                fontSize: "13px",
                fontWeight: "700",
                lineHeight: "18px",
                textTransform: "uppercase",
              }}
            >
              by {author?.fullName}
            </Text>
            <Text
              as="span"
              sx={{ fontSize: "13px", fontWeight: "700", lineHeight: "18px" }}
            >
              {moment(createdAt).format("MM.DD.YY")}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default PostAuthor;
