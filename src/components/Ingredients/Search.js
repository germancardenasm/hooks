import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
	const [searchInput, setSearchInput] = useState('');
	const searchInputRef = useRef();
	const { onLoadIngredients } = props;

	useEffect(() => {
		const query =
			searchInput.length === 0
				? ''
				: `?orderBy="title"&equalTo="${searchInput}"`;
		fetch('https://hookspractice.firebaseio.com/ingredients.json' + query)
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
				onLoadIngredients(fetchedIngredients);
			});
	}, [searchInput, onLoadIngredients]);

	return (
		<section className='search'>
			<Card>
				<div className='search-input'>
					<label>Filter by Title</label>
					<input
						ref={searchInputRef}
						type='text'
						value={searchInput}
						onChange={event => setSearchInput(event.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
