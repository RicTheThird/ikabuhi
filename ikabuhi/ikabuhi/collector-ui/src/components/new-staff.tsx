import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Avatar,
    useTheme,
    useMediaQuery,
    IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { registerCollector } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const NewStaffForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        address: '',
        contactNo: '',
        branch: 'Tanauan',
        username: '',
        passwordRaw: '',
        role: 'collector',
        profileImage: null,
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: any) => {
        setFormData({
            ...formData,
            profileImage: e.target.files[0],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response: any = await registerCollector(formData)
            if (response.status === 200) {
                alert("Registration successful!")
                navigate(`/home/all-staff`)
            } else {
                alert("Failed to register. Please try again later.")
            }
        } catch (error) {
            console.log(error)
            alert("Failed to register. Please try again later.")
        }
    };

    return (
        <Box sx={{ padding: isMobile ? 2 : 4, maxWidth: 1000, margin: 'auto' }}>
            <Box mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Add New Staff
                </Typography>
            </Box>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        variant="outlined"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Middle Name"
                                        name="middleName"
                                        variant="outlined"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        variant="outlined"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Contact No."
                                        name="contactNo"
                                        variant="outlined"
                                        required
                                        value={formData.contactNo}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Branch"
                                        name="branch"
                                        variant="outlined"
                                        aria-readonly
                                        disabled
                                        value={formData.branch}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : ''}>
                                {!formData.profileImage && <PersonAddIcon sx={{ fontSize: 60 }} />}
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Add Profile Picture
                            </Typography>
                            <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                Upload
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                variant="outlined"
                                required
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="passwordRaw"
                                type="password"
                                variant="outlined"
                                required
                                value={formData.passwordRaw}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Button type='submit' variant="contained" color="primary" size="large">
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default NewStaffForm;