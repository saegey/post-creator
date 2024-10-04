import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Label,
  Spinner,
  ThemeUIStyleObject,
  Theme,
  IconButton,
} from "theme-ui";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import Router from "next/router";

import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";
import { DeletePostMutation } from "../../../../src/API";
import StandardModal from "../../shared/StandardModal";
import UploadButton from "./PostMenu/buttons/UploadButton";
import {
  updatePostSettings,
  UpdatePostSettingsMutation,
} from "../../../graphql/customMutations";
import { deletePost } from "../../../graphql/mutations";
import DeleteIcon from "../../icons/DeleteIcon";

const PostSettings = () => {
  const { id, currentFtp, title, postLocation, date, subhead, setPost } =
    React.useContext(PostContext);

  const { setIsFtpUpdating, isSettingsModalOpen, setIsSettingsModalOpen } =
    React.useContext(EditorContext);

  const [isSaving, setIsSaving] = React.useState(false);

  const processDeletePost = async () => {
    try {
      (await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: id,
          },
        },
        query: deletePost,
      })) as GraphQLResult<DeletePostMutation>;
      Router.push(`/posts`);
    } catch (errors) {
      console.error(errors);
    }
  };

  const saveSettings = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSaving(true);
    const form = new FormData(event.target as HTMLFormElement);
    const newFtp = form.get("currentFtp") as string;
    if (Number(newFtp) !== Number(currentFtp)) {
      setIsFtpUpdating(true);
    }

    try {
      (await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: updatePostSettings,
        variables: {
          input: {
            currentFtp: form.get("currentFtp"),
            title: form.get("title"),
            subhead: form.get("subhead"),
            postLocation: form.get("postLocation"),
            date: form.get("eventDate"),
            id: id,
          },
        },
      })) as GraphQLResult<UpdatePostSettingsMutation>;

      setIsSaving(false);
      setIsSettingsModalOpen(false);
    } catch (errors) {
      console.error(JSON.stringify(errors));
    }

    setPost({
      currentFtp: Number(newFtp),
      title: form.get("title") as string,
      postLocation: form.get("postLocation") as string,
      date: form.get("eventDate") as string,
      subhead: form.get("subhead") as string,
    });
  };

  return (
    <StandardModal
      isOpen={isSettingsModalOpen}
      setIsOpen={setIsSettingsModalOpen}
      title={"Settings"}
      fullScreen={false}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveSettings(event).then(() => console.log("save settings"));
        }}
      >
        <Flex
          sx={
            {
              gap: "15px",
              flexDirection: "column",
              maxHeight: ["", "600px", "70vh"],
              height: ["calc(100vh - 120px)", "", ""], // dynamically fill height on mobile
              overflow: "auto", // make the content scrollable
            } as ThemeUIStyleObject<Theme>
          }
        >
          <Box sx={{ marginTop: "20px" } as ThemeUIStyleObject<Theme>}>
            <Label htmlFor="title" variant={"defaultLabel"}>
              Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={title ? title : ""}
              variant={"defaultInput"}
            />
          </Box>
          <Box>
            <Label htmlFor="title" variant={"defaultLabel"}>
              Subhead
            </Label>
            <Input
              id="subhead"
              name="subhead"
              defaultValue={subhead ? subhead : ""}
              variant={"defaultInput"}
            />
          </Box>
          <Box>
            <Label htmlFor="postLocation" variant={"defaultLabel"}>
              Location
            </Label>
            <Input
              id="postLocation"
              name="postLocation"
              defaultValue={postLocation ? postLocation : ""}
              variant={"defaultInput"}
            />
          </Box>
          <Box>
            <UploadButton />
          </Box>
          <Box>
            <Label htmlFor="currentFtp" variant={"defaultLabel"}>
              FTP
            </Label>
            <Input
              id="currentFtp"
              name="currentFtp"
              defaultValue={currentFtp ? currentFtp : ""}
              variant={"defaultInput"}
            />
          </Box>
          <Box>
            <Label htmlFor="eventDate" variant={"defaultLabel"}>
              Date
            </Label>
            <Input
              id="eventDate"
              name="eventDate"
              defaultValue={date ? date : ""}
              variant={"defaultInput"}
            />
          </Box>
          <Box>
            <Flex sx={{ flexDirection: ["column", "row", "row"] }}>
              <Box>
                <Text as="p" sx={{ fontWeight: "700", fontSize: "15px" }}>
                  Delete this post
                </Text>
                <Text sx={{ fontSize: "15px" } as ThemeUIStyleObject<Theme>}>
                  Once you delete a post, there is no going back. Please be
                  certain.
                </Text>
              </Box>
              <Box
                sx={
                  {
                    flexGrow: 1,
                  } as ThemeUIStyleObject<Theme>
                }
              >
                <Flex
                  sx={{
                    width: "100%",
                    justifyContent: ["inherit", "right", "right"],
                  }}
                >
                  <Button
                    id="delete-post"
                    variant="dangerButton"
                    type="button"
                    onClick={processDeletePost}
                  >
                    <Flex sx={{ alignItems: "center", gap: "2px" }}>
                      <IconButton
                        as="div"
                        sx={{
                          width: ["24px", "24px", "24px"],
                          height: ["24px", "24px", "24px"],
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Text>Delete</Text>
                    </Flex>
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex
          sx={
            {
              borderTopWidth: "1px",
              borderTopColor: "border",
              borderTopStyle: "solid",
              backgroundColor: "background",
              marginTop: "5px",
              paddingTop: "5px",
              position: ["fixed", "inherit", "inherit"],
              bottom: ["0", "", ""],
              width: "100%",
              marginBottom: ["20px", "0px", "0px"],
            } as ThemeUIStyleObject<Theme>
          }
        >
          <Box
            sx={
              { marginLeft: ["", "auto", "auto"] } as ThemeUIStyleObject<Theme>
            }
          >
            <Flex
              sx={
                { gap: "10px", marginTop: "10px" } as ThemeUIStyleObject<Theme>
              }
            >
              <Button
                type="button"
                variant="secondaryButton"
                onClick={() => setIsSettingsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primaryButton">
                <Flex sx={{ gap: "10px" } as ThemeUIStyleObject<Theme>}>
                  <Text as="span">Save</Text>
                  {isSaving && (
                    <Spinner
                      sx={
                        {
                          size: "20px",
                          color: "secondary",
                        } as ThemeUIStyleObject<Theme>
                      }
                    />
                  )}
                </Flex>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    </StandardModal>
  );
};

export default PostSettings;
