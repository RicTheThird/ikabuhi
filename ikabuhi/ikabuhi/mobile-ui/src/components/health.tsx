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
    RadioGroup,
    Radio,
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
    isActive: true,
    status: 'Pending',
    type: 'Health'
};

const HealthApplication: React.FC = () => {
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
        const response: Member = await getMyDetails();
        setMyDetails(response)
        if (response.payments && response.payments.length > 0) {
            const cscore = response.payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0);
            if (cscore < 190) {
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
                    Healthcare Program
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
                                        II. Health Condition
                                    </Typography>

                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Do you have any existing medical conditions?</Typography>
                                            <RadioGroup row
                                                value={formValues.hltBoolExistCondition}
                                                name="hltBoolExistCondition"
                                                onChange={handleInputChange}>
                                                <FormControlLabel required value={true} control={<Radio />} label="Yes" />
                                                <FormControlLabel required value={false} control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <TextField value={formValues.hltExistCondition}
                                                name="hltExistCondition"
                                                onChange={handleInputChange}
                                                fullWidth label="If Yes, please specify:" variant="outlined" sx={{ mt: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Are you currently taking any medication?</Typography>
                                            <RadioGroup row
                                                value={formValues.hltBoolMedication}
                                                name="hltBoolMedication"
                                                onChange={handleInputChange}
                                            >
                                                <FormControlLabel required value={true} control={<Radio />} label="Yes" />
                                                <FormControlLabel required value={false} control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <TextField
                                                value={formValues.hltMedication}
                                                name="hltMedication"
                                                onChange={handleInputChange}
                                                fullWidth label="If Yes, please specify:" variant="outlined" sx={{ mt: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Do you have any allergies?</Typography>
                                            <RadioGroup row
                                                value={formValues.hltBoolAllergies}
                                                name="hltBoolAllergies"
                                                onChange={handleInputChange}>
                                                <FormControlLabel required value={true} control={<Radio />} label="Yes" />
                                                <FormControlLabel required value={false} control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <TextField fullWidth
                                                value={formValues.hltAllergies}
                                                name="hltAllergies"
                                                onChange={handleInputChange}
                                                label="If Yes, please specify:" variant="outlined" sx={{ mt: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Do you have a primary healthcare provider?</Typography>
                                            <RadioGroup row
                                                value={formValues.hltBoolHealthCare}
                                                name="hltBoolHealthCare"
                                                onChange={handleInputChange}>
                                                <FormControlLabel required value={true} control={<Radio />} label="Yes" />
                                                <FormControlLabel required value={false} control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <TextField fullWidth
                                                value={formValues.hltHealthCare}
                                                name="hltHealthCare"
                                                onChange={handleInputChange}
                                                label="If Yes, please specify:" variant="outlined" sx={{ mt: 1 }} />
                                        </Grid>
                                    </Grid>

                                    <Typography variant="subtitle1" gutterBottom>
                                        Health Program Enrollment
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        label="Why are you applying for this health program?"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        required
                                        value={formValues.hltReasonApply}
                                        name="hltReasonApply"
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="What kind of support are you expecting from this health program?"
                                        multiline
                                        rows={3}
                                        required
                                        value={formValues.hltSupport}
                                        name="hltSupport"
                                        onChange={handleInputChange}
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
                                        III. EMERGENCY CONTACT INFORMATION
                                    </Typography>

                                    <TextField fullWidth label="Full Name of Emergency Contact"
                                        required
                                        value={formValues.hltEmergencyContact}
                                        name="hltEmergencyContact"
                                        onChange={handleInputChange} variant="outlined" sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Relationship to Member"
                                        required
                                        value={formValues.hltRelationship}
                                        name="hltRelationship"
                                        onChange={handleInputChange}
                                        variant="outlined" sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Contact Number"
                                        required
                                        value={formValues.hltContact}
                                        name="hltContact"
                                        onChange={handleInputChange}
                                        variant="outlined" sx={{ mb: 2 }} />

                                    <Typography variant="subtitle1" gutterBottom>
                                        Insurance Information
                                    </Typography>

                                    <Typography>Do you have health insurance coverage?</Typography>
                                    <RadioGroup row value={formValues.hltBoolInsurance}
                                        name="hltBoolInsurance"
                                        onChange={handleInputChange}>
                                        <FormControlLabel required value={true} control={<Radio />} label="Yes" />
                                        <FormControlLabel required value={false} control={<Radio />} label="No" />
                                    </RadioGroup>
                                    <TextField fullWidth label="If Yes, please specify:"
                                        value={formValues.hltInsurance}
                                        name="hltInsurance"
                                        onChange={handleInputChange} variant="outlined" sx={{ mt: 1, mb: 2 }} />

                                    <FormControlLabel
                                        required
                                        control={<Checkbox />}
                                        label="I hereby declare that the information provided in this application is accurate and complete to the best of my knowledge. I understand that providing false information may result in the denial of my enrollment in the health program."
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
                    You need at least <b>190 credit points</b> to unlock this priviledge.  You can do it!
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

export default HealthApplication;