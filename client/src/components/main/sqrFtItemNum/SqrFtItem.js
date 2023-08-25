import * as React from "react";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Card from "@mui/joy/Card";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function SqrFtItem() {
  const [SqrFtItem, setSqrFtItem] = useState();

  return (
    <div>
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: "90%",
          marginLeft: 10,
          marginRight: 10,
          display: "flex",
          gridColumn: "span 2",
          flexDirection: "column",
          flexWrap: "wrap",

          gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
        })}
      >
        <h2>sqr foot item finder Under Construction</h2>
        <Box
          sx={{
            py: 2,
            display: "flex",
            width: "50%",
            justifyContent: "center",

            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Input placeholder="Input Dims" variant="outlined" />
          <p>After dims entered will give the available material</p>
          <Select defaultValue="dog">
            <Option value="dog">Dog</Option>
          </Select>
        </Box>
      </Card>
    </div>
  );
}

export default SqrFtItem;
