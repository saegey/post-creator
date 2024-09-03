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
}: {
  children: any;
  isOpen: boolean;
  setIsOpen: any;
  title?: string | undefined;
  fullScreen?: boolean;
  onClose?: () => void;
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
                paddingY: "5px",
              } as ThemeUIStyleObject<Theme>
            }
          >
            {title && (
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
                  alignItems: "center",
                  height: "100%",
                  marginLeft: "auto",
                } as ThemeUIStyleObject<Theme>
              }
            />
          </Flex>
          {children}
        </Box>
      </BlackBox>
    </>
  );
};

export default StandardModal;
