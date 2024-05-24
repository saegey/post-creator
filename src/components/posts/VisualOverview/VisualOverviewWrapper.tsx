import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import dynamic from "next/dynamic";
import { Box, Spinner, Flex } from "theme-ui";
import { Transforms } from "slate";

import { PostContext } from "../../PostContext";
import { VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";
import VisualOverview from "./VisualOverview";

// const VisualOverview = dynamic(import("./VisualOverview"), {
//   ssr: false,
// }); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({
  element,
  view,
  unitOfMeasure,
}: {
  element: VisualOverviewType;
  view: boolean;
  unitOfMeasure: string;
}) => {
  const { activity } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

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

  const hoverAction = React.useMemo(() => {
    if (!activity || activity.length < 1) {
      return <></>;
    }
    console.log("visual overview render");



    const formatted = activity.map((a, i) => {
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
    });

    return (
      <HoverAction element={element}>
        <Box
          sx={{ position: "relative", maxWidth: "690px", marginX: "auto" }}
          contentEditable={false}
        >
          <VisualOverview
            activity={formatted}
            token={
              "pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg"
            }
            element={element}
            view={view}
            unitOfMeasure={unitOfMeasure}
          />

          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <OptionsMenu>
              <Box
                onClick={() => {
                  Transforms.removeNodes(editor, { at: path });
                  // setIsMenuOpen(false);
                }}
                variant="boxes.dropdownMenuItem"
              >
                Remove
              </Box>
            </OptionsMenu>
          </Box>
        </Box>
      </HoverAction>
    );
  }, [activity, unitOfMeasure]);

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

  return (
    <VisualOverviewContext.Provider
      value={{ selection, setSelection, isSaved, setIsSaved }}
    >
      {hoverAction}
    </VisualOverviewContext.Provider>
  );
};

export default VisualOverviewWrapper;
