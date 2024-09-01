import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Box, Spinner, Flex, ThemeUIStyleObject, Theme } from "theme-ui";

import { PostContext } from "../../PostContext";
import { VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";
import HoverAction from "../Editor/HoverAction";
import VisualOverview from "./VisualOverview";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

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
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

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

  const optionsMenuMemo = React.useMemo(() => {
    return optionsMenu;
  }, [isOptionsOpen]);

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
        elevations={elevations ? elevations : []}
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
        sx={
          {
            width: "900px",
            marginX: "auto",
            backgroundColor: "divider",
            borderRadius: "5px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Spinner sx={{ margin: "auto" } as ThemeUIStyleObject<Theme>} />
      </Flex>
    );
  }

  // const vizOverviewMemo = React.useMemo(() => {
  //   console.log("rendering visual overview wrapper memo");
  //   return (

  //   );
  // }, [selection, activity, elevations]);

  return (
    <VisualOverviewContext.Provider
      value={{ selection, setSelection, isSaved, setIsSaved }}
    >
      <HoverAction element={element}>
        <>
          <Box
            sx={
              {
                position: "relative",
                maxWidth: "690px",
                marginX: "auto",
              } as ThemeUIStyleObject<Theme>
            }
            contentEditable={false}
          >
            {renderMap}
            {optionsMenuMemo}
          </Box>
          {children}
        </>
      </HoverAction>
    </VisualOverviewContext.Provider>
  );
};

export default VisualOverviewWrapper;
