import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Box, Spinner, Flex, Text } from "theme-ui";
import { Transforms } from "slate";

import { PostContext } from "../../PostContext";
import { VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";
import VisualOverview from "./VisualOverview";
import { moveNodeDown, moveNodeUp } from "../../../utils/SlateUtilityFunctions";

const VisualOverviewWrapper = ({
  element,
  view,
  unitOfMeasure,
  children,
}: {
  element: VisualOverviewType;
  view: boolean;
  unitOfMeasure: string;
  children: JSX.Element;
}) => {
  const { activity, elevations } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

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

  const renderMap = React.useMemo(() => {
    console.log("render map");
    const formatted =
      activity?.map((a, i) => {
        return {
          ...a,
          g: a.g !== null ? a.g : 0,
          d:
            unitOfMeasure === "imperial"
              ? a && a.d
                ? Number((a.d * 0.00062137121212121).toFixed(5))
                : 0
              : a && a.d
              ? Number((a?.d / 1000).toFixed(5))
              : 0,
          e: unitOfMeasure === "metric" ? a.e : a && a.e ? a.e * 3.28084 : 0,
        };
      }) || [];

    return (
      <VisualOverview
        activity={formatted}
        elevations={elevations}
        token={
          "pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg"
        }
        element={element}
        view={view}
        unitOfMeasure={unitOfMeasure}
      />
    );
  }, [activity, elevations]);

  if (!activity || activity.length === 0 || !unitOfMeasure) {
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
  console.log("rendering visual overview wrapper");
  return (
    <VisualOverviewContext.Provider
      value={{ selection, setSelection, isSaved, setIsSaved }}
    >
      <HoverAction element={element}>
        <>
          <Box
            sx={{ position: "relative", maxWidth: "690px", marginX: "auto" }}
            contentEditable={false}
          >
            {renderMap}
            <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
              <OptionsMenu
                isOpen={isOptionsOpen}
                setIsOpen={setIsOptionsOpen}
                path={path}
              >
                <>
                  <Box
                    onClick={(e) => {
                      moveNodeUp(editor, path);
                      setIsOptionsOpen(false);
                    }}
                    variant="boxes.dropdownMenuItem"
                  >
                    <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                      Move Up
                    </Text>
                  </Box>
                  <Box
                    onClick={(e) => {
                      moveNodeDown(editor, path);
                      setIsOptionsOpen(false);
                      // setAddCaption(false);
                    }}
                    variant="boxes.dropdownMenuItem"
                  >
                    <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                      Move Down
                    </Text>
                  </Box>
                  <Box
                    onClick={() => {
                      Transforms.removeNodes(editor, { at: path });
                      // setIsMenuOpen(false);
                    }}
                    variant="boxes.dropdownMenuItem"
                  >
                    Remove
                  </Box>
                </>
              </OptionsMenu>
            </Box>
          </Box>
          {children}
        </>
      </HoverAction>
    </VisualOverviewContext.Provider>
  );
};

export default VisualOverviewWrapper;
