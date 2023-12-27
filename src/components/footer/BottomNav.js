// import * as React from "react";
// import { useState, useEffect } from "react";

// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// import FavoriteIcon from "@mui/icons-material/Favorite";
// import RecentlyViewed from "./recents/RecentlyViewed";
// import { useLocation, useNavigate } from "react-router";

// import { NavLink } from "react-router-dom";
// import { styled } from "@mui/system";
// import { Button } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";
// import { useTheme } from "@mui/material/styles";

// const OpenRecentCustomButton = styled(Button)(({ theme }) => ({
//   color: "#fff",
//   margin: "2px",
//   borderRadius: "4px",
//   backgroundColor: "#7B919C", // Update with your desired color
//   "&:hover": {
//     backgroundColor: "#4F6B77", // Update with a darker shade or a different color for hover
//   },
//   minHeight: "36px",
// }));

// export default function BottomNav({ productData, setProduct }) {
//   const [value, setValue] = React.useState(0);
//   const [openRecent, setOpenRecent] = useState(false);
//   const [recentPages, setRecentPages] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleClick = ({ productData }) => {
//     setOpenRecent(!openRecent);
//   };

//   useEffect(() => {
//     const currentItemNumber = location.pathname.split("/").pop();
//     setRecentPages((prevHistoryList) => [
//       ...prevHistoryList,
//       currentItemNumber,
//     ]);
//   }, [location.pathname]);

//   return (
//     <div>
//       <div
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <OpenRecentCustomButton onClick={handleClick}>
//           Recently Viewed
//         </OpenRecentCustomButton>
//       </div>
//       {openRecent && (
//         <RecentlyViewed
//           recentPages={recentPages}
//           productData={productData}
//           setProduct={setProduct}
//         />
//       )}
//     </div>
//   );
// }

import * as React from "react";
import { useState, useEffect } from "react";

import { Button, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { styled } from "@mui/system";
import RecentlyViewed from "./recents/RecentlyViewed";

const OpenRecentCustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  margin: "2px",
  borderRadius: "4px",
  backgroundColor: "#7B919C",
  "&:hover": {
    backgroundColor: "#4F6B77",
  },
  minHeight: "36px",
}));

export default function BottomNav({ productData, setProduct }) {
  const [recentPages, setRecentPages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const currentItemNumber = location.pathname.split("/").pop();
    setRecentPages((prevHistoryList) => [
      ...prevHistoryList,
      currentItemNumber,
    ]);
  }, [location.pathname]);

  return (
    <div>
      <OpenRecentCustomButton onClick={handleButtonClick}>
        Recently Viewed
      </OpenRecentCustomButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <RecentlyViewed
            recentPages={recentPages}
            productData={productData}
            setProduct={setProduct}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
