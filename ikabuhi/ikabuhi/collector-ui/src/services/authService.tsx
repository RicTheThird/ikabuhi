import { useJwt as decodeJwt } from "react-jwt"
import axiosInstance from './axiosInstance';

export interface UserProfile {
    email: string,
    role: string,
    unique_name: string,
    certserialnumber: string
}


export const PasswordInvalidErrorMessage = "Password must be at least 8 characters long, contain at least one uppercase and lowercase, a number and a special character."

function getRandomHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `${randomColor.padStart(6, '0')}`;
}

export function validatePassword(password: string): boolean {
    // Minimum password length
    const minLength = 8;

    // Regular expressions for validation criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Validate password
    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars
    );
}

export const login = async (data: any) => {
    const response = await axiosInstance.post('/auth/collector-login', data);
    if (response.status === 200) {
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.removeItem('sessiontimeout');
       // const decoded = decodeJwt<UserProfile>(response.data.token || '').decodedToken;
        localStorage.setItem('role', response.data.role || '')
    }
    return response;
};

export const myProfile = async () => {
    const response = await axiosInstance.get(`/auth/me`);
    return response.data;
};

export const invite = async (user: any) => {
    const response = await axiosInstance.post('/users/invite', user);
    return response;
};

export const register = async (user: any) => {
    const response = await axiosInstance.post('/auth/register', user);
    return response;
};

export const registerStaff = async (key: string, user: any) => {
    const response = await axiosInstance.post(`/auth/register-staff/${key}`, user);
    return response;
};

export const verifyToken = async (token: string) => {
    const response = await axiosInstance.get(`/auth/verify-key/${token}`);
    return response;
};

export const verifyInvite = async (token: string) => {
    const response = await axiosInstance.get(`/auth/verify-invite/${token}`);
    return response;
};

export const resetPassword = async (data: any) => {
    const response = await axiosInstance.post(`/auth/reset-password`, data);
    return response;
};

export const changePassword = async (data: any) => {
    const response = await axiosInstance.put(`/users/change-password`, data);
    return response;
};

export const updateProfile = async (data: any) => {
    const response = await axiosInstance.put(`/users`, data);
    return response;
}

export const forgotPassword = async (data: any) => {
    const response = await axiosInstance.post(`/auth/forgot-password`, data);
    return response;
};

export const confirmEmail = async (token: string) => {
    const response = await axiosInstance.post('/auth/confirm-email', { token });
    return response;
};


export const logout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessiontimeout');
    localStorage.removeItem('ActiveChatKey')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    window.location.href = '/';
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    // Check if the token exists in localStorage or sessionStorage
    return !!localStorage.getItem('authToken');
};

export const getRole = () => {
    return localStorage.getItem('role') ?? '';
}

export const getUserProfile = () => {
    if (isAuthenticated()) {
        const decoded = decodeJwt<UserProfile>(localStorage.getItem('authToken') || '').decodedToken;
        localStorage.setItem('userId', decoded?.certserialnumber || '')
        localStorage.setItem('role', decoded?.role || '')
        let avatarBgColor = ''
        if (localStorage.getItem('avatarColor')) {
            avatarBgColor = localStorage.getItem('avatarColor') ?? getRandomHexColor()
        } else {
            avatarBgColor = getRandomHexColor()
            localStorage.setItem('avatarColor', avatarBgColor)
        }
        return {
            name: decoded?.unique_name,
            email: decoded?.email,
            role: decoded?.role,
            userId: decoded?.certserialnumber,
            avatarLink: `https://ui-avatars.com/api/?format=svg&rounded=true&name=${decoded?.unique_name?.split(' ')[0]}+${decoded?.unique_name?.split(' ')[1]}&background=${avatarBgColor}&color=fff`
        };
    }
    return null;
}

// Function to get the authentication token
export const getToken = () => {
    return localStorage.getItem('authToken');
};

