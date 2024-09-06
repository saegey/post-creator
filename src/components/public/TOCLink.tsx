import React from "react";
import { Box, Link as ThemeLink } from "theme-ui";

import { TransformType } from "../../../lib/markdownToHtml";

const useHighlighted = (id: string) => {
  const observer = React.useRef<IntersectionObserver | undefined>();
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    const handleObserver = (entries: Array<IntersectionObserverEntryInit>) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach(
      (elem) => observer.current && observer.current.observe(elem)
    );
    return () => observer.current?.disconnect();
  }, []);

  return [activeId === id, setActiveId];
};

const TOCLink = ({ node }: { node: TransformType }) => {
  const id = node?.data?.hProperties?.id as string;
  const [highlighted, setHighlighted] = useHighlighted(id);
  return (
    <ThemeLink
      href={`#${id}`}
      sx={{
        color: highlighted ? "accent" : "muted",
        marginTop: "4px",
        marginBottom: "12px",
        textDecoration: "none",
        fontWeight: [
          500,
          highlighted ? "500" : "400",
          highlighted ? "500" : "400",
        ],
        ":hover": {
          fontWeight: 500,
          color: "accent",
        },
      }}
      onClick={(e) => {
        e.preventDefault();
        setHighlighted && setHighlighted !== true && setHighlighted(id);

        const elem = document.getElementById(id);

        elem && elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <Box key={node?.data?.hProperties?.id as string}>{node.value}</Box>
    </ThemeLink>
  );
};

export default TOCLink;
