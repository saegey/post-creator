import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import {
  Box,
  Spinner,
  Flex,
  ThemeUIStyleObject,
  Theme,
  Text,
  Button,
} from "theme-ui";

import { PostContext } from "../../PostContext";
import { VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { EditorContext } from "../Editor/EditorContext";
import RouteIcon from "../../icons/RouteIcon";
import VisualOverviewBase from "./VisualOverviewBase";

const VisualOverviewWrapper = ({
  element,
  view,
  unitOfMeasure,
}: {
  element: VisualOverviewType;
  view: boolean;
  unitOfMeasure: string;
}) => {
  const { activity, elevations, gpxFile } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);
  const { setIsSettingsModalOpen } = React.useContext(EditorContext);

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
    const formatted =
      activity?.map((a) => {
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
      <VisualOverviewBase
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
  }, [activity, elevations, unitOfMeasure]);

  if (!gpxFile) {
    return (
      <HoverAction element={element}>
        <>
          <Box variant="boxes.componentCard" contentEditable={false}>
            <Flex
              sx={
                {
                  backgroundColor: "surface",
                  borderRadius: "5px",
                  width: "100%",
                  height: ["250px", "450px", "450px"],
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  flexDirection: "column",
                } as ThemeUIStyleObject<Theme>
              }
            >
              <Flex sx={{ alignItems: "center", gap: "5px" }}>
                <RouteIcon
                  sx={{
                    color: "surfaceAccent",
                    width: "40px",
                    height: "40px",
                    // backgroundColor: "yellow",
                    padding: "0px",
                  }}
                />
                <Text
                  sx={{
                    color: "surfaceAccent",
                    fontSize: "20px",
                    fontWeight: 610,
                  }}
                >
                  Map requires activity
                </Text>
              </Flex>
              <Button
                variant="primaryButton"
                sx={{ width: "fit-content" }}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                Upload
              </Button>
            </Flex>
            {optionsMenu}
          </Box>
        </>
      </HoverAction>
    );
  }

  if (!activity || activity.length === 0 || !unitOfMeasure) {
    return (
      <Flex
        sx={
          {
            width: "900px",
            marginX: "auto",
            backgroundColor: "border",
            borderRadius: "5px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Spinner sx={{ margin: "auto" } as ThemeUIStyleObject<Theme>} />
      </Flex>
    );
  }

  return (
    <VisualOverviewContext.Provider
      value={{ selection, setSelection, isSaved, setIsSaved }}
    >
      <HoverAction element={element}>
        <>
          {renderMap}
          {optionsMenuMemo}
        </>
      </HoverAction>
    </VisualOverviewContext.Provider>
  );
};

export default VisualOverviewWrapper;
