import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecentlyViewed from "./recents/RecentlyViewed";
import { useLocation, useNavigate } from "react-router";

export default function BottomNav({ productData }) {
  const [value, setValue] = React.useState(0);
  const [openRecent, setOpenRecent] = useState(false);
  const [recentPages, setRecentPages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenRecent(!openRecent);
  };

  // useEffect(() => {
  //   const pathSegments = history.pathname.split("/");
  //   const isDesiredPathFormat =
  //     pathSegments.length === 4 &&
  //     pathSegments[0] === "" &&
  //     pathSegments[3] !== "";

  //   if (isDesiredPathFormat) {
  //     setRecentPages((prevPages) => [
  //       history.pathname,
  //       ...prevPages.slice(0, 4),
  //     ]);
  //   }
  // }, [history]);

  useEffect(() => {
    const currentItemNumber = location.pathname.split("/").pop();
    setRecentPages((prevHistoryList) => [
      ...prevHistoryList,
      currentItemNumber,
    ]);
  }, [location.pathname]);

  const goBack = () => {
    if (recentPages.length > 1) {
      const previousItemNumber = recentPages[recentPages.length - 2];
      navigate(`/items/${previousItemNumber}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        backgroundColor: "black",
      }}
    >
      <Box sx={{ width: 500 }} style={{ backgroundColor: "black" }}>
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
        {openRecent && <RecentlyViewed recentPages={recentPages} />}
      </Box>
    </div>
  );
}
