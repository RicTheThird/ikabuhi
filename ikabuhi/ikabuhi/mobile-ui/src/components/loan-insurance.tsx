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
    CircularProgress,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Member, ProductLoans, SnackbarAlert } from "../services/interfaces";
import { getMyDetails, getProductLoans, postMemberLoan } from "../services/apiService";
import dayjs from "dayjs";

const defaultFormValues = {
    groupId: "",
    lastName: "",
    firstName: "",
    middleName: "",
    accountNo: "",
    bdate: dayjs().format('YYYY-MM-DD'),
    civilStatus: "",
    occupation: "",
    brgy: "",
    municipality: "",
    province: "",
    userName: "",
    password: "",
    billsFile: null,
    idFile: null,
    photoFile: null,
    cycle: 1,
    loanAmount: 0,
    totalLoanAmount: 0,
    weeklyPayment: 0,
    interestRate: 0,
    transaction: 0,
    collectorId: "",
    currentSavings: 0,
    loanId: "",
    guarantorName: "",
    guarantorRelation: "",
    sourceOfIncome: "",
    firstPaymentDate: dayjs().format('YYYY-MM-DD'),
    collateralType1: "",
    collateralTypeAmount1: 0,
    collateralType2: "",
    collateralTypeAmount2: 0,
    collateralType3: "",
    collateralTypeAmount3: 0,
    liabilityLoanBalance: 0,
    liabilityLoanBalanceWeeklyPayments: 0,
    externalSavingsBalance: 0,
    monthlyExpenses: 0
};

const LoanInsuranceApplication: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1)
    const [open, setOpen] = useState(false);
    const [myDetails, setMyDetails] = useState<Member>();
    const [productLoans, setProductLoans] = useState<ProductLoans[]>([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState<SnackbarAlert>();
    const [formValues, setFormValues] = useState(defaultFormValues);

    useEffect(() => {
        getProductLoansAsync();
        getMyDetailsAsync();
    }, []);

    const handleClose = () => {
        setOpen(false)
        navigate('/insurance')
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        if (e.target.name === 'loanId') {
            const loanDetails = productLoans.find(p => p.id === e.target.value)
            if (loanDetails) {
                let totalLoanAmount = 0
                let weeklyPayment = 0
                if (formValues.loanAmount) {
                    totalLoanAmount = Number(formValues.loanAmount * (loanDetails.interestRate / 100)) + Number(formValues.loanAmount)
                    weeklyPayment = totalLoanAmount / loanDetails.transactions
                }
                setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                    totalLoanAmount,
                    interestRate: loanDetails.interestRate,
                    transaction: loanDetails.transactions,
                    weeklyPayment
                });
            }
        }
        else if (e.target.name === 'loanAmount') {
            if (formValues.loanId) {
                const loanDetails = productLoans.find(p => p.id === formValues.loanId)
                if (loanDetails) {
                    const loanAmount = Number(e.target.value);
                    let totalLoanAmount = 0
                    let weeklyPayment = 0
                    if (loanAmount > 0) {
                        totalLoanAmount = Number(loanAmount * (loanDetails.interestRate / 100)) + Number(loanAmount)
                        weeklyPayment = totalLoanAmount / loanDetails.transactions
                    }
                    setFormValues({
                        ...formValues,
                        loanAmount,
                        totalLoanAmount,
                        interestRate: loanDetails.interestRate,
                        transaction: loanDetails.transactions,
                        weeklyPayment
                    });
                }
            } else {
                setFormValues({
                    ...formValues,
                    [e.target.name]: Number(e.target.value)
                });
            }
        }
        else if (e.target.name === 'accountNo') {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
                userName: e.target.value
            });
        }

        else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
            });
        }
    };

    const getProductLoansAsync = async () => {
        const response = await getProductLoans();
        setProductLoans(response)
    }

    const getMyDetailsAsync = async () => {
        const response = await getMyDetails();
        setMyDetails(response)
        const typedResponse = response as Member;
        setFormValues({
            ...formValues,
            cycle: typedResponse.memberLoans?.length + 1,
            groupId: typedResponse.group?.id
        });

        if (typedResponse.payments && typedResponse.payments.length > 0) {
            const cscore = typedResponse.payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0);
            if (cscore < 230) {
                setOpen(true)
            }
        }
        else
            setOpen(true)
    }

    const handleNext = () => {
        console.log(formValues)
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAlert({ success: true, message: "Application submitted. Approval may take 2-3 business days" });
        setStep(1)
        
        // console.log(formValues)
        // setLoading(true)
        // try {
        //     const response: any = await postMemberLoan(formValues)
        //     if (response.status === 200) {
        //         setAlert({ success: true, message: "Loan application submitted. Approval may take 2-3 business days" });
        //         setFormValues(defaultFormValues);
        //         setStep(1)
        //     } else {
        //         setAlert({ success: false, message: response.response.data })
        //     }
        // } catch (error) {
        //     console.log(error)
        //     setAlert({ success: false, message: "Request failed. Please try again later." })
        // } finally {
        //     setSnackOpen(true)
        //     setLoading(false)
        // }
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
                    onClick={() => navigate('/insurance')}>

                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff8c00" }}>
                    Loan Insurance
                </Typography>
                <Typography variant="body2">
                    IKABUHI Insurance Application
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
                                        control={<Checkbox sx={{ color: "#FF6F00" }} required />}
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
                        </form>
                    </>
                }

                {step === 2 && (
                    <>
                        <form onSubmit={handleNext}>
                            <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                                        II. LOAN INFORMATION AND COVERAGE
                                    </Typography>

                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Loan Amount" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Loan Purpose</InputLabel>
                                                <Select label="Loan Purpose">
                                                    <MenuItem value="business">Business</MenuItem>
                                                    <MenuItem value="education">Education</MenuItem>
                                                    <MenuItem value="home">Home</MenuItem>
                                                    <MenuItem value="other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Loan Term</InputLabel>
                                                <Select label="Loan Term">
                                                    <MenuItem value="short_term">Short Term</MenuItem>
                                                    <MenuItem value="medium_term">Medium Term</MenuItem>
                                                    <MenuItem value="long_term">Long Term</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Loan Provider</InputLabel>
                                                <Select label="Loan Provider">
                                                    <MenuItem value="bank">Bank</MenuItem>
                                                    <MenuItem value="credit_union">Credit Union</MenuItem>
                                                    <MenuItem value="private_lender">Private Lender</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="subtitle1" gutterBottom>
                                        INSURANCE COVERAGE
                                    </Typography>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <InputLabel>Type of Loan</InputLabel>
                                        <Select label="Type of Loan">
                                            <MenuItem value="secured">Secured</MenuItem>
                                            <MenuItem value="unsecured">Unsecured</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField fullWidth label="Coverage Amount" variant="outlined" sx={{ mb: 2 }} />

                                    <Typography variant="subtitle1" gutterBottom>
                                        PAYMENT PLAN
                                    </Typography>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <InputLabel>Payment Plan</InputLabel>
                                        <Select label="Payment Plan">
                                            <MenuItem value="fixed">Fixed</MenuItem>
                                            <MenuItem value="flexible">Flexible</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                    sx={{
                                        backgroundColor: "#FF6F00",
                                        color: "#fff",
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: "bold",
                                        "&:hover": { backgroundColor: "#CC5A00" },
                                    }}
                                    type="submit">
                                    Next
                                </Button>
                            </Box>
                        </form>
                    </>
                )}

                {step === 3 && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                                        II. BENEFICIARY INFORMATION
                                    </Typography>

                                    <TextField fullWidth label="Last Name" variant="outlined" sx={{ mb: 2 }} />
                                    <TextField fullWidth label="First Name" variant="outlined" sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Middle Name" variant="outlined" sx={{ mb: 2 }} />

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <InputLabel>Relationship to Beneficiary</InputLabel>
                                        <Select label="Relationship to Beneficiary">
                                            <MenuItem value="spouse">Spouse</MenuItem>
                                            <MenuItem value="child">Child</MenuItem>
                                            <MenuItem value="parent">Parent</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField fullWidth label="Contact Number" variant="outlined" sx={{ mb: 2 }} />

                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="I hereby declare that the information provided is accurate to the best of my knowledge and I agree to the terms and conditions of the microinsurance policy."
                                        sx={{ mb: 2 }}
                                    />
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
                        </form>
                    </>
                )}
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
                        You need at least <b>230 credit points</b> to unlock this priviledge.  You can do it!
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

export default LoanInsuranceApplication;