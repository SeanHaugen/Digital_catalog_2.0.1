import React, { useState } from "react";
import { useFlatRateInfo } from "../../../../api/api";

function FlatRateShipping({ productData }) {
  const [itemRates, setItemRates] = useState([]);

  useFlatRateInfo(setItemRates, productData.Item_Number);

  const handleFlatRate = () => {
    return (
      <div className="box">
        <h1>Flat Rate</h1>
        <h4>Qty 1</h4>
        {itemRates !== undefined ? (
          itemRates.map((items, index) => (
            <div>
              <p key={index}>
                {items.Service}: {items.Rate}
              </p>
            </div>
          ))
        ) : (
          <p>No flat Rates</p>
        )}
      </div>
    );
  };

  return <div>{handleFlatRate()}</div>;
}

export default FlatRateShipping;
