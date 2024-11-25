import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Home from './components/home';
import EPayment from './components/epayment';
import TransactionHistory from './components/transaction-history';
import Savings from './components/savings';
import Withdrawal from './components/withdrawal';
import CreditScore from './components/credit-score';
import CreditRewards from './components/rewards';
import LoanSelection from './components/loan-selection';
import RegularLoanApplication from './components/regular-loan-application';
import BizLoanApplication from './components/biz-loan-application';
import WashLoanApplication from './components/wash-loan-application';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/epayment" element={<EPayment />} />
        <Route path="/transaction" element={<TransactionHistory />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/withdraw" element={<Withdrawal />} />
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/rewards/:points" element={<CreditRewards />} />
        <Route path="/loan-select" element={<LoanSelection />} />
        <Route path="/regular-loan" element={<RegularLoanApplication />} />
        <Route path="/biz-loan" element={<BizLoanApplication />} />
        <Route path="/wash-loan" element={<WashLoanApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
