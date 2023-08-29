// import { image } from "../../../../../../../../../OneDrive - Sign-Zone Inc/Pictures/images/01Products";
import React, { useState, useEffect } from "react";
import axios from "axios";

function FindImage({ productData, category, subCategory }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageFolder =
          "https://signzoneinc.sharepoint.com/sites/customerservicedatabase/shared%20documents/general/images/01products";
        const imageName = `${productData.Item_Number}_0.jpg?web=1`;

        const imageURL = `${imageFolder}/${imageName}`;
        setImageURL(imageURL);
      } catch (error) {
        console.error("error fetching image", error);
      }
    };
    fetchData();
  }, [productData.Item_Number]);

  console.log(imageURL);

  return (
    <div>
      <figure>
        <img
          className="item_image"
          src={imageURL}
          alt="Tradeshow display image"
          style={{
            maxWidth: "350px",
            maxHeight: "400px",
            width: "auto",
            height: "auto",
          }}
        />
      </figure>
    </div>
  );
}

export default FindImage;
