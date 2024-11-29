import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Avatar,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useParams } from 'react-router-dom';
import { Member } from '../services/interfaces';
import { getMemberById } from '../services/apiService';

const MemberInformationCard = () => {
    const [member, setMember] = useState<Member>();
    const theme = useTheme();

    const { memberId } = useParams();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        getMemberDetails()
    }, []);

    const getMemberDetails = async () => {
        const response: Member = await getMemberById(memberId ?? '');
        setMember(response);
    }


    return (
        <Box sx={{ padding: isMobile ? 2 : 4, maxWidth: 800, margin: 'auto' }}>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
                                <PersonIcon sx={{ fontSize: 60 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                {member?.accountNo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant="h6" gutterBottom>
                                Member's Information
                            </Typography>
                            <Typography>{member?.firstName} {member?.lastName}</Typography>
                            <Typography>{member?.civilStatus}</Typography>
                            <Typography>{member?.occupation}</Typography>
                            <Typography>{member?.brgy} {member?.municipality} Batangas</Typography>
                            {/* <Typography>{member?.</Typography> */}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        Meeting Time: <strong>Thursday/8:00am</strong>
                    </Typography>
                    <Typography>Minimum Weekly Savings/CBU: 50.00</Typography>
                    <Typography>Date of Membership: Jan 12, 2011</Typography>
                    <Typography>Branch: Tanauan</Typography>
                    <Typography>Name of Collector: Ivan Dimayuga</Typography>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6">Loan Information</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="warning">
                        View
                    </Button>
                </CardActions>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">Guarantor's Information</Typography>
                    <Typography>Loan Cycle of Borrower: 35th Cycle</Typography>
                    <Typography>Name of Guarantor: Sheila Nicole Canobas</Typography>
                    <Typography>Relation to Borrower: Daughter</Typography>
                    <Typography>Contact No.: 09065800051</Typography>
                    <Typography>Source of Income: Employed</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="warning">
                        View
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default MemberInformationCard;