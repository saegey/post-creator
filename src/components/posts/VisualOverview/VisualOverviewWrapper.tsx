import React, { useEffect } from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import dynamic from "next/dynamic";
import { Box, Spinner, Flex } from "theme-ui";
import { Transforms } from "slate";

import { PostContext } from "../../PostContext";
import OptionsButton from "../../buttons/OptionsButton";
import Dropdown from "../../shared/Dropdown";
import { useClickOutside } from "../../../utils/ux";
import { VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";
import { useUnits } from "../../UnitProvider";

const VisualOverview = dynamic(import("./VisualOverview"), {
  ssr: false,
}); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({
  element,
  view,
  units,
}: {
  element: VisualOverviewType;
  view: boolean;
  units: any;
}) => {
  const { activity } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const wrapperRef = React.useRef();
  const [selection, setSelection] = React.useState<
    [number, number] | undefined
  >(
    element && element.selectionStart && element.selectionEnd
      ? [element.selectionStart, element.selectionEnd]
      : undefined
  );

  const [isSaved, setIsSaved] = React.useState<boolean>(
    element && element.selectionStart ? true : false
  );
  // const units = useUnits();

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsMenuOpen(false);
      e.stopPropagation();
    }
  );

  if (!activity || activity.length === 0) {
    return (
      <Flex
        sx={{
          width: "900px",
          marginX: "auto",
          backgroundColor: "divider",
          borderRadius: "5px",
        }}
      >
        <Spinner sx={{ margin: "auto" }} />
      </Flex>
    );
  }

  const fixedData = activity.map((a, i) => {
    return {
      ...a,
      g: a.g !== null ? a.g : 0,
      d:
        units.unitOfMeasure === "imperial"
          ? a && a.d
            ? Number((a.d * 0.00062137121212121).toFixed(5))
            : 0
          : a && a.d
          ? Number((a?.d / 1000).toFixed(5))
          : 0,
      e: units.unitOfMeasure === "metric" ? a.e : a && a.e ? a.e * 3.28084 : 0,
    };
  });

  return (
    <Box
      sx={{ position: "relative", maxWidth: "900px", marginX: "auto" }}
      contentEditable={false}
    >
      <VisualOverviewContext.Provider
        value={{ selection, setSelection, isSaved, setIsSaved }}
      >
        <VisualOverview
          activity={fixedData}
          token={
            "pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg"
          }
          element={element}
          view={view}
          units={units}
        />
      </VisualOverviewContext.Provider>
      <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
        <OptionsButton
          onClick={() => {
            if (isMenuOpen) {
              setIsMenuOpen(false);
            } else {
              setIsMenuOpen(true);
            }
          }}
        />
        <Box ref={wrapperRef}>
          <Dropdown isOpen={isMenuOpen}>
            <Box
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });
                setIsMenuOpen(false);
              }}
              variant="boxes.dropdownMenuItem"
            >
              Remove
            </Box>
          </Dropdown>
        </Box>
      </Box>
    </Box>
  );
};

export default VisualOverviewWrapper;
