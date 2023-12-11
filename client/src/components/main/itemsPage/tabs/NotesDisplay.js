import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Item } from "../../../../helper/Item";
import DeleteIcon from "@mui/icons-material/Delete";

const UserNotes = ({ username }) => {
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await axios.get(
          `https://dull-pink-termite-slip.cyclic.app/notes/${username}`
        );
        setUserNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching user notes:", error);
      }
    };

    fetchUserNotes();
  }, [username]);

  const handleDeleteNote = async (noteContent) => {
    try {
      // Make a delete request to remove the note by its content
      await axios.delete(
        `https://dull-pink-termite-slip.cyclic.app/notes/${username}`,
        { data: { noteContent } } // Send the note content in the request body
      );

      // Update the userNotes state after deletion
      setUserNotes((prevNotes) =>
        prevNotes.filter((note) => note !== noteContent)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <h2>Notes for {username}</h2>
      <ul>
        {userNotes.map((userNote, index) => (
          <li key={index}>
            {userNote}
            <DeleteIcon
              variant="contained"
              color="error"
              onClick={() => handleDeleteNote(userNote)}
            >
              Delete
            </DeleteIcon>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNotes;
