import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { API, graphqlOperation, PubSub } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import React from "react";
import { createEditor, Path, Transforms } from "slate";
import { Flex, Box } from "theme-ui";
import { withHistory } from "slate-history";
import { ZenObservable } from "zen-observable-ts";

import renderElement from "./RenderElement";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";
import SkeletonPost from "./SkeletonPost";
import { getActivity } from "../../../actions/PostGet";

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
  CustomElement,
  CloudinaryImage,
  VideoEmbedType,
} from "../../../types/common";
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from "../../../actions/PubSub";
import Menu from "../../Menu";
import { StravaModal } from "./AddStravaLink";
import { AddVideoModal } from "./AddVideo";
import { RWGPSModal } from "./AddRWGPS";
import Leaf from "./Leaf";
import SlateDecorate from "./SlateDecorate";
import { getActivityData } from "../../../../lib/editorApi";
import slateApi from "../../../../lib/slateApi";
import FloatingMenu from "./FloatingMenu";
import { useViewport } from "../../ViewportProvider";
import MobileMenu from "./MobileMenu";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = React.useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const [loading, setLoading] = React.useState(true);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);
  const [selectionMenu, setSelectionMenu] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  const {
    isGpxUploadOpen,
    isRaceResultsModalOpen,
    setIsFtpUpdating,
    isShareModalOpen,
    setIsHeroImageModalOpen,
    isHeroImageModalOpen,
    setIsSavingPost,
    setSavingStatus,
    mobileMenu,
    setMobileMenu,
    setIsNewComponentMenuOpen,
    isNewComponentMenuOpen,
    setMenuPosition,
    menuPosition,
  } = React.useContext(EditorContext);

  const { width } = useViewport();

  const handleSelectionChange = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount < 1) {
      return;
    }
    const range = selection.getRangeAt(0);
    const { anchor } = editor.selection;

    console.log(range, editor.path(anchor.path));

    if (range && width < 500) {
      console.log("set mobile menu");
      const rect = range.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const adjustedTop = rect.bottom + scrollY - 10;
      const adjustedLeft = rect.right + scrollX + 10;
      // const { anchorNode } = selection;

      // If selection exists, get the path

      // console.log(anchor);

      // // If selection exists, get the path
      const path = anchor && editor.path(anchor.path);
      console.log(path);

      setMobileMenu({
        display: true,
        top: adjustedTop,
        left: adjustedLeft,
        path: path,
        isFullScreen: false,
      });
    }
    if (selection.rangeCount > 0) {
      // const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText.length > 0) {
        const rect = range.getBoundingClientRect();
        setSelectionMenu({ top: rect.bottom, left: rect.left });
      } else {
        setSelectionMenu(null);
      }
    } else {
      setSelectionMenu(null);
    }
  };

  // const {
  //   setIsNewComponentMenuOpen,
  //   isNewComponentMenuOpen,
  //   setMenuPosition,
  //   menuPosition,
  //   // mobileMenu,
  //   // setMobileMenu,
  // } = React.useContext(EditorContext);

  React.useEffect(() => {
    if (initialState) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [initialState]);

  React.useEffect(() => {
    const subscription = API.graphql<
      GraphQLSubscription<OnUpdatePostSubscription>
    >(graphqlOperation(subscriptions.onUpdatePost)).subscribe({
      next: ({ value }) => {
        if (
          !value.data?.onUpdatePost?.powerZoneBuckets ||
          !value.data?.onUpdatePost?.timeInRed ||
          !value.data?.onUpdatePost?.powerZones
        ) {
          return;
        }

        setTimeInRed && setTimeInRed(value.data?.onUpdatePost?.timeInRed);
        setPowerZoneBuckets &&
          setPowerZoneBuckets(
            JSON.parse(value.data?.onUpdatePost?.powerZoneBuckets)
          );
        setPowerZones &&
          setPowerZones(JSON.parse(value.data?.onUpdatePost?.powerZones));
        setIsFtpUpdating(false);
      },
      error: (error) => console.warn(error),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getData = async () => {
    const payload = await getActivityData(timeSeriesFile);
    if (!payload) {
      console.log("no data found for post");
      return;
    }

    setPowerAnalysis && setPowerAnalysis(payload.powerAnalysis);
    setPowers && setPowers(payload.powers);
    setHearts && setHearts(payload.hearts);
    setActivity && setActivity(payload.activity);
  };

  React.useEffect(() => {
    let subUpdates: ZenObservable.Subscription;

    setUpSub().then((sub) => {
      subUpdates = sub;
    });

    return () => {
      if (subUpdates) {
        subUpdates.unsubscribe();
      }
    };
  }, [subPubConfigured]);

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

  React.useEffect(() => {
    getData();
  }, [id]);

  const addImage = async ({
    selectedImage,
  }: {
    selectedImage: CloudinaryImage | undefined;
  }) => {
    setHeroImage && setHeroImage(selectedImage);
    setIsHeroImageModalOpen(false);

    await PostSaveComponents({
      postId: id,
      title: title,
      postLocation: postLocation,
      components: editor.children,
      heroImage: selectedImage ? JSON.stringify(selectedImage) : "",
    });
  };

  const setUpSub = async () => {
    if (!subPubConfigured) {
      const endpoint = await getEndpoint();
      await configurePubSub(endpoint);
      await attachIoTPolicyToUser();
      setSubPubConfigured(true);
    }

    return PubSub.subscribe(`post-${id}`).subscribe({
      next: async (data: any) => {
        console.log(data);
        if (data.value.type === "video.asset.ready") {
          console.log("asseet reead");
          Transforms.setNodes<CustomElement>(
            editor,
            {
              isReady: true,
            } as VideoEmbedType,
            {
              at: [],
              match: (node) => {
                const custom = node as CustomElement;
                return custom.type === "videoEmbed" && custom.isReady === false;
              },
            }
          );

          await PostSaveComponents({
            postId: id,
            title: title,
            postLocation: postLocation,
            components: editor.children,
            heroImage: heroImage ? JSON.stringify(heroImage) : "",
          });
        }
      },
      error: (error: any) => console.error(error),
    });
  };

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
          setMenuPosition({
            ...menuPosition,
            top: rect.bottom,
            left: rect.left,
          });
        }
      }
    }
  }, [editor]);

  return (
    <Flex>
      <PublishModalConfirmation />
      {isHeroImageModalOpen && (
        <AddImage setIsOpen={setIsHeroImageModalOpen} callback={addImage} />
      )}
      {isGpxUploadOpen && <UploadGpxModal />}
      {isShareModalOpen && <ShareModal />}
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

            console.log("on change");
            handleSelectionChange();
            setComponents && setComponents(newValue as Array<CustomElement>);

            slateApi.saveEditor({
              editor,
              id,
              title,
              postLocation,
              setSavingStatus,
              setIsSavingPost,
              timeoutLink,
              setTimeoutLink,
            });
          }}
        >
          {isNewComponentMenuOpen && <Menu menuPosition={menuPosition} />}

          <AddVideoModal />
          {selectionMenu && (
            <FloatingMenu top={selectionMenu.top} left={selectionMenu.left} />
          )}
          <MobileMenu
          // top={mobileMenu.top}
          // left={mobileMenu.left}
          // path={mobileMenu.path}
          />
          <Editable
            spellCheck
            autoFocus
            renderElement={renderElement}
            decorate={SlateDecorate}
            renderLeaf={(props: RenderLeafProps) => {
              return (
                <Leaf props={props} updateMenuPosition={updateMenuPosition} />
              );
            }}
            onKeyDown={(event) => {
              const { selection } = editor;
              if (
                (event.key === "/" && !selection) ||
                (event.key === "/" && selection && selection.focus.offset === 0)
              ) {
                // event.preventDefault();
                setIsNewComponentMenuOpen(true);
              }
            }}
            contentEditable="true"
          />
        </Slate>
      </Box>
    </Flex>
  );
};

export default PostEditor;
