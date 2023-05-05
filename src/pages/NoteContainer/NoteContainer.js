import React, { useContext } from "react";
import "./NoteContainer.css";

import FolderComponent from "../../components/Folder/FolderComponent";
import Note from "../../components/Notes/Note";

import { DataContext } from "../../context/DataContext";

const NoteContainer = () => {
  const { groupList } = useContext(DataContext);

  return (
    <div className=" min-h-[70vh] pb-12">
      <section className="flex flex-row flex-wrap gap-3 pt-12 pl-12 notes_section ">
        {groupList.length > 0 &&
          groupList.map((group, index) =>
            group.group ? (
              <FolderComponent
                key={group.id}
                id={group.id}
                groupName={group.groupName}
                noOfNotes={group.notes.length}
              />
            ) : group.notes.length > 0 ? (
              group.notes.map((note) => (
                <Note
                  groupid={group.id}
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  bgcolor={note.color}
                />
              ))
            ) : groupList.length === 0 ? (
              <h3>Hello World</h3>
            ) : (
              ""
            )
          )}
      </section>
    </div>
  );
};

export default NoteContainer;
