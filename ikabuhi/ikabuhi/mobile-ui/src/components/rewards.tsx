import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, useParams } from "react-router-dom";

interface Reward {
  name: string;
  points: number;
  isUnlocked: boolean;
  route: string;
}


const CreditRewards: React.FC = () => {
  const navigate = useNavigate();
  const { points } = useParams();

  const rewards: Reward[] = [
    { name: "Small Business Loan", points: 200, isUnlocked: Number(points) >= 200, route: "/biz-loan" },
    { name: "Wash Loan", points: 300, isUnlocked: Number(points) >= 300, route: "/wash-loan" },
    { name: "Microinsurance", points: 150, isUnlocked:  Number(points) >= 150, route: "/micro-insurance"  },
    { name: "Loan Insurance", points: 230, isUnlocked:  Number(points) >= 230, route: "/loan-insurance" },
    { name: "Business Development Program", points: 210, isUnlocked:  Number(points) >= 210, route: "/livelihood" },
    { name: "Educational Scholarship Program", points: 480, isUnlocked:  Number(points) >= 480, route: "/scholarship" },
    { name: "Health", points: 190, isUnlocked:  Number(points) >= 190, route: "/health" },
  ];


  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f4f4",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          padding: 2,
          border: "1px solid #f0a06d",
          borderRadius: 2,
          backgroundColor: "#f7f8fc",
          boxShadow: 3,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Credit Score Rewards
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#574b90",
              color: "white",
              padding: "4px 12px",
              borderRadius: 16,
              fontWeight: "bold",
            }}
          >
            <Typography variant="body2">Current Points:</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {points}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2}>
          {rewards.map((reward, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1.5,
                backgroundColor: "white",
                boxShadow: 1,
                borderRadius: 1,
              }}
            >
              <CardContent sx={{ padding: 0 }}  onClick={() => reward.isUnlocked ? navigate(reward.route) : null}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ color: "#f0a06d" }}
                >
                  {reward.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Equivalent Credit Points: {reward.points}
                </Typography>
              </CardContent>
              <IconButton>
                {reward.isUnlocked ? (
                  <LockOpenIcon sx={{ color: "#f0a06d" }} />
                ) : (
                  <LockIcon color="action" />
                )}
              </IconButton>
            </Card>
          ))}
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#ff8c00", color: "#fff",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/credit-score")}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default CreditRewards;
