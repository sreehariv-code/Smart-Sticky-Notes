import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";

import "./Navbar.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [groupTitle, setGroupTitle] = useState("");

  const { addNewGroup, addNote, colors, hoverColors } = useContext(DataContext);

  function handleMouseEnter(index) {
    setHoverIndex(index);
  }

  function handleMouseLeave() {
    setHoverIndex(null);
  }
  // background:
  return (
    <div
      style={{
        background:
          "linear-gradient(to right,rgba(231, 230, 230,0.6),rgba(231, 230, 230,0.6))",
      }}
      className="flex flex-col sm:flex-row justify-between px-16 py-11 head-section sticky top-0 "
    >
      <h1 className="text-[30px]">Notes</h1>
      <div className="flex md:flex-row gap-5 rounded-full add-note-menu">
        {/* The button to open modal */}
        <label htmlFor="my-modal" className="btn">
          New Group
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
            className="modal-box flex flex-col gap-7"
          >
            <h3 className="font-bold text-lg">Create New Title</h3>
            <input
              type="text"
              value={groupTitle}
              className="input input-bordered w-full"
              onChange={(e) => {
                setGroupTitle(e.target.value);
              }}
            />

            <div className="modal-action">
              <label
                htmlFor="my-modal"
                className="btn"
                onClick={() => {
                  addNewGroup(groupTitle);
                  setGroupTitle("");
                }}
              >
                Create
              </label>
              <label htmlFor="my-modal" className="btn">
                Cancel
              </label>
            </div>
          </div>
        </div>
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
          <ul className="flex gap-2 flex-col min-w-[120px] py-3 rounded-[10px]  fixed top-[140px] sm:top-[100px] bg-white color-list">
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
                  addNote(color);
                }}
                className="border-0 outline-none w-[90%] m-auto  cursor-pointer  btn btn-circle color-btn"
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
