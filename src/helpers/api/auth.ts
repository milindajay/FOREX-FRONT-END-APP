import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
	const baseUrl = '/auth/login/';
	return api.create(`${baseUrl}`, params);
}

function logout() {
	const baseUrl = '/logout/';
	return api.create(`${baseUrl}`, {});
}

function signup(params: Record<string, unknown>) {
	const baseUrl = '/users/register/';
	return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
	const baseUrl = '/forget-password/';
	return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };
