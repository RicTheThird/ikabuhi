import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button, MenuItem, IconButton, InputAdornment, CircularProgress, Alert, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { BRGYS } from "../constants";
import { getCollectorsByGroup, getGroupById, getProductLoans, registerMember } from "../services/apiService";
import { Collector, Groups, ProductLoans, SnackbarAlert } from "../services/interfaces";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const MemberRegistration = () => {

  const navigate = useNavigate();
  const { groupId } = useParams();
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState<SnackbarAlert>();
  const [step, setStep] = useState(1);
  const [productLoans, setProductLoans] = useState<ProductLoans[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [group, setGroup] = useState<Groups>();
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formValues, setFormValues] = useState({
    groupId: groupId,
    lastName: "",
    firstName: "",
    middleName: "",
    accountNo: "",
    bdate: dayjs().format('YYYY-MM-DD'),
    civilStatus: "",
    occupation: "",
    brgy: "",
    municipality: "",
    province: "",
    userName: "",
    password: "",
    billsFile: null,
    idFile: null,
    photoFile: null,
    cycle: 1,
    loanAmount: 0,
    totalLoanAmount: 0,
    weeklyPayment: 0,
    interestRate: 0,
    transaction: 0,
    collectorId: "",
    currentSavings: null,
    loanId: "",
    guarantorName: "",
    guarantorRelation: "",
    sourceOfIncome: "",
    firstPaymentDate: dayjs().format('YYYY-MM-DD')
  });

  useEffect(() => {
    getGroupDetails();
    getProductLoansAsync();
    getCollectorsAsync();
  }, []);

  const getProductLoansAsync = async () => {
    const response = await getProductLoans();
    setProductLoans(response)
  }

  const getGroupDetails = async () => {
    const response = await getGroupById(groupId || "");
    setGroup(response)
  }

  const getCollectorsAsync = async () => {
    const response = await getCollectorsByGroup(groupId || "");
    setCollectors(response)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (disableBlockDates(formValues.firstPaymentDate)) {
        setAlert({ success: false, message: "Invalid First Payment Date" })
        return
      }
      formValues.firstPaymentDate = dayjs(formValues.firstPaymentDate).format('YYYY-MM-DD')
      formValues.bdate = dayjs(formValues.bdate).format('YYYY-MM-DD')
      const response: any = await registerMember(formValues)
      if (response.status === 200) {
        setAlert({ success: true, message: "Registration successful!" })
        navigate(`/home/members/${groupId}`)
      } else {
        setAlert({ success: false, message: "Failed to register. Please try again later." })
      }
    } catch (error) {
      console.log(error)
      setAlert({ success: false, message: "Failed to register. Please try again later." })
    } finally {
      setSnackOpen(true)
      setLoading(false)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    if (e.target.name === 'loanId') {
      const loanDetails = productLoans.find(p => p.id === e.target.value)
      if (loanDetails) {
        let totalLoanAmount = 0
        let weeklyPayment = 0
        if (formValues.loanAmount) {
          totalLoanAmount = Number(formValues.loanAmount * (loanDetails.interestRate / 100)) + Number(formValues.loanAmount)
          weeklyPayment = totalLoanAmount / loanDetails.transactions
        }
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
          totalLoanAmount,
          interestRate: loanDetails.interestRate,
          transaction: loanDetails.transactions,
          weeklyPayment
        });
      }
    }
    else if (e.target.name === 'loanAmount') {
      if (formValues.loanId) {
        const loanDetails = productLoans.find(p => p.id === formValues.loanId)
        if (loanDetails) {
          const loanAmount = Number(e.target.value);
          let totalLoanAmount = 0
          let weeklyPayment = 0
          if (loanAmount > 0) {
            totalLoanAmount = Number(loanAmount * (loanDetails.interestRate / 100)) + Number(loanAmount)
            weeklyPayment = totalLoanAmount / loanDetails.transactions
          }
          setFormValues({
            ...formValues,
            loanAmount,
            totalLoanAmount,
            interestRate: loanDetails.interestRate,
            transaction: loanDetails.transactions,
            weeklyPayment
          });
        }
      } else {
        setFormValues({
          ...formValues,
          [e.target.name]: Number(e.target.value),
        });
      }
    }
    else if (e.target.name === 'accountNo') {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
        userName: e.target.value
      });
    }

    else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }

  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.files[0]
      })
    }
  }

  const handleDateChange = (date: any) => {
    setFormValues({
      ...formValues,
      bdate: date,
    });
  };

  const handleFirstPaymentDateChange = (date: any) => {
    setFormValues({
      ...formValues,
      firstPaymentDate: date,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues)
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const disableBlockDates = (date: any) => dayjs(date).get('day') !== group?.meetingDay

  return (
    <Box
      mt={5}
      sx={{
        padding: 4,
        backgroundColor: "#f8f4f4",
        maxWidth: '50vw',
        marginRight: "auto ",
        marginLeft: "auto",
        borderRadius: 2,
      }}
    >
      {step === 1 && (
        <>
          <form onSubmit={handleNext}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              I. Personal Information
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <TextField
                label="Account No."
                variant="outlined"
                name="accountNo"
                value={formValues.accountNo}
                required
                onChange={handleInputChange}
                sx={{ width: "30%" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Last Name"
                variant="outlined"
                value={formValues.lastName}
                name="lastName"
                required
                onChange={handleInputChange}
                sx={{ width: "30%" }}
              />
              <TextField
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                variant="outlined"
                required
                onChange={handleInputChange}
                sx={{ width: "30%" }}
              />
              <TextField
                label="Middle Name"
                name="middleName"
                value={formValues.middleName}
                variant="outlined"
                onChange={handleInputChange}
                sx={{ width: "30%" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  value={dayjs(formValues.bdate)}
                  maxDate={dayjs()}
                  format='YYYY-MM-DD'
                  onChange={handleDateChange}
                  slots={{
                    textField: (textFieldProps) => (
                      <TextField sx={{ width: "30%" }} required {...textFieldProps} />
                    ),
                  }}
                />
              </LocalizationProvider>
              <TextField
                label="Civil Status"
                variant="outlined"
                name="civilStatus"
                value={formValues.civilStatus}
                select
                required
                onChange={handleInputChange}
                sx={{ width: "30%" }}
              >
                <MenuItem value="Employed">Single</MenuItem>
                <MenuItem value="Self-Employed">Married</MenuItem>
                <MenuItem value="Unemployed">Separated</MenuItem>
                <MenuItem value="Unemployed">Widowed</MenuItem>
                <MenuItem value="Unemployed">Annuled</MenuItem>
              </TextField>
              <TextField
                label="Occupation"
                variant="outlined"
                name="occupation"
                value={formValues.occupation}
                select
                required
                onChange={handleInputChange}
                sx={{ width: "30%" }}
              >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
              </TextField>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Complete Address
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Barangay"
                variant="outlined"
                value={formValues.brgy}
                name="brgy"
                required
                onChange={handleInputChange}
                select
                sx={{ width: "30%" }}
              >
                {BRGYS.map((name: string, index: number) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Municipality"
                variant="outlined"
                onChange={handleInputChange}
                name="municipality"
                value={formValues.municipality}
                required
                select
                sx={{ width: "30%" }}
              >
                <MenuItem value="Tanauan" selected>Tanauan</MenuItem>
              </TextField>

              <TextField
                label="Province"
                variant="outlined"
                name="province"
                onChange={handleInputChange}
                value={formValues.province}
                required
                select
                sx={{ width: "30%" }}
              >
                <MenuItem value="Batangas" selected>Batangas</MenuItem>
              </TextField>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button variant="contained" type="submit" color="primary">
                Next
              </Button>
            </Box>

          </form>
        </>
      )}
      {step === 2 && (
        <>
          <form onSubmit={handleNext}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              II. Loan Information
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField label="Cycle"
                type="number"
                name="cycle"
                required
                value={formValues.cycle}
                aria-readonly
                onChange={handleInputChange}
                variant="outlined" sx={{ width: "10%", mr: '10px' }} />

              <TextField
                label="Loan Amount"
                type="number"
                name="loanAmount"
                value={formValues.loanAmount}
                onChange={handleInputChange}
                variant="outlined"
                required
                sx={{ width: "30%", mr: '10px' }}
              />

              <TextField
                label="Loan Term"
                variant="outlined"
                select
                required
                value={formValues.loanId}
                onChange={handleInputChange}
                name="loanId"
                sx={{ width: "30%", mr: '10px' }}
              >
                {productLoans && productLoans.map((loan: ProductLoans) => (
                  <MenuItem key={loan.id} value={loan.id}>
                    {loan.name}
                  </MenuItem>
                ))}
              </TextField>



              <TextField
                label="Interest Rate (%)"
                type="number"
                value={formValues.interestRate}
                aria-readonly
                variant="outlined"
                sx={{ width: "30%" }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Transaction"
                variant="outlined"
                type="number"
                value={formValues.transaction}
                aria-readonly
                sx={{ width: "30%" }}
              />

              <TextField
                label="Total Loan Amount"
                variant="outlined"
                value={formValues.totalLoanAmount.toFixed(2)}
                aria-readonly
                sx={{ width: "30%" }}
              />

              <TextField
                label="Weekly Payment"
                value={formValues.weeklyPayment.toFixed(2)}
                aria-readonly
                variant="outlined"
                sx={{ width: "30%" }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Current Savings"
                variant="outlined"
                onChange={handleInputChange}
                name="currentSavings"
                value={formValues.currentSavings}
                required
                type="number"
                sx={{ width: "30%" }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="First Payment Date"
                  value={dayjs(formValues.firstPaymentDate)}
                  minDate={dayjs()}
                  shouldDisableDate={disableBlockDates}
                  format='YYYY-MM-DD'
                  onChange={handleFirstPaymentDateChange}
                  slots={{
                    textField: (textFieldProps) => (
                      <TextField sx={{ width: "30%" }} required {...textFieldProps} />
                    ),
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Name of Collector"
                variant="outlined"
                name="collectorId"
                value={formValues.collectorId}
                onChange={handleInputChange}
                required
                select
                sx={{ width: "30%" }}
              >
                {collectors && collectors.map((collector: Collector, index: number) => (
                  <MenuItem key={index} value={collector.id}>
                    {collector.firstName} {collector.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Next
              </Button>
            </Box>
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <form onSubmit={handleNext}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              III. Guarantor's Information
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Name of Guarantor"
                variant="outlined"
                name="guarantorName"
                value={formValues.guarantorName}
                onChange={handleInputChange}
                required
                sx={{ width: "31%" }}
              />
              <TextField
                label="Relation to Borrower"
                variant="outlined"
                name="guarantorRelation"
                value={formValues.guarantorRelation}
                onChange={handleInputChange}
                required
                sx={{ width: "31%" }}
              />
              <TextField
                label="Source of Income"
                variant="outlined"
                value={formValues.sourceOfIncome}
                required
                name="sourceOfIncome"
                onChange={handleInputChange}
                sx={{ width: "31%" }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2, marginTop: 4 }}
            >
              IV. Bills Information & Requirements
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button variant="outlined" component="label" sx={{ width: "45%" }}>
                Upload Latest Bills (e.g., Electric Bill)
                <input
                  type="file"
                  accept='*'
                  name="billsFile"
                  hidden
                  onChange={e => handleFileSelected(e)}
                />
              </Button>
              {!formValues.billsFile && (
                <Typography variant='button' color='#d32f2f' sx={{ marginLeft: 1 }}>
                  No file uploaded
                </Typography>
              )}
              {formValues.billsFile && (
                <Typography variant='button' sx={{ marginLeft: 1 }}>
                  Attached: <strong>{formValues.billsFile['name']}</strong>
                </Typography>
              )}
              <Button variant="outlined" component="label" sx={{ width: "45%" }}>
                Upload Certificate of Residency or Barangay Clearance
                <input type="file"
                  accept='*'
                  name="idFile"
                  hidden
                  onChange={e => handleFileSelected(e)}
                />
              </Button>
              {!formValues.idFile && (
                <Typography variant='button' color='#d32f2f' sx={{ marginLeft: 1 }}>
                  No file uploaded
                </Typography>
              )}
              {formValues.idFile && (
                <Typography variant='button' sx={{ marginLeft: 1 }}>
                  Attached: <strong>{formValues.idFile['name']}</strong>
                </Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Next
              </Button>
            </Box>
          </form>
        </>
      )}
      {step === 4 && (
        <>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              V. User Profiles and Password
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button variant="outlined" component="label" sx={{ width: "45%" }}>
                Upload Photo for Profile
                <input
                  type="file"
                  name="photoFile"
                  hidden
                  onChange={e => handleFileSelected(e)} />
              </Button>
              {!formValues.photoFile && (
                <Typography variant='button' color='#d32f2f' sx={{ marginLeft: 1 }}>
                  No file uploaded
                </Typography>
              )}
              {formValues.photoFile && (
                <Typography variant='button' sx={{ marginLeft: 1 }}>
                  Attached: <strong>{formValues.photoFile['name']}</strong>
                </Typography>
              )}
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Username (Account Number)"
                variant="outlined"
                aria-readonly
                name="userName"
                value={formValues.userName}
                sx={{ width: "45%" }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formValues.password}
                onChange={handleInputChange}
                name="password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { fontWeight: 600, color: "#3f3f3f" },
                }}
                sx={{ width: "45%" }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit" disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}>
                Save
              </Button>
            </Box>
          </form>
        </>
      )}

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

export default MemberRegistration;
