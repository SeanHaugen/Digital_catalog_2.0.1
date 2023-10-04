import React from "react";
import { useDeleteItem } from "../../../../api/api";

const DeleteButton = ({ itemNumber, onDeleteSuccess, onDeleteError }) => {
  const handleDelete = useDeleteItem(
    itemNumber,
    onDeleteSuccess,
    onDeleteError
  );

  const handleClick = () => {
    // Call the handleDelete function to initiate the deletion process
    handleDelete();
  };

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteButton;
