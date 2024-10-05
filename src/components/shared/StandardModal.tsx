import { Box, Flex, Text, Close, ThemeUIStyleObject, Theme } from "theme-ui";
import React from "react";

import BlackBox from "../layout/BlackBox";

const StandardModal = ({
  children,
  isOpen,
  setIsOpen,
  title = undefined,
  fullScreen = false,
  onClose,
  heading = undefined,
  topRight = undefined,
  maxWidth = "690px",
}: {
  children: any;
  isOpen: boolean;
  setIsOpen: any;
  title?: string | undefined;
  fullScreen?: boolean;
  onClose?: () => void;
  heading?: React.ReactNode;
  topRight?: React.ReactNode;
  maxWidth?: string;
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup: Remove event listener when modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <BlackBox
        opacity={0.7}
        onClick={() => {
          setIsOpen(false);
          if (onClose) {
            onClose();
          }
        }}
        zIndex={50}
        fullScreen={fullScreen}
      >
        <Box
          sx={{
            maxWidth: maxWidth,
            display: ["flex", "inherit", "inherit"],
            position: ["fixed", "inherit", "inherit"],
            flexDirection: "column",
            maxHeight: ["100dvh", "800px", "800px"],
            height: ["100dvh", "auto", "auto"],
            width: ["100%", null, null],
            margin: "auto",
            background: "background",
            borderRadius: [null, "15px", "15px"],
            paddingX: "20px",
            paddingY: "40px",
            zIndex: 51,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex>
            {heading ? (
              heading
            ) : (
              <Text
                as="div"
                sx={
                  {
                    fontSize: "20px",
                    fontWeight: 600,
                  } as ThemeUIStyleObject<Theme>
                }
              >
                {title}
              </Text>
            )}

            {topRight ? (
              <Box
                sx={
                  {
                    alignItems: "center",
                    height: "100%",
                    marginLeft: "auto",
                  } as ThemeUIStyleObject<Theme>
                }
              >
                {topRight}
              </Box>
            ) : (
              <Flex
                sx={{
                  justifyContent: "right",
                  flexGrow: 1,
                  verticalAlign: "top",
                }}
              >
                <Close
                  onClick={(e) => {
                    e.preventDefault();
                    (document.activeElement as HTMLElement)?.blur();

                    setIsOpen(false);
                    if (onClose) {
                      onClose();
                    }
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    (document.activeElement as HTMLElement)?.blur(); // Blur the active element to remove focus
                  }}
                  id="close-button"
                  sx={{
                    padding: "0px",
                    height: "24px",
                    width: "24px",
                    cursor: "pointer",
                  }}
                />
              </Flex>
            )}
          </Flex>
          {children}
        </Box>
      </BlackBox>
    </>
  );
};

export default StandardModal;
