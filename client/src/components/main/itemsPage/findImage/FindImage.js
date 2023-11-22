import react, { useState, useEffect } from "react";
import axios from "axios";

function FindImage({ productData, category, subCategory }) {
  const imageName = `${productData.Item_Number}`;
  const imageUrl = `https://www.showdowndisplays.com/cdn/Resources/Primary/${imageName}_0_Preview.jpg`;
  //https://www.showdowndisplays.com/cdn/Resources/Primary/${i.Item_Number}_0_Preview.jpg
  const thumbnailUrl = `https://www.showdowndisplays.com/cdn/Resources/Primary/${imageName}_0_SmallThumbnail.jpg`;
  const SmallThumbnail = `https://www.showdowndisplays.com/cdn/Resources/Primary/${imageName}_0_SmallThumbnail.jpg`;
  const inUseThumNail = `https://www.showdowndisplays.com/cdn/Resources/Alternate/${imageName}_Inuse2_SmallThumbnail.jpg`;
  //https://www.showdowndisplays.com/cdn/Resources/Alternate/109002_Inuse2_SmallThumbnail.jpg
  //https://www.showdowndisplays.com/cdn/Resources/Primary/108241_0_SmallThumbnail.jpg

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageElement = new Image();
    imageElement.src = imageUrl;

    // Event handler for successful image load
    const handleLoad = () => {
      setLoading(false);
    };

    // Event handler for image load error
    const handleError = (error) => {
      console.error("Error loading image:", error);
      setLoading(false);
    };

    imageElement.addEventListener("load", handleLoad);
    imageElement.addEventListener("error", handleError);

    // Cleanup event listeners if component unmounts
    return () => {
      imageElement.removeEventListener("load", handleLoad);
      imageElement.removeEventListener("error", handleError);
    };
  }, [imageUrl]); // Include imageUrl as a dependency for useEffect

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(imageName);
  return (
    <div>
      <figure>
        <div>
          <img
            src={imageUrl}
            alt={imageName}
            style={{ width: "100%", height: "auto" }}
          />
          {/* <img
            src={thumbnailUrl}
            style={{
              display: "flex",
              margin: "5px",
              width: "100%",
              height: "auto",
            }}
          />
          <img
            src={SmallThumbnail}
            style={{
              display: "flex",
              margin: "5px",
              width: "100%",
              height: "auto",
            }}
          /> */}
          {/* <img
            src={`https://placehold.co/100x100/png`}
            style={{
              display: "flex",
              margin: "5px",
            }}
          /> */}
        </div>
      </figure>
    </div>
  );
}

export default FindImage;
