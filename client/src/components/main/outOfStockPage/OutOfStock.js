import React from "react";

function StockOutList({ productData }) {
  const outOfStockProducts = productData.filter((item) => item.OOS === true);

  console.log(
    <ul>
      {outOfStockProducts.map((product) => (
        <li key={product.id}>{product.Name}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1>Out of Stock</h1>
      <ul>
        {outOfStockProducts.map((product) => (
          <li key={product.id}>{product.Name}</li>
        ))}
      </ul>
    </div>
  );
}
export default StockOutList;
