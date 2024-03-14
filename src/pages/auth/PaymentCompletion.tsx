import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRedux } from '../../hooks';

const PaymentCompletion = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { appSelector } = useRedux();

	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	useEffect(() => {
		const plan = searchParams.get('plan');
		const referral_points = searchParams.get('referral_points');
		const amount = searchParams.get('amount');
		const payment_intent = searchParams.get('payment_intent');
		const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
		const redirect_status = searchParams.get('redirect_status');
		axios
			.get(
				`/payment/verify-payment?member_id=${user.id}&introducer=${user.introducer}&amount=${amount}&plan=${plan}&referral_points=${referral_points}&referral_type=${user.referralType}&payment_intent=${payment_intent}&payment_intent_client_secret=${payment_intent_client_secret}&redirect_status=${redirect_status}
                `
			)
			.then((res) => navigate('/auth/login'));
	}, [navigate, searchParams, user.id, user.introducer, user.referralType]);

	return <h1>Payment Completed</h1>;
};

export default PaymentCompletion;
