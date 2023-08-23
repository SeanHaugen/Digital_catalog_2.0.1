import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { usePricingData } from "../../../../api/api";

function PricingTable({ productData }) {
  const [priceData, setPriceData] = useState(null);

  usePricingData(setPriceData, productData.Item_Number);

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
          {priceData !== null ? (
            priceData.splice(0, 5).map((rowData, index) => (
              <TableRow key={index}>
                {rowData.map((cellData, cellIndex) => (
                  <TableCell key={cellIndex}>{cellData}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
