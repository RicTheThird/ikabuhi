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
import { Member, MemberLoans } from '../services/interfaces';
import { getImageLink, getMemberById } from '../services/apiService';
import { DAYS } from '../constants';
import dayjs from 'dayjs';

const MemberInformationCard = () => {
    const [member, setMember] = useState<Member>();
    const [activeLoan, setActiveLoan] = useState<MemberLoans>();
    const theme = useTheme();

    const { memberId } = useParams();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        getMemberDetails()
    }, []);

    const getMemberDetails = async () => {
        const response: Member = await getMemberById(memberId ?? '');
        setMember(response);
        setActiveLoan(response?.memberLoans?.find(f => f.status === 'Approved'));
    }

    // const getDp = (): string => {

    // }


    return (
        <Box sx={{ padding: isMobile ? 2 : 4, maxWidth: 800, margin: 'auto' }}>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={getImageLink(member?.photoBlobName ?? '')}>
                                <PersonIcon sx={{ fontSize: 60 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                {member?.accountNo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant="h6" gutterBottom>
                                <strong>Member's Information</strong>
                            </Typography>
                            <Typography>{member?.firstName} {member?.lastName}</Typography>
                            <Typography>{member?.civilStatus}</Typography>
                            <Typography>{member?.occupation}</Typography>
                            <Typography>{member?.brgy} {member?.municipality} Batangas</Typography>
                            {/* <Typography>{member?.</Typography> */}
                        </Grid>
                    </Grid>
                </CardContent>
                {/* <CardActions sx={{ textAlign: "center", width: "100%" }}>
                    <Button variant="contained" color="warning">
                        View
                    </Button>
                </CardActions> */}
            </Card>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="subtitle1">
                        Group: <strong>{member?.group.name}</strong>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Meeting: <strong>{DAYS[member?.group?.meetingDay ?? 0]} : {member?.group?.meetingTime}</strong>
                    </Typography>
                    {/* <Typography>Minimum Weekly Savings/CBU: 50.00</Typography> */}
                    <Typography>Date of Membership: {dayjs(member?.createdAt).format('YYYY-MM-DD')}</Typography>
                    <Typography>Branch: Tanauan</Typography>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6"><strong>Loan Information</strong></Typography>
                    {activeLoan && <>
                        <Typography>Loan Cycle: {activeLoan?.cycle}</Typography>
                        <Typography>Loan Term: {activeLoan?.productLoan?.name}</Typography>
                        <Typography>Loan Amount: {activeLoan?.totalLoanAmount?.toFixed(2) ?? 0}</Typography>
                        <Typography>Loan Balance: {activeLoan?.loanBalance?.toFixed(2) ?? 0}</Typography>
                    </>
                    }
                    {!activeLoan && <Typography>No active loan</Typography>}
                </CardContent>

            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6"><strong>Guarantor's Information</strong></Typography>
                    <Typography>Name of Guarantor: {activeLoan?.guarantorName}</Typography>
                    <Typography>Relation to Borrower: {activeLoan?.guarantorRelation}</Typography>
                    <Typography>Source of Income: {activeLoan?.sourceOfIncome}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default MemberInformationCard;