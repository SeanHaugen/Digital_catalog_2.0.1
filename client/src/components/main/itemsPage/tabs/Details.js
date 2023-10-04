import * as React from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink
          className="link"
          onClick={() => {
            if (
              window.confirm(
                "You are leaving the app, once you leave you will need to reopen the app"
              )
            ) {
              window.location.href = ` https://www.showdowndisplays.com/Product/Select?Sku=${productData.Item_Number}`;
            }
          }}
        >
          Showdown Item Page Link
        </NavLink>
      </Item>
    </div>
  );
}

export default Details;
