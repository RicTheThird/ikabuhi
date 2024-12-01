import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { Collector, Groups, Member } from '../services/interfaces';
import { getAllCollectors, getGroupById, getGroupMembers, getImageLink } from '../services/apiService';
import dayjs from 'dayjs';

const AllStaffsList: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Collector[]>([]);
  const [group, setGroup] = useState<Groups>();

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const response = await getAllCollectors();
    setMembers(response)
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          All Staffs
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate(`/home/add-staff`)}>Add Staff</Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {members.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              variant="outlined"
              sx={{
                textAlign: 'center',
                padding: 2,
                borderRadius: 2,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Avatar
                  alt={`${member.firstName} ${member.lastName}`}
                  src={getImageLink(member?.profileImage ?? '')}  // Use default if no avatar URL is available
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto 16px', // Center the avatar and add margin
                  }}
                />

                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {member.firstName} {member.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.contactNo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.branch}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllStaffsList;
