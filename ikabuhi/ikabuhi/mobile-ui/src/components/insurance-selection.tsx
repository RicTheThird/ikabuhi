import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    IconButton,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { getMyDetails } from "../services/apiService";
import { Member } from "../services/interfaces";

const InsuranceSelection = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [myDetails, setMyDetails] = useState<Member>();
    const loans = [
        {
            title: "Micro Insurance",
            icon: "💰", // Replace with actual icon if available
            description: "An affordable insurance product that we offer for " +
                "members and their households. This services as safety " +
                "net that aims to ease family financial burdens when " +
                "events such as death, injury, or catastrophes affect our " +
                "members.",
            route: '/micro-insurance'
        },
        {
            title: "Loan Insurance",
            icon: "🤝", // Replace with actual icon if available
            description: "A single premium payment product that provides " +
                "financial cover for the family and co-borrowers of a " +
                "member, in the case of untimely demise of the " +
                "principal borrower.",
            route: '/loan-insurance'
        }
    ];

    const handleClose = () => {
        setOpen(false)
        navigate('/home')
    }

    const getMyDetailsAsync = async () => {
        const response: Member = await getMyDetails();
        setMyDetails(response)
        if (response.payments && response.payments.length > 0) {
            const cscore = response.payments.reduce((acc, curr) => acc + curr.creditPointsGained, 0);
            if (cscore < 150) {
                setOpen(true)
            }
        }
        else
            setOpen(true)
    }

    useEffect(() => {
        getMyDetailsAsync()
    }, []);

    return (
        <Box
            sx={{
                padding: 2,
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f8f4f4",
                minHeight: "100vh",
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    mb: 2,
                    backgroundColor: "#002855",
                    padding: 2,
                }}
            >
                <IconButton onClick={() => navigate('/home')}>
                    <ArrowBackIcon sx={{ color: "#ff8c00" }} />
                </IconButton>
                <Typography variant="h5" sx={{ color: "#ff8c00", textAlign: "left" }}>
                    Insurance Applications
                </Typography>
            </Box>


            <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
                {/* Loan Options */}
                {loans.map((loan, index) => (
                    <Grid item xs={12}>
                        <Card
                            key={index}
                            sx={{
                                mb: 2,
                                boxShadow: 3,
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* Loan Info */}
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {loan.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "gray" }}>
                                        {loan.description}
                                    </Typography>
                                </Box>

                                {/* Icon */}
                                <Box
                                    sx={{
                                        fontSize: "2rem",
                                        color: "#FF6F00",
                                    }}
                                >
                                    {loan.icon}
                                </Box>
                            </CardContent>

                            {/* Apply Button */}
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "#002D72",
                                    color: "#fff",
                                    borderRadius: 0,
                                    py: 1.5,
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#001A4E",
                                    },
                                }}
                                onClick={() => navigate(loan.route)}
                            >
                                Apply
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* <Dialog open={open} onClose={handleClose}>
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
                        You need at least <b>150 credit points</b> to unlock this priviledge. You can do it!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
};

export default InsuranceSelection;