import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NewPlan } from './Payment';

type Props = { clientSecret: string; newPlanData: NewPlan };

const StripeCheckout = (props: Props) => {
	const stripe = useStripe();
	const elements = useElements();

	const [isProcessing, setIsProcessing] = useState(false);

	const { clientSecret, newPlanData } = props;

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			setIsProcessing(true);

			if (!stripe || !elements || !clientSecret) {
				return setIsProcessing(false);
			}

			const { error: err } = await elements.submit();
			if (err) console.error(err);

			const { error } = await stripe?.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `${window.location.origin}/auth/payment-completed?amount=${newPlanData.total}&plan=${newPlanData.id}&referral_points=${newPlanData.referral_points}`,
				},
			});

			if (error) console.error(error);

			setIsProcessing(false);
		},
		[clientSecret, elements, newPlanData.id, newPlanData.referral_points, newPlanData.total, stripe]
	);

	return (
		<form id="payment-form" className="mw-60 card bg-light p-4" onSubmit={handleSubmit}>
			<h1>Pay with Stripe</h1>
			<PaymentElement />
			<Button className="waves-effect waves-light btn btn-success mt-4" disabled={isProcessing} type="submit">
				Continue
			</Button>
		</form>
	);
};

export default StripeCheckout;
