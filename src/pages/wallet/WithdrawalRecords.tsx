import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRedux } from '../../hooks';

type WithdrawalRecord = {
	amount: number;
	date: Date;
	status: string;
	wallet_address: string;
};

const WithdrawalRecords = () => {
	const [records, setRecords] = useState<WithdrawalRecord[]>([]);

	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	useEffect(() => {
		axios
			.get(`/payment/get-withdrawals/${user.id}`)
			.then((res) => setRecords(res?.data?.withdrawals ?? []))
			.catch((err) => console.error(err));
	}, [user.id]);

	return (
		<div className="" style={{ flexGrow: '1' }}>
			<h4>Withdrawal Records</h4>

			<div className="card">
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Wallet Address</th>
								<th scope="col">Amount</th>
								<th scope="col">Date</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{records.map((record, i) => {
								const date = new Date(record.date);
								return (
									<tr>
										<th scope="row" key={date.getTime()}>
											{i + 1}
										</th>
										<td>{record.wallet_address}</td>
										<td>{record.amount} USD</td>
										<td>{date.toLocaleString()}</td>
										<td>
											<h4 className="my-0">
												<span
													className={`badge ${
														record.status === 'Completed'
															? 'badge-soft-success'
															: record.status === 'Pending'
															? 'badge-soft-secondary'
															: 'badge-soft-danger'
													}`}>
													{record.status}
												</span>
											</h4>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default WithdrawalRecords;
