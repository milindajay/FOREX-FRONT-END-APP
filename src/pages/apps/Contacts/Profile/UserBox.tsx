import { Card } from 'react-bootstrap';

// images
import profileImg from '../../../../assets/images/users/user-1.jpg';
import { useRedux } from '../../../../hooks';
import { useMemo } from 'react';

const UserBox = () => {
	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	const { newReferralLinkA: referralLinkA, newReferralLinkB: referralLinkB } = useMemo(() => {
		const { referralLinkA, referralLinkB } = user;

		const referralLinkAUrl = new URL(referralLinkA);
		const referralLinkBUrl = new URL(referralLinkB);

		const { origin } = window.location;

		const newReferralLinkA = `${origin}/auth/register?introducer=${referralLinkAUrl.searchParams.get(
			'ref'
		)}&placement=${referralLinkAUrl.searchParams.get('type')}`;
		const newReferralLinkB = `${origin}/auth/register?introducer=${referralLinkBUrl.searchParams.get(
			'ref'
		)}&placement=${referralLinkBUrl.searchParams.get('type')}`;

		return { newReferralLinkA, newReferralLinkB };
	}, [user]);

	return (
		<Card>
			<Card.Body className="bg-picture">
				<div className="d-flex align-items-top">
					<img
						src={profileImg}
						alt="profileImage"
						className="flex-shrink-0 rounded-circle avatar-xl img-thumbnail float-start me-3"
					/>
					<div className="flex-grow-1 overflow-hidden">
						<h4 className="m-0">
							{user.firstName} {user.lastName}
						</h4>
						<p className="text-muted">
							<i>ID : {user.id}</i>
						</p>
						<p className="font-13">
							<span>
								Referral Link A{' '}
								<button
									className="btn btn-sm btn-primary"
									onClick={() =>
										navigator.clipboard
											.writeText(referralLinkA)
											.then(() => alert('Refferal link A copied successfully.'))
									}>
									Copy link
								</button>
							</span>
							<span className="mx-4">
								Referral Link B{' '}
								<button
									className="btn btn-sm btn-primary"
									onClick={() =>
										navigator.clipboard
											.writeText(referralLinkB)
											.then(() => alert('Refferal link A copied successfully.'))
									}>
									Copy link
								</button>
							</span>
						</p>

						<ul className="social-list list-inline mt-3 mb-0">
							<li className="list-inline-item">
								<Link to="#" className="social-list-item border-purple text-purple">
									<i className="mdi mdi-facebook"></i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link to="#" className="social-list-item border-danger text-danger">
									<i className="mdi mdi-google"></i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link to="#" className="social-list-item border-info text-info">
									<i className="mdi mdi-twitter"></i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link to="#" className="social-list-item border-secondary text-secondary">
									<i className="mdi mdi-github"></i>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default UserBox;
