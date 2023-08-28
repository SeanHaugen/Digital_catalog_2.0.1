function FindImage({ productData, category, subCategory }) {
  const imageFolder = "images/01Products";

  const imageName = `${productData.Item_Number}_0.jpg`;

  const imagePath = `/${imageFolder}/${imageName}`;

  return (
    <div>
      <figure>
        <img
          className="item_image"
          src={imagePath}
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
