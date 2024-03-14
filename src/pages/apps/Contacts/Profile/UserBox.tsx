import { Card, Button } from 'react-bootstrap';

// images
import profileImg from '../../../../assets/images/users/user-1.jpg';
import { useRedux } from '../../../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { formatISO, parseISO } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PaymentData {
	product_name: string;
	administrationFee: number;
	processingFee: number;
	total: number;
	stripeTotal: number;
	product_price: number;
}

const safelyFormatDate = (dateStr: string) => {
	// Check for falsy values or invalid dates
	if (!dateStr || isNaN(Date.parse(dateStr))) {
		return 'N/A'; // Return a placeholder or the original invalid dateStr
	}

	// Parse and format the date
	try {
		return formatISO(parseISO(dateStr), { representation: 'date' });
	} catch (error) {
		console.error('Error formatting date:', error);
		return 'Invalid date';
	}
};
const UserBox = (props: any) => {
	const { appSelector } = useRedux();
	const [paymentDetails, setPaymentDetails] = useState<PaymentData | undefined>(undefined);
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	const navigate = useNavigate();

	const { newReferralLinkA: referralLinkA, newReferralLinkB: referralLinkB } = useMemo(() => {
		const { id } = user;

		const { origin } = window.location;

		const newReferralLinkA = `${origin}/auth/register?introducer=${id}&placement=A`;
		const newReferralLinkB = `${origin}/auth/register?introducer=${id}&placement=B`;

		return { newReferralLinkA, newReferralLinkB };
	}, [user]);

	useEffect(() => {
		axios.get<PaymentData>(`/payment/get-products/${user.currentPlan}`).then((res) => {
			setPaymentDetails(res.data);
		});
	}, [user.currentPlan]);

	return (
		<>
			<Card>
				<Card.Body className="bg-picture">
					<div className="d-flex align-items-top">
						<img
							src={profileImg}
							alt="profileImage"
							className="flex-shrink-0 rounded-circle avatar-xl img-thumbnail float-start me-3"
						/>
						<div className="flex-grow-1 overflow-hidden">
							<h2>
								{user.firstName} {user.lastName}
							</h2>
							<h3>
								Member ID <span className="badge badge-outline-secondary"> {user.id}</span>
							</h3>
							<h5>
								Profile Status <span className="badge badge-soft-success">{user.profile_status}</span>
							</h5>
							<hr />
							{user.currentPlanData && paymentDetails ? (
								<Card>
									<Card.Body>
										<Button onClick={() => navigate('/auth/payment')}>
											Upgrade Plan (${paymentDetails.product_price})
										</Button>
									</Card.Body>
								</Card>
							) : (
								<Button onClick={() => navigate('/auth/payment')}>Activate Account</Button>
							)}
							<hr />
							<div className="button-list">
								<Button
									variant="outline-success"
									size="sm"
									className="waves-effect waves-light"
									onClick={() =>
										navigator.clipboard
											.writeText(referralLinkA)
											.then(() => alert('Refferal link A copied successfully.'))
									}>
									Copy Referral Link A
								</Button>
								<Button
									variant="outline-success"
									size="sm"
									className="waves-effect waves-light"
									onClick={() =>
										navigator.clipboard
											.writeText(referralLinkB)
											.then(() => alert('Refferal link B copied successfully.'))
									}>
									Copy Referral Link B
								</Button>
							</div>
							<hr />
							<div className="inbox-widget">
								<div className="inbox-item">
									<h4 className="inbox-item-author mb-1">
										Introducer: <span>{user.introducer}</span>{' '}
									</h4>
									<h4 className="inbox-item-author mb-1">
										Registration Date: <span>{safelyFormatDate(user.registrationDate)}</span>
									</h4>
								</div>
								<div className="inbox-item">
									<h4 className="inbox-item-author mb-1">
										Email Address: <span>{user.email}</span>
									</h4>

									<h4 className="inbox-item-author mb-1">
										Mobile Number: <span>{user.mobileNumber}</span>
									</h4>

									<h4 className="inbox-item-author mb-1">
										Secondary Mobile Number: <span>{user.secondaryPhone}</span>
									</h4>

									<h4 className="inbox-item-author mb-1">
										Address: <span>{user.address}</span>
									</h4>

									<h4 className="inbox-item-author mb-1">
										Date of Birth: <span>{safelyFormatDate(user.dateOfBirth)}</span>
									</h4>

									<h4 className="inbox-item-author mb-1">
										National Identity Card Number: <span>{user.nationalIdentityNumber}</span>
									</h4>
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};

export default UserBox;
