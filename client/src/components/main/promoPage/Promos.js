import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Promos({
  setSelectedPromo,
  selectedPromo,
  onDeletePromoItem,
  productData,
}) {
  const useFetchPromoData = (setState) => {
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(
            "http://ivory-firefly-hem.cyclic.app/promoitems" // Replace with the actual URL for fetching all data
          );
          setState(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);
  };

  const promoData = useFetchPromoData(setSelectedPromo);
  console.log(promoData);

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
            <NavLink
              to={`/${item.Category}/${item.SubCategory}/${item.Item_Number}`}
            >
              Go to Item Page
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Promos;
