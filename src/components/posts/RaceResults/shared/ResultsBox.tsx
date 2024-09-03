import { Box, Theme, ThemeUIStyleObject } from "theme-ui";

const ResultsBox = ({ children }: { children?: JSX.Element }) => {
  return (
    <Box
      sx={
        {
          overflowY: "auto",
          height: ["unset", "300px", "300px"],
          flexGrow: [1, "inherit", "inherit"],
          backgroundColor: "background",
          padding: "5px",
          borderRadius: "5px",
        } as ThemeUIStyleObject<Theme>
      }
    >
      {children && children}
    </Box>
  );
};

export default ResultsBox;
