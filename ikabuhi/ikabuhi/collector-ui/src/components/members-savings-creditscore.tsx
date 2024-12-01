import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { getAllGroupMembers, getGroupById, getGroupMembers, getImageLink, getMyGroups } from "../services/apiService";
import { Groups, Member } from "../services/interfaces";


const MemberSavingsCreditScore = () => {
  const [transactionType, setTransactionType] = useState<string>("Savings");
  const [groups, setGroups] = useState<Groups[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  //const data = dataOptions[transactionType];

  const getMyCollectorGroups = async () => {
    const response = await getMyGroups();
    setGroups(response)
  }

  useEffect(() => {
    getMyCollectorGroups();
    getAllGroupMembersAsync();
  }, []);

  const getAllGroupMembersAsync = async () => {
    const response = await getAllGroupMembers();
    setMembers(response)
  }



  const handleGroupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const response = await getGroupMembers(e.target.value || "");
    setMembers(response)
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f8f4f4", minHeight: "100vh" }}>
      {/* <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          GOOD GIRLS: 35 Members
        </Typography>
      </Box> */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Group"
          variant="outlined"
          select
          sx={{ width: "20%" }}
          onChange={handleGroupChange}
        >
          {/* <MenuItem key={999999} value={""} selected>Select Group</MenuItem> */}
          {groups && groups.map((group: Groups, index: number) => (
            <MenuItem key={index} value={group.id}>{group.name} ({group.memberCount} Members)</MenuItem>
          ))}
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
          members.length > 0 && members.map((item: Member, index: number) => (
            <Grid item key={index} xs={12} md={4} lg={3}>
              <Card variant="outlined" sx={{ padding: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      alt={`${item.firstName} ${item.lastName}`}
                      src={getImageLink(item?.photoBlobName ?? '')} // Use default if no avatar URL is available
                      sx={{
                        width: 80,
                        height: 80,
                        margin: 'auto', // Center the avatar and add margin
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {item.firstName} {item.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.accountNo}
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
                        <strong>₱{item.memberLoans && item.memberLoans.length > 0 ? item.memberLoans[0].totalLoanAmount.toFixed(2) : 0.00}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", color: "#ff8c00" }}
                      >
                        Current Savings
                      </Typography>
                      <Typography variant="body1">
                        <strong>₱{item.memberSavings && item.memberSavings.length > 0 ? item.memberSavings[0].runningSavingsAmount.toFixed(2) : 0.00}</strong>
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: "bold" }}
                      >
                        Savings applicable to Withdraw (80% of Current Savings)
                      </Typography>
                      <br />
                      <Typography variant="body1">
                        <strong>₱{item.memberSavings && item.memberSavings.length > 0 ? (item.memberSavings[0].runningSavingsAmount * 0.8).toFixed(2) : 0.00}</strong>
                      </Typography>
                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        {transactionType === "CreditScore" &&
          members.length > 0 && members.map((item: Member, index: number) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <Card variant="outlined" sx={{ padding: 2, textAlign: "center" }}>
                <CardContent>
                  {/* <Box
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
                      {(`${item.firstName} ${item.lastName}`)
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </Box> */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    {item.firstName} {item.lastName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.accountNo}
                  </Typography>
                  <Box mt={2} mb={2}>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {item.payments.length && item.payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0)}
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
