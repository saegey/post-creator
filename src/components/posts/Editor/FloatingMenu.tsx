import { Box } from "theme-ui";
import BoldButton from "./PostMenu/buttons/BoldButton";
import HeadingButton from "./PostMenu/buttons/HeadingButton";
import BulletListButton from "./PostMenu/buttons/BulletListButton";
import LinkButton from "./PostMenu/buttons/LinkButton";
import { useSlateContext } from "../../SlateContext";

const FloatingMenu = ({ top, left }: { top: number; left: number }) => {
  const { editor } = useSlateContext();

  if (!editor) {
    return <></>;
  }
  console.log("rendering floating menu");
  return (
    <Box
      sx={{
        position: "absolute",
        top: `${top + 10}px`,
        left: `${left}px`,
        background: "floatingMenuBackground",
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
