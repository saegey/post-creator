import { Link as ThemeLink } from "theme-ui";

import { LinkType } from "../../../types/common";

interface LinkBaseProps {
  element: LinkType;
  children: React.ReactNode;
  onMouseDown?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const LinkBase = (props: LinkBaseProps) => {
  const { element, children, onMouseDown } = props;

  return (
    <ThemeLink
      sx={{ textDecorationColor: "text", color: "text", cursor: "pointer" }}
      href={element.href}
      target={element.target}
      onMouseDown={onMouseDown ? onMouseDown : undefined}
    >
      {children}
    </ThemeLink>
  );
};

export default LinkBase;
