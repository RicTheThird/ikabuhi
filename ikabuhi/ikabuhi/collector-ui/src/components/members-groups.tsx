import React, { useState } from "react";
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
export interface Groups {
  group: {
    name: string;
    members: number;
    location: string;
    meeting: string;
  };
}

const groups = [
  {
    name: "GOOD GIRLS",
    members: 35,
    location: "Brgy. Boot",
    meeting: "Day 1: Monday 8:00 AM",
  },
  {
    name: "BEAUTY SLAYER",
    members: 50,
    location: "Brgy. Balele",
    meeting: "Day 2: Tuesday 8:00 AM",
  },
  {
    name: "MOTHER HOOD",
    members: 60,
    location: "Brgy. Darasa",
    meeting: "Day 3: Wednesday 8:00 AM",
  },
];

const MembersGroups = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
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
      <Grid container spacing={3} justifyContent="center">
        {groups.map((group, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
            <GroupCard group={group} />
          </Grid>
        ))}
      </Grid>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          style: { marginTop: "300px" },
        }}
      >
        <Box
          sx={{ width: 350, padding: 3, backgroundColor: "#f0f0f0" }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" gutterBottom>
            Add New Group
          </Typography>
          <TextField
            fullWidth
            label="Name of Group"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Barangay"
            variant="outlined"
            margin="normal"
            select
          >
            <MenuItem value="Boot">Brgy. Boot</MenuItem>
            <MenuItem value="Balele">Brgy. Balele</MenuItem>
            <MenuItem value="Darasa">Brgy. Darasa</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Municipality"
            variant="outlined"
            margin="normal"
            select
          >
            <MenuItem value="Municipality 1">Municipality 1</MenuItem>
            <MenuItem value="Municipality 2">Municipality 2</MenuItem>
          </TextField>
          <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
            <TextField
              label="Day"
              variant="outlined"
              select
              sx={{ width: "45%" }}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
            </TextField>
            <TextField
              label="Meeting Time"
              variant="outlined"
              type="time"
              sx={{ width: "45%" }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <AccessTimeIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

const GroupCard = ({ group }: Groups) => {
  const navigate = useNavigate();
  return (
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
          {group?.members} Members
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {group?.location}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {group?.meeting}
        </Typography>
        <br />
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginRight: "10px" }}
            onClick={() => navigate("/home/members")}
          >
            View Members
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ marginRight: "10px" }}
            onClick={() => navigate("/home/transactions-report")}
          >
            Transaction Report
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate("/home/transactions")}
          >
            Transaction Entry
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MembersGroups;
