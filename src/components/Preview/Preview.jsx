import React from "react";

const Preview = ({ noteId, groupId, text, bgcolor }) => {
  return (
    <div
      // style={{ backgroundColor: bgcolor }}
      className="min-h-[50px] rounded-md bg-[#fdfdfd] cursor-pointer btn btn-outline justify-normal"
    >
      <p className="ml-1">{text}</p>
    </div>
  );
};

export default Preview;
