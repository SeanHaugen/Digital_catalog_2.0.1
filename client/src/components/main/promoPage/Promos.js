import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import ListItemText from "@mui/material/ListItemText";

function Promos({ setSelectedPromo, selectedPromo, setProduct, productData }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDeletePromoItem = async () => {
    try {
      const response = await axios.delete(
        `https://dull-pink-termite-slip.cyclic.app/delete/promo-item/${productData.Item_Number}`
      );

      if (response.status === 200) {
        // If the delete request was successful, update the selectedPromo state
        setSelectedPromo((prevSelectedPromo) =>
          prevSelectedPromo.filter(
            (selectedItem) =>
              selectedItem.Item_Number !== productData.Item_Number
          )
        );
      } else {
        // Handle the case where the server request fails
        console.error("Error deleting promo item: Request failed");
      }
    } catch (error) {
      // Handle any other errors
      console.error("Error deleting promo item:", error);
    }
  };

  //Edit the Q4 promo name so that it can be edited
  return (
    <div>
      <h1>Promos</h1>
      <h2>Q4 Promos</h2>
      <p>Promo Item Pricing begins at CPP1CS </p>
      <ul>
        {selectedPromo.map((item) => (
          <div key={item.id} className="promo">
            <ListItemButton
              component={NavLink}
              to={`/category/subcategory/${item.Item_Number}`}
              onClick={() => setProduct(item.Item_Number)}
              style={{
                marginTop: "3em",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1em",
                textAlign: "center",
              }}
            >
              <img
                src={`https://www.showdowndisplays.com/cdn/Resources/Primary/${item.Item_Number}_0_Preview.jpg`}
                alt="item"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              {/* Display relevant information from the item */}
              {item.Name}: {item.Item_Number}
              {/* Add a link to the item page */}
              {console.log(item.Item_Number)}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              />
            </ListItemButton>
            <button onClick={() => onDeletePromoItem()}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Promos;
