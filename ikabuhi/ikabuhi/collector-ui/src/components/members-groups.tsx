import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getMyGroups, postMyGroup } from "../services/apiService";
import { BRGYS, DAYS } from "../constants";
import { Groups } from "../services/interfaces";

const MembersGroups: React.FC = () => {

  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [formValues, setFormValues] = useState({
    name: "",
    brgy: "",
    meetingTime: "",
    meetingDay: "",
  });

  useEffect(() => {
    getMyCollectorGroups();
  }, []);

  const getMyCollectorGroups = async () => {
    const response = await getMyGroups();
    setGroups(response)
  }

  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formValues.meetingTime = `${startTime}-${endTime}`;
      const response: any = await postMyGroup(formValues)
      if (response) {
        setDrawerOpen(false);
        getMyCollectorGroups();
      }
    } catch (error) {
      console.log(error)
    } finally {

    }
  };


  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    setDrawerOpen(open);
  };



  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={toggleDrawer(true)}
        >
          Add Group
        </Button>
      </Box>
      {groups && groups.length > 0 && <Grid container spacing={3} justifyContent="center">
        {groups.map((group, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
            <Card
              variant="outlined"
              sx={{
                textAlign: "center",
                padding: 2,
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {group?.name}
                </Typography>
                <Typography variant="body1" sx={{ marginY: 1 }}>
                  {group?.memberCount} Members
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {group?.brgy}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Day {group?.meetingDay} : {group?.meetingTime}
                </Typography>
                <br />
                <Box display="flex" justifyContent="center" mt={4}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginRight: "10px", textTransform: 'none' }}
                    fullWidth
                    onClick={() => navigate(`/home/members/${group.id}`)}
                  >
                    View Members
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "10px", textTransform: 'none' }}
                    fullWidth
                    onClick={() => navigate("/home/transactions-report")}
                  >
                    Transaction Report
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ textTransform: 'none' }}
                    fullWidth
                    onClick={() => navigate(`/home/transactions/${group.id}`)}
                  >
                    Transaction Entry
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          style: { marginTop: "300px" },
        }}
      >
        <form onSubmit={handleGroupSubmit}>
          <Box
            sx={{ width: 350, padding: 3, backgroundColor: "#f0f0f0" }}
            role="presentation"
          >
            <Typography variant="h6" gutterBottom>
              Add New Group
            </Typography>
            <TextField
              fullWidth
              label="Name of Group"
              variant="outlined"
              margin="normal"

              onChange={handleInputChange}
              name="name"
              required
            />
            <TextField
              fullWidth
              label="Barangay"
              variant="outlined"
              name="brgy"
              margin="normal"

              onChange={handleInputChange}
              select
              required
            >
              {BRGYS.map((name: string, index: number) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Municipality"
              variant="outlined"
              margin="normal"
              name=""
              select
              required
            >
              <MenuItem value="Tanauan">Tanauan</MenuItem>
            </TextField>
            <TextField
              label="Day"
              variant="outlined"
              select
              name="meetingDay"
              onChange={handleInputChange}
              required
              sx={{ width: "45%" }}
            >
              {DAYS.map((name: string, index: number) => (
                <MenuItem key={index} value={index}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <Box display="flex" justifyContent="space-between" mt={2} mb={2}>

              <TextField
                label="Meeting Start Time"
                variant="outlined"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                required
                sx={{ width: "45%" }}

              />
              <TextField
                label="Meeting End Time"
                variant="outlined"
                value={endTime}
                onChange={handleEndTimeChange}
                type="time"
                required
                sx={{ width: "45%" }}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </Box>
        </form>
      </Drawer>
    </Box>
  );
};

export default MembersGroups;
