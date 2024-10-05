import { Flex, Text, Link, ThemeUIStyleObject, Theme } from "theme-ui";

const ResultsListHeader = ({
  headerText,
  subText,
  resultsUrl,
}: {
  headerText: string | undefined;
  subText: string | undefined;
  resultsUrl: string;
}) => {
  return (
    <>
      <Flex>
        <Flex sx={{ flexGrow: 1 }}>
          <Text
            as="h2"
            sx={{
              fontSize: ["15px", "20px", "20px"],
            }}
          >
            Results
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Link
          href={resultsUrl}
          target="_blank"
          sx={{
            color: "text",
            width: "fit-content",
            flexGrow: 1,
          }}
        >
          <Text
            as="p"
            sx={{ whiteSpace: "nowrap" }}
          >{`${headerText} - ${subText}`}</Text>
        </Link>
      </Flex>
    </>
  );
};

export default ResultsListHeader;
