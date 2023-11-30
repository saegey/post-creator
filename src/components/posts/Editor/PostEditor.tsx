import { Slate, Editable, withReact } from "slate-react";
import { API, graphqlOperation, Storage, Amplify, PubSub } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import React from "react";
import { Element as SlateElement, createEditor } from "slate";
import { Flex, Box } from "theme-ui";
import { withHistory } from "slate-history";
import { Descendant, Transforms } from "slate";
import { ZenObservable } from "zen-observable-ts";

import renderElement, { renderLeaf } from "./RenderElement";
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
// import { CustomElement } from '../../../types/common';

type MatchType = {
  node: CustomElement;
};

// Amplify.configure({
//   // aws_user_files_s3_bucket_region: "us-east-1", // (required) - Amazon S3 bucket region
//   aws_user_files_s3_bucket:
//     "s3-object-lambda-acc-w69hfsywux9wwrxffacbyfdsuse1a--ol-s3", // (required) - Amazon S3 bucket URI
//   // aws_user_files
// });

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = React.useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  ) as CustomEditor;

  const [loading, setLoading] = React.useState(true);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);

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
    if (!timeSeriesFile) {
      return;
    }
    const result = await Storage.get(timeSeriesFile, {
      download: true,
      // bucket: "s3-object-lambda-access-point",
      level: "private",
    });
    const timeSeriesData = (await new Response(
      result.Body
    ).json()) as TimeSeriesDataType;

    const activity = await getActivity(timeSeriesData);
    setPowerAnalysis && setPowerAnalysis(timeSeriesData.powerAnalysis);
    setPowers && setPowers(timeSeriesData.powers);
    setHearts && setHearts(timeSeriesData.hearts);
    return activity;
  };

  React.useEffect(() => {
    getData().then((d) => {
      setActivity && setActivity(d as any);
    });
  }, [id]);

  const insertImage = ({
    selectedImage,
  }: {
    selectedImage: CloudinaryImage | undefined;
  }) => {
    Transforms.insertNodes(editor, [
      {
        type: "image",
        asset_id: selectedImage?.asset_id,
        public_id: selectedImage?.public_id,
        children: [{ text: "" }],
        void: true,
      } as Descendant,
      { type: "text", children: [{ text: "" }] } as Descendant,
    ]);
  };

  const addImage = ({
    selectedImage,
  }: {
    selectedImage: CloudinaryImage | undefined;
  }) => {
    setHeroImage && setHeroImage(selectedImage);
    setIsHeroImageModalOpen(false);
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

  let timeoutHandle: NodeJS.Timeout;

  if (loading) {
    return <SkeletonPost />;
  }

  return (
    <Flex>
      {isPublishedConfirmationOpen && <PublishModalConfirmation />}
      {isGraphMenuOpen && <NewComponentSelectorMenu editor={editor} />}
      {isImageModalOpen && (
        <AddImage callback={insertImage} setIsOpen={setIsImageModalOpen} />
      )}
      {isHeroImageModalOpen && (
        <AddImage setIsOpen={setIsHeroImageModalOpen} callback={addImage} />
      )}
      {isGpxUploadOpen && <UploadGpxModal />}
      {isShareModalOpen && <ShareModal />}
      {isRaceResultsModalOpen && <RaceResultsImport editor={editor} />}
      <Box
        sx={{
          minWidth: [null, null, "900px"],
          marginLeft: isGraphMenuOpen
            ? ["20px", "20px", "auto"]
            : [0, 0, "auto"],
          marginRight: isGraphMenuOpen
            ? ["20px", "20px", "auto"]
            : [0, 0, "auto"],
          marginBottom: "50px",
          width: ["100%", null, null],
          backgroundColor: "background",
          borderRadius: "10px",
          padding: "0px",
          paddingBottom: "200px",
        }}
      >
        <Slate
          editor={editor}
          initialValue={initialState}
          onChange={(newValue) => {
            const ops = editor.operations.filter((o) => {
              if (o) {
                return o.type !== "set_selection";
              }
              return false;
            });

            if (ops && ops.length === 0) {
              return;
            }
            setSavingStatus("");

            if (timeoutLink) {
              clearTimeout(timeoutLink);
            }
            timeoutHandle = setTimeout(async () => {
              setIsSavingPost(true);
              setSavingStatus("saving...");

              await PostSaveComponents({
                postId: id,
                title: title,
                postLocation: postLocation,
                components: editor.children,
                heroImage: heroImage ? JSON.stringify(heroImage) : "",
              });
              setSavingStatus("saved");

              setIsSavingPost(false);
            }, 2000);

            setTimeoutLink(timeoutHandle);
            setComponents && setComponents(newValue as Array<CustomElement>);
          }}
        >
          <PostMenu />
          <Editable
            spellCheck
            autoFocus
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            style={{ paddingBottom: "200px" }}
          />
        </Slate>
      </Box>
    </Flex>
  );
};

export default PostEditor;
