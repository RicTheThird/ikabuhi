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
}

export interface NotificationX {
    id: string;               // Guid in C# is typically represented as a string in TypeScript (UUID)
    memberId: string;         // Guid is also a string in TypeScript
    message?: string | null;  // Nullable string (Message can be a string or null, so it's optional)
    createdAt?: string | null; // Nullable date (Using string type to represent date/time)
    isSeen?: boolean | null;  // Nullable boolean
    member?: Member | null;   // Foreign key relationship with Member, optional and can be null
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