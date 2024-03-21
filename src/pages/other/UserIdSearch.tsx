import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const UserIdSearch = () => {
	const [, setSearchParams] = useSearchParams();
	const [userId, setUserId] = useState('');
	// const navigate = useNavigate();

	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	// Update the URL with the userId query parameter
	// };

	return (
		<form
			className="d-flex"
			style={{ gap: '1rem' }}
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const userId = formData.get('userId')?.toString();

				if (userId) setSearchParams({ userId });
				else setSearchParams('');
			}}>
			<input
				type="text"
				placeholder="Enter User ID"
				className="form-control"
				name="userId"
				value={userId}
				onChange={(e) => setUserId(e.currentTarget.value)}
			/>
			<button className="btn btn-primary" type="submit">
				Search
			</button>
		</form>
	);
};

export default UserIdSearch;
