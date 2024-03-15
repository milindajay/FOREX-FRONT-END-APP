import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const verificationToken = useMemo(() => searchParams.get('token'), [searchParams]);

	useEffect(() => {
		if (verificationToken) {
			axios
				.get(`/verify/verify?token=${verificationToken}`)
				.then((res) => {
					alert(res.data.message);
					navigate('/auth/login');
				})
				.catch((err) => console.error(err));
		}
	}, [navigate, verificationToken]);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<h1>Verifying your email</h1>
		</div>
	);
};

export default VerifyEmail;
