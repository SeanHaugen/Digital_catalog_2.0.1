import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

const CopyToClipboardButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    // Create a new textarea element and set its value to the text you want to copy
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Select and copy the text to the clipboard
    textarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // Update the state to indicate that the text has been copied
    setIsCopied(true);

    // Reset the "Copied" message after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <MenuItem onClick={handleCopyToClipboard}>
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </MenuItem>
    </div>
  );
};

export default CopyToClipboardButton;
