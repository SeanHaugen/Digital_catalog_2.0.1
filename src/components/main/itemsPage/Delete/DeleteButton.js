import React from "react";
import { useDeleteItem } from "../../../../api/api";
import Button from "@mui/material/Button";

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

  return (
    <div>
      {/* <Button variant="contained" color="error" onClick={handleClick}>
        Delete Item
      </Button> */}
    </div>
  );
};

export default DeleteButton;
