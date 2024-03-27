import React from 'react';
import { useForm, Resolver, SubmitHandler, UnpackNestedValue, DeepPartial } from 'react-hook-form';

type VerticalFromProps<TFormValues> = {
	defaultValues?: UnpackNestedValue<DeepPartial<TFormValues>>;
	resolver?: Resolver<TFormValues>;
	children?: React.ReactNode;
	onSubmit: SubmitHandler<TFormValues>;
	formClass?: string;
};

const VerticalForm = <TFormValues extends Record<string, any> = Record<string, any>>({
	defaultValues,
	resolver,
	children,
	onSubmit,
	formClass,
}: VerticalFromProps<TFormValues>) => {
	/*
	 * form methods
	 */
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<TFormValues>({ defaultValues, resolver });

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
			{Array.isArray(children)
				? children.map((child) => {
						return child.props && child.props.name
							? React.createElement(child.type, {
									...{
										...child.props,
										register,
										key: child.props.name,
										errors,
										control,
									},
							  })
							: child;
				  })
				: children}
		</form>
	);
};

export default VerticalForm;
