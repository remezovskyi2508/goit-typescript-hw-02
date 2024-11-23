export interface ImageType {
  id?: string;
  url: string;
  description: string;
  likes: number;
  author: string;
}

export interface ImageInfo {
  id?: string;
  urls: {
    regular: string;
    small?: string;
    full?: string;
  };
  alt_description?: string;
  description: string;
  likes: number;
  user: {
    name: string;
  };
}

export interface ApiResponse {
  results: ImageInfo[];
  total: number;
}
export interface ImgModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImg: ImageType | null;
}

export interface ImageGalleryProps {
  images: ImageInfo[];
  onImageClick: (image: ImageInfo) => void;
}

export interface ImageCardProps {
  image: ImageInfo;
  onImageClick: (full: string | undefined) => void;
}
