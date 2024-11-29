// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import HomePage from './components/home';
import MembersGroups from './components/members-groups';
import MembersList from './components/members-list';
import MemberRegistration from './components/members-registration';
import MemberTransactions from './components/members-transactions';
import MemberTransactionsReport from './components/members-transactions-report';
import MemberECashPayment from './components/ecash';
import MemberSavingsCreditScore from './components/members-savings-creditscore';
import WithdrawalApplication from './components/withdrawal-application';
import LoanApplication from './components/loan-application';
import InsuranceApplication from './components/insurance-application';
import SocialServicesApplication from './components/social-services';
import MemberInformationCard from './components/member-info';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="" element={<MembersGroups />} />
          <Route path="groups" element={<MembersGroups />} />
          <Route path="members/:groupId" element={<MembersList />} />
          <Route path="registration/:groupId" element={<MemberRegistration />} />
          <Route path="transactions/:groupId" element={<MemberTransactions />} />
          <Route path="transactions-report" element={<MemberTransactionsReport />} />
          <Route path="ecash" element={<MemberECashPayment />} />
          <Route path="savings-credit" element={<MemberSavingsCreditScore />} />
          <Route path="withdrawal-application" element={<WithdrawalApplication />} />
          <Route path="loan-application" element={<LoanApplication />} />
          <Route path="insurance-application" element={<InsuranceApplication />} />
          <Route path="social-services-application" element={<SocialServicesApplication />} />
          <Route path="member-info/:memberId" element={<MemberInformationCard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
