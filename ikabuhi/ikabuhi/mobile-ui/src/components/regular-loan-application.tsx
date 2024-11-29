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
    DialogTitle,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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

const RegularLoanApplication: React.FC = () => {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1)
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
        navigate('/loan-select')
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

        if(typedResponse?.memberLoans.some((m: any) => m.isActive === true && m.status === 'Approved')) {
            setOpen(true)
        }

        setFormValues({
            ...formValues,
            cycle: typedResponse.memberLoans?.length + 1,
            groupId: typedResponse.group?.id
        });
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
        console.log(formValues)
        setLoading(true)
        try {
            const response: any = await postMemberLoan(formValues)
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
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold", mb: 1, color: "#002D72" }}
                                    >
                                        II. LOAN DETAILS
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField label="Loan Cycle" type="number"
                                                name="cycle"
                                                required
                                                value={formValues.cycle}
                                                aria-readonly fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Loan Amount Request"
                                                fullWidth
                                                name="loanAmount"
                                                required
                                                value={formValues.loanAmount}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Loan Term"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                required
                                                value={formValues.loanId}
                                                onChange={handleInputChange}
                                                name="loanId"
                                            >
                                                {productLoans && productLoans.map((loan: ProductLoans) => (
                                                    <MenuItem key={loan.id} value={loan.id}>
                                                        {loan.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Interest Rate (%)" type="number"
                                                value={formValues.interestRate}
                                                aria-readonly fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Total Loan Amount"
                                                value={formValues.totalLoanAmount.toFixed(2)}
                                                aria-readonly
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Weekly Payment"
                                                value={formValues.weeklyPayment.toFixed(2)}
                                                aria-readonly
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Type of Collateral 1"
                                                value={formValues.collateralType1}
                                                onChange={handleInputChange}
                                                name="collateralType1"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                required
                                            >
                                                <MenuItem value={"Property"}>Property</MenuItem>
                                                <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                                                <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                                <MenuItem value={"Other"}>Other</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Amount"
                                                value={formValues.collateralTypeAmount1}
                                                onChange={handleInputChange}
                                                name="collateralTypeAmount1"
                                                type="number"
                                                required
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Type of Collateral 2"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                value={formValues.collateralType2}
                                                onChange={handleInputChange}
                                                name="collateralType2"
                                            >
                                                <MenuItem value={"Property"}>Property</MenuItem>
                                                <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                                                <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                                <MenuItem value={"Other"}>Other</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Amount"
                                                value={formValues.collateralTypeAmount2}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="collateralTypeAmount2"
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Type of Collateral 3"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                value={formValues.collateralType3}
                                                onChange={handleInputChange}
                                                name="collateralType3"
                                            >
                                                <MenuItem value={"Property"}>Property</MenuItem>
                                                <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                                                <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                                <MenuItem value={"Other"}>Other</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Amount"
                                                value={formValues.collateralTypeAmount3}
                                                onChange={handleInputChange}
                                                name="collateralTypeAmount3"
                                                type="number"
                                                fullWidth variant="outlined" />
                                        </Grid>
                                    </Grid>
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
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold", mb: 1, color: "#002D72" }}
                                    >
                                        III. FINANCIAL OBLIGATIONS AND REFERENCE
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField label="Current Loan Balance"
                                                type="number"
                                                value={formValues.liabilityLoanBalance}
                                                onChange={handleInputChange}
                                                name="liabilityLoanBalance"
                                                required
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Current Savings"
                                                type="number"
                                                value={formValues.externalSavingsBalance}
                                                onChange={handleInputChange}
                                                name="externalSavingsBalance"
                                                required
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Weekly Repayment Amount"
                                                type="number"
                                                value={formValues.liabilityLoanBalanceWeeklyPayments}
                                                onChange={handleInputChange}
                                                required
                                                name="liabilityLoanBalanceWeeklyPayments"
                                                fullWidth variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Monthly Expenses"
                                                fullWidth
                                                variant="outlined"
                                                type="number"
                                                value={formValues.monthlyExpenses}
                                                onChange={handleInputChange}
                                                name="monthlyExpenses"
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#002D72" }}>
                                            Guarantors Information
                                        </Typography>
                                        <Divider sx={{ mb: 2 }} />
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Name of Guarantor"
                                                    variant="outlined"
                                                    name="guarantorName"
                                                    value={formValues.guarantorName}
                                                    onChange={handleInputChange}
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Relation to Borrower"
                                                    variant="outlined"
                                                    name="guarantorRelation"
                                                    value={formValues.guarantorRelation}
                                                    onChange={handleInputChange}
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Source of Income"
                                                    variant="outlined"
                                                    value={formValues.sourceOfIncome}
                                                    required
                                                    name="sourceOfIncome"
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
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
                        You have an existing loan yet to be paid in full to unlock this priviledge. You can do it!
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

export default RegularLoanApplication;