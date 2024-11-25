import axiosInstance from './axiosInstance';

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
//#endregion

//#region Withdrawals
export const applyWithdrawal = async (data: any) => {
    const response = await axiosInstance.post('/MemberWithdrawals', data);
    return response;
};
//#endregion


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

export const getMyDetails = async () => {
    const response = await axiosInstance.get(`/members/mine`);
    return response.data;
};

export const getGroupMembers = async (groupId: string) => {
    const response = await axiosInstance.get(`/members/group/${groupId}`);
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

