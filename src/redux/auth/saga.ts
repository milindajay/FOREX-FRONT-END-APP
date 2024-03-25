import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import {
	login as loginApi,
	logout as logoutApi,
	signup as signupApi,
	forgotPassword as forgotPasswordApi,
	refreshUserData as refreshUserDataApi,
} from '../../helpers/';

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions';

// constants
import { AuthActionTypes } from './constants';

type UserData = {
	payload: {
		id: string;
		username: string;
		password: string;
		fullname: string;
		email: string;
	};
	type: string;
};

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password }, type }: UserData): SagaIterator {
	try {
		const response = yield call(loginApi, { email, password });
		const user = response.data;
		console.log(user);
		// NOTE - You can change this according to response format from your api
		api.setLoggedInUser(user);
		setAuthorization(user['token']);
		yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
		api.setLoggedInUser(null);
		setAuthorization(null);
	}
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
	try {
		yield call(logoutApi);
		api.setLoggedInUser(null);
		setAuthorization(null);
		yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
	}
}

function* signup({ payload: { fullname, email, password } }: UserData): SagaIterator {
	try {
		const response = yield call(signupApi, { fullname, email, password });
		const user = response.data;
		// api.setLoggedInUser(user);
		// setAuthorization(user['token']);
		yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
		api.setLoggedInUser(null);
		setAuthorization(null);
	}
}

function* forgotPassword({ payload: { email } }: UserData): SagaIterator {
	try {
		const response = yield call(forgotPasswordApi, { email });
		yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
	} catch (error: any) {
		yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
	}
}

export function* refereshUserData({ payload: { id } }: UserData): SagaIterator {
	// try {
	// 	const response = yield call(refreshUserDataApi, { userId: id });
	// 	yield put(authApiResponseSuccess(AuthActionTypes.REFRESH_USER_DATA, response.data));
	// } catch (error: any) {
	// 	yield put(authApiResponseError(AuthActionTypes.REFRESH_USER_DATA, error));
	// }
	try {
		const response = yield call(refreshUserDataApi, { userId: id });
		const user = response.data;
		console.log(user);
		// NOTE - You can change this according to response format from your api
		// api.setLoggedInUser(user);
		yield put(authApiResponseSuccess(AuthActionTypes.REFRESH_USER_DATA, user));
	} catch (error: any) {}
}

export function* watchRefereshUserData() {
	yield takeEvery(AuthActionTypes.REFRESH_USER_DATA, refereshUserData);
}

export function* watchLoginUser() {
	yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
	yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
	yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
	yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

function* authSaga() {
	yield all([
		fork(watchLoginUser),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchForgotPassword),
		fork(watchRefereshUserData),
	]);
}

export default authSaga;
