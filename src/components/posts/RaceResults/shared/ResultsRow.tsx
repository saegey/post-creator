import { Flex, Text, Box } from "theme-ui";

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
  return (
    <>
      <Flex
        sx={{
          paddingY: "5px",
          paddingX: "5px",
          backgroundColor: isSelected ? "selectedBackground" : null,
          color: isSelected ? "selectedBackgroundText" : null,
          borderRadius: "5px",
          fontSize: ["14px", "16px", "16px"],
          flexFlow: "row wrap",
        }}
      >
        <Flex sx={{ width: "fit-content" }}>
          <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
            {place}
          </Text>
        </Flex>
        <Flex sx={{ flexGrow: 1, flexDirection: "column" }}>
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "fit-content" }}>
              <Text as="span">{racerName}</Text>
            </Box>
            <Text
              as="span"
              sx={{
                fontFamily: "Menlo",
                fontSize: ["12px", "13px", "13px"],
                width: "fit-content",
                flexGrow: 1,
                textAlign: "right",
              }}
            >
              {racerTime}
            </Text>
          </Flex>
          <Text sx={{ fontSize: ["12px", "13px", "13px"], color: "muted" }}>
            {racerTeam ? racerTeam : " "}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default ResultsRow;
