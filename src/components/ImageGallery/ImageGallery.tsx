import ImageCard from "../ImageCard/ImageCard";

import { FC, useMemo } from "react";

import css from "./ImageGallery.module.css";
import { ImageGalleryProps } from "../App/Type";

const ImageGallery: FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  const memoizedImages = useMemo(() => {
    return images.map((image) => (
      <li className={css.galleryList} key={image.id}>
        <ImageCard image={image} onImageClick={() => onImageClick(image)} />
      </li>
    ));
  }, [images, onImageClick]);
  return (
    <>
      <ul className={css.gallery}>{images !== null && memoizedImages}</ul>
    </>
  );
};

export default ImageGallery;
