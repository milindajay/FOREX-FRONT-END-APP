import { Col, Row } from 'react-bootstrap';
import { useRedux } from '../../hooks';
import StatisticsWidget2 from '../../components/StatisticsWidget2';

const WalletStatistics = () => {
	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	return (
		<Row>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Total Earnings"
					trendValue="35%"
					trendIcon="mdi mdi-trending-up"
					stats={user.totalEarnings}
					subTitle="USDT"
					progress={100}
				/>
			</Col>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Total Withdrawals"
					trendValue="32%"
					trendIcon="mdi mdi-trending-up"
					stats={user.totalWithdrawals}
					subTitle="USDT"
					progress={100}
				/>
			</Col>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Wallet Balance"
					trendValue="10%"
					trendIcon="mdi mdi-trending-up"
					stats={user.currentBalance}
					subTitle="USDT"
					progress={100}
				/>
			</Col>
		</Row>
	);
};

export default WalletStatistics;
