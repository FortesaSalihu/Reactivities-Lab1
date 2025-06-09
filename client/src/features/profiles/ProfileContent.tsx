import { Box, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

export default function ProfileContent() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabContent = [
    { label: "About", content: <ProfileAbout /> },
    { label: "Photos", content: <ProfilePhotos /> },
    { label: "Events", content: <ProfileActivities /> },
    { label: "Followers", content: <ProfileFollowings activeTab={value} /> },
    { label: "Following", content: <ProfileFollowings activeTab={value} /> },
  ];

  return (
    <Box
      component={Paper}
      mt={2}
      p={2}
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        borderRadius: 2,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          minWidth: isSmallScreen ? "auto" : 200,
          mb: isSmallScreen ? 2 : 0,
          borderRight: isSmallScreen ? "none" : 1,
          borderBottom: isSmallScreen ? 1 : "none",
          borderColor: "divider",
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 2 }}>{tabContent[value].content}</Box>
    </Box>
  );
}
