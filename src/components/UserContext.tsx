import React from "react";
import { IUser } from "../../pages/_app";

export type UserContextType = {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export { UserContext };
