import React from "react";

import { AiFillFolder } from "react-icons/ai";
import { Link } from "react-router-dom";

const FolderComponent = ({ id, groupName, noOfNotes }) => {
  return (
    <Link
      to={`/${id}`}
      className=" max-w-max min-h-[300px] text-[15px]   rounded-xl outline-none border-none min-w-[307px] cursor-pointer btn capitalize  pl-7 text-left flex items-start flex-col justify-around gap-3 p-7 bg-white text-[#333] hover:bg-[#fafafa] hover:shadow-[0_18px_50px_rgba(0,0,0,0.04)]"
    >
      <AiFillFolder className="text-[50px]" />
      <div className="flex flex-col gap-4 group-info">
        <h2 className="font-bold text-[18px]">{groupName}</h2>
        <p className="text-[#6c6c6c]">
          {noOfNotes > 10 ? "10+" : noOfNotes} Notes
        </p>
      </div>
    </Link>
  );
};

export default FolderComponent;
