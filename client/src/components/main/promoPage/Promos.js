import React from "react";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Promos({ selectedPromo, onDeletePromoItem }) {
  return (
    <div>
      <h1>Promos Page</h1>
      <h2>Selected Promos:</h2>
      <ul>
        {selectedPromo.map((item) => (
          <li key={item.id}>
            {/* Display relevant information from the item */}
            Name: {item.Name}, Item Number: {item.Item_Number}
            <button onClick={() => onDeletePromoItem(item.id)}>Delete</button>
            {/* Add a link to the item page */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Promos;
