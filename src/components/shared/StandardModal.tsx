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
}: {
  children: any;
  isOpen: boolean;
  setIsOpen: any;
  title?: string | undefined;
  fullScreen?: boolean;
  onClose?: () => void;
  heading?: React.ReactNode;
  topRight?: React.ReactNode;
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
    // console.log("escape key eevent");
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log("escape key eevent", event);
      if (event.key === "Escape") {
        // closeModal(); // Close modal on Escape key
        console.log("escape key pressed");
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
          sx={
            {
              maxWidth: "690px",
              display: ["flex", "inherit", "inherit"],
              position: ["fixed", "inherit", "inherit"],
              flexDirection: "column",
              maxHeight: ["100dvh", "800px", "800px"],
              height: ["100dvh", "auto", "auto"],
              width: ["100%", null, null],
              margin: "auto",
              background: "background",
              borderRadius: [null, "5px", "5px"],
              padding: "20px",
              zIndex: 51,
            } as ThemeUIStyleObject<Theme>
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex
            sx={
              {
                borderBottomWidth: title ? "1px" : "0px",
                borderBottomColor: "border",
                borderBottomStyle: "solid",
                // paddingY: "5px",
              } as ThemeUIStyleObject<Theme>
            }
          >
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
                  sx={
                    {
                      padding: "0px",
                      // alignItems: "center",
                      // height: "100%",
                      // marginLeft: "auto",
                    } as ThemeUIStyleObject<Theme>
                  }
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
