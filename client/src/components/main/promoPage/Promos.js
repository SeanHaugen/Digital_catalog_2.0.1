import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import ListItemText from "@mui/material/ListItemText";

function Promos({ setSelectedPromo, selectedPromo, setProduct }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useFetchPromoData = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "https://dull-pink-termite-slip.cyclic.app/promo-items" // Replace with the actual URL for fetching data
          );
          setState(response.data);
          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error(error);
          setError(error); // Set the error state in case of an error
          setLoading(false); // Set loading to false to handle errors
        }
      }

      fetchData();
    }, []);
  };

  const promoItems = useFetchPromoData(setSelectedPromo);

  const onDeletePromoItem = async (itemId) => {
    try {
      // Find the item in the promos collection and delete it
      await selectedPromo.deleteOne({ Item_Number: itemId });

      setSelectedPromo((prevSelectedPromo) =>
        prevSelectedPromo.filter(
          (selectedItem) => selectedItem.Item_Number !== itemId
        )
      );
    } catch (error) {
      // Handle any errors here
      console.error("Error deleting promo item:", error);
    }
  };

  //Edit the Q4 promo name so that it can be edited
  return (
    <div>
      <h1>Promos</h1>
      <h2>Q4 Promos</h2>
      <ul>
        {selectedPromo.map((item) => (
          <ListItemButton key={item.id} className="promo">
            <NavLink
              to={`/category/subcategory/${item.Item_Number}`}
              onClick={() => setProduct(item.Item_Number)}
            >
              {/* Display relevant information from the item */}
              {item.Name}: {item.Item_Number}
              <button onClick={() => onDeletePromoItem(item.id)}>Delete</button>
              {/* Add a link to the item page */}
              {console.log(item.Item_Number)}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              />
            </NavLink>
          </ListItemButton>
        ))}
      </ul>
    </div>
  );
}

export default Promos;
