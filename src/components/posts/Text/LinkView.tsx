import React from "react";

import { LinkType } from "../../../types/common";
import LinkBase from "./LinkBase";

const LinkView = ({
  element,
  children,
}: {
  element: LinkType;
  children?: any;
}) => {
  return <LinkBase element={element}>{children}</LinkBase>;
};

export default LinkView;
