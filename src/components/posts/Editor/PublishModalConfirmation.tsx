import { EditorContext } from "./EditorContext";
import StandardModal from "../../shared/StandardModal";
import React from "react";
import { Box, Link as ThemeLink, Flex, Text, Spinner } from "theme-ui";
import { API } from "aws-amplify";
import { useRouter } from "next/router";

import { PostContext } from "../../PostContext";
// import { updatePost } from '../../src/graphql/mutations';
import { getShortUrl } from "../../../graphql/customQueries";

const PublishModalConfirmation = () => {
  const { isPublishedConfirmationOpen, setIsPublishedConfirmationOpen } =
    React.useContext(EditorContext);
  const { id } = React.useContext(PostContext);
  const [shortUrl, setShortUrl] = React.useState();
  const [isClicked, setIsClicked] = React.useState(false);

  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  // console.log(URL);

  // const createShortUrl = async () => {
  //   const response = await API.post('api12660653', '/short-url', {
  //     response: true,
  //     body: {
  //       url: `${origin}/j/${postId}`,
  //     },
  //   });
  //   return response;
  // };

  const fetch = async () => {
    try {
      const results = (await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: getShortUrl,
        variables: {
          filter: {
            originalPostId: {
              eq: id,
            },
          },
        },
      })) as any;
      // console.log(results);
      setShortUrl(results.data.listPublishedPosts.items[0].shortUrl);
      // setShortUrl(results.data.Attributes.id);
      // return shortUrl;
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <StandardModal
      isOpen={isPublishedConfirmationOpen}
      setIsOpen={setIsPublishedConfirmationOpen}
    >
      <Flex
        sx={{
          // justifyContent: 'center',
          marginY: "50px",
          flexDirection: "column",
        }}
      >
        <Text as="h2" sx={{ display: "flex", justifyContent: "center" }}>
          Your post is published!
        </Text>
        <Text as="p" sx={{ display: "flex", justifyContent: "center" }}>
          Your public post with appear in the public feed but you can also share
          outside of Monopad.
        </Text>
      </Flex>
      <Flex
        sx={{
          textDecoration: "none",
          borderRadius: "5px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          marginTop: "15px",
        }}
      >
        {!shortUrl && (
          <Spinner
            sx={{
              marginRight: "auto",
              padding: "5px",
              width: "32px",
              height: "auto",
            }}
          />
        )}
        {shortUrl && (
          <Text
            sx={{
              textDecoration: "none",
              color: "text",
              marginRight: "auto",
              padding: "5px",
            }}
          >
            {`https://mopd.us/${shortUrl}`}
          </Text>
        )}
        <Box
          sx={{
            width: "30px",
            height: "auto",
            cursor: "pointer",
            padding: "5px",
            borderLeftStyle: "solid",
            borderLeftColor: "divider",
            borderLeftWidth: "1px",
            // borderLeft: '1px solid divider',
            "#tooltip2::after": {
              content: '""',
              position: "absolute",
              top: "calc(50% + 15px)",
              left: 0,
              right: 0,
              margin: "0 auto",
              height: 0,
              borderTopWidth: "10px",
              borderTopStyle: "solid",
              borderTopColor: "tooltipBackground",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              width: 0,
            },
          }}
          onClick={() => {
            navigator.clipboard.writeText(`https://mopd.us/${shortUrl}`);
            setIsClicked(true);
            setTimeout(() => {
              setIsClicked(false);
            }, 1000);
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
              fill="var(--theme-ui-colors-text)"
            />
            <path
              d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
              fill="var(--theme-ui-colors-text)"
            />
          </svg>
          <Text
            id="tooltip2"
            as="span"
            sx={{
              visibility: isClicked ? "visible" : "hidden",
              // width: '180px',
              backgroundColor: "tooltipBackground",
              color: "text",
              textAlign: "center",
              fontWeight: 400,
              fontSize: "14px",
              padding: "7px",
              position: "absolute",
              zIndex: 1000,
              borderRadius: "5px",
              top: "180px",
              right: "5px",
            }}
          >
            Copied!
          </Text>
        </Box>
        {/*  */}
      </Flex>
      <Flex sx={{ gap: "15px", marginTop: "15px" }}>
        <Box>
          <ThemeLink
            target="_blank"
            sx={{ textDecoration: "none", color: "text", marginY: "15px" }}
            href={`https://twitter.com/intent/tweet?url=${origin}/j/${id}`}
          >
            <Text as="span">Twitter</Text>
          </ThemeLink>
        </Box>
        <Box>
          <ThemeLink
            // as='a'
            target="_blank"
            sx={{ textDecoration: "none", color: "text", marginY: "15px" }}
            href={`https://www.facebook.com/sharer/sharer.php?u=${origin}/j/${id}`}
          >
            <Text as="span">Facebook</Text>
          </ThemeLink>
          {/* https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fescapecollective.com%2Fgarmin-varia-seatpost-mount-reviews%2F */}
        </Box>
      </Flex>
    </StandardModal>
  );
};

export default PublishModalConfirmation;
