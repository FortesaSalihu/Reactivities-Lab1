import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";


//nese i perdorim {} te activities.map we have to say that we want to return an activity card
export default function ActivityList() {
  const { activities, isPending } = useActivities();

  if (!activities || isPending) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
        />
      ))}
    </Box>
  );
}