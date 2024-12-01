import axiosInstance from './axiosInstance';
import { Member, Payments, Transaction, Withdrawal } from './interfaces';

//#region CollectorGroups
export const getMyGroups = async () => {
    const response = await axiosInstance.get('/CollectorGroups/my');
    return response.data;
};

export const getGroupById = async (groupId: string) => {
    const response = await axiosInstance.get(`/collectorgroups/group/${groupId}`);
    return response.data;
};
//#endregion

//#region Withdrawals
export const getMemberWithdrawal = async () => {
    const response = await axiosInstance.get(`/MemberWithdrawals/group`);
    return response.data;
};

export const getMemberWithdrawalByDate = async (request: any) => {
    const response = await axiosInstance.post(`/MemberWithdrawals/date`, request);
    return response.data;
};


export const putMemberWithdrawal = async (id: string, data: Withdrawal) => {
    const response = await axiosInstance.put(`/MemberWithdrawals/${id}`, data);
    return response;
};

export const getImageLink = (fileName: string): string => {
    //return `https://localhost:7002/uploads/${fileName}`;
    return `https://ikabuhi-api.azurewebsites.net/uploads/${fileName}`
}
//#endregion


//#region Groups
export const postMyGroup = async (data: any) => {
    const response = await axiosInstance.post('/Groups', data);
    return response.data;
};
//#endregion

//#region ProductLoan
export const getProductLoans = async () => {
    const response = await axiosInstance.get('/ProductLoans');
    return response.data;
};
//#endregion

//#region Members
export const getAllGroupMembers = async () => {
    const response = await axiosInstance.get(`/members/group/all`);
    return response.data;
};


export const getGroupMembers = async (groupId: string) => {
    const response = await axiosInstance.get(`/members/group/${groupId}`);
    return response.data;
};

export const getMemberById = async (id: string) => {
    const response = await axiosInstance.get(`/members/${id}`);
    return response.data;
};

export const updateLoanStatus = async ( type: string, id: string, status: string) => {
    const response = await axiosInstance.put(`/MemberLoans/loan-status/${type}/${id}/${status}`);
    return response;
};


export const updateSocialStatus = async (id: string, status: string) => {
    const response = await axiosInstance.put(`/SocialServices/status/${id}/${status}`);
    return response;
};

export const getPendingSocialServices = async () => {
    const response = await axiosInstance.get(`/SocialServices/pendings`);
    return response.data;
};

export const registerMember = async (form: any) => {
    let formData = new FormData()
    for (var key in form) {
        if (key !== 'files') formData.append(key, form[key])
        else {
            form.files.forEach((file: File) => {
                formData.append('files', file)
            })
        }
    }
    const response = await axiosInstance.post('/members/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response;
};
//#endregion

//#region Collectors
export const getCollectorsByGroup = async (groupId: string) => {
    const response = await axiosInstance.get(`/collectors/group/${groupId}`);
    return response.data;
};
//#endregion

//#region Payments
export const getPaymentsByGroupDate = async (data: any) => {
    const response = await axiosInstance.post(`/Payments/group`, data);
    return response.data;
};

export const postPayments = async (data: Payments[]) => {
    const response = await axiosInstance.post(`/Payments`, data);
    return response;
};

//#endregion

//#region Transactions
export const postPayment = async (form: any) => {
    let formData = new FormData()
    for (var key in form) {
        if (key !== 'files') formData.append(key, form[key])
        else {
            form.files.forEach((file: File) => {
                formData.append('files', file)
            })
        }
    }
    const response = await axiosInstance.post('/transactions/payment', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response;
};

export const getPendingECashPayments = async () => {
    const response = await axiosInstance.get(`/transactions/ecash`);
    return response.data;
};

export const getPendingLoanApplications = async () => {
    const response = await axiosInstance.get(`/MemberLoans/pendings`);
    return response.data;
};

export const putTransaction = async (data: any) => {
    const response = await axiosInstance.put(`/transactions/${data.id}`, data);
    return response;
};


export const getECashPaymentsByDate = async (request: any) => {
    const response = await axiosInstance.post(`/transactions/group/ecash`, request);
    return response.data;
};

export const downloadECashReceipt = async (transactionId: string) => {
    const response = await axiosInstance.get(`/transactions/download-receipt/${transactionId}`, {
        responseType: 'blob', // This is important to handle the file as a binary blob
    });
    return response;
};

//#endregion

