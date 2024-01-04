import React from "react";

import { NotificationType } from "../types/common";

export type NotificationContextType = {
  notification: NotificationType | undefined;
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationType | undefined>
  >;
};

const NotificationContext = React.createContext<NotificationContextType>({
  notification: undefined,
  setNotification: () => {},
});

export { NotificationContext };
