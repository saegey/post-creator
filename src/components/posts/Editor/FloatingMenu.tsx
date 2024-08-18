import { Box } from "theme-ui";
import BoldButton from "./PostMenu/buttons/BoldButton";
import { useSlateStatic } from "slate-react";
import HeadingButton from "./PostMenu/buttons/HeadingButton";
import BulletListButton from "./PostMenu/buttons/BulletListButton";
import LinkButton from "./PostMenu/buttons/LinkButton";

const FloatingMenu = ({ top, left }: { top: number; left: number }) => {
  const editor = useSlateStatic();
  return (
    <Box
      sx={{
        position: "absolute",
        top: `${top - 50}px`,
        left: `${left}px`,
        background: "black",
        padding: "8px",
        zIndex: "300",
        borderRadius: "5px",
      }}
    >
      <BoldButton editor={editor} />
      <HeadingButton editor={editor} />
      <BulletListButton editor={editor} />
      <LinkButton editor={editor} />
    </Box>
  );
};

export default FloatingMenu;
