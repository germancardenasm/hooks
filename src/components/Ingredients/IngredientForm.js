import React, { useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
	const [title, setTitleState] = useState('');
	const [amount, setAmountState] = useState('');

	const submitHandler = event => {
		event.preventDefault();
		props.addIngredient({ title: title, amount: amount });
	};

	return (
		<section className='ingredient-form'>
			<Card>
				<form onSubmit={submitHandler}>
					<div className='form-control'>
						<label htmlFor='title'>Name</label>
						<input
							type='text'
							id='title'
							value={title}
							onChange={event => {
								setTitleState(event.target.value);
							}}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							value={amount}
							onChange={event => {
								setAmountState(event.target.value);
							}}
						/>
					</div>
					<div className='ingredient-form__actions'>
						<button type='submit' onSubmit={submitHandler}>
							Add Ingredient
						</button>
						{props.loading && <LoadingIndicator />}
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;
