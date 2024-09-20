import { Box, Flex } from "theme-ui";
import HeroImage from "./HeroImage";
import DefaultImage from "./DefaultImage";
import PostHeaderTextBlock from "./PostHeaderTextBlock";
import { HeroBannerType } from "../../../types/common";

interface HeroBannerBaseProps {
  element: HeroBannerType;
  imageUrl?: string;
  title?: string;
  subhead?: string;
  date?: string;
  postLocation?: string;
}

const HeroBannerBase: React.FC<HeroBannerBaseProps> = (props) => {
  const { element, imageUrl, title, subhead, date, postLocation } = props;

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "60px",
        backgroundColor: "surface",
      }}
      contentEditable={false}
    >
      <Flex
        sx={{
          height: "fit-content",
          flexDirection: ["column", "row", "row"],
          width: "100%",
        }}
      >
        {element.image && element !== null && imageUrl ? (
          <HeroImage element={element} imageUrl={imageUrl} />
        ) : (
          <DefaultImage />
        )}

        <PostHeaderTextBlock
          type={""}
          title={title ? title : "Title"}
          teaser={subhead ? subhead : "Subhead"}
          date={date ? date : "Event date"}
          location={postLocation ? postLocation : "Location"}
          headerImageCaption={element.photoCaption}
        />
      </Flex>
    </Box>
  );
};

export default HeroBannerBase;
