import React from "react";
import { Box } from "theme-ui";

import { BulletedListType } from "../../../../types/common";
import BulletListBase from "./BulletListBase";

const BulletListView = ({
  children,
  element,
  attributes,
}: {
  attributes: object;
  children: React.ReactNode;
  element: BulletedListType;
}) => {
  const bulletListMemo = React.useMemo(() => {
    return <BulletListBase>{children}</BulletListBase>;
  }, [element]);

  return (
    <Box
      sx={{
        position: "relative",
        width: ["100%", "690px", "690px"],
        marginX: "auto",
        marginY: "20px",
      }}
    >
      {bulletListMemo}
    </Box>
  );
};

export default BulletListView;
