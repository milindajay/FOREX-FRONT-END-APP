import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import StatisticsChart from './StatisticsChart';
import RevenueChart from './RevenueChart';
// import Users from './Users';
// import Inbox from './Inbox';
// import Projects from './Projects';

// dummy data
// import { projectDetails } from './data';

const DashBoard1 = () => {
	// set pagetitle
	usePageTitle({
		title: 'DashBoard',
		breadCrumbItems: [
			{
				path: '/dashboard',
				label: 'DashBoard',
				active: true,
			},
		],
	});

	return (
		<>
			<Statistics />

			<Row>
				<Col xl={4}>
					<SalesChart />
				</Col>
				<Col xl={4}>
					<StatisticsChart />
				</Col>
				<Col xl={4}>
					<RevenueChart />
				</Col>
			</Row>

			{/* <Users /> */}
		</>
	);
};

export default DashBoard1;
