import { TransformType } from "../lib/markdownToHtml";
import type Author from "./author";

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  toc: TransformType[];
  topic: string;
};

export default PostType;
