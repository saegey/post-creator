import { Flex, Link as ThemeLink } from "theme-ui";

import LinkedinIcon from "../icons/LinkedInIcon";
import TwitterIcon from "../icons/TwitterIcon";
import FacebookIcon from "../icons/FacebookIcon";

const socialMediaLinks = [
  {
    href: "http://www.linkedin.com/shareArticle?mini=true&amp;url=&amp;title=&amp;summary=&amp;source=",
    title: "Share on LinkedIn",
    icon: LinkedinIcon,
    onClick: () => {
      window.open(
        "http://www.linkedin.com/shareArticle?mini=true&amp;url=" +
          encodeURIComponent(document.URL) +
          "&amp;title=" +
          encodeURIComponent(document.title)
      );
      return false;
    },
  },
  {
    href: "https://twitter.com/intent/ttweet?",
    title: "Tweet",
    icon: TwitterIcon,
    onClick: () => {
      window.open(
        "https://twitter.com/intent/tweet?text=%20" +
          encodeURIComponent(document.title) +
          ":%20 " +
          encodeURIComponent(document.URL)
      );
      return false;
    },
  },
  {
    href: "https://www.facebook.com/sharer/sharer.php?u=&amp;t=",
    title: "Share on Facebook",
    icon: FacebookIcon,
    onClick: () => {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(document.URL) +
          "&amp;t=" +
          encodeURIComponent(document.URL)
      );
      return false;
    },
  },
];

const SocialShare = () => {
  return (
    <Flex sx={{ alignSelf: ["center", "end", "end"] }}>
      {socialMediaLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <ThemeLink
            key={index}
            href={social.href}
            target="_blank"
            title={social.title}
            onClick={social.onClick}
          >
            <Icon sx={{ color: "publicSocialIcon" }} />
          </ThemeLink>
        );
      })}
    </Flex>
  );
};

export default SocialShare;
