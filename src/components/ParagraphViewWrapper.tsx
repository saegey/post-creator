import { Text, Link } from "theme-ui";
import { LinkType, ParagraphElement } from "../types/common";

const renderLink = (node: LinkType) => {
  const attrs: any = {};

  return (
    <>
      <Link
        href={node.href}
        {...attrs}
        target={node.target}
        sx={{ textDecorationColor: "text", color: "text" }}
      >
        {node.children.map((c) => c.text)}
      </Link>
    </>
  );
};

const ParagraphViewWrapper = ({ node }: { node?: ParagraphElement }) => {
  return (
    <Text
      as="p"
      sx={{
        fontSize: "19px",
        lineHeight: "30px",
        maxWidth: "690px",
        marginX: "auto",
        width: ["100vw", null, null],
        borderLeftWidth: ["0px", "1px", "1px"],
        borderLeftStyle: "solid",
        borderLeftColor: "postBorderLeft",
        paddingX: ["20px", "8px", "8px"],
      }}
    >
      {node &&
        node.children.map((c, i) => {
          if (c.type === "link") {
            return renderLink(c);
          }
          return (
            <Text
              as="span"
              className="text"
              key={`text-paragraph-${i}`}
              sx={{
                fontWeight: c.bold ? "700" : null,
              }}
            >
              {c.text}
            </Text>
          );
          // }
        })}
    </Text>
  );
};

export default ParagraphViewWrapper;
