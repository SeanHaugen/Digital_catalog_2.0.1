import * as React from "react";
import { NavLink } from "react-router-dom";
import { Item } from "../../../../helper/Item";

function Details({ productData, showMaterials }) {
  return (
    <div>
      <Item>
        <b>Product Dimensions:</b>
        <ul>
          <li>
            {productData.Product_Width_inches}" W x
            {productData.Product_Height_Inches}" H x
            {productData.Produce_Depth_Inches}" D
          </li>
          <li> Product Weight:{productData.Product_Weight}</li>
        </ul>
        <b>Kit Includes:</b>
        <ul>
          <li>{productData.Kit_Includes}</li>
        </ul>
        <b>Materials: </b>
        {showMaterials()}

        <b>Order Cutoff time</b>
        <ul>
          <li>12:00PM Central Daylight Time</li>
        </ul>
        <b>Warranty</b>
        <ul>
          <li>{productData.Warranty}</li>
        </ul>
        <b>Origin:</b>
        <ul>
          <li>{productData.Origin}</li>
        </ul>
        <b>Catalog Page/Website Page:</b>
        <ul>
          <li>
            <NavLink
              onClick={() => {
                if (
                  window.confirm(
                    "You are leaving the app, once you leave you will need to reopen the app"
                  )
                ) {
                  const pageNumber = `${productData.Page}`;
                  window.location.href = ` https://www.showdowndisplays.com/cdn/Catalogs/2023_07_05T07_40_31Z_c8983f69-7059-4820-aa00-9acba48f2ee6_Product%20Guide%20-%202023%20-%20SD%20Branded.pdf#page=${pageNumber}`;
                }
              }}
            >
              {productData.Page}
            </NavLink>
          </li>
          <li>
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
          </li>
        </ul>
      </Item>
    </div>
  );
}

export default Details;
