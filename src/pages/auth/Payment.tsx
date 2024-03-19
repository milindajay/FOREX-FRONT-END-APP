import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StripeCheckout from './StripeCheckout';
import { useRedux } from '../../hooks';
import BinancePayment from './BinancePayment';

export interface NewPlan {
	stripeTotal: number;
	id: number;
	product_price: number;
	referral_points: number;
	total: string;
	administrationFee: number;
}

const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string;

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
	const { appSelector } = useRedux();

	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	const [newPlan, setNewPlan] = useState<NewPlan>();
	const [clientSecret, setClientSecret] = useState<string>();

	useEffect(() => {
		axios.get<NewPlan>(`/payment/get-products/${user.currentPlan}`).then((res) => setNewPlan(res.data));
	}, [user.currentPlan]);

	useEffect(() => {
		if (newPlan?.stripeTotal) {
			axios
				.post<{ clientSecret: string }>('/payment/create-payment-intent', {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					address: user.address,
					amount: newPlan?.stripeTotal,
				})
				.then((res) => setClientSecret(res.data.clientSecret));
		}
	}, [newPlan?.stripeTotal, user.address, user.email, user.firstName, user.lastName]);

	return (
		<div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
			{newPlan && clientSecret && (
				<div className="d-flex flex-column align-items-center">
					<h2 className="mb-4">
						Payment = Starter (${newPlan.product_price}){' '}
						{newPlan.administrationFee > 0 ? `+ Administration Fee ($${newPlan.administrationFee})` : ''} = $
						{newPlan.total}
					</h2>
					<div className="d-flex" style={{ gap: '5rem' }}>
						<Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
							<StripeCheckout clientSecret={clientSecret} newPlanData={newPlan} />
						</Elements>
						<div className="d-flex align-items-center justify-content-center" style={{ maxHeight: '100%' }}>
							<h3>OR</h3>
						</div>
						<BinancePayment planData={newPlan} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Payment;
