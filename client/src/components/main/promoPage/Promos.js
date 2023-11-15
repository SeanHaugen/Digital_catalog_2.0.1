import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import ListItemText from "@mui/material/ListItemText";

function Promos({ setSelectedPromo, selectedPromo, setProduct, productData }) {
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

  const onDeletePromoItem = async () => {
    try {
      // Make an Axios DELETE request to your server to delete the promo item
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
            >
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
