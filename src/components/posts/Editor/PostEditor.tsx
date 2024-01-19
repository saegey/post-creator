import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { API, graphqlOperation, Storage, Amplify, PubSub } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import React from "react";
import {
  Editor,
  Range,
  Element as SlateElement,
  createEditor,
  Transforms,
  Descendant,
} from "slate";
import { Flex, Box } from "theme-ui";
import { withHistory } from "slate-history";
// import { , Transforms } from "slate";
import { ZenObservable } from "zen-observable-ts";

import renderElement from "./RenderElement";
import PostMenu from "./PostMenu/PostMenu";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";
import SkeletonPost from "./SkeletonPost";
import { getActivity } from "../../../actions/PostGet";
import NewComponentSelectorMenu from "./NewComponentSelectorMenu";
import * as subscriptions from "../../../graphql/subscriptions";
import UploadGpxModal from "./UploadGpxModal";
import { OnUpdatePostSubscription } from "../../../API";
import ShareModal from "./ShareModal";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import AddImage from "../Image/AddImage";
import withLinks from "../../plugins/withLinks";
import withLayout from "../../plugins/withLayout";
import { PostSaveComponents } from "../../../actions/PostSave";
import PublishModalConfirmation from "./PublishModalConfirmation";
import {
  CustomEditor,
  CustomElement,
  CloudinaryImage,
  TimeSeriesDataType,
  VideoEmbedType,
} from "../../../types/common";
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from "../../../actions/PubSub";
import NewComponentSidebar from "./NewComponentSidebar";
import Menu from "../../Menu";

const Leaf = ({
  attributes,
  children,
  updateMenuPosition,
}: {
  attributes: RenderLeafProps;
  children: JSX.Element;
  updateMenuPosition: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      {...attributes}
      onMouseUp={updateMenuPosition}
      // style={{ fontWeight: attributes.leaf.bold ? "bold" : "" }}
    >
      {children}
    </span>
  );
};

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = React.useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const [loading, setLoading] = React.useState(true);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);
  // const { isGraphMenuOpen } = React.useContext(EditorContext);
  const {
    setIsNewComponentMenuOpen,
    isNewComponentMenuOpen,
    setMenuPosition,
    menuPosition,
  } = React.useContext(EditorContext);
  const [showMenu, setShowMenu] = React.useState(false);

  // React.useEffect(() => {
  //   let subUpdates: ZenObservable.Subscription;

  //   setUpSub().then((sub) => {
  //     subUpdates = sub;
  //   });

  //   return () => {
  //     if (subUpdates) {
  //       subUpdates.unsubscribe();
  //     }
  //   };
  // }, [subPubConfigured]);

  const {
    id,
    timeSeriesFile,
    title,
    postLocation,
    heroImage,
    setActivity,
    setPowerAnalysis,
    setComponents,
    setTimeInRed,
    setPowerZones,
    setPowerZoneBuckets,
    setHeroImage,
    setPowers,
    setHearts,
  } = React.useContext(PostContext);

  const {
    isGraphMenuOpen,
    isGpxUploadOpen,
    isRaceResultsModalOpen,
    setIsFtpUpdating,
    isImageModalOpen,
    setIsImageModalOpen,
    isShareModalOpen,
    setIsHeroImageModalOpen,
    isHeroImageModalOpen,
    setIsSavingPost,
    setSavingStatus,
    isPublishedConfirmationOpen,
  } = React.useContext(EditorContext);
  // const [showMenu, setShowMenu] = React.useState(false);
  // const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });

  const updateMenuPosition = React.useCallback(() => {
    const selection = editor.selection;
    if (selection) {
      const domSelection = window.getSelection();
      if (!domSelection) {
        return;
      }

      if (domSelection && domSelection.anchorNode) {
        const parentElement = domSelection.anchorNode.parentElement;

        if (parentElement) {
          const rect = parentElement.getBoundingClientRect();
          console.log("Bounding rect for the parent element:", rect);
          setMenuPosition({ top: rect.bottom, left: rect.left });
        }
      }
    }
  }, [editor]);

  // console.log(hoverIconPosition);

  return (
    <Flex>
      <Box
        sx={{
          minWidth: [null, null, "900px"],
          marginLeft: [0, 0, "auto"],
          marginRight: [0, 0, "auto"],
          marginBottom: "50px",
          width: ["100%", null, null],
          backgroundColor: "background",
          borderRadius: "10px",
          padding: "0px",
          // paddingBottom: "200px",
          position: "relative",
        }}
      >
        <Slate
          editor={editor}
          initialValue={initialState}
          onChange={(newValue) => {
            updateMenuPosition();
          }}
        >
          {isNewComponentMenuOpen && (
            <Menu
              onClose={() => {
                setIsNewComponentMenuOpen(false);
              }}
              menuPosition={menuPosition}
            />
          )}
          <PostMenu />
          <Editable
            spellCheck
            autoFocus
            renderElement={renderElement}
            decorate={([node, path]) => {
              // console.log(node);
              if (editor.selection != null) {
                if (
                  !Editor.isEditor(node) &&
                  Editor.string(editor, [path[0]]) === "" &&
                  Range.includes(editor.selection, path) &&
                  Range.isCollapsed(editor.selection)
                ) {
                  return [
                    {
                      ...editor.selection,
                      placeholder: true,
                    },
                  ];
                }
              }

              return [];
            }}
            renderLeaf={(props: RenderLeafProps) => {
              return (
                <>
                  <Leaf {...props} updateMenuPosition={updateMenuPosition} />
                  {props.leaf.placeholder && (
                    <span
                      style={{
                        opacity: 0.3,
                        position: "absolute",
                        top: "0px",
                        left: "5px",
                      }}
                      contentEditable={false}
                    >
                      Type / to open menu
                    </span>
                  )}
                </>
              );
            }}
            style={{ paddingBottom: "200px" }}
            onKeyDown={(event) => {
              const { selection } = editor;
              // console.log(selection);

              if (
                (event.key === "/" && !selection) ||
                (event.key === "/" && selection && selection.focus.offset === 0)
              ) {
                // event.preventDefault();
                setIsNewComponentMenuOpen(true);
              }
            }}
          />
        </Slate>
      </Box>
    </Flex>
  );
};

export default PostEditor;
