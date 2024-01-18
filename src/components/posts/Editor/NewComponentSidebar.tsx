import { Flex, Text, Box, Button } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { EditorContext } from "./EditorContext";
import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";
import TimePowerZonesIcon from "../../icons/TimePowerZonesIcon";
import { PostContext } from "../../PostContext";
import StravaIcon from "../../icons/StravaIcon";
import EmbedIcon from "../../icons/EmbedIcon";
import StandardModal from "../../shared/StandardModal";
import EmbedSettings from "../Embed/EmbedSettings";
import { useViewport } from "../../ViewportProvider";
import ResultsIcon from "../../icons/ResultsIcon";
import SidebarLeft from "../../shared/SidebarLeft";
import StravaEmbed from "../Embed/StravaEmbed";
import VideoUploader from "../VideoEmbed/VideoUploader";
import { CustomEditor, TextElement } from "../../../types/common";
import VideoIcon from "../../icons/VideoIcon";
import GraphSelectorMenu from "./NewComponentSelectorMenu";

const NewComponentSidebar = ({
  editor,
}: // children,
{
  // children: JSX.Element;
  editor: CustomEditor;
}) => {
  const {
    setIsGraphMenuOpen,
    setIsGpxUploadOpen,
    setIsRaceResultsModalOpen,
    setIsVideoUploadOpen,
    isVideoUploadOpen,
  } = React.useContext(EditorContext);

  return (
    <SidebarLeft
      closeOnclick={() => setIsGraphMenuOpen(false)}
      title={"Components"}
    >
      <GraphSelectorMenu editor={editor} />
    </SidebarLeft>
  );
};

export default NewComponentSidebar;
