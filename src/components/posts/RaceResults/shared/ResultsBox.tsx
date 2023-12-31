import { Box } from "theme-ui";

const ResultsBox = ({ children }: { children?: JSX.Element }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: ["80%", "300px", "300px"],
        backgroundColor: "activityOverviewBackgroundColor",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {children && children}
    </Box>
  );
};

export default ResultsBox;
