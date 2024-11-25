import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Member, Payments } from "../services/interfaces";
import { getMyDetails } from "../services/apiService";

const CreditScore = () => {
  const navigate = useNavigate();

  const [myDetails, setMyDetails] = useState<Member>();
  const [payments, setPayments] = useState<Payments[]>([]);
  const [creditScore, setCreditScore] = useState({
    score: 350,
    recentPoints:
      "2 points added to your Total Credit Score by paying on your repayment loan and savings on 03/07/2024.",
  });


  useEffect(() => {
    getMyDetailsAsync()
  }, []);

  const getMyDetailsAsync = async () => {
    const response = await getMyDetails();
    setPayments(response?.payments)
    setMyDetails(response)
  }

  const getCreditScore = (): number => {
    if (payments && payments.length > 0)
      return payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0);
    else
      return 0;
  }

  const getRecetPoints = (): string => {
    if (payments && payments.length > 0)
      return `${payments[0].creditPointsGained} points added to your Total Credit Score by paying on your repayment loan and savings on ${dayjs(payments[0].paymentDate).format('YYYY-MM-DD')}.`
    else
      return "No recent transaction";
  }


  return (
    <Box
      sx={{
        padding: 2,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          mb: 2,
          backgroundColor: "#ff8c00",
          padding: 2,
        }}
      >
        <IconButton onClick={() => navigate('/home')}>
          <ArrowBackIcon sx={{ color: "#fff" }} />
        </IconButton>
        <Typography variant="h5" sx={{ color: "#fff", textAlign: "left" }}>
          Your Credit Score
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
        Your Credit Score is based on your overall performance as an IKABUHI
        Member. Increase your points to unlock other features!
      </Typography>

      {/* Credit Score Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          mb: 3,
          width: '80vw',
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              backgroundColor: "#f0f0f0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #ff8c00",
              mb: 2,
            }}
          >
            <Typography variant="h3" sx={{ color: "#ff8c00" }}>
              {getCreditScore()}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          mb: 3,
          border: "1px solid #ccc",
          backgroundColor: "#002855",
        }}
      >
        <Box sx={{ mb: 2, color: 'white' }}>
          <Typography variant="h6">
            Recent Credit Points Garnered
          </Typography>
          <Typography variant="body2">
            {getRecetPoints()}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ width: '80vw', display: "flex", mb: 2, padding: 3, border: "1px solid #002855" }}>
        <Typography variant="h6">Credit Score Rewards</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#ff8c00", color: "#fff", ml: 4 }}
          onClick={() => navigate(`/rewards/${getCreditScore()}`)}
        >
          View
        </Button>
      </Box>

      {/* How to increase your Credit Score Section */}
      <Typography variant="h6" sx={{ mb: 2, color: "#ff8c00" }}>
        How to increase your Credit Score?
      </Typography>
      <Paper
        elevation={1}
        sx={{
          padding: 2,
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          - <b>Pay on Time:</b> Every loan repayment equivalent to 1 credit
          score.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          - <b>Maintain your Savings:</b> Every 300.00 you save will accumulate
          to 1 credit score.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          - <b>Loan Interval:</b> Every loan interval you complete will add 5
          credit score points.
        </Typography>
      </Paper>
    </Box>
  );
};

export default CreditScore;
