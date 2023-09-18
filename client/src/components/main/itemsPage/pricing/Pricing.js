import * as React from "react";
// import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SaveIcon from "@mui/icons-material/Save";

import { usePricingData } from "../../../../api/api";

function PricingTable({ productData }) {
  const itemPricing = usePricingData(productData.Item_Number);
  console.log(itemPricing);

  console.log(productData.Item_Number);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Price Type</TableCell>
            <TableCell>Qty 1</TableCell>
            <TableCell>QTY 2-5</TableCell>
            <TableCell>QTY 6-11</TableCell>
            <TableCell>QTY 12-24</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemPricing.slice(0, 5).map((item, index) => {
            return (
              <TableRow key={index}>
                {item.map((price, index) => {
                  return <TableCell key={index}>{price}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
