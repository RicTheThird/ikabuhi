import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button, Grid, Alert, Snackbar } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { SnackbarAlert, Transaction } from '../services/interfaces';
import { downloadECashReceipt, getDashboardNumbers, getPendingECashPayments, putTransaction } from '../services/apiService';

const data = [
    { label: 'MEMBERS', value: '1072' },
    { label: 'GROUPS', value: '64' },
    { label: 'STAFFS', value: '5' },
    { label: 'WITHDRAWALS', value: '3,170,670.00' },
    { label: 'SAVINGS', value: '7,500,100.00' },
    { label: 'LOAN DISBURSEMENT', value: '15,700,670.00' },
  ];


const DashboardComponent = () => {

    const [dashboard, setDashboard] = useState<any>();
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState<SnackbarAlert>();


    useEffect(() => {
        getDashboardDetails()
    }, []);

    const getDashboardDetails = async () => {
        const response = await getDashboardNumbers();
        setDashboard(response)
    }

    
    
    return (
        <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
            <Box mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Dashboard
                </Typography>
            </Box>
            
            <Grid container spacing={4}>
                {dashboard && Object.keys(dashboard).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                padding: 2,
                                backgroundColor: '#F8B26A',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {dashboard[item]}
                                </Typography>
                                <Typography variant="h6">
                                    {item.toUpperCase()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
        </Box>
    );
};

export default DashboardComponent;
