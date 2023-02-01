import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const { dark, main, medium } = palette.neutral;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h3" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>AjummaCosmetics</Typography>
        <Typography color={medium}>ajummacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty! Best-selling Korean
        cosmetics.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
