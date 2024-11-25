import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Button,
    Divider,
    IconButton,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Member } from "../services/interfaces";
import { getMyDetails } from "../services/apiService";

const RegularLoanApplication: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1)
    const [myDetails, setMyDetails] = useState<Member>();

    useEffect(() => {
        getMyDetailsAsync()
    }, []);

    const getMyDetailsAsync = async () => {
        const response = await getMyDetails();
        setMyDetails(response)
    }

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    return (
        <Box
            sx={{
                //p: 2,
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: "#002855",
                    borderRadius: 1,
                    p: 2,
                    mb: 2,
                    color: "#fff",
                }}
            >
                <IconButton
                    sx={{ color: "#fff", mb: 1 }}
                    onClick={() => navigate('/loan-select')}>

                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff8c00" }}>
                    Regular Project Loan
                </Typography>
                <Typography variant="body2">
                    This Loan Application form must be fully completed. Failure to
                    disclose all required information may delay approval of your loan
                    application.
                </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                {/* Stepper (Optional - Simulated with Dummy Steps) */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 50,
                            height: 5,
                            backgroundColor: "#002D72",
                            borderRadius: 1,
                        }}
                    />
                    <Box
                        sx={{
                            width: 50,
                            height: 5,
                            backgroundColor: step >= 2 ? "#002D72" : "#ddd",
                            borderRadius: 1,
                        }}
                    />
                    <Box
                        sx={{
                            width: 50,
                            height: 5,
                            backgroundColor: step === 3 ? "#002D72" : "#ddd",
                            borderRadius: 1,
                        }}
                    />
                </Box>

                {/* Personal Information Card */}
                {step === 1 && <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1, color: "#002D72" }}
                        >
                            I. PERSONAL INFORMATION
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Information Details */}
                        {[
                            { label: "Member’s Account No.", value: myDetails?.accountNo },
                            { label: "Member’s Full Name", value: `${myDetails?.firstName} ${myDetails?.lastName}` },
                            { label: "Occupation", value: myDetails?.occupation },
                            { label: "Civil Status", value: myDetails?.civilStatus },
                            { label: "Phone No.", value: "N/A" },
                            { label: "Address", value: `${myDetails?.brgy} ${myDetails?.municipality} ${myDetails?.province}` },
                            { label: "Group Name", value: myDetails?.group?.name },
                            { label: "Branch", value: "Tanauan" },
                            { label: "Current Loan Cycle", value: (myDetails?.memberLoans.find((m: any) => m.isActive === true)?.cycle ?? 1) + 1 },
                        ].map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                    color: index % 2 === 0 ? "#000" : "#002D72",
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    {item.label}:
                                </Typography>
                                <Typography variant="body2">{item.value}</Typography>
                            </Box>
                        ))}

                        {/* Confirmation Checkbox */}
                        <FormControlLabel
                            control={<Checkbox sx={{ color: "#FF6F00" }} />}
                            label={
                                <Typography variant="body2">
                                    Check this if your information is accurate above to proceed
                                </Typography>
                            }
                        />
                    </CardContent>
                </Card>}

                {step === 2 && (
                    <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1, color: "#002D72" }}
                            >
                                II. LOAN DETAILS
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField label="Loan Cycle" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Loan Amount Requested"
                                        fullWidth
                                        variant="outlined"
                                        select
                                    >
                                        <MenuItem value={"10000"}>10,000</MenuItem>
                                        <MenuItem value={"20000"}>20,000</MenuItem>
                                        <MenuItem value={"30000"}>30,000</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Loan Term"
                                        fullWidth
                                        variant="outlined"
                                        select
                                    >
                                        <MenuItem value={"6 months"}>6 Months</MenuItem>
                                        <MenuItem value={"12 months"}>12 Months</MenuItem>
                                        <MenuItem value={"24 months"}>24 Months</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Interest Rate" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Total Loan Amount" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Weekly Payment" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Type of Collateral 1"
                                        fullWidth
                                        variant="outlined"
                                        select
                                    >
                                        <MenuItem value={"Property"}>Property</MenuItem>
                                        <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                                        <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Amount" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Type of Collateral 2"
                                        fullWidth
                                        variant="outlined"
                                        select
                                    >
                                        <MenuItem value={"Property"}>Property</MenuItem>
                                        <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                                        <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Amount" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Type of Collateral 3"
                                        fullWidth
                                        variant="outlined"
                                        select
                                    >
                                        <MenuItem value={"Property"}>Property</MenuItem>
                                        <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                                        <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Amount" fullWidth variant="outlined" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {step === 3 && (
                    <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1, color: "#002D72" }}
                            >
                                III. FINANCIAL OBLIGATIONS AND REFERENCE
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField label="Current Loan Balance" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Current Savings" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Weekly Repayment Amount" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Monthly Expenses"
                                        fullWidth
                                        variant="outlined"
                                        select
                                    >
                                        <MenuItem value={"10000"}>10,000</MenuItem>
                                        <MenuItem value={"20000"}>20,000</MenuItem>
                                        <MenuItem value={"30000"}>30,000</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#002D72" }}>
                                    Guarantors Information
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="Full Name" fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Relationship" fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Contact No." fullWidth variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    {step > 1 && (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#002D72",
                                color: "#fff",
                                py: 1.5,
                                mr: 1,
                                borderRadius: 2,
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#001A4E" },
                            }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#FF6F00",
                                color: "#fff",
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#CC5A00" },
                            }}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#FF6F00",
                                color: "#fff",
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#CC5A00" },
                            }}
                        >
                            Submit
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default RegularLoanApplication;