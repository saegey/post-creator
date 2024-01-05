import { Close, Flex, Message, Text } from "theme-ui";
import React from "react";

import { NotificationContext } from "./NotificationContext";

const NotificationMessage = () => {
  const { notification, setNotification } =
    React.useContext(NotificationContext);

  if (notification === undefined) {
    return <></>;
  }

  return (
    <Flex
      sx={{
        position: "absolute",
        width: "100%",
        marginTop: "5px",
        flexGrow: 1,
        justifyContent: "center",
        zIndex: 51,
      }}
    >
      <Message
        sx={{ width: "400px", padding: "10px", backgroundColor: "#cc2020" }}
      >
        <Flex>
          <Text sx={{ alignSelf: "center" }}>{notification?.message}</Text>
          <Close
            sx={{
              padding: 0,
              width: "unset",
              height: "unset",
              flexGrow: 1,
              justifyContent: "right",
            }}
            onClick={() => setNotification(undefined)}
          />
        </Flex>
      </Message>
    </Flex>
  );
};

export default NotificationMessage;
