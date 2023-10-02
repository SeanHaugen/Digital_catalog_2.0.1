import * as React from "react";
import { Item } from "../../../../helper/Item";

function Details({ productData }) {
  return (
    <div>
      <Item>
        Product Weight:
        {productData.Product_Weight}
      </Item>
      <Item>Materials: {productData.Materials}</Item>
      <Item>Origin: {productData.Origin}</Item>
      <Item>Pg: {productData.Page}</Item>
      <Item>
        <a
          href={` https://www.showdowndisplays.com/Product/Select?Sku=${productData.Item_Number}`}
        >
          Showdown Item Page
        </a>
      </Item>
    </div>
  );
}

export default Details;
