export interface Groups {
    id: string;
    name: string;
    memberCount: number;
    brgy: string;
    meetingTime: string;
    meetingDay: number;
}

export interface ProductLoans {
    id: string;
    name: string;
    transactions: number;
    interestRate: number;
    isActive: boolean;
}

export interface Collector {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Member {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    accountNo: string;
    bdate: string;
    civilStatus: string;
    occupation: string;
    brgy: string;
    municipality: string;
    province: string;
    group: Groups;
    memberLoans: MemberLoans[];
    memberSavings: MemberSavings[];
    payments: Payments[];

}

export interface Payments {
    id: string; // Unique identifier for the payment
    memberId: string; // Foreign key to Member entity
    savingsId: string; // Foreign key to MemberSavings entity
    loanId: string; // Foreign key to MemberLoans entity
    savingsPayment: number | null; // Payment made towards savings (nullable)
    loanPayment: number | null; // Payment made towards loan (nullable)
    withdrawalAmount: number | null; // Withdrawal amount (nullable)
    paymentMethod: string | null; // Payment method (nullable)
    creditPointsGained: number | 0; // Credit points gained (nullable)
    paymentDate: string; // Payment date (ISO string format)
    weekNumber: number; // Week number in the month
    member: Member | null;
    memberLoan: MemberLoans | null;
    memberSavings: MemberSavings | null;
    paymentStatus: string;
    withdrawalStatus: string;
    status: string;
}

export interface Withdrawal {
    id: string;
    withdrawAmount: number;
    status: string;
    withdrawalDateTime: string;
    applicationDateTime: string;
    memberId: string;
    member: Member | null;
}

export interface MemberLoans {
    collateralType1: string | null;
    collateralType2: string | null;
    collateralType3: string | null;
    collateralTypeAmount1: number | null;
    collateralTypeAmount2: number | null;
    collateralTypeAmount3: number | null;
    collector: string | null;
    collectorId: string;
    cycle: number;
    dueDate: string;  // You can also use Date if you're working with Date objects
    firstPaymentDate: string;  // Same here, or Date if using Date objects
    guarantorName: string;
    guarantorRelation: string;
    id: string;
    isActive: boolean;
    loanAmount: number;
    loanBalance: number;
    loanType: string | null;
    memberId: string;
    productLoan: ProductLoans;
    productLoanId: string;
    sourceOfIncome: string;
    status: string;
    totalLoanAmount: number;
    weeklyPayment: number;
    member: Member;
    externalSavingsBalance: number;
    liabilityLoanBalance: number;
    liabilityLoanBalanceWeeklyPayments: number;
    monthlyExpenses: number;
}

export interface BusinessLoan {
    id: string; // GUID in TypeScript is a string
    memberId?: string; // Nullable GUID, represented as string and optional
    cycle?: number; // Nullable integer, represented as number and optional
    businessName?: string; // Nullable string, optional
    businessType?: string; // Nullable string, optional
    businessAddress?: string; // Nullable string, optional
    loanAmount?: number; // Nullable decimal, represented as number and optional
    collectorId?: string; // Nullable GUID, represented as string and optional
    annualRevenue?: number; // Nullable decimal, represented as number and optional
    estMonthlyExpenses?: number; // Nullable decimal, represented as number and optional
    isActive?: boolean; // Nullable boolean, optional
    status?: string; // Nullable string, optional
    createdDate?: string; // Nullable DateTime, represented as string (ISO 8601 format) and optional
    purposeLoan?: string; // Nullable string, optional
    paymentTerms?: string; // Nullable string, optional
    member: Member;
}

export interface WashLoan {
    id: string; // GUID as string
    memberId?: string; // Nullable GUID, optional
    cycle?: number; // Nullable integer, optional
    projectType?: string; // Nullable string, optional
    projectLocation?: string; // Nullable string, optional
    loanAmount?: number; // Nullable decimal, optional, represented as number
    paymentTerms?: string; // Nullable string, optional
    haveCollateral?: boolean; // Nullable boolean, optional
    collateral?: string; // Nullable string, optional
    collectorId?: string; // Nullable GUID, optional
    isActive?: boolean; // Nullable boolean, optional
    status?: string; // Nullable string, optional
    createdDate?: string; // Nullable DateTime, optional, represented as ISO 8601 string
    member: Member;
}

export interface PendingLoanResponse {
    pendingLoanCount: number;
    pendingWashLoans?: WashLoan[]; // Optional property with a list of WashLoan
    pendingBusinessLoans?: BusinessLoan[]; // Optional property with a list of BusinessLoan
    pendingRegularLoans?: MemberLoans[]; // Optional property with a list of MemberLoan
}


export interface MemberSavings {
    id: string;
    lastPaidAmount: number;
    lastPaymentDate: string; // You can also use Date if you're working with Date objects
    memberId: string;
    runningSavingsAmount: number;
    transactions: any; // Can be null or a list of transactions if required
}

export interface Transaction {
    id: string;
    memberId: string;
    savingsId: string;
    loanId: string;
    saveAmount: number;
    loanPayment: number;
    transactionDate: string;  // Alternatively, you could use `Date` if you prefer Date objects
    receiptFileName: string;
    status: string;
    loanBalance: number;
    savingsAmount: number;
    paymentMethod: string;
    member: Member | null;
}

export interface SnackbarAlert {
    success: boolean;
    message: string;
}

export interface SocialService {
    id: string; // GUID as string
    memberId?: string; // Nullable GUID (optional)
    collectorId?: string; // Nullable GUID (optional)
    livOwnABusiness?: boolean; // Nullable boolean (optional)
    livBizName?: string; // Nullable string (optional)
    livBizType?: string; // Nullable string (optional)
    livNoOfEmployee?: number; // Nullable integer (optional)
    livYearsOperated?: number; // Nullable integer (optional)
    livTypeOFBizToStart?: string; // Nullable string (optional)
    livInterestReason?: string; // Nullable string (optional)
    livSkillsGain?: string; // Nullable string (optional)
    livHavePriorTraining?: boolean; // Nullable boolean (optional)
    livPriorTraining?: string; // Nullable string (optional)
    livKnowledgePlan?: string; // Nullable string (optional)
    livRequireFinanceSupport?: boolean; // Nullable boolean (optional)
    livSupportType?: string; // Nullable string (optional)
    schLastName?: string; // Nullable string (optional)
    schFirstName?: string; // Nullable string (optional)
    schMidName?: string; // Nullable string (optional)
    schGender?: string; // Nullable string (optional)
    schContact?: string; // Nullable string (optional)
    schAddress?: string; // Nullable string (optional)
    schGuardianName?: string; // Nullable string (optional)
    schRelationGuardian?: string; // Nullable string (optional)
    schGuardianAddress?: string; // Nullable string (optional)
    schLevelStudy?: string; // Nullable string (optional)
    schSchoolName?: string; // Nullable string (optional)
    schYearLevel?: string; // Nullable string (optional)
    schGrade?: string; // Nullable string (optional)
    schReason?: string; // Nullable string (optional)
    schHelpReason?: string; // Nullable string (optional)
    schContainRecommendation?: string; // Nullable string (optional)
    schRecommendationFileName?: string; // Nullable string (optional)
    hltBoolExistCondition?: boolean; // Nullable boolean (optional)
    hltExistCondition?: string; // Nullable string (optional)
    hltBoolMedication?: boolean; // Nullable boolean (optional)
    hltMedication?: string; // Nullable string (optional)
    hltBoolAllergies?: boolean; // Nullable boolean (optional)
    hltAllergies?: string; // Nullable string (optional)
    hltBoolHealthCare?: boolean; // Nullable boolean (optional)
    hltHealthCare?: string; // Nullable string (optional)
    hltReasonApply?: string; // Nullable string (optional)
    hltSupport?: string; // Nullable string (optional)
    hltEmergencyContact?: string; // Nullable string (optional)
    hltRelationship?: string; // Nullable string (optional)
    hltContact?: string; // Nullable string (optional)
    hltBoolInsurance?: boolean; // Nullable boolean (optional)
    hltInsurance?: string; // Nullable string (optional)
    isActive?: boolean; // Nullable boolean (optional)
    status?: string; // Nullable string (optional)
    type?: string; // SS, Health, Scholarship (optional)
    createdDate?: string; // Nullable DateTime, typically in ISO 8601 string format
  
    // Foreign relationships (optional, can be null)
    member?: Member; // Optional related `Member` object
  }
  