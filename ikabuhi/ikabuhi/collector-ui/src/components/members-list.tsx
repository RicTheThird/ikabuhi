import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
export interface Props {
    member: {
      name: string;
      id: string;
      age: number;
    };
  }
const members = [
  { name: 'Helena Magpantay', id: 'U1292167321', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167322', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167323', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167324', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167325', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167326', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167327', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167328', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167329', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167330', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167331', age: 40 },
  { name: 'Helena Magpantay', id: 'U1292167332', age: 40 },
];

const MemberCard = ({ member } : Props) => (
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
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {member.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member.id}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member.age} Years Old
      </Typography>
    </CardContent>
  </Card>
);

const MembersList = () => {

  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          GOOD GIRLS: <Typography component="span" variant="h5">35 Members</Typography>
        </Typography>
        <Typography variant="h6">BARANGAY: Boot</Typography>
        <Typography variant="h6">DAY: 1</Typography>
        <Typography variant="h6">MEETING TIME: 8:00AM-9:00 AM</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate('/home/registration')}>Add Member</Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {members.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MembersList;
