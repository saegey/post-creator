// NotificationContext.tsx
import React, { createContext, useState } from "react";

interface Notification {
  type: "Error" | "Success";
  message: string;
  duration?: number; // Duration in milliseconds
  autoDismiss?: boolean; // Whether to auto-dismiss
}

interface NotificationContextProps {
  notification?: Notification;
  setNotification: (notification?: Notification) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notification: undefined,
  setNotification: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined
  );

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
