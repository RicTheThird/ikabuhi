import React from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    IconButton,
    Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const LoanSelection = () => {

    const navigate = useNavigate();
    const loans = [
        {
            title: "Regular Project Loan 1",
            icon: "💰", // Replace with actual icon if available
            description: "Apply for a project loan",
            route: '/regular-loan'
        },
        {
            title: "Business Loan",
            icon: "🤝", // Replace with actual icon if available
            description: "Apply for a business loan",
            route: '/biz-loan'
        },
        {
            title: "Wash Loan",
            icon: "🚰", // Replace with actual icon if available
            description: "Apply for a wash loan",
            route: '/wash-loan'
        },
    ];

    return (
        // <Box
        //   sx={{
        //     p: 2,
        //     backgroundColor: "#f5f5f5",
        //     minHeight: "100vh",
        //   }}
        // >
        //   {/* Back button */}
        //   <IconButton
        //     sx={{ mb: 2 }}
        //     onClick={() => {
        //       console.log("Back button clicked");
        //     }}
        //   >
        //     <ArrowBackIcon />
        //   </IconButton>

        //   {/* Title */}
        //   <Typography
        //     variant="h5"
        //     sx={{
        //       textAlign: "center",
        //       color: "#FF6F00",
        //       fontWeight: "bold",
        //       mb: 2,
        //     }}
        //   >
        //     What Loan are you Applying?
        //   </Typography>



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
                    What Loan are you Applying?
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
        </Box>
    );
};

export default LoanSelection;