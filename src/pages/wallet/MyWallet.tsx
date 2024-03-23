import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { FormInput, VerticalForm } from '../../components/form';
import { usePageTitle, useRedux } from '../../hooks';
import WalletStatistics from './WalletStatistics';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

type WithdrawalData = {
	withdrawalAmount: string;
	walletAddress: string;
};

const MyWallet = () => {
	usePageTitle({
		title: 'My Wallet',
		breadCrumbItems: [
			{
				path: '/my-wallet',
				label: 'My Wallet',
				active: true,
			},
		],
	});

	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	const [formData, setFormData] = useState<WithdrawalData>({
		withdrawalAmount: '',
		walletAddress: '',
	});
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const handleChange = <Name extends keyof WithdrawalData>(name: Name, value: WithdrawalData[Name]) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleOnSubmit = useCallback(() => {
		setIsProcessing(true);
		axios
			.post('/payment/withdraw', {
				member_id: user.id,
				withdrawalAmount: parseFloat(formData.withdrawalAmount),
				walletAddress: formData.walletAddress,
			})
			.then((res) => setError(null))
			.catch((err) => setError(err))
			.finally(() => setIsProcessing(false));
	}, [formData, user.id]);

	const formSchema = useMemo(
		() =>
			Yup.object().shape({
				withdrawalAmount: Yup.string().required('Withdrawal Amount is required'),
				walletAddress: Yup.string().required('Wallet Address is required'),
			}),
		[]
	);

	return (
		<div>
			<WalletStatistics />

			<hr className="hr-light" />

			<div className="" style={{ width: 'clamp(15rem, 50%, 22.5rem)' }}>
				<h4>Make a Withdrawal Request</h4>

				<div className="card p-4">
					{error ? <Alert variant="danger">{error}</Alert> : undefined}

					<VerticalForm formClass="" onSubmit={handleOnSubmit} resolver={yupResolver(formSchema)}>
						<FormInput
							label="Withdrawal Amount"
							type="number"
							name="withdrawalAmount"
							placeholder={'Withdrawal Amount'}
							containerClass={'mb-3'}
							onChange={(e) => handleChange('withdrawalAmount', e.target.value)}
							value={formData.withdrawalAmount}
						/>
						{formData.withdrawalAmount && (
							<p>
								{(parseFloat(formData.withdrawalAmount) * (106 / 100)).toFixed(3)} USDT will be withdrawn from your
								balance.
							</p>
						)}

						<FormInput
							label="Wallet Address"
							type="text"
							name="walletAddress"
							placeholder={'Wallet Address'}
							containerClass={'mb-3'}
							onChange={(e) => handleChange('walletAddress', e.target.value)}
							value={formData.walletAddress}
						/>
						<p>
							Make sure your wallet address is correct. Withdrawals made to wrong wallet address cannot be reversed.
						</p>

						<button className="waves-effect waves-light btn btn-success mt-4" disabled={isProcessing} type="submit">
							Widthdraw
						</button>
					</VerticalForm>
				</div>
			</div>
		</div>
	);
};

export default MyWallet;
