import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const dataOptions: any = {
  Savings: [
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      loanAmount: 10000,
      currentSavings: 2500,
      savingsToWithdraw: 500,
    },
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      loanAmount: 15000,
      currentSavings: 2500,
      savingsToWithdraw: 0,
    },
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      loanAmount: 20000,
      currentSavings: 5500,
      savingsToWithdraw: 1500,
    },
  ],
  CreditScore: [
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      creditScore: 250,
    },
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      creditScore: 250,
    },
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      creditScore: 250,
    },
    {
      name: "Helena Magpantay",
      clientNo: "U12127836",
      creditScore: 250,
    },
  ],
};

const MemberSavingsCreditScore = () => {
  const [transactionType, setTransactionType] = useState<string>("Savings");
  const data = dataOptions[transactionType];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f8f4f4", minHeight: "100vh" }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          GOOD GIRLS: 35 Members
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Group"
          variant="outlined"
          select
          sx={{ width: "20%" }}
        >
          <MenuItem value="Good Girls">Good Girls</MenuItem>
        </TextField>
        <TextField
          label="Transaction Options"
          variant="outlined"
          select
          sx={{ width: "20%" }}
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <MenuItem value="Savings">Savings</MenuItem>
          <MenuItem value="CreditScore">Credit Score</MenuItem>
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {transactionType === "Savings" &&
          data.map((item: any, index: number) => (
            <Grid item key={index} xs={12} md={4} lg={3}>
              <Card variant="outlined" sx={{ padding: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "#ff8c00",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 24,
                        marginBottom: 2,
                        marginRight: '20px'
                      }}
                    >
                      {item.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.clientNo}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", color: "#ff8c00" }}
                      >
                        Loan Amount
                      </Typography>
                      <Typography variant="body1">
                        ₱{item.loanAmount.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Current Savings
                      </Typography>
                      <Typography variant="body1">
                        ₱{item.currentSavings.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Savings to Withdraw
                      </Typography>
                      <Typography variant="body1">
                        ₱{item.savingsToWithdraw.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        {transactionType === "CreditScore" &&
          data.map((item: any, index: number) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <Card variant="outlined" sx={{ padding: 2, textAlign: "center" }}>
                <CardContent>
                  <Box
                    component="img"
                    src="/avatar-placeholder.png"
                    alt="Profile"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      marginBottom: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.clientNo}
                  </Typography>
                  <Box mt={2} mb={2}>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {item.creditScore}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Credit Score
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default MemberSavingsCreditScore;
