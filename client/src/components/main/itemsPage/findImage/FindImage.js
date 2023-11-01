function FindImage({ productData, category, subCategory }) {
  const imageFolder = "images";

  const imageName = `${productData.Item_Number}_0.jpg`;

  const imagePath = `${imageFolder}/${imageName}`;
  console.log(imagePath);

  return (
    <div>
      <figure>
        <img
          className="item_image"
          src={`https://placehold.co/600x400/png`}
          alt="Tradeshow display image"
          style={{
            maxWidth: "350px",
            maxHeight: "400px",
            width: "auto",
            height: "auto",
          }}
        />
        <div
          style={{
            display: "flex",
            margin: "5px",
          }}
        >
          <img
            src={`https://placehold.co/100x100/png`}
            style={{
              display: "flex",
              margin: "5px",
            }}
          />
          <img
            src={`https://placehold.co/100x100/png`}
            style={{
              display: "flex",
              margin: "5px",
            }}
          />
          <img
            src={`https://placehold.co/100x100/png`}
            style={{
              display: "flex",
              margin: "5px",
            }}
          />
        </div>
      </figure>
    </div>
  );
}

export default FindImage;
