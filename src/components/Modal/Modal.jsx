import React, { useContext, useState } from "react";
import { AiOutlineLink, AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";

import "./Modal.css";
import { DataContext } from "../../context/DataContext";

const CustomModel = ({ noteId, setToggleModal }) => {
  const [groupTitle, setGroupTitle] = useState("");
  const { addNewGroup } = useContext(DataContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="form-control "
    >
      <div className="input-group min-w-[90%]">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered focus:outline-none w-full"
          onChange={(e) => {
            setGroupTitle(e.target.value);
          }}
        />
        <button
          className="btn btn-square"
          onClick={() => {
            addNewGroup(groupTitle);
            setToggleModal(false);
          }}
        >
          <AiOutlineCheck />
        </button>
        <button
          onClick={() => {
            setToggleModal(false);
          }}
          className="btn btn-square"
        >
          <AiOutlinePlus className="rotate-45" />
        </button>
      </div>
    </form>
  );
};

const Modal = ({ currentGroupId, noteId }) => {
  const { groupList, moveNoteToGroup } = useContext(DataContext);
  const [toggleModal, setToggleModal] = useState(false);

  function getGroups() {
    return groupList.filter((group) => group.group === true);
  }

  function createGroupHander(currentGroupId) {}

  const folderList = getGroups();

  return (
    <>
      <label
        htmlFor={noteId}
        className="rounded-full hover:bg-[rgba(255,255,255,0.6)] grid place-items-center w-10 aspect-square cursor-pointer"
      >
        <AiOutlineLink />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={noteId} className="modal-toggle" />
      <div className="modal ">
        <div className="relative p-0 modal-box note-section">
          <div className="sticky top-0 w-full  btn-section-modal min-h-[50px]">
            <label
              htmlFor={noteId}
              className="absolute btn btn-sm btn-circle top-4 right-4 "
            >
              ✕
            </label>
          </div>
          <div className=" min-h-[500px] pt-16 flex flex-col gap-3 px-3 ">
            {folderList.length > 0 &&
              folderList.map((group, index) => (
                <label
                  key={index}
                  htmlFor={noteId}
                  className=" min-h-[50px] rounded-md bg-[#fdfdfd] cursor-pointer btn btn-outline justify-normal "
                  onClick={() => {
                    moveNoteToGroup(currentGroupId, group.id, noteId);
                  }}
                >
                  <FaFolder />
                  <h3 className="ml-2">{group.groupName}</h3>
                </label>
              ))}
            {toggleModal ? (
              <CustomModel noteId={noteId} setToggleModal={setToggleModal} />
            ) : (
              <button
                className=" min-h-[50px] rounded-md bg-[#fdfdfd] cursor-pointer btn btn-outline justify-normal "
                onClick={() => {
                  setToggleModal(!toggleModal);
                  createGroupHander(currentGroupId);
                }}
              >
                <FaFolder />
                <h3 className="ml-2">+ Create a New Group</h3>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
