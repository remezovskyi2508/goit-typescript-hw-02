import css from "./Loader.module.css";
import { FC } from "react";
import { Grid } from "react-loader-spinner";

const Loader: FC = () => {
  return (
    <Grid
      visible={true}
      height="40"
      width="40"
      color="#8B008B"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
      }}
      wrapperClass="grid-wrapper"
    />
  );
};

export default Loader;
