import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

function SubCategoryPage({
  productData,
  category,
  subCategory,
  item,
  setProduct,
}) {
  // console.log(item);
  const [toggleImage, setToggleImage] = useState(true);
  // const imageName = `${productData.Item_Number}`;
  // const imageUrl = `https://www.showdowndisplays.com/cdn/Resources/Primary/${imageName}_0_Preview.jpg`;

  const toggleImagehandler = () => {
    setToggleImage(!toggleImage);
  };
  console.log(productData.Item_Number);

  return (
    <>
      <h3
        style={{
          marginTop: "3em",
        }}
      >
        {subCategory}
      </h3>
      <label>toggle images</label>
      <input type="checkbox" onClick={toggleImagehandler} />

      <div
        style={{
          marginTop: "3em",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1em",
          textAlign: "center",
        }}
      >
        {item.map((i, index) => {
          return (
            <div key={index}>
              <ListItemButton
                component={NavLink}
                to={`/${category}/${subCategory}/${i.Name}`}
                onClick={() => setProduct(i.Item_Number)}
              >
                {toggleImage ? (
                  <div>
                    <img
                      src={`https://www.showdowndisplays.com/cdn/Resources/Primary/${i.Item_Number}_0_Preview.jpg`}
                      alt="item"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <ListItemText primary={i.Name} secondary={i.Item_Number}>
                      {i.Name} - {i.Item_Number}
                    </ListItemText>
                  </div>
                ) : (
                  <ListItemText primary={i.Name} secondary={i.Item_Number}>
                    {i.Name} - {i.Item_Number}
                  </ListItemText>
                )}
              </ListItemButton>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default SubCategoryPage;
