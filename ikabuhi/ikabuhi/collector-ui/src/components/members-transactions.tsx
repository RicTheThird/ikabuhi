import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const transactions = [
  {
    clientNo: "U128341318",
    clientName: "Elena Angulo",
    loanProduct: "PL1-6",
    savingBalance: 5250.0,
    olb: 5250.0,
    installmentAmount: 500.0,
    payVia: "Cash",
  },
  {
    clientNo: "",
    clientName: "",
    loanProduct: "",
    savingBalance: "",
    olb: "",
    installmentAmount: "",
    payVia: "",
  },
  // Add more clients as needed
];

const MemberTransactions = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f8f4f4", minHeight: "100vh" }}>
      <Box mb={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          DAY 1: 8:00AM
        </Typography>
        <Typography variant="h6">GROUP NAME: Good Girls</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{ width: "20%" }}
        />
        <TextField label="Week" variant="outlined" select sx={{ width: "20%" }}>
          <MenuItem value="Week 1">Week 1</MenuItem>
          <MenuItem value="Week 2">Week 2</MenuItem>
        </TextField>
        <TextField label="PL" variant="outlined" select sx={{ width: "20%" }}>
          <MenuItem value="PL-1">PL-1</MenuItem>
          <MenuItem value="PL-2">PL-2</MenuItem>
        </TextField>
        {/* <TextField label="E-CASH" variant="outlined" sx={{ width: "20%" }} /> */}
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("/home/ecash")}
        >
          E-Cash
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Client No.</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Loan Product</TableCell>
              <TableCell>Saving Balance</TableCell>
              <TableCell>OLB (P+I)</TableCell>
              <TableCell>Installment Amount</TableCell>
              <TableCell>Pay via</TableCell>
              <TableCell>Loan</TableCell>
              <TableCell>Savings</TableCell>
              <TableCell>Savings Widl</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{transaction.clientNo}</TableCell>
                <TableCell>{transaction.clientName}</TableCell>
                <TableCell>{transaction.loanProduct}</TableCell>
                <TableCell>{transaction.savingBalance}</TableCell>
                <TableCell>{transaction.olb}</TableCell>
                <TableCell>{transaction.installmentAmount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color={
                      transaction.payVia === "Cash" ? "success" : "secondary"
                    }
                  >
                    {transaction.payVia}
                  </Button>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "80px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="warning">
          Back
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MemberTransactions;
