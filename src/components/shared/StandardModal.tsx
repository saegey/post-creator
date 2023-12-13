import { Box, Flex, Text, Close } from "theme-ui";
import React from "react";

import BlackBox from "../layout/BlackBox";

const StandardModal = ({
  children,
  isOpen,
  setIsOpen,
  title = undefined,
  fullScreen = false,
}: {
  children: any;
  isOpen: boolean;
  setIsOpen: any;
  title?: string | undefined;
  fullScreen?: boolean;
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <BlackBox
        opacity={"0.7"}
        onClick={() => setIsOpen(false)}
        zIndex={50}
        fullScreen={fullScreen}
      >
        <Box
          sx={{
            maxWidth: "690px",
            position: ["fixed", "inherit", "inherit"],
            maxHeight: ["100%", "800px", "800px"],
            height: ["100%", "auto", "auto"],
            width: ["100%", null, null],
            margin: "auto",
            background: "background",
            borderRadius: [null, "5px", "5px"],
            padding: "20px",
            // position: ['fixed', 'inherit', 'inherit'],
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Flex
            sx={{
              borderBottomWidth: title ? "1px" : "0px",
              borderBottomColor: "divider",
              borderBottomStyle: "solid",
              paddingY: "5px",
              // marginBottom: '20px',
            }}
          >
            {title && (
              <Text
                as="div"
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {title}
              </Text>
            )}

            <Close
              onClick={() => {
                setIsOpen(false);
              }}
              id="close-button"
              sx={{
                alignItems: "center",
                height: "100%",
                marginLeft: "auto",
              }}
            />
          </Flex>
          {children}
        </Box>
      </BlackBox>
    </>
  );
};

export default StandardModal;
