import React, { useEffect, useState } from "react";
import { useSearchData } from "../../../../api/api";
import { Item } from "../../../../helper/Item";
import { NavLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

const RelatedItems = ({ productData, subCategory, category, setProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  //   const [loading, setLoading] = useState(false);

  useSearchData(setRelatedItems, productData.Keywords);
  //   console.log(relatedItems);
  const productKeywordsArray = productData.Keywords.split(",").map((keyword) =>
    keyword.trim()
  );
  console.log(productKeywordsArray[6]);

  // Filter out exact matches and limit the results to the first 4
  const filteredItems = relatedItems
    .filter((item) => {
      // Check if the item does not match the productData and contains "Hardware" in its Keywords
      return (
        item.Name !== productData.Name ||
        item.Item_Number !== productData.Item_Number
        // item.Keywords.includes("Hardware")
      );
    })
    .slice(0, 4);
  //future versions: make suggestions for "Kits", "Hardware", and "graphics"
  //future versions: make suggestions for "Kits", "Hardware", and "graphics"
  const filteredHardware = relatedItems
    .filter(
      (item) =>
        (item.Name !== productData.Name ||
          item.Item_Number !== productData.Item_Number) &&
        productKeywordsArray.includes("Hardware")
    )
    .slice(0, 4);

  console.log(filteredItems);

  return (
    <Item>
      <ul>
        <b>Suggested Items</b>
        {filteredItems.map((item, index) => (
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            key={index}
            component={NavLink}
            to={`/category/subcategory/${item.Name}`}
            onClick={() => setProduct(item.Item_Number)}
          >
            {item.Name} - {item.Item_Number}
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            />
          </ListItemButton>

          // You can display any relevant information from the related items here
        ))}
        {/* <b>Suggested hardware</b> */}
        {filteredHardware.map((item, index) => (
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            key={index}
            component={NavLink}
            to={`/category/subcategory/${item.Name}`}
            onClick={() => setProduct(item.Item_Number)}
          >
            {item.Name} - {item.Item_Number}
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            />
          </ListItemButton>

          // You can display any relevant information from the related items here
        ))}
      </ul>
    </Item>
  );
};

export default RelatedItems;
