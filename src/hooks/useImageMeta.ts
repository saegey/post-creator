import React, { useContext } from "react";
import { getCldImageUrl } from "next-cloudinary";

import { PostContext } from "../components/PostContext";
import { CloudinaryImage, ImageElementType } from "../types/common";
import { cloudUrl } from "../utils/cloudinary";

// Custom hook to handle image metadata and URL generation
const useImageMeta = (element: ImageElementType, width: number) => {
  const { images } = useContext(PostContext);

  return React.useMemo(() => {
    const imageMetaIndex = images?.findIndex(
      (i) => i.public_id === element.public_id
    );
    if (imageMetaIndex === undefined || imageMetaIndex === -1) {
      return null;
    }

    const imageMeta = images ? images[imageMetaIndex] : undefined;
    const imageWidth = width < 690 ? width : 690;
    if (!imageMeta?.height || !imageMeta.width) {
      return null;
    }

    const imageUrl = getCldImageUrl(
      {
        src: element.public_id,
        width: imageWidth,
        height: imageMeta.height / (imageMeta.width / imageWidth),
      },
      {
        cloud: {
          cloudName: cloudUrl,
        },
      }
    );
    return { imageMeta, imageUrl, imageMetaIndex };
  }, [images, element, width]) as {
    imageMeta: CloudinaryImage;
    imageUrl: string;
    imageMetaIndex: number;
  };
};

export default useImageMeta;
