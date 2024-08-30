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
        <Flex sx={{ flexGrow: 1 } as ThemeUIStyleObject<Theme>}>
          <Text
            as="h2"
            sx={
              {
                fontSize: ["16px", "20px", "20px"],
              } as ThemeUIStyleObject<Theme>
            }
          >
            Results
          </Text>
        </Flex>
      </Flex>
      <Link
        href={resultsUrl}
        target="_blank"
        sx={{ color: "text" } as ThemeUIStyleObject<Theme>}
      >
        <Text>{`${headerText} - ${subText}`}</Text>
      </Link>
    </>
  );
};

export default ResultsListHeader;
