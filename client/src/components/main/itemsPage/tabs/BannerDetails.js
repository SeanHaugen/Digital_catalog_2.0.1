import React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

function BannerDetails({ productData, compChart }) {
  console.log(compChart);
  const handleBannerDetails = () => {
    if (compChart === "Banners & Flags") {
      return (
        <>
          <div>
            <h1>Banner Quote Details,</h1>

            <Button variant="contained" color="success">
              <NavLink
                onClick={() => {
                  if (
                    window.confirm(
                      "You are leaving the app, once you leave you will need to reopen the app"
                    )
                  ) {
                    window.location.href =
                      "https://www.showdowndisplays.com/Category/BuildYourOwn";
                  }
                }}
                style={{ color: "white" }}
              >
                Custom Master Document
              </NavLink>
            </Button>

            <p>
              When you are creating a banner opportunity/quote in Salesforce,
              whether it be done on the “website custom banner calculator” or
              “custom quote from Ramsey,” there are multiple details you must
              capture during the conversation with the distributor. Gathering
              these details will allow all parties (distributor, end user,
              customer care, and production) know the exact banner being quoted.
            </p>
            <p>
              Please refer to the Custom Master Document for the ultimate source
              of truth.
            </p>
            <h2>Banner Details</h2>
            <ol>
              <li>Media – Type of vinyl or fabric</li>
              <li>
                Dimensions – Height x Width – Use the same unit of measure, e.g.
                all inches or all feet
              </li>
              <li>Single Sided or Double Sided</li>
              <li>
                Finishing Style – See Banner Finishing Guide to confirm offering
              </li>
              <li>Quantity</li>
              <li>Lead Time – If there is a specific production time*</li>
              <li>In-Hands Date – If customer has one*</li>
              <li>Special Instructions – If customer has a requirement*</li>
              <li>
                Use indoors or outdoors – Confirm media choice meets the need*
              </li>
            </ol>
            <h2>Custom: Item</h2>
            <ol>
              <li>For media that does not have a Sq Ft Item Number +</li>
            </ol>
            <h2>
              6-Digit Website Item Number – Website Custom Banner Calculator
            </h2>
            <ol>
              <li>
                Used 6-digit Website number only when quoting banners off the
                website Custom Banner calculator.
              </li>
            </ol>
            <h2>6-Digit Item Number – Custom Banner Pricing from Ramsey</h2>
            <ol>
              <li>
                Used when quoting imprinted or blank banners with dimensions
                that are less than 24” in either direction. Max available dims
                listed on the Banner Info Sheet
              </li>
              <li>Custom Shapes (i.e. Pennant) +</li>
              <li>Custom Finishing + - Other than standard finishing styles</li>
              <li>
                Velcro Finishing + - Need to know if they want 1” or 2”, Hook or
                Loop and where they need it on the banner
              </li>
              <li>Wind Slits +</li>
              <li>Banners requiring Lap Seams +</li>
              <li>
                Media not available for pricing on website Custom Banner
                calculator
              </li>
            </ol>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div>{handleBannerDetails()}</div>
    </>
  );
}

export default BannerDetails;
