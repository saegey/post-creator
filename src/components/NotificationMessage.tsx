import { Close, Flex, Message, Text } from "theme-ui";
import React from "react";
import { darken } from "@theme-ui/color";

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
        top: 0,
        marginTop: ["", "5px", "5px"],
        flexGrow: 1,
        justifyContent: "center",
        zIndex: 51,
      }}
    >
      <Message
        sx={{
          width: ["100vw", "400px", "400px"],
          padding: ["20px", "10px", "10px"],
          color: "white",
          backgroundColor: notification.type === "Error" ? "error" : "success",
          borderRadius: ["0px", "5px", "5px"],
          borderLeftWidth: ["0px", "5px", "5px"],
          borderLeftColor:
            notification.type === "Error"
              ? darken("error", 0.1)
              : darken("success", 0.1),
        }}
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
