import MuiDrawer from "@mui/material/Drawer";
import { openedMixin, closedMixin } from "../mixin/mixin";
import { styled } from "@mui/material/styles";

const drawerWidth = 100;

// export const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",

//   // ...(open && {
//   //   ...openedMixin(theme),
//   //   "& .MuiDrawer-paper": openedMixin(theme),
//   // }),
//   // ...(!open && {
//   //   ...closedMixin(theme),
//   //   "& .MuiDrawer-paper": closedMixin(theme),
//   // }),
//   "& .MuiDrawer-paper": {
//     ...(open ? openedMixin(theme) : closedMixin(theme)),
//     // Additional styles for the content inside the drawer
//     backgroundColor: "lightgray", // Change background color
//     color: "white !important", // Change text color
//     // Add any other styles you need
//   },
// }));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    ...openedMixin(theme), // Always apply the opened styles
    backgroundColor: "#091138",
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
