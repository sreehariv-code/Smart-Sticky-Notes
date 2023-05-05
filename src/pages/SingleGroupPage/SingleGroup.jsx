import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import Note from "../../components/Notes/Note";

import { FaEdit, FaChevronLeft } from "react-icons/fa";
import DeleteModal from "../../components/Modal/DeleteModal";

const SingleGroup = () => {
  const { id } = useParams();
  const { groupList, addNoteInGroup, colors, hoverColors, updateGroupTitle } =
    useContext(DataContext);
  const [toggle, setToggle] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [groupTitle, setGroupTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (groupList.length === 0) {
      navigate("/");
    }
  }, [groupList.length, navigate]);

  const filteredList =
    groupList.length !== 0 ? (
      groupList.filter((group) => group.id === id)
    ) : (
      <Navigate to="/" />
    );

  function handleMouseEnter(index) {
    setHoverIndex(index);
  }

  function handleMouseLeave() {
    setHoverIndex(null);
  }

  return (
    <div className="px-5 sm:py-12">
      <div
        className="flex min-h-[100px] flex-col sm:flex-row sm:items-center justify-between groupHeader sticky top-[20px] w-full "
        style={{
          background:
            "linear-gradient(to right,rgba(231, 230, 230,0.6),rgba(231, 230, 230,0.6))",
        }}
      >
        <div className="title-section flex text-[25px] items-center gap-4 ">
          <Link to="/">
            <FaChevronLeft />
          </Link>
          <h1 className="font-semibold pointer-events-none capitalize">
            {filteredList.length > 0 ? filteredList[0].groupName : ""}
          </h1>
          <label htmlFor="editButton" className="cursor-pointer">
            <FaEdit />
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="editButton" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box flex flex-col gap-6">
              <h3 className="font-bold text-lg">Edit Title</h3>
              <input
                className="input input-bordered w-full "
                onChange={(e) => {
                  setGroupTitle(e.target.value);
                }}
              />
              <div className="modal-action">
                <label
                  htmlFor="editButton"
                  className="btn"
                  onClick={() => {
                    updateGroupTitle(filteredList[0].id, groupTitle);
                  }}
                >
                  Edit
                </label>
                <label htmlFor="editButton" className="btn">
                  Cancel
                </label>
              </div>
            </div>
          </div>

          {/* <FaEdit /> */}
        </div>
        <div className="btn-section flex gap-4">
          <div className="new-note-btn  flex flex-col relative">
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
              className={`btn btn-outline w-[120px] add-new-note-btn ${
                toggle ? "active" : ""
              }`}
            >
              New Note
            </button>
            <ul className="flex gap-2 flex-col min-w-[120px] py-3 rounded-[10px]  absolute top-[60px] sm:top-[60px] bg-white color-list">
              {colors.map((color, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor:
                      index === hoverIndex ? hoverColors[index] : color,
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    setToggle(false);
                    console.log("clicked");
                    addNoteInGroup(id, color);
                  }}
                  className="border-0 outline-none w-[90%] m-auto  cursor-pointer btn btn-circle color-btn"
                ></li>
              ))}
            </ul>
          </div>
          <div
            className="md:tooltip  md:tooltip-bottom"
            data-tip="Delete Group"
          >
            {/* <button
                className="btn bg-[#e01b1b] outline-none border-none hover:bg-red-400"
                onClick={() => {
                  deleteGroup(id);
                }}
              >
                <AiFillDelete className="text-[20px]" />
              </button> */}
            <DeleteModal groupId={id} />
          </div>
        </div>
      </div>
      <section className="flex flex-wrap gap-5 pt-8 noteslist-section">
        {filteredList.length > 0 ? (
          filteredList[0].notes.map((note) => (
            <Note
              key={note.id}
              groupid={id}
              id={note.id}
              text={note.text}
              bgcolor={note.color}
            />
          ))
        ) : (
          <h3>Add New Note</h3>
        )}
      </section>
    </div>
  );
};

export default SingleGroup;
