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

  const handlePrice = (price) => {
    return (price * 0.6).toFixed(2);
  };

  usePricingData(setPriceData, productData.Item_Number);
  console.log(productData.Item_Number);
  console.log(priceData);

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

      {/* <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">QTY 1</TableCell>
            <TableCell align="center">QTY 2-5</TableCell>
            <TableCell align="center">QTY 6-11</TableCell>
            <TableCell align="center">QTY 12-24</TableCell>
            <TableCell align="center">QTY 25+</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">Retail</TableCell>
            <TableCell align="center">{productData.Prc1}</TableCell>
            <TableCell align="center">{productData.Prc2}</TableCell>
            <TableCell align="center">{productData.Prc3}</TableCell>
            <TableCell align="center">{productData.Prc4}</TableCell>
            <TableCell align="center">{productData.Prc5}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Net</TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc1)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc2)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc3)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc4)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc5)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">CPP1CS</TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc2)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc3)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc4)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc5)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc6)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">KEY2CP</TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc3)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc4)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc5)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc6)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc7)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">INP3CS</TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc4)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc5)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc6)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc7)}
            </TableCell>
            <TableCell align="center">
              {handlePrice(productData.Prc8)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </TableContainer>
  );
}

export default PricingTable;
