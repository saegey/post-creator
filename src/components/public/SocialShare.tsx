import { Flex, Link as ThemeLink } from "theme-ui";

import LinkedinIcon from "../icons/LinkedInIcon";
import TwitterIcon from "../icons/TwitterIcon";
import FacebookIcon from "../icons/FacebookIcon";

const SocialShare = () => {
  return (
    <Flex sx={{ alignSelf: ["center", "end", "end"] }}>
      <ThemeLink
        href="http://www.linkedin.com/shareArticle?mini=true&amp;url=&amp;title=&amp;summary=&amp;source="
        target="_blank"
        title="Share on LinkedIn"
        onClick={() => {
          window.open(
            "http://www.linkedin.com/shareArticle?mini=true&amp;url=" +
              encodeURIComponent(document.URL) +
              "&amp;title=" +
              encodeURIComponent(document.title)
          );
          return false;
        }}
      >
        <LinkedinIcon />
      </ThemeLink>
      <ThemeLink
        href="https://twitter.com/intent/tweet?"
        target="_blank"
        title="Tweet"
        onClick={() => {
          window.open(
            "https://twitter.com/intent/tweet?text=%20" +
              encodeURIComponent(document.title) +
              ":%20 " +
              encodeURIComponent(document.URL)
          );
          return false;
        }}
      >
        <TwitterIcon sx={{ color: "#9e9e9e" }} />
      </ThemeLink>
      <ThemeLink
        href="https://www.facebook.com/sharer/sharer.php?u=&amp;t="
        title="Share on Facebook"
        target="_blank"
        onClick={() => {
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(document.URL) +
              "&amp;t=" +
              encodeURIComponent(document.URL)
          );
          return false;
        }}
      >
        <FacebookIcon />
      </ThemeLink>
    </Flex>
  );
};

export default SocialShare;
