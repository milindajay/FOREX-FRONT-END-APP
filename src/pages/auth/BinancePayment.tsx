import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import BinanceQrCode from '../../assets/images/payments/binance_qr_code.png';
import { useRedux } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { NewPlan } from './Payment';

const BINANCE_ADDRESS = 'THH5W6nkCFEYuLhY3a2o3NGPU8pPQcpNJM';

type Props = {
	planData: NewPlan;
};

const BinancePayment = (props: Props) => {
	const { appSelector } = useRedux();
	const navigate = useNavigate();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));
	const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);

	const { planData } = props;

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setIsSubmitAvailable(true);
			const formData = new FormData(e.currentTarget);

			const trx = formData.get('trx');

			if (trx && trx.toString().length > 0) {
				axios
					.post(`/payment/binance-payment-completed`, {
						trx,
						member_id: user.id,
						amount: planData.total,
						plan_id: planData.id,
					})
					.then((res) => res.status === 200 && navigate('/auth/login'))
					.catch((err) => {
						console.error(err);
						setIsSubmitAvailable(false);
					});
			} else {
				setIsSubmitAvailable(false);
			}
		},
		[navigate, planData.id, planData.total, user.id]
	);

	return (
		<div className="card bg-light p-4">
			<h1>Pay with Crypto</h1>

			<form className="d-flex flex-column align-items-center mt-4" onSubmit={handleSubmit}>
				<img src={BinanceQrCode} alt="Binance QR Code" style={{ maxWidth: '16rem' }} />

				<div
					className="d-flex flex-column align-items-center mt-2 mb-2"
					style={{ cursor: 'pointer' }}
					onClick={() =>
						navigator.clipboard.writeText(BINANCE_ADDRESS).then(() => alert('Address copied successfully.'))
					}>
					<h4 className="font-weight-bold" style={{ fontSize: '1em' }}>
						{BINANCE_ADDRESS}
					</h4>
					<span>Click to copy</span>
				</div>

				<input type="text" className="trx-field form-control" id="trx" placeholder="Enter your TRX" name="trx" />
				<Button className="waves-effect waves-light btn btn-success mt-4" disabled={isSubmitAvailable} type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default BinancePayment;
