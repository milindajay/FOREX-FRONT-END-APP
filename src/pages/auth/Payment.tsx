import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StripeCheckout from './StripeCheckout';
import { useRedux } from '../../hooks';
import BinancePayment from './BinancePayment';
import { Button } from 'react-bootstrap';

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
	const [activePaymentMethod, setActivePaymentMethod] = useState<'STRIPE' | 'BINANCE'>('STRIPE');

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
		<div className="payment-container d-flex justify-content-center align-items-center text-center mx-auto mt-5">
			{newPlan && clientSecret && (
				<div className="container mt-2">
					<div className="row justify-content-center mx-auto">
						<div className="col">
							<h2 className="mb-4">
								You will Pay: (${newPlan.product_price}){' '}
								{newPlan.administrationFee > 0 ? `+ Administration Fee ($${newPlan.administrationFee})` : ''} = $
								{newPlan.total}
							</h2>
						</div>
					</div>
					<div className="d-flex justify-content-center mb-4" style={{ gap: '2rem' }}>
						<Button
							className={`btn ${activePaymentMethod === 'STRIPE' ? 'btn-primary' : 'btn-light'}`}
							onClick={() => setActivePaymentMethod('STRIPE')}>
							Pay with Stripe
						</Button>
						<Button
							className={`btn ${activePaymentMethod === 'BINANCE' ? 'btn-primary' : 'btn-light'}`}
							onClick={() => setActivePaymentMethod('BINANCE')}>
							Pay With Binance
						</Button>
					</div>
					<div className="row justify-content-center mx-auto">
						{activePaymentMethod === 'STRIPE' ? (
							<div className="col-md-4 col-sm-10">
								<Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
									<StripeCheckout clientSecret={clientSecret} newPlanData={newPlan} />
								</Elements>
							</div>
						) : (
							<div className="col-md-4 col-sm-10">
								<BinancePayment planData={newPlan} />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Payment;
