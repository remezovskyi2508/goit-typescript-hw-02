import { FC } from "react";
import css from "./ImageCard.module.css";
import { ImageCardProps } from "../App/Type";

const ImageCard: FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        key={image.id}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onImageClick(image.urls.full)}
      />
    </div>
  );
};

export default ImageCard;
