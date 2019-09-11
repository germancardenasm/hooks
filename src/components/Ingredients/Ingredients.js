import React, { useState, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
	const [ingredients, setIngredientsState] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setIsLoading(true);
		fetch('https://hookspractice.firebaseio.com/ingredients.json')
			.then(response => response.json())
			.then(responseData => {
				const fetchedIngredients = [];
				for (var key in responseData) {
					fetchedIngredients.push({
						id: key,
						title: responseData[key].title,
						amount: responseData[key].amount
					});
				}
				setIngredientsState(fetchedIngredients);
				setIsLoading(false);
			})
			.catch(error => setError('Something went wrong!'));
	}, []);

	const onAddIngredient = ing => {
		setIsLoading(true);
		fetch('https://hookspractice.firebaseio.com/ingredients.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(ing)
		})
			.then(response => response.json())
			.then(responseData => {
				setIngredientsState([
					...ingredients,
					{ id: responseData.name, ...ing }
				]);
				setIsLoading(false);
			})
			.catch(error => setError('Something went wrong!'));
	};

	const onRemoveIngredients = idIng => {
		setIsLoading(true);
		fetch(
			`https://hookspractice.firebaseio.com/ingredients/${idIng}.json`,
			{
				method: 'DELETE'
			}
		)
			.then(response => {
				setIngredientsState(prevState => {
					const newIngredientList = prevState.filter(
						ing => ing.id !== idIng
					);
					return newIngredientList;
				});
				setIsLoading(false);
			})
			.catch(error => setError('Something went wrong!'));
	};

	const onLoadIngredients = useCallback(ing => {
		setIngredientsState(ing);
	}, []);

	const onCloseHandler = () => {
		setError(null);
		setIsLoading(false);
	};

	return (
		<div className='App'>
			{error && <ErrorModal onClose={onCloseHandler}>{error}</ErrorModal>}
			<IngredientForm
				addIngredient={onAddIngredient}
				loading={isLoading}
			/>

			<section>
				<Search onLoadIngredients={onLoadIngredients} />
				<IngredientList
					ingredients={ingredients}
					onRemoveItem={onRemoveIngredients}
				/>
			</section>
		</div>
	);
};

export default Ingredients;
