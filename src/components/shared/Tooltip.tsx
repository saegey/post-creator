/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { Box, Text } from "theme-ui";

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <Box
          sx={{
            position: "absolute",
            bottom: "0%", // Position tooltip above the element
            left: "110%",
            // left: "0px",
            // transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
            whiteSpace: "nowrap", // Prevents line break in tooltip text
            zIndex: 1000,
            fontSize: "12px",
            marginBottom: "8px", // Space between the tooltip and the element
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );
};

export default Tooltip;
