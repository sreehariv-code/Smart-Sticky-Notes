import React, { useContext } from "react";

import { AiFillFolder } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const FolderComponent = ({ id, groupName, noOfNotes }) => {
  const { generateHexCodeFromString } = useContext(DataContext);
  const bgColor = generateHexCodeFromString(groupName);
  return (
    <Link
      to={`/${id}`}
      style={{ background: bgColor }}
      className=" max-w-max min-w-[150px] min-h-[120px] sm:min-h-[300px] sm:text-[15px]rounded-xl outline-none border-none sm:min-w-[307px] cursor-pointer btn capitalize  sm:pl-7 text-left flex items-start flex-col sm:justify-around gap-3 sm:p-7 bg-white text-[#333] hover:bg-[#fafafa] hover:shadow-[0_18px_50px_rgba(0,0,0,0.04)]"
    >
      <AiFillFolder className="text-[35px] sm:text-[50px]" />
      <div className="flex flex-col gap-[0.25em] sm:gap-4 group-info">
        <h2 className="font-bold text-[16px] sm:text-[18px]">{groupName}</h2>
        <p className="text-[#6c6c6c]">
          {noOfNotes > 10 ? "10+" : noOfNotes} Notes
        </p>
      </div>
    </Link>
  );
};

export default FolderComponent;
