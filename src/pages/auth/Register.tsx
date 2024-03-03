import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthLayout from './AuthLayout'; // Ensure this path is correct
import Loader from '../../components/Loader'; // Ensure this path is correct
import { VerticalForm, FormInput } from '../../components/form/'; // Ensure this path is correct
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signup } from '../../helpers';
import { Navigate, redirect } from 'react-router-dom';

// Assuming UserData interface is defined somewhere in your project
interface UserData {
	introducer: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string; // Updated to match backend
	secondaryPhoneNumber: string; // Updated to match backend
	address: string;
	nationalIdentityNumber: string; // Updated to match backend
	dateOfBirth: string;
	nationality: string;
}

const RegistrationForm = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState<UserData>({
		introducer: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		mobileNumber: '',
		secondaryPhoneNumber: '',
		address: '',
		nationalIdentityNumber: '',
		dateOfBirth: '',
		nationality: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (name: keyof UserData, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const formSchema = Yup.object().shape({
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
		email: Yup.string().email('Invalid email address').required('Email is required'),
		// Define the rest of your validation schema here
	});

	const {
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(formSchema),
	});

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const response = await signup({
				...formData,
				mobileNumber: formData.mobileNumber, // Ensure correct mapping
				secondaryPhoneNumber: formData.secondaryPhoneNumber, // Ensure correct mapping
				nationalIdentityNumber: formData.nationalIdentityNumber, // Ensure correct mapping
				dateOfBirth: formData.dateOfBirth,
				nationality: formData.nationality,
			});
			console.log(response.data);
			setError(null);
			// Add any redirect or notification logic here
			return (window.location.href = '/auth/login');
		} catch (error) {
			console.error(error);
			setError('Registration failed, please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout>
			<div className="text-center mb-4">
				<h4 className="text-uppercase mt-0">Register</h4>
			</div>

			{error && <Alert variant="danger">{error}</Alert>}
			{loading && <Loader />}

			<VerticalForm onSubmit={handleSubmit}>
				<FormInput
					label={'Introducer'}
					type="text"
					name="introducer"
					placeholder={'Enter your introducer code'}
					containerClass={'mb-3'}
					onChange={(e) => handleChange('introducer', e.target.value)}
					value={formData.introducer}
				/>
				<FormInput
					label={'First Name'}
					type="text"
					name="firstName"
					placeholder={'Enter your First Name'}
					containerClass={'mb-3'}
					onChange={(e) => handleChange('firstName', e.target.value)}
					value={formData.firstName}
				/>
				<FormInput
					label={'Last Name'}
					type="text"
					name="lastName"
					placeholder={'Enter your Last Name'}
					containerClass={'mb-3'}
					onChange={(e) => handleChange('lastName', e.target.value)}
					value={formData.lastName}
				/>
				<FormInput
					label={'Email address'}
					type="email"
					name="email"
					placeholder="Enter your Email Address"
					containerClass={'mb-3'}
					onChange={(e) => handleChange('email', e.target.value)}
					value={formData.email}
				/>
				<FormInput
					label={'Password'}
					type="password"
					name="password"
					placeholder={'Enter your password'}
					containerClass={'mb-3'}
					onChange={(e) => handleChange('password', e.target.value)}
					value={formData.password}
				/>
				<FormInput
					label={'Mobile Number'}
					type="text"
					name="mobileNumber"
					placeholder="Mobile Number"
					containerClass={'mb-3'}
					onChange={(e) => handleChange('mobileNumber', e.target.value)}
					value={formData.mobileNumber}
				/>
				<FormInput
					label={'Secondary Contact Number'}
					type="text"
					name="secondaryPhoneNumber"
					placeholder="Mobile Number"
					containerClass={'mb-3'}
					onChange={(e) => handleChange('secondaryPhoneNumber', e.target.value)}
					value={formData.secondaryPhoneNumber}
				/>
				<FormInput
					label={'Permanant Address'}
					type="text"
					name="address"
					placeholder={'Enter your address'}
					containerClass={'mb-3'}
					onChange={(e) => handleChange('address', e.target.value)}
					value={formData.address}
				/>
				<FormInput
					label={'NIC Number'}
					type="text"
					name="nationalIdentityNumber"
					placeholder={'Enter your NIC Number'}
					containerClass={'mb-3'}
					onChange={(e) => handleChange('nationalIdentityNumber', e.target.value)}
					value={formData.nationalIdentityNumber}
				/>

				<FormInput
					label="Date of Birth"
					type="date"
					name="date"
					containerClass={'mb-3'}
					key="date"
					onChange={(e) => handleChange('dateOfBirth', e.target.value)}
					value={formData.dateOfBirth}
				/>
				<FormInput
					label={'I accept Terms and Conditions'}
					type="checkbox"
					name="checkboxsignup"
					containerClass={'mb-3'}
					onChange={(e) => handleChange('introducer', e.target.value)}
					value={formData.introducer}
				/>

				<div className="mb-3 text-center">
					<Button type="submit" disabled={loading}>
						Sign Up
					</Button>
				</div>
			</VerticalForm>
		</AuthLayout>
	);
};

export default RegistrationForm;
