import React from "react";
import loaderImg from "../../images/book.gif";

const Loader = () => {
  return (
    <div className=" min-h-screen grid place-items-center">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
