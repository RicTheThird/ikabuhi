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
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Alert,
    Snackbar,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Member, SnackbarAlert } from "../services/interfaces";
import { getMyDetails, postWashLoan } from "../services/apiService";

const defaultFormValues = {
    projectType: '',
    projectLocation: '',
    loanAmount: undefined,
    paymentTerms: '',
    haveCollateral: false,
    collateral: ''
};


const WashLoanApplication: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1)
    
    const [open, setOpen] = useState(false);
    const [myDetails, setMyDetails] = useState<Member>();
    const [loading, setLoading] = useState(false); // Loading state
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState<SnackbarAlert>();
    const [formValues, setFormValues] = useState(defaultFormValues);

    useEffect(() => {
        getMyDetailsAsync()
    }, []);

    const handleClose = () => {
        setOpen(false)
        navigate('/loan-select')
    }

    const getMyDetailsAsync = async () => {
        const response: Member = await getMyDetails();
        setMyDetails(response)
        if (response.payments && response.payments.length > 0) {
            const cscore = response.payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0);
            if (cscore < 300) {
                setOpen(true)
            }
        }
        else
            setOpen(true)
    }

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.type)
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formValues)
        setLoading(true)
        try {
            const response: any = await postWashLoan(formValues)
            if (response.status === 200) {
                setAlert({ success: true, message: "Loan application submitted. Approval may take 2-3 business days" });
                setFormValues(defaultFormValues);
                setStep(1)
            } else {
                setAlert({ success: false, message: response.response.data })
            }
        } catch (error) {
            console.log(error)
            setAlert({ success: false, message: "Request failed. Please try again later." })
        } finally {
            setSnackOpen(true)
            setLoading(false)
        }
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
                    WASH Loan
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
                    {/* <Box
                        sx={{
                            width: 50,
                            height: 5,
                            backgroundColor: step === 3 ? "#002D72" : "#ddd",
                            borderRadius: 1,
                        }}
                    /> */}
                </Box>

                {/* Personal Information Card */}
                {step === 1 &&
                    <>
                        <form onSubmit={handleNext}>
                            <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
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
                                        { label: "Current Loan Cycle", value: (myDetails?.memberLoans.find((m: any) => m.isActive === true && m.status === 'Approved')?.cycle ?? 1) },
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
                                        required
                                        control={<Checkbox sx={{ color: "#FF6F00" }} />}
                                        label={
                                            <Typography variant="body2">
                                                Check this if your information is accurate above to proceed
                                            </Typography>
                                        }
                                    />
                                </CardContent>
                            </Card>
                            <Box sx={{ width: "100%", textAlign: "right", }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#FF6F00",
                                        color: "#fff",
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: "bold",
                                        "&:hover": { backgroundColor: "#CC5A00" },
                                    }}>
                                    Next
                                </Button>
                            </Box>
                        </form></>
                }

                {step === 2 && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold", mb: 1, color: "#002D72" }}
                                    >
                                        II. PROJECT INFORMATION & LOAN DETAILS
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField label="Type of Project"
                                                required
                                                value={formValues.projectType}
                                                name="projectType"
                                                onChange={handleInputChange}
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Location of Project"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                required
                                                value={formValues.projectLocation}
                                                name="projectLocation"
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value={"Urban"}>Urban</MenuItem>
                                                <MenuItem value={"Rural"}>Rural</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#002D72" }}>
                                                Loan Request Detail
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Loan Amount Request"
                                                type="number"
                                                required
                                                value={formValues.loanAmount}
                                                name="loanAmount"
                                                onChange={handleInputChange}
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Repayment Term"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                required
                                                value={formValues.paymentTerms}
                                                name="paymentTerms"
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value={"6 months"}>6 Months</MenuItem>
                                                <MenuItem value={"12 months"}>12 Months</MenuItem>
                                                <MenuItem value={"24 months"}>24 Months</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Do you have any collateral to offer for the loan?
                                                </FormLabel>
                                                <RadioGroup row
                                                    value={formValues.haveCollateral}
                                                    name="haveCollateral"
                                                    onChange={handleInputChange}>
                                                    <FormControlLabel  required value={true} control={<Radio />} label="Yes" />
                                                    <FormControlLabel  required value={false} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="If Yes, please specify"
                                                fullWidth
                                                variant="outlined"
                                                required
                                                value={formValues.collateral}
                                                name="collateral"
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 2 }} />
                                    <Box>
                                        <FormControlLabel
                                            required
                                            control={<Checkbox sx={{ color: "#FF6F00" }} />}
                                            label={
                                                <Typography variant="body2">
                                                    I, {myDetails?.firstName} {myDetails?.lastName}, declare that all the information provided in this
                                                    application is true and complete to the best of my knowledge. I
                                                    understand that any misrepresentation or false information may
                                                    result in the denial of this loan application.
                                                </Typography>
                                            }
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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
                                    onClick={handleBack} >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        backgroundColor: "#FF6F00",
                                        color: "#fff",
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: "bold",
                                        "&:hover": { backgroundColor: "#CC5A00" },
                                    }}
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} /> : null}>
                                    Submit
                                </Button>
                            </Box>
                        </form></>)
                }
            </Box>

            <Snackbar
                open={snackOpen}
                autoHideDuration={10000}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackOpen(false)} severity={alert?.success ? "success" : "error"} sx={{ width: '100%' }}>
                    {alert?.message}
                </Alert>
            </Snackbar>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <img
                            src="/sorry.png"
                            alt="sorry icon"
                            style={{ width: 100, height: 100, marginBottom: 8 }}
                        />
                        Sorry!
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    You need at least <b>300 credit points</b> to unlock this priviledge.  You can do it!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WashLoanApplication;