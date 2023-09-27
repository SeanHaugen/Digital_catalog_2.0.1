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
  const [fileQueue, setFileQueue] = useState([]);
  const history = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenRecent(!openRecent);
  };

  useEffect(() => {
    const pathSegments = history.pathname.split("/");
    const isDesiredPathFormat =
      pathSegments.length === 4 &&
      pathSegments[0] === "" &&
      pathSegments[3] !== "";

    if (isDesiredPathFormat) {
      setRecentPages((prevPages) => [
        history.pathname,
        ...prevPages.slice(0, 4),
      ]);
    }
  }, [history]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFileQueue([...fileQueue, ...selectedFiles]);
  };

  const handleUpload = async () => {
    if (fileQueue.length === 0) {
      return;
    }

    for (const file of fileQueue) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Display the file as "Uploading" in the queue
        file.status = "Uploading";
        setFileQueue([...fileQueue]);

        const response = await fetch(
          "https://ivory-firefly-hem.cyclic.app/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          // Update the file status to "Uploaded" in the queue
          file.status = "Uploaded";
          setFileQueue([...fileQueue]);
        } else {
          // Update the file status to "Failed" in the queue
          file.status = "Failed";
          setFileQueue([...fileQueue]);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        // Update the file status to "Failed" in the queue
        file.status = "Failed";
        setFileQueue([...fileQueue]);
      }
    }

    // Clear the file queue after uploads are complete
    setFileQueue([]);
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
          <form
            action="https://ivory-firefly-hem.cyclic.app/upload"
            method="post"
            enctype="multipart/form-data"
          >
            <input
              type="file"
              name="file"
              multiple
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </form>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {fileQueue.map((file, index) => (
              <li key={index}>
                {file.name} - {file.status}
              </li>
            ))}
          </ul>
          <BottomNavigationAction
            label="Recent"
            icon={<RestoreIcon />}
            onClick={handleClick}
          ></BottomNavigationAction>
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
        {openRecent && <RecentlyViewed recentPages={recentPages} />}
      </Box>
    </div>
  );
}
