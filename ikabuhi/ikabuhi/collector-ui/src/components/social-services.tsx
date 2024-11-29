import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button, Grid, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, Select } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { getPendingSocialServices, updateSocialStatus } from '../services/apiService';
import { SocialService } from '../services/interfaces';

interface Props {
    open: boolean;
    handleClose: any;
    socialService: SocialService | undefined;
}

const ScholarshipApplicationModal = ({ open, handleClose, socialService }: Props) => {

    const handleUpdate = async (id: string | undefined, status: string) => {
        try {
            const response: any = await updateSocialStatus(id ?? '', status)
            if (response.status === 204) {
                handleClose()
            } else {
                alert("Request failed. Please try again later.")
            }
        } catch (error) {
            console.log(error)
            alert("Request failed. Please try again later.")
        } finally {
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Scholarship Application Form</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Applicant Information Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            I. APPLICANT INFORMATION
                        </Typography>
                        <TextField fullWidth value={socialService?.schLastName} label="Last Name" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schFirstName} label="First Name" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schMidName} label="Middle Name" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schGender} label="Gender" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schContact} label="Contact No." variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schAddress} label="Address" variant="outlined" sx={{ mb: 2 }} aria-readonly/>

                        <Typography variant="subtitle1" gutterBottom>
                            Guardian Information
                        </Typography>
                        <TextField fullWidth value={socialService?.schGuardianName} label="Full Name" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schRelationGuardian} label="Relationship" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schAddress} label="Address" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                    </Grid>

                    {/* Academic Information Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            II. ACADEMIC INFORMATION
                        </Typography>

                        <TextField fullWidth value={socialService?.schLevelStudy} label="Current Level of Study" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schSchoolName} label="School Name" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schYearLevel} label="Grade/Year Level" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField fullWidth value={socialService?.schGrade} label="Latest GWA" variant="outlined" sx={{ mb: 2 }} aria-readonly/>

                        <Typography variant="subtitle1" gutterBottom>
                            Reason for Applying
                        </Typography>
                        <TextField
                            fullWidth
                            value={socialService?.hltReasonApply}
                            label="Why are you applying for this scholarship on behalf of your child?"
                            multiline
                            rows={3}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                        <TextField
                            fullWidth
                            value={socialService?.schHelpReason}
                            label="How will this scholarship help your child achieve their educational and future career goals?"
                            multiline
                            rows={3}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                    </Grid>

                    {/* Recommendation and Commitment Section */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            III. RECOMMENDATION AND COMMITMENT
                        </Typography>
                        <TextField
                            fullWidth

                            value={socialService?.schContainRecommendation}
                            label="Do you have a letter of recommendation from a teacher, counselor, or community leader for your child?"
                            multiline
                            rows={3}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                        {/* <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel>
                                Do you have a letter of recommendation from a teacher, counselor, or community leader for your child?
                            </InputLabel>
                            <Select label="Recommendation Letter">
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{ mb: 2 }}>
                            <IconButton color="primary" component="span">
                                Upload image/file
                            </IconButton>
                        </Box> */}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="warning">
                    Close
                </Button>
                <Button onClick={() => handleUpdate(socialService?.id, 'Approved')} variant="contained" color="success">
                    Approve
                </Button>
                <Button onClick={() => handleUpdate(socialService?.id, 'Declined')} variant="contained" color="error">
                    Decline
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const HealthProgramModal = ({ open, handleClose, socialService }: Props) => {
    const handleUpdate = async (id: string | undefined, status: string) => {
        try {
            const response: any = await updateSocialStatus(id ?? '', status)
            if (response.status === 204) {
                handleClose()
            } else {
                alert("Request failed. Please try again later.")
            }
        } catch (error) {
            console.log(error)
            alert("Request failed. Please try again later.")
        } finally {
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Health Program Enrollment Form</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Academic Information Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            I. HEALTH INFORMATION
                        </Typography>

                        <TextField fullWidth value={socialService?.hltBoolExistCondition ? 'Yes' : 'No'} label="Do you have any existing medical conditions?" variant="outlined" sx={{ mb: 1 }} aria-readonly />
                        <TextField fullWidth value={socialService?.hltExistCondition} label="If Yes, please specify" variant="outlined" sx={{ mb: 2 }} aria-readonly />

                        <TextField fullWidth value={socialService?.hltBoolMedication ? 'Yes' : 'No'} label="Are you currently taking any medication?" variant="outlined" sx={{ mb: 1 }} aria-readonly />
                        <TextField fullWidth value={socialService?.hltMedication} label="If Yes, please specify" variant="outlined" sx={{ mb: 2 }} aria-readonly />

                        <TextField fullWidth value={socialService?.hltBoolAllergies ? 'Yes' : 'No'} label="Do you have any allergies?" variant="outlined" sx={{ mb: 1 }} aria-readonly />
                        <TextField fullWidth value={socialService?.hltAllergies} label="If Yes, please specify" variant="outlined" sx={{ mb: 2 }} aria-readonly />

                        <TextField fullWidth value={socialService?.hltBoolHealthCare ? 'Yes' : 'No'} label="Do you have a primary healthcare provider?" variant="outlined" sx={{ mb: 1 }} aria-readonly />
                        <TextField fullWidth value={socialService?.hltHealthCare} label="If Yes, please specify" variant="outlined" sx={{ mb: 2 }} aria-readonly />

                        <Typography variant="subtitle1" gutterBottom>
                            Health Program Enrollment
                        </Typography>
                        <TextField
                            fullWidth
                            value={socialService?.hltReasonApply}
                            label="Why are you applying for this health program?"
                            multiline
                            rows={3}
                            variant="outlined"
                            aria-readonly
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            value={socialService?.hltSupport}
                            label="What kind of support are you expecting from this health program?"
                            multiline
                            rows={3}
                            variant="outlined"
                            aria-readonly
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    {/* Emergency Contact Information Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            II. EMERGENCY CONTACT INFORMATION
                        </Typography>
                        <TextField value={socialService?.hltEmergencyContact} fullWidth label="Full Name of Emergency Contact" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField value={socialService?.hltRelationship} fullWidth label="Relationship to Member" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField value={socialService?.hltContact} fullWidth label="Contact Number" variant="outlined" sx={{ mb: 2 }} aria-readonly/>

                        <Typography variant="subtitle1" gutterBottom>
                            Insurance Information
                        </Typography>

                        <TextField value={socialService?.hltBoolInsurance ? 'Yes' : 'No'} fullWidth label="Do you have health insurance coverage?" variant="outlined" sx={{ mb: 1 }} aria-readonly/>
                        <TextField value={socialService?.hltInsurance} fullWidth label="If Yes, please specify" variant="outlined" sx={{ mb: 2 }} aria-readonly/>


                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="warning">
                    Close
                </Button>
                <Button onClick={() => handleUpdate(socialService?.id, 'Approved')} variant="contained" color="success">
                    Approve
                </Button>
                <Button onClick={() => handleUpdate(socialService?.id, 'Declined')} variant="contained" color="error">
                    Decline
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const LivelihoodProgramModal = ({ open, handleClose, socialService }: Props) => {
    const handleUpdate = async (id: string | undefined, status: string) => {
        try {
            const response: any = await updateSocialStatus(id ?? '', status)
            if (response.status === 204) {
                handleClose()
            } else {
                alert("Request failed. Please try again later.")
            }
        } catch (error) {
            console.log(error)
            alert("Request failed. Please try again later.")
        } finally {
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Program Expectation and Support Form</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Business Information Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            I. BUSINESS INFORMATION
                        </Typography>
                        <TextField value={socialService?.livOwnABusiness ? 'Yes' : 'No'} fullWidth label="Do you Currently own a Business?" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField value={socialService?.livBizName} fullWidth label="Business Name" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField value={socialService?.livBizType} fullWidth label="Type of Business" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField value={socialService?.livNoOfEmployee} fullWidth label="No. of Employee" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField value={socialService?.livYearsOperated} fullWidth label="Years In Operation" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField
                            value={socialService?.livTypeOFBizToStart}
                            fullWidth
                            label="If you do not own a business, what type of business would you like to start?"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />

                        <Typography variant="subtitle1" gutterBottom>
                            Training Goals
                        </Typography>
                        <TextField
                            value={socialService?.livInterestReason}
                            fullWidth
                            label="Why are you interested in this livelihood training program?"
                            multiline
                            rows={3}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                        <TextField
                            value={socialService?.livSkillsGain}
                            fullWidth
                            label="What skills or knowledge do you hope to gain from this program?"
                            multiline
                            rows={3}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                    </Grid>

                    {/* Program Expectation and Support Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            II. PROGRAM EXPECTATION AND SUPPORT
                        </Typography>
                        <TextField
                            value={socialService?.livHavePriorTraining ? 'Yes' : 'No'}
                            fullWidth
                            label="Do you have any prior training or experience related to the type of business you're interested in?"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                        <TextField fullWidth label="If Yes, please specify" variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                        <TextField
                            value={socialService?.livKnowledgePlan}
                            fullWidth
                            label="How do you plan to apply the knowledge and skills gained from the training?"
                            multiline
                            rows={3}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />

                        <Typography variant="subtitle1" gutterBottom>
                            Financial Support
                        </Typography>
                        <TextField
                            fullWidth
                            value={socialService?.livRequireFinanceSupport ? 'Yes' : 'No'}
                            label="Will you require financial support to start or grow your business after the training?"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            aria-readonly
                        />
                        <TextField value={socialService?.livSupportType} 
                            fullWidth label="If Yes, what type of support are you looking for?" 
                            variant="outlined" sx={{ mb: 2 }} aria-readonly/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="warning">
                    Close
                </Button>
                <Button onClick={() => handleUpdate(socialService?.id, 'Approved')} variant="contained" color="success">
                    Approve
                </Button>
                <Button onClick={() => handleUpdate(socialService?.id, 'Declined')} variant="contained" color="error">
                    Decline
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const SocialServicesApplication = () => {
    const [pendingSocialServices, setPendingSocialServices] = useState<SocialService[]>();
    const [selectedSS, setSelectedSS] = useState<SocialService>();
    const [openLivProgram, setOpenLivProgram] = useState(false);
    const [openHealthProgram, setOpenHealthProgram] = useState(false);
    const [openScholarProgram, setOpenScholarProgram] = useState(false);

    const getPendingSS = async () => {
        const response: SocialService[] = await getPendingSocialServices();
        setPendingSocialServices(response);
    }

    const handleCloseSSDetails = () => {
        getPendingSS()
        setOpenLivProgram(false);
        setOpenHealthProgram(false);
        setOpenScholarProgram(false);
    };


    useEffect(() => {
        getPendingSS()
    }, []);

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
            <Box mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Pending Social Services Program Application
                </Typography>
            </Box>
            {/* <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField label="Group" variant="outlined" select sx={{ width: '20%' }}>
                    <MenuItem value="Good Girls">Good Girls</MenuItem>
                </TextField>
                <TextField label="Type of Loan" variant="outlined" select sx={{ width: '20%' }}>
                    <MenuItem value="Regular Project Loan">Regular Project Loan</MenuItem>
                </TextField>
            </Box> */}
            <Grid container spacing={3}>
                {pendingSocialServices && pendingSocialServices.map((ss, index) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                                    {ss.member?.firstName} {ss.member?.lastName}
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 'bold' }} gutterBottom>
                                    Group: {ss.member?.group?.name} | Account: {ss?.member?.accountNo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Applied for {ss.type} Program
                                </Typography>
                                <Box mt={2}>
                                    <Button variant="contained" color="primary" startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}
                                        onClick={() => {
                                            setSelectedSS(ss);
                                            if (ss.type === 'Scholarship') {
                                                setOpenScholarProgram(true)
                                            } else if (ss.type === 'Health') {
                                                setOpenHealthProgram(true)
                                            } else {
                                                setOpenLivProgram(true);
                                            }
                                        }}>
                                        View Applications Form
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <LivelihoodProgramModal open={openLivProgram} handleClose={handleCloseSSDetails} socialService={selectedSS} />
            <ScholarshipApplicationModal open={openScholarProgram} handleClose={handleCloseSSDetails} socialService={selectedSS} />
            <HealthProgramModal open={openHealthProgram} handleClose={handleCloseSSDetails} socialService={selectedSS} />
        </Box>
    );
};

export default SocialServicesApplication;