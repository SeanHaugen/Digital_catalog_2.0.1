import * as React from "react";
import { useState } from "react";
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
import { useHandleUpdatePricing } from "../../../../api/api";

function PricingTable({ productData }) {
  const [priceData, setPriceData] = useState(null);
  const [updatePricing, setUpdatePricing] = useState();
  const [selectedElement, setSelectedElement] = useState({
    rowIndex: null,
    cellIndex: null,
    value: null,
  });

  usePricingData(setPriceData, productData.Item_Number);

  useHandleUpdatePricing(
    setUpdatePricing,
    productData.Item_Number,
    selectedElement
  );
  const handlePriceUpdateClick = (rowIndex, cellIndex, cellData) => {
    setSelectedElement({ rowIndex, cellIndex, value: cellData });
  };

  const handleCellValueChange = (e) => {
    setSelectedElement({
      ...selectedElement,
      value: e.target.value,
    });
  };

  const handleSaveClick = () => {
    // Call the updatePricing function here with the selectedElement data
    if (
      selectedElement.rowIndex !== null &&
      selectedElement.cellIndex !== null
    ) {
      updatePricing(
        selectedElement.rowIndex,
        selectedElement.cellIndex,
        selectedElement.value
      );
    }
    setSelectedElement({ rowIndex: null, cellIndex: null, value: null });
  };

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
            priceData.splice(0, 5).map((rowData, rowIndex) => (
              <TableRow key={rowIndex}>
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
                      <>
                        {cellData}
                        <MonetizationOnIcon
                          onClick={() =>
                            handlePriceUpdateClick(
                              rowIndex,
                              cellIndex,
                              cellData
                            )
                          }
                        />
                      </>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
