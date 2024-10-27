import { Auth, API } from "aws-amplify";
import React from "react";

import { updateUser } from "../../graphql/mutations";
import { IUser } from "../../types/common";
import AddMediaComponent from "../posts/Editor/AddMediaComponent";
import { UserContext } from "../UserContext";
import Button from "../shared/Button";

async function updateAvatar({ picture }: { picture: string }) {
  const user: IUser = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    picture,
  });

  await API.graphql({
    authMode: "AMAZON_COGNITO_USER_POOLS",
    query: updateUser,
    variables: {
      input: {
        id: user.attributes.sub,
        image: picture,
      },
    },
  });
}

const EditAvatar = () => {
  const newMediaRef = React.useRef<any>(null); // Ref for AddMediaComponent

  const { user, setUser } = React.useContext(UserContext);
  if (!user) {
    return <></>;
  }

  return (
    <>
      <AddMediaComponent
        onClose={() => {
          // setIsHeroImageModalOpen(false);
        }}
        ref={newMediaRef}
        uploadPreset="epcsmymp"
        onSuccess={async (d) => {
          if (typeof d.info !== "string" && d.info?.public_id && user) {
            updateAvatar({ picture: d.info.public_id });
            setUser({
              ...user,
              attributes: { ...user.attributes, picture: d.info.public_id },
            });
          } else {
            console.log("Error uploading image", d.info, user);
          }
        }}
      />
      <Button
        variant="primaryButton"
        sx={{ width: "150px" }}
        onClick={() => newMediaRef.current.openModal()}
      >
        Change avatar
      </Button>
    </>
  );
};

export default EditAvatar;
