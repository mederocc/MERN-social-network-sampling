import React from "react";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://notfb-backend-production.up.railway.app/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
