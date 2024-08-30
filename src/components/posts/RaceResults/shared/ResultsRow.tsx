import { Flex, Theme, ThemeUIStyleObject, Text, Box } from "theme-ui";

const ResultsRow = ({
  place,
  isSelected,
  racerName,
  racerTeam,
  racerTime,
}: {
  place: string;
  isSelected: boolean;
  racerName: string;
  racerTeam: string;
  racerTime: string;
}) => {
  // return <pre>{JSON.stringify(row)}</pre>;
  return (
    <Flex
      sx={
        {
          paddingY: "2px",
          paddingX: "5px",
          backgroundColor: isSelected ? "selectedBackground" : null,
          color: isSelected ? "selectedBackgroundText" : null,
          borderRadius: "5px",
          fontSize: ["15px", "16px", "16px"],
          flexFlow: "row wrap",
        } as ThemeUIStyleObject<Theme>
      }
    >
      <Text as="span" sx={{ width: "60px" } as ThemeUIStyleObject<Theme>}>
        {place}
      </Text>
      <Box sx={{ flexGrow: 2 } as ThemeUIStyleObject<Theme>}>
        <Text as="span">{racerName}</Text>
        <Text
          as="span"
          sx={
            {
              display: "block",
              fontSize: "12px",
              height: "15px",
              flexGrow: 2,
            } as ThemeUIStyleObject<Theme>
          }
        >
          {racerTeam}
        </Text>
      </Box>
      <Text
        as="span"
        sx={{ marginLeft: "15px" } as ThemeUIStyleObject<Theme>}
      ></Text>
      <Text as="span" sx={{ marginLeft: "15px" } as ThemeUIStyleObject<Theme>}>
        {racerTime}
      </Text>
    </Flex>
  );
};

export default ResultsRow;
