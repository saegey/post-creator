// NotificationMessage.tsx
import { Close, Flex, Message, Text } from "theme-ui";
import React, { useEffect } from "react";
import { darken } from "@theme-ui/color";

import { NotificationContext } from "./NotificationContext";

const NotificationMessage = () => {
  const { notification, setNotification } =
    React.useContext(NotificationContext);

  useEffect(() => {
    if (!notification) return;

    // Determine if auto-dismiss is enabled and set the duration
    const autoDismiss =
      notification.autoDismiss !== undefined ? notification.autoDismiss : true;
    const duration =
      notification.duration !== undefined ? notification.duration : 10000; // Default to 10 seconds

    if (autoDismiss) {
      const timer = setTimeout(() => {
        setNotification(undefined);
      }, duration);

      // Cleanup the timer if the component unmounts or notification changes
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  if (notification === undefined) {
    return null; // It's better to return null instead of an empty fragment
  }

  return (
    <Flex
      sx={{
        position: "fixed", // Changed to fixed to ensure it stays in view
        width: "100%",
        top: 0,
        marginTop: [0, "5px", "5px"],
        marginX: "0",
        flexGrow: 1,
        justifyContent: "center",
        zIndex: 51,
        pointerEvents: "none", // Allows clicks to pass through if needed
      }}
    >
      <Message
        sx={{
          width: ["100vw", "400px", "400px"], // Adjusted for better responsiveness on mobile
          padding: ["20px", "10px", "10px"],
          color: "white",
          backgroundColor: notification.type === "Error" ? "error" : "success",
          borderRadius: ["0px", "5px", "5px"],
          borderLeftWidth: ["0px", "5px", "5px"],
          borderLeftColor:
            notification.type === "Error"
              ? darken("error", 0.1)
              : darken("success", 0.1),
          pointerEvents: "auto", // Enable interaction within the notification
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: add a shadow for better visibility
        }}
      >
        <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text sx={{ flex: 1 }}>{notification.message}</Text>
          <Close
            sx={{
              cursor: "pointer",
              marginLeft: "10px",
              flexShrink: 0,
            }}
            onClick={() => setNotification(undefined)}
            aria-label="Close Notification"
          />
        </Flex>
      </Message>
    </Flex>
  );
};

export default NotificationMessage;
