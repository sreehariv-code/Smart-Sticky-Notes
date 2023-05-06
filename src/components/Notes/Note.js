import React, { useContext } from "react";

import { MdOutlineDeleteForever } from "react-icons/md";
import "./Note.css";
import { DataContext } from "../../context/DataContext";

import Modal from "../Modal/Modal";
const Note = ({ id, text, bgcolor, groupid }) => {
  const { deleteNote, updateText } = useContext(DataContext);

  const textHandler = (event) => {
    updateText(groupid, id, event.target.value);
  };

  return (
    <div
      className={`max-w-max min-h-[300px] p-7 rounded-xl resize`}
      style={{ backgroundColor: bgcolor }}
    >
      <div className="flex justify-end gap-4 btn-setion">
        <Modal currentGroupId={groupid} noteId={id} />
        <button
          className="hover:bg-[rgba(255,255,255,0.6)] w-10 grid place-items-center rounded-full aspect-square"
          onClick={() => {
            deleteNote(groupid, id);
          }}
        >
          <MdOutlineDeleteForever className="text-[20px]" />
        </button>
      </div>

      <textarea
        className="border-none outline-none resize-none h-[80%] bg-inherit scroll"
        placeholder="Write Notes...."
        name="noteContent"
        id=""
        cols="25"
        rows="2"
        defaultValue={text}
        onChange={textHandler}
      />
    </div>
  );
};

export default Note;
