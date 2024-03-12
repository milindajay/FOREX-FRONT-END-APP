import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// images
import LogoDark from '../../assets/images/logo-dark.png';
import LogoLight from '../../assets/images/logo-light.png';

type AccountLayoutProps = {
	hasLogo?: boolean;
	bottomLinks?: any;
	children?: React.ReactNode;
};

const AuthLayout = ({ hasLogo, bottomLinks, children }: AccountLayoutProps) => {
	// const { t } = useTranslation();

	useEffect(() => {
		if (document.body) {
			document.body.classList.add('authentication-bg');
		}
		return () => {
			if (document.body) {
				document.body.classList.remove('authentication-bg');
			}
		};
	}, []);

	return (
		<div className="account-pages my-5">
			<Container>
				<Row className="justify-content-center">
					<Col md={8} lg={6} xl={4}>
						<Card className="shadow-lg">
							{hasLogo && (
								<div className="text-center">
									<div className="auth-logo">
										<Link to="/" className="logo logo-dark text-center">
											<span className="logo-lg">
												<img src={LogoDark} alt="" height="80" />
											</span>
										</Link>

										<Link to="/" className="logo logo-light text-center">
											<span className="logo-lg">
												<img src={LogoLight} alt="" height="80" />
											</span>
										</Link>
									</div>
								</div>
							)}
							<Card.Body className="p-4">{children}</Card.Body>
						</Card>

						{bottomLinks}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

AuthLayout.defaultProps = {
	hasLogo: true,
};

export default AuthLayout;
