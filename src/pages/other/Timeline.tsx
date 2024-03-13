import React, { useEffect, useState, FC } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
// import { useMemo } from 'react';
import { usePageTitle } from '../../hooks';
import { useRedux } from '../../hooks'; // Make sure the import path matches where you have defined useRedux
import ReferralNode from './ReferralNode';

export interface MemberData {
	member_id: string;
	first_name: string;
	last_name: string;
	referral_type: string;
	introducer: number;
	children?: MemberData[];
	sideAPoints?: number;
	sideBPoints?: number;
	sideARemaining?: number;
	sideBRemaining?: number;
}

const ReferralTree: FC = () => {
	usePageTitle({
		title: 'My Referrals',
		breadCrumbItems: [
			{
				path: '/pages/timeline',
				label: 'My Referrals',
				active: true,
			},
		],
	});

	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	const [referralData, setReferralData] = useState<MemberData[] | null>(null);

	useEffect(() => {
		console.log(user); // Add this to check what the user object contains at the time of the call
	
		if (!user) {
			console.log('User data is not available in Redux state.');
			return;
		}
	
		const fetchReferralTree = async () => {
			try {
				const response = await axios.get(`/referral-tree/${user.id}`);
				setReferralData(response.data);
			} catch (error) {
				console.error('Error fetching referral tree:', error);
			}
		};
	
		fetchReferralTree();
	}, [user]);
	
	

	return (
		<Card>
			<Card.Header>
				<Card.Title>Referral Tree</Card.Title>
			</Card.Header>
			<Card.Body>
				{user ? (
					referralData ? (
						<ReferralNode members={referralData} />
					) : (
						<p>Loading referral tree...</p>
					)
				) : (
					<p>User is not logged in.</p>
				)}
			</Card.Body>
		</Card>
	);
};

export default ReferralTree;
