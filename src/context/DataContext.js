import React, { createContext, useState } from "react";
import noteGroupList from "../data/data";
import { v4 as uuid } from "uuid";

//context Variable
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  //groupList contains the set of all the notes
  const [groupList, setGroupList] = useState(
    Array.isArray(noteGroupList) ? noteGroupList : []
  );

  //constants
  const colors = [
    "#fecaca",
    "#bbf7d0",
    "#bfdbfe",
    "#fef08a",
    "#e9d5ff",
    "#fbcfe8",
  ];
  const hoverColors = [
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#a855f7",
    "#ec4899",
  ];

  //add a single note in the main page
  const addNote = (color) => {
    const newGroup = {
      id: `${uuid()}`,
      groupName: "",
      group: false,
      notes: [{ id: `${uuid()}`, text: "", color: color || "#e9d5ff" }],
    };
    setGroupList([...groupList, newGroup]);
  };

  //Add notes in respective groups
  const addNoteInGroup = (groupId, color = "#e9d5ff") => {
    if (groupId) {
      setGroupList((prevGroupList) =>
        prevGroupList.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              notes: [
                ...group.notes,
                { id: `${uuid()}`, text: "", color: color },
              ],
            };
          }
          return group;
        })
      );
    }
  };

  //Delete a note
  const deleteNote = (groupid, id) => {
    const updatedGroupList = groupList.map((group) => {
      if (group.id === groupid) {
        const updatedNotes = group.notes.filter((note) => note.id !== id);
        return { ...group, notes: updatedNotes };
      }
      return group;
    });
    setGroupList(updatedGroupList);
  };

  //Preview the Unlinked notes
  function getAllNotes(groupId) {
    const group = groupList.find((group) => group.id === groupId);

    if (!group) {
      return [];
    }

    if (group.group) {
      return group.notes;
    } else {
      return groupList
        .filter((group) => !group.group)
        .map((group) => group.notes)
        .flat();
    }
  }

  //Update Group Title
  const updateGroupTitle = (groupId, title) => {
    const updatedGroupList = groupList.map((group) => {
      if (group.id === groupId) {
        return { ...group, groupName: title };
      }
      return group;
    });
    setGroupList(updatedGroupList);
  };

  // const deleteEmptyGroups = (processingList) => {
  //   const updatedGroupList = processingList.filter(
  //     (group) => group.notes.length !== 0
  //   );
  //   setGroupList(updatedGroupList);
  // };

  //Change and store the text values in notes
  const updateText = (groupId, noteId, text) => {
    const updatedGroupList = groupList.map((group) => {
      if (group.id === groupId) {
        const updateNotes = group.notes.map((note) => {
          if (note.id === noteId) {
            return { ...note, text: text };
          }
          return note;
        });
        return { ...group, notes: updateNotes };
      }
      return group;
    });
    console.log(updatedGroupList);
    setGroupList(updatedGroupList);
  };

  //Add new group
  const addNewGroup = (title) => {
    const newGroup = {
      id: `${uuid()}`,
      groupName: title || "New Group",
      group: true,
      notes: [],
    };

    if (groupList.length === 0) {
      setGroupList([newGroup]);
    } else {
      setGroupList([...groupList, newGroup]);
    }
  };

  //To move notes between groups
  function moveNoteToGroup(currentGroupId, destinationGroupId, noteId) {
    // Find the current and destination groups in the groupList
    const currentGroupIndex = groupList.findIndex(
      (group) => group.id === currentGroupId
    );
    const destinationGroupIndex = groupList.findIndex(
      (group) => group.id === destinationGroupId
    );

    // Find the note to move in the current group's notes array
    const noteIndex = groupList[currentGroupIndex].notes.findIndex(
      (note) => note.id === noteId
    );

    //Store the value to be moved
    const noteToMove = groupList[currentGroupIndex].notes[noteIndex];
    console.log(noteToMove);

    groupList[currentGroupIndex].notes.splice(noteIndex, 1);

    //Add note to destination folder
    groupList[destinationGroupIndex].notes.push(noteToMove);

    setGroupList([...groupList]);
    console.log(groupList);
  }

  return (
    <DataContext.Provider
      //Methods and variables passed
      value={{
        groupList,
        colors,
        hoverColors,
        getAllNotes,
        addNewGroup,
        moveNoteToGroup,
        updateGroupTitle,
        // addLinkHandler,
        deleteNote,
        // filteredNotes,
        updateText,
        addNote,
        addNoteInGroup,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
