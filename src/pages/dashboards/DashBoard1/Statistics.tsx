import { Col, Row } from 'react-bootstrap';

// component
// import StatisticsWidget1 from '../../../components/StatisticsWidget1';
import StatisticsWidget2 from '../../../components/StatisticsWidget2';
import { useRedux } from '../../../hooks';
// import { useMemo } from 'react';

const Statistics = () => {
	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	return (
		<Row>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Direct Sales"
					trendValue="35%"
					trendIcon="mdi mdi-trending-up"
					stats={user.directSaleCommission}
					subTitle="Total Direct Sales"
					progress={100}
				/>
			</Col>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Binary Earnings"
					trendValue="10%"
					trendIcon="mdi mdi-trending-up"
					stats={user.binaryCommission}
					subTitle="Binary Earnings"
					progress={100}
				/>
			</Col>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Total Cashback"
					trendValue="32%"
					trendIcon="mdi mdi-trending-up"
					stats={user.cashBack}
					subTitle="Total Cashback"
					progress={100}
				/>
			</Col>
			<Col xl={3} md={6}>
				<StatisticsWidget2
					variant="success"
					title="Current Balance"
					trendValue="10%"
					trendIcon="mdi mdi-trending-up"
					stats={user.currentBalance}
					subTitle="Current Balance"
					progress={100}
				/>
			</Col>
		</Row>
	);
};

export default Statistics;
