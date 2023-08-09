import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function PricingTable({ productData }) {
  const handlePrice = (price) => {
    return (price * 0.6).toFixed(2);
  };

  return (
    <TableContainer component={Paper}>
      <p>US pricing only</p>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
