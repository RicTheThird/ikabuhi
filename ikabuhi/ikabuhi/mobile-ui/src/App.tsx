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
import LivelihoodApplication from './components/livelihood';
import ScholarshipApplication from './components/scholarship';
import HealthApplication from './components/health';
import SSSelection from './components/social-services';
import MicroInsuranceApplication from './components/micro-insurance';
import LoanInsuranceApplication from './components/loan-insurance';
import InsuranceSelection from './components/insurance-selection';
import NotificationComponent from './components/notifications';

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
        <Route path="/livelihood" element={<LivelihoodApplication />} />
        <Route path="/scholarship" element={<ScholarshipApplication />} />
        <Route path="/health" element={<HealthApplication />} />
        <Route path="/social-services" element={<SSSelection />} />
        <Route path="/micro-insurance" element={<MicroInsuranceApplication />} />
        <Route path="/loan-insurance" element={<LoanInsuranceApplication />} />
        <Route path="/insurance" element={<InsuranceSelection />} />
        <Route path="/notifications" element={<NotificationComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
