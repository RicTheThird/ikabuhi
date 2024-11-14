import React, { useState } from "react";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";

const MemberRegistration = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Box
      mt={5}
      sx={{
        padding: 4,
        backgroundColor: "#f8f4f4",
        maxWidth: '50vw',
        marginRight: "auto ",
        marginLeft: "auto",
        borderRadius: 2,
      }}
    >
      {step === 1 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            I. Personal Information
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Last Name"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="First Name"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Middle Name"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Account No."
              variant="outlined"
              sx={{ width: "30%" }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField label="Age" variant="outlined" sx={{ width: "30%" }} />
            <TextField
              label="Civil Status"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Occupation"
              variant="outlined"
              select
              sx={{ width: "30%" }}
            >
              <MenuItem value="Employed">Employed</MenuItem>
              <MenuItem value="Self-Employed">Self-Employed</MenuItem>
              <MenuItem value="Unemployed">Unemployed</MenuItem>
            </TextField>
          </Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Complete Address
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Barangay"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Municipality"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Province"
              variant="outlined"
              sx={{ width: "30%" }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      )}
      {step === 2 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            II. Loan Information
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField label="Cycle" variant="outlined" sx={{ width: "30%" }} />
            <TextField
              label="PL"
              variant="outlined"
              select
              sx={{ width: "30%" }}
            >
              <MenuItem value="PL1">PL1</MenuItem>
              <MenuItem value="PL2">PL2</MenuItem>
              <MenuItem value="PL3">PL3</MenuItem>
            </TextField>
            <TextField
              label="Loan Amount"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Interest"
              variant="outlined"
              sx={{ width: "30%" }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Transaction"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Total Loan Amount"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Weekly Payment"
              variant="outlined"
              sx={{ width: "30%" }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Current Savings"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Name of Collector"
              variant="outlined"
              select
              sx={{ width: "30%" }}
            >
              <MenuItem value="Collector 1">Collector 1</MenuItem>
              <MenuItem value="Collector 2">Collector 2</MenuItem>
              <MenuItem value="Collector 3">Collector 3</MenuItem>
            </TextField>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ marginRight: "10px" }}
            >
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      )}
      {step === 3 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            III. Guarantor's Information
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Name of Guarantor"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Relation to Borrower"
              variant="outlined"
              sx={{ width: "30%" }}
            />
            <TextField
              label="Source of Income"
              variant="outlined"
              sx={{ width: "30%" }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: 2, marginTop: 4 }}
          >
            IV. Bills Information & Requirements
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button variant="outlined" component="label" sx={{ width: "45%" }}>
              Upload Latest Bills (e.g., Electric Bill)
              <input type="file" hidden />
            </Button>
            <Button variant="outlined" component="label" sx={{ width: "45%" }}>
              Upload Certificate of Residency or Barangay Clearance
              <input type="file" hidden />
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ marginRight: "10px" }}
            >
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      )}
      {step === 4 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            V. User Profiles and Password
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button variant="outlined" component="label" sx={{ width: "45%" }}>
              Upload Photo for Profile
              <input type="file" hidden />
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Username (Account Number)"
              variant="outlined"
              sx={{ width: "45%" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              sx={{ width: "45%" }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ marginRight: "10px" }}
            >
              Back
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MemberRegistration;
