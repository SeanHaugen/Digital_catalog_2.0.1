import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecentlyViewed from "./recents/RecentlyViewed";

export default function BottomNav({ productData }) {
  const [value, setValue] = React.useState(0);

  const [openRecent, setOpenRecent] = useState(true);

  const handleClick = () => {
    setOpenRecent(!openRecent);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        backgroundColor: "#1976d2",
      }}
    >
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Recent"
            icon={<RestoreIcon />}
            onClick={handleClick}
          ></BottomNavigationAction>
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
        {openRecent && <RecentlyViewed />}
      </Box>
    </div>
  );
}
