import { Descendant } from "slate";
import { CustomEditor } from "../src/types/common";
import { PostSaveComponents } from "../src/actions/PostSave";

const saveEditor = ({
  // newValue,
  editor,
  id,
  title,
  postLocation,
  setSavingStatus,
  setIsSavingPost,
  timeoutLink,
  setTimeoutLink,
  heroImage,
}: {
  // newValue: Descendant[];
  id: string;
  title: string | undefined;
  editor: CustomEditor;
  postLocation: string | null | undefined;
  setSavingStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsSavingPost: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutLink: NodeJS.Timeout | undefined;
  setTimeoutLink: React.Dispatch<
    React.SetStateAction<NodeJS.Timeout | undefined>
  >;
  heroImage?: string;
}) => {
  // let timeoutLink: NodeJS.Timeout | undefined = undefined;
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

  let timeoutHandle: NodeJS.Timeout;
  timeoutHandle = setTimeout(async () => {
    setIsSavingPost(true);
    setSavingStatus("saving...");

    await PostSaveComponents({
      postId: id,
      components: editor.children,
      // heroImage: heroImage ? heroImage : "",
    });
    setSavingStatus("saved");

    setIsSavingPost(false);
  }, 2000);

  setTimeoutLink(timeoutHandle);
};

export default { saveEditor };
