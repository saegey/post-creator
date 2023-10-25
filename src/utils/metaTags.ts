import { constructCloudinaryUrl } from "@cloudinary-util/url-loader";

import { cloudUrl } from "../../src/utils/cloudinary";
import { PostViewType } from "../types/common";

const generate = ({ post }: { post: PostViewType }) => {
  const url = post.heroImage
    ? constructCloudinaryUrl({
        options: {
          src: JSON.parse(post.heroImage).public_id,
          width: 800,
          height: 600,
        },
        config: {
          cloud: {
            cloudName: cloudUrl,
          },
        },
      })
    : "";

  const metaTags = {
    description: post.subhead ? post.subhead.substring(0, 150) : "",
    "twitter:domain": "mopd.us",
    "twitter:title": post.title,
    "twitter:description": post.subhead ? post.subhead.substring(0, 150) : "",
    "twitter:url": `http://mopd.us/${post.shortUrl}`,
    "twitter:card": "summary_large_image",
    "twitter:image": `${
      post.heroImage && JSON.parse(post.heroImage) ? url : ""
    }`,
    "og:title": `${post.title}`,
    "og:description": post.subhead ? post.subhead.substring(0, 150) : "",
    "og:image": url,
    "og:type": "article",
    "og:url": `http://mopd.us/${post.shortUrl}`,
    author: post.author && post.author.fullName ? post.author.fullName : "unknown",
  };
  return metaTags;
};

export { generate };
