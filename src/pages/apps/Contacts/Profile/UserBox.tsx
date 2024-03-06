import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// images
import profileImg from '../../../../assets/images/users/user-1.jpg';
import { useRedux } from '../../../../hooks';

const UserBox = () => {
	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

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
							<i>Member ID : {user.id}</i>
						</p>
						<p className="font-13">
							Referral Link A :  {user.id}<br />
							Referral Link B : {user.id}
						</p>

						{/* <ul className="social-list list-inline mt-3 mb-0">
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
						</ul> */}
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default UserBox;
