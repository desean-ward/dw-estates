import React from "react";
import { LoadingContainer } from "./loading.styles";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <LoadingContainer>
      <span>
        <h2 className='text-xl font-semibold'>Loading</h2>
      </span>
      <ScaleLoader color='#000' />
    </LoadingContainer>
  );
};

export default Loading;
