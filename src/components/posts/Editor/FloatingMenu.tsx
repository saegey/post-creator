import { Box, Flex } from "theme-ui";
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
        top: `${top - 50}px`,
        left: `${left - 5}px`,

        width: "fit-content",
        justifyItems: "center",
        background: "primary",
        padding: "8px",
        zIndex: "300",
        borderRadius: "5px",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
        animation: "fadeIn .2s;",
      }}
    >
      <Flex sx={{ gap: "5px" }}>
        <BoldButton editor={editor} />
        <HeadingButton editor={editor} />
        <BulletListButton editor={editor} />
        <LinkButton editor={editor} />
      </Flex>
    </Box>
  );
};

export default FloatingMenu;
