import React from "react";
import {
  GalleryImageContainer,
  GalleryImage,
  ImageContent,
  CloseButtonContainer,
  CloseButton,
} from "./gallery-image-view.styles";

const GalleryImageView = ({ img, show }) => {
  return (
    <GalleryImageContainer onClick={() => show(false)}>
      <ImageContent>
        <div>
          <CloseButtonContainer>
            <CloseButton size={36} onClick={() => show(false)} />
          </CloseButtonContainer>
          <GalleryImage src={img} alt='' />
        </div>
      </ImageContent>
    </GalleryImageContainer>
  );
};

export default GalleryImageView;
