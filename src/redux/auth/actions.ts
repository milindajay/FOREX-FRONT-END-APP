// constants
import { AuthActionTypes } from './constants';

export type AuthActionType = {
	type:
		| AuthActionTypes.API_RESPONSE_SUCCESS
		| AuthActionTypes.API_RESPONSE_ERROR
		| AuthActionTypes.FORGOT_PASSWORD
		| AuthActionTypes.FORGOT_PASSWORD_CHANGE
		| AuthActionTypes.LOGIN_USER
		| AuthActionTypes.LOGOUT_USER
		| AuthActionTypes.RESET
		| AuthActionTypes.REFRESH_USER_DATA
		| AuthActionTypes.SIGNUP_USER;
	payload: {} | string;
};

type UserData = {
	email: string;
	id: string;
	firstName: string;
	lastName: string;
	role: string;
	username: string;
	profile_status: string;
	mobileNumber: string;
	secondaryPhone: string;
	address: string;
	dateOfBirth: string;
	nationalIdentityNumber: string;
	registrationDate: string;
	introducer: string;
	salesSummary: string;
	debitCount: number;
	introCount: number;
	firstSalesAmount: number;
	cashBack: number;
	currentPlan: number;
	referralType: string;
	directSaleCommission: number;
	binaryCommission: number;
	currentBalance: number;
	totalEarnings: number;
	totalWithdrawals: number;
};

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
	type: AuthActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
	type: AuthActionTypes.API_RESPONSE_ERROR,
	payload: { actionType, error },
});

export const loginUser = (email: string, password: string): AuthActionType => ({
	type: AuthActionTypes.LOGIN_USER,
	payload: { email, password },
});

export const refreshUserData = (id: string): AuthActionType => ({
	type: AuthActionTypes.REFRESH_USER_DATA,
	payload: { id },
});

export const logoutUser = (): AuthActionType => ({
	type: AuthActionTypes.LOGOUT_USER,
	payload: {},
});

export const signupUser = (fullname: string, email: string, password: string): AuthActionType => ({
	type: AuthActionTypes.SIGNUP_USER,
	payload: { fullname, email, password },
});

export const forgotPassword = (email: string): AuthActionType => ({
	type: AuthActionTypes.FORGOT_PASSWORD,
	payload: { email },
});

export const resetAuth = (): AuthActionType => ({
	type: AuthActionTypes.RESET,
	payload: {},
});
