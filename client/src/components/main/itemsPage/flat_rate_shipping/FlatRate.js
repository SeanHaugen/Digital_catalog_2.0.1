import React, { useState } from "react";
import { useFlatRateInfo } from "../../../../api/api";

function FlatRateShipping({ productData }) {
  const [itemRates, setItemRates] = useState("");

  useFlatRateInfo(setItemRates, productData.Item_Number);

  const handleFlatRate = () => {
    return (
      <div className="box">
        <h1>Flat Rate Available</h1>
        <h4>Qty 1</h4>
        {itemRates.map((items, index) => (
          <p key={index}>
            {items.Service}: {items.Rate}
          </p>
        ))}
      </div>
    );
  };

  return <div>{handleFlatRate()}</div>;
}

export default FlatRateShipping;
