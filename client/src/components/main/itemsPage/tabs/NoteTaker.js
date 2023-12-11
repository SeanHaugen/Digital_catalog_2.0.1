import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNotes from "./NotesDisplay";
import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";

import { Item } from "../../../../helper/Item";

const NoteTaker = ({ username, currentPage }) => {
  const [note, setNote] = useState("");
  const [userNotes, setUserNotes] = useState([]);
  const [page, setPage] = useState([]);

  console.log(username);

  //   useEffect(() => {
  //     // Fetch user notes for the current page when the component mounts
  //     fetchUserNotes();
  //   }, [currentPage, username]);

  //   const fetchUserNotes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://dull-pink-termite-slip.cyclic.app/notes/${username}`
  //       );
  //       setUserNotes(response.data.notes);
  //     } catch (error) {
  //       console.error("Error fetching user notes:", error);
  //     }
  //   };

  const handleNoteChange = (e, v) => {
    setNote(e.target.value);
  };

  //   const handlePage = (e) => {
  //     setPage(e.target.value);
  //   };

  const saveNote = async () => {
    try {
      if (!username) {
        console.error("Username is undefined");
        return;
      }

      // Save the note to the user's database profile
      await axios.post(
        `https://dull-pink-termite-slip.cyclic.app/notes/${username}`,
        { note }
      );

      // Fetch updated user notes
      //   fetchUserNotes();

      // Clear the note input
      setNote("");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
  return (
    <Item>
      <h2>*currently notes appear for all Items* </h2>
      <p>Will be updating so notes will be discrete for each item</p>
      <ul>
        {userNotes.map((userNote, index) => (
          <li key={index}>{userNote}</li>
        ))}
      </ul>
      <Textarea
        rows="4"
        cols="50"
        placeholder="Write your note here..."
        value={note}
        onChange={handleNoteChange}
      />

      <Button variant="contained" color="success" onClick={saveNote}>
        Save Note
      </Button>

      <UserNotes username={username} />
    </Item>
  );
};

export default NoteTaker;
