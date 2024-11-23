import "./App.css";

import axios from "axios";
import { useEffect, useState, FC } from "react";
import { Toaster, toast } from "react-hot-toast";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import ImageModal from "../ImageModal/ImageModal";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { ImageType, ImageInfo, ApiResponse } from "./Type";

const App: FC = () => {
  //Modal open/close;
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<ImageType | null>(null);

  const openModal = (image: ImageInfo) => {
    setSelectedImg({
      url: image.urls.regular,
      description: image.description,
      likes: image.likes,
      author: image.user.name,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImg(null);
  };

  //State for searchBar
  const [searchTopic, setSearchTopic] = useState<string>("");
  //State for ImageGallery
  const [images, setImages] = useState<ImageInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);
  // Value for URL response
  const params = {
    client_id: "KTgPCjIl5bHSKS3rJgiOFvqns88NWiKXgvLhb7v-WzM",
    per_page: 15,
    orientation: "landscape",
    query: searchTopic,
  };
  // Function for submit
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = (
      form.elements.namedItem("searchInput") as HTMLInputElement
    ).value.trim();
    if (searchValue === "") {
      toast.error("Поле не заповнене.");
      return;
    }
    setSearchTopic(searchValue);
    setPage(1);
    setImages([]);
    form.reset();
  };
  //Add page to before page
  const handleOnClick = (): void => {
    if (hasMoreImages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  //Fetch DATA from server
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const { data } = await axios.get<ApiResponse>(
          `https://api.unsplash.com/search/photos/?client_id=${params.client_id}&orientation=${params.orientation}&page=${page}&per_page=${params.per_page}&query=${params.query}`
        );
        setImages((prevImages) => [...(prevImages ?? []), ...data.results]);
        const totalPagesCalc = Math.ceil(data.total / params.per_page);
        setHasMoreImages(page < totalPagesCalc);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchTopic) {
      fetchImages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTopic, page]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      {images && <ImageGallery images={images} onImageClick={openModal} />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImg={selectedImg}
      />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && hasMoreImages && <LoadMoreBtn onClick={handleOnClick} />}
    </>
  );
};

export default App;
