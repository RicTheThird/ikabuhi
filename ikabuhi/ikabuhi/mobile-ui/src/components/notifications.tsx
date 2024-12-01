import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
    useTheme,
    useMediaQuery,
    IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getNotifications, readNotification } from '../services/apiService';
import { NotificationX } from '../services/interfaces';
import dayjs from 'dayjs';

const NotificationComponent = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [notifications, setNotifications] = useState<NotificationX[]>([]);
    useEffect(() => {
        getNotifs()
    }, []);

    const getNotifs = async () => {
        const response = await getNotifications();
        setNotifications(response ?? [])
    }

    const markAsRead = async (id: string) => {
        await readNotification(id);
        getNotifs();
    }

    // const notifications = [
    //     {
    //         date: "Yesterday at 10:43 AM",
    //         message:
    //             "Hi MARITES! U1750516, PHP 50.00 is deposited to your savings on 03/14/2024. Your Loan Balance in LifeBank is 5,250.00. Thank you.",
    //     },
    //     {
    //         date: "March 14, 2024 at 11:08 AM",
    //         message:
    //             "Hi MARITES! U1750516, PHP 1,750.00 is paid to your loan in CASH on 03/14/2024. Your Loan Balance in LifeBank is 5,250.00. Thank you.",
    //     },
    //     {
    //         date: "April 12, 2024 at 11:15 AM",
    //         message:
    //             "Hi MARITES! U1750516, Your request in Withdrawal has been approved by your creditor.",
    //     },
    //     {
    //         date: "Yesterday at 10:43 AM",
    //         message:
    //             "Hi MARITES! U1750516, PHP 50.00 is deposited to your savings on 03/14/2024. Your Loan Balance in LifeBank is 5,250.00. Thank you.",
    //     },
    // ];

    return (
        <Box sx={{
            padding: 2,
            paddingTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f8f4f4',
            minHeight: '100vh',
        }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: '#002855',
                    padding: 2,
                }}
            >
                <IconButton onClick={() => navigate('/home')}>
                    <ArrowBackIcon sx={{ color: '#ff8c00' }} />
                </IconButton>
                <Typography variant="h5" sx={{ color: '#ff8c00', textAlign: 'left' }}>
                    Your Notifications
                </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
                <> {notifications && notifications.length > 0 ? <span>Recent</span> : <span>You don't have notifications</span>} </>
            </Typography>

            {notifications && notifications.map((notification, index) => (
                <Card variant="outlined" sx={{ mb: 2 }} key={index}>
                    <CardContent>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                            {dayjs(notification.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                        </Typography>
                        <Typography variant="body1">{notification.message}</Typography>
                    </CardContent>
                    {!notification.isSeen && <Box sx={{ width: "100%", textAlign: "center", mb: 1 }}>
                        <Button
                            variant="contained"
                            sx={{ textAlign: "center" }}
                            size='small'
                            onClick={() => markAsRead(notification.id)}
                            >
                            Mark as Read
                        </Button>
                    </Box>}
                </Card>
            ))}
        </Box>
    );
};

export default NotificationComponent;