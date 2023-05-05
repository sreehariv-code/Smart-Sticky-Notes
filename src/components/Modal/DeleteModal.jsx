import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const DeleteModal = ({ groupId }) => {
  const { deleteGroup } = useContext(DataContext);
  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal-6"
        className="btn bg-[#e01b1b] outline-none border-none hover:bg-red-400"
      >
        <AiFillDelete className="text-[20px]" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this group ?
          </h3>
          <p className="py-4">
            After deleting, all the notes will be removed with the group.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Cancel
            </label>
            <Link
              to="/"
              onClick={() => {
                deleteGroup(groupId);
              }}
              className="btn bg-[#f11818] outline-none border-none hover:bg-red-4000"
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
