import { Box, ThemeUIStyleObject, Theme } from "theme-ui";
import React from "react";
import Router from "next/router";

import PostEditor from "./PostEditor";
import Header from "../../shared/Header/Header";
import { EditorContext } from "../Editor/EditorContext";
import { IUser } from "../../../types/common";
import { usePost } from "../../PostContext";
import useEditorState from "../../../hooks/useEditorState";

const EditUserPost = ({ user }: { user: IUser }) => {
  const editorState = useEditorState();
  const { components } = usePost();
  console.log("components", components);

  return (
    <>
      <Box
        as="main"
        sx={
          {
            width: "100%",
            // backgroundColor: "red",
            // flexGrow: 1,
            // height: "100vh",
            minHeight: "100%",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <EditorContext.Provider value={editorState}>
          <Header user={user} />
          <PostEditor
            initialState={
              components.length === 0
                ? [
                    {
                      children: [
                        {
                          text: "",
                        },
                      ],
                      photoCaption: "this is a new captiin",
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
    </>
  );
};

export default EditUserPost;
