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

const SSSelection = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const loans = [
        {
            title: "Business Development Program",
            icon: "💰", // Replace with actual icon if available
            description: "Apply for a Livelihood Training",
            route: '/livelihood'
        },
        {
            title: "Education Scholarship Program (ESP)",
            icon: "🤝", // Replace with actual icon if available
            description: "SAC (Sports, Arts and Culture), LYLP (Life-Youth Leadership Program)",
            route: '/scholarship'
        },
        {
            title: "Health",
            icon: "🚰", // Replace with actual icon if available
            description: "Health and Disaster Risk Reduction, Community Health and Safety Advocacy",
            route: '/health'
        },
    ];

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setOpen(true)
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
                    Social Services Application
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
                        You need <b>credit points</b> to apply for Business Development Program. You can do it!
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

export default SSSelection;