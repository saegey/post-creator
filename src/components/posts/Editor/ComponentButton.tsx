import { Box, Flex, Text } from "theme-ui";

const ComponentButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Flex sx={{ alignItems: "center", gap: "20px" }}>
      {icon && (
        <Box
          sx={{
            width: "16px",
            height: "16px",
          }}
        >
          {icon}
        </Box>
      )}
      <Text
        as="span"
        sx={{
          color: "text",
          fontSize: "14px",
        }}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default ComponentButton;
