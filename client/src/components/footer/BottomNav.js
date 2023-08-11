import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

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
          // style={{ backgroundColor: "#1976d2", color: "white" }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}
