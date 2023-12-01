import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SaveIcon from "@mui/icons-material/Save";

import EditPricing from "./EditPricing";

import { usePricingData } from "../../../../api/api";
import { useHandleUpdatePricing } from "../../../../api/api";

function PricingTable({ productData }) {
  const [priceData, setPriceData] = useState([]);
  // const [updatePricing, setUpdatePricing] = useState(null);
  const [selectedElement, setSelectedElement] = useState({
    rowIndex: null,
    cellIndex: null,
    value: null,
  });

  usePricingData(setPriceData, productData.Item_Number);

  return (
    <TableContainer component={Paper} style={{ margin: "10px" }}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#7B919C" }}>
            <TableCell>Price Type</TableCell>
            <TableCell>Qty 1</TableCell>
            <TableCell>QTY 2-5</TableCell>
            <TableCell>QTY 6-11</TableCell>
            <TableCell>QTY 12-24</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {priceData !== null ? (
            priceData.slice(0, 5).map((rowData, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "white" : "#7B919C", // Alternating colors
                }}
              >
                {rowData.map((cellData, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {rowIndex === selectedElement.rowIndex &&
                    cellIndex === selectedElement.cellIndex ? (
                      <>
                        <input
                          type="text"
                          value={selectedElement.value}
                          onChange={handleCellValueChange}
                        />
                        <SaveIcon onClick={handleSaveClick} />
                      </>
                    ) : (
                      <>{cellData}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          )}
          <EditPricing productData={productData} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
