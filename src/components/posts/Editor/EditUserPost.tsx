import { Box } from "theme-ui";
import React from "react";

import PostEditor from "./PostEditor";
import Header from "../../shared/Header/Header";
import { EditorContext } from "../Editor/EditorContext";
import { IUser } from "../../../types/common";
import { usePost } from "../../PostContext";
import useEditorState from "../../../hooks/useEditorState";
import SettingsSection from "../../shared/Header/SettingsSection";

const EditUserPost = ({ user }: { user: IUser }) => {
  const editorState = useEditorState();
  const { components } = usePost();

  return (
    <Box
      as="main"
      sx={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      <EditorContext.Provider value={editorState}>
        <Header user={user} right={<SettingsSection />} />
        <PostEditor
          initialState={
            !components || components.length === 0
              ? [
                  {
                    children: [
                      {
                        text: "",
                      },
                    ],
                    photoCaption: "",
                    type: "heroBanner",
                    void: true,
                  },
                  {
                    children: [
                      {
                        text: "",
                      },
                    ],
                    type: "postAuthor",
                  },
                  {
                    children: [
                      {
                        text: "Discuss your activity...",
                      },
                    ],
                    type: "paragraph",
                  },
                  {
                    children: [
                      {
                        text: "",
                      },
                    ],
                    type: "paragraph",
                  },
                ]
              : components
          }
        />
      </EditorContext.Provider>
    </Box>
  );
};

export default EditUserPost;
