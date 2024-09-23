import React from "react";
import { getCldImageUrl } from "next-cloudinary";

import { PostContext } from "../../PostContext";
import { cloudUrl } from "../../../utils/cloudinary";
import { HeroBannerType } from "../../../types/common";
import { useViewport } from "../../ViewportProvider";
import HeroBannerBase from "./HeroBannerBase";

const HeroBannerView = ({ element }: { element: HeroBannerType }) => {
  const { title, postLocation, date, subhead } = React.useContext(PostContext);

  const { width } = useViewport();
  const imageWidth = width < 690 ? width : 690;

  const heroBannerMemo = React.useMemo(() => {
    const imageUrl = element.image
      ? getCldImageUrl(
          {
            src: element.image?.public_id,
            height: element.image?.height / (element.image?.width / imageWidth),
          },
          {
            cloud: {
              cloudName: cloudUrl,
            },
          }
        )
      : undefined;

    return (
      <HeroBannerBase
        element={element}
        imageUrl={imageUrl}
        title={title}
        subhead={subhead ? subhead : ""}
        date={date ? date : ""}
        postLocation={postLocation ? postLocation : ""}
      />
    );
  }, [title, postLocation, date, subhead, element.image, element.photoCaption]);

  return <>{heroBannerMemo}</>;
};

export default HeroBannerView;
