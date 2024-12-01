import React, { useEffect, useState } from 'react';
import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { ReportItem } from '../services/interfaces';
import { getLoansReport, getSavingsReport, getWithdrawalReport } from '../services/apiService';

const ReportComponent = () => {
    const [selectedReport, setSelectedReport] = useState<any>('Withdrawals');
    const [report, setReport] = useState<ReportItem[]>([]);
    const [selectedYear, setSelectedReportYear] = useState<number>(2024);

    useEffect(() => {
        getReport('Withdrawals', 2024)
    }, []);

    const handleReportChange = (event: any) => {
        setSelectedReport(event.target.value);
        getReport(event.target.value, selectedYear)
    };

    const handleReportYearChange = (event: any) => {
        setSelectedReportYear(event.target.value);
        getReport(selectedReport, event.target.value);
    };

    const getReport = (type: string, yr: number) => {
        if (type === 'Withdrawals')
            getWithdrawReport(yr);
        else if (type === 'Savings')
            getSavingReport(yr)
        else
            getLoanReport(yr)
    }

    const getWithdrawReport = async (yr: number) => {
        const resposne = await getWithdrawalReport(yr);
        setReport(resposne);
    }

    const getSavingReport = async (yr: number) => {
        const resposne = await getSavingsReport(yr);
        setReport(resposne);
    }

    const getLoanReport = async (yr: number) => {
        const resposne = await getLoansReport(yr);
        setReport(resposne);
    }

    return (
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <FormControl sx={{ mb: 4 }}>
                <InputLabel>Report Type</InputLabel>
                <Select value={selectedReport} label="Report Type" onChange={handleReportChange}>
                    <MenuItem value="Withdrawals">Withdrawals</MenuItem>
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Loan Disbursement">Loan Disbursement</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ mb: 4, ml: 2, width: "100px" }}>
                <InputLabel>Report Year</InputLabel>
                <Select value={selectedYear} label="Report Type" onChange={handleReportYearChange}>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>MONTH</TableCell>
                            <TableCell>No. Of Transactions</TableCell>
                            <TableCell>AMOUNT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {report.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.monthName}</TableCell>
                                <TableCell>{row.no}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ReportComponent;