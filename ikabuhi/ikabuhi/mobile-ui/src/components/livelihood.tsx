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
import { getMyDetails, getProductLoans, postMemberLoan, postSocialService } from "../services/apiService";
import dayjs from "dayjs";

const defaultFormValues = {
    livOwnABusiness: undefined,
    livBizName: '',
    livBizType: '',
    livNoOfEmployee: undefined,
    livYearsOperated: undefined,
    livTypeOfBizToStart: '',
    livInterestReason: '',
    livSkillsGain: '',
    livHavePriorTraining: undefined,
    livPriorTraining: '',
    livKnowledgePlan: '',
    livRequireFinanceSupport: undefined,
    livSupportType: '',
    schLastName: '',
    schFirstName: '',
    schMidName: '',
    schGender: '',
    schContact: '',
    schAddress: '',
    schGuardianName: '',
    schRelationGuardian: '',
    schGuardianAddress: '',
    schLevelStudy: '',
    schSchoolName: '',
    schYearLevel: '',
    schGrade: '',
    schReason: '',
    schHelpReason: '',
    schContainRecommendation: '',
    schRecommendationFileName: '',
    hltBoolExistCondition: undefined,
    hltExistCondition: '',
    hltBoolMedication: undefined,
    hltMedication: '',
    hltBoolAllergies: undefined,
    hltAllergies: '',
    hltBoolHealthCare: undefined,
    hltHealthCare: '',
    hltReasonApply: '',
    hltSupport: '',
    hltEmergencyContact: '',
    hltRelationship: '',
    hltContact: '',
    hltBoolInsurance: undefined,
    hltInsurance: '',
    isActive: undefined,
    status: 'Pending',
    type: 'Livelihood'
};

const LivelihoodApplication: React.FC = () => {
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


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.type)
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        });
    }

    const handleClose = () => {
        setOpen(false)
        navigate('/social-services')
    }

    const getProductLoansAsync = async () => {
        const response = await getProductLoans();
        setProductLoans(response)
    }

    const getMyDetailsAsync = async () => {
        const response : Member = await getMyDetails();
        setMyDetails(response)
        if (response.payments && response.payments.length > 0) {
            const cscore = response.payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0);
            if (cscore < 210) {
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
        console.log(formValues)
        setLoading(true)
        try {
            const response: any = await postSocialService(formValues)
            if (response.status === 200) {
                setAlert({ success: true, message: "Application submitted. Approval may take 2-3 business days" });
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
                    onClick={() => navigate('/social-services')}>

                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff8c00" }}>
                    Livelihood Training Program
                </Typography>
                <Typography variant="body2">
                    IKABUHI PROGRAM Social Services Application
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
                                        required
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
                                    <Typography variant="h6" gutterBottom>
                                        II. BUSINESS INFORMATION
                                    </Typography>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            select
                                            value={formValues.livOwnABusiness}
                                            name="livOwnABusiness"
                                            onChange={handleInputChange}
                                            label="Do you Currently own a Business?">
                                            <MenuItem value={"true"}>Yes</MenuItem>
                                            <MenuItem value={"false"}>No</MenuItem>
                                        </TextField>
                                    </FormControl>

                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Business Name"
                                                required
                                                value={formValues.livBizName}
                                                name="livBizName"
                                                onChange={handleInputChange}
                                                variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Type of Business"
                                                required
                                                value={formValues.livBizType}
                                                name="livBizType"
                                                onChange={handleInputChange}
                                                variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="No. of Employee"
                                                required
                                                type="number"
                                                value={formValues.livNoOfEmployee}
                                                name="livNoOfEmployee"
                                                onChange={handleInputChange}
                                                variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Years In Operation"
                                                required
                                                type="number"
                                                value={formValues.livYearsOperated}
                                                name="livYearsOperated"
                                                onChange={handleInputChange}
                                                variant="outlined" />
                                        </Grid>
                                    </Grid>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <TextField
                                            select
                                            required
                                            value={formValues.livTypeOfBizToStart}
                                            name="livTypeOfBizToStart"
                                            onChange={handleInputChange}
                                            label="If you do not own a business, what type of business would you like to start?">
                                            <MenuItem value="retail">Retail</MenuItem>
                                            <MenuItem value="service">Service</MenuItem>
                                            <MenuItem value="manufacturing">Manufacturing</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </TextField>
                                    </FormControl>

                                    <Typography variant="subtitle1" gutterBottom>
                                        Training Goals
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        label="Why are you interested in this livelihood training program?"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        required
                                        value={formValues.livInterestReason}
                                        name="livInterestReason"
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="What skills or knowledge do you hope to gain from this program?"
                                        multiline
                                        required
                                        value={formValues.livSkillsGain}
                                        name="livSkillsGain"
                                        onChange={handleInputChange}
                                        rows={3}
                                        variant="outlined"
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
                                        III. PROGRAM EXPECTATION AND SUPPORT
                                    </Typography>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <TextField
                                            select
                                            required
                                            value={formValues.livHavePriorTraining}
                                            name="livHavePriorTraining"
                                            onChange={handleInputChange}
                                            label="Do you have any prior training or experience related to the type of business you're interested in?">
                                            <MenuItem value={"true"}>Yes</MenuItem>
                                            <MenuItem value={"false"}>No</MenuItem>
                                        </TextField>
                                    </FormControl>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <TextField
                                            label="If Yes, please specify"
                                            required
                                            value={formValues.livPriorTraining}
                                            name="livPriorTraining"
                                            onChange={handleInputChange}>
                                            <MenuItem value="training">Training</MenuItem>
                                            <MenuItem value="experience">Experience</MenuItem>
                                        </TextField>
                                    </FormControl>

                                    <TextField
                                        required
                                        value={formValues.livKnowledgePlan}
                                        name="livKnowledgePlan"
                                        onChange={handleInputChange}
                                        fullWidth
                                        label="How do you plan to apply the knowledge and skills gained from the training?"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />

                                    <Typography variant="subtitle1" gutterBottom>
                                        Financial Support
                                    </Typography>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <TextField
                                            select
                                            required
                                            value={formValues.livRequireFinanceSupport}
                                            name="livRequireFinanceSupport"
                                            onChange={handleInputChange}
                                            label="Will you require financial support to start or grow your business after the training?">
                                            <MenuItem value="true">Yes</MenuItem>
                                            <MenuItem value="false">No</MenuItem>
                                        </TextField>
                                    </FormControl>

                                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                        <TextField
                                            select
                                            required
                                            value={formValues.livSupportType}
                                            name="livSupportType"
                                            onChange={handleInputChange}
                                            label="If Yes, what type of support are you looking for?">
                                            <MenuItem value="loan">Loan</MenuItem>
                                            <MenuItem value="grant">Grant</MenuItem>
                                            <MenuItem value="mentorship">Mentorship</MenuItem>
                                        </TextField>
                                    </FormControl>

                                    <FormControlLabel
                                        required
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
                    You need at least <b>210 credit points</b> to unlock this priviledge.  You can do it!
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

export default LivelihoodApplication;