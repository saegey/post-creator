import { ReactNode } from "react";
import { Box, ThemeUIStyleObject, Theme } from "theme-ui";

const ResultsListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={
        {
          maxHeight: "500px",
          overflowY: "scroll",
          paddingTop: "10px",
        } as ThemeUIStyleObject<Theme>
      }
    >
      {children}
    </Box>
  );
};

export default ResultsListContainer;
