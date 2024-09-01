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

  return (
    <Box
      as="main"
      sx={
        {
          width: "100vw",
          flexGrow: 1,
        } as ThemeUIStyleObject<Theme>
      }
    >
      <EditorContext.Provider value={editorState}>
        <Header user={user} />
        <PostEditor initialState={components} />
      </EditorContext.Provider>
    </Box>
  );
};

export default EditUserPost;
