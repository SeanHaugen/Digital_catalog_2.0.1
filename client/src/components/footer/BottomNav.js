import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecentlyViewed from "./recents/RecentlyViewed";
import { useLocation, useNavigate } from "react-router";

export default function BottomNav({ productData, setProduct }) {
  const [value, setValue] = React.useState(0);
  const [openRecent, setOpenRecent] = useState(false);
  const [recentPages, setRecentPages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = ({ productData }) => {
    setOpenRecent(!openRecent);
  };

  useEffect(() => {
    const currentItemNumber = location.pathname.split("/").pop();
    setRecentPages((prevHistoryList) => [
      ...prevHistoryList,
      currentItemNumber,
    ]);
  }, [location.pathname]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
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
            icon={<RestoreIcon />}
            onClick={handleClick}
          ></BottomNavigationAction>
          <BottomNavigationAction icon={<FavoriteIcon />} />
        </BottomNavigation>
        {openRecent && (
          <RecentlyViewed
            recentPages={recentPages}
            productData={productData}
            setProduct={setProduct}
          />
        )}
      </Box>
    </div>
  );
}
