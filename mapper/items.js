const config = require('config');

const mapItemsResponse = data => {
	const { results } = data;
	let maxNumberOfItems = 4;
	let items = [];

	if (results && results.length) {
		items = results.slice(0, maxNumberOfItems).map(el => ({
			id: el.id,
			title: el.title,
			price: {
				currency: el.currency_id,
				amount: el.price,
				decimals: 0
			},
			picture: el.thumbnail,
			condition: el.condition,
			free_shipping: el.shipping.free_shipping
		}));
	}

	return sign({ items });
};

const mapItemResponse = (data, description) => {
	const {
		title,
		id,
		price,
		currency_id,
		secure_thumbnail,
		condition,
		free_shipping,
		sold_quantity
	} = data;
	const { plain_text } = description;
	const response = {
		item: {
			id,
			title,
			price: {
				currency: currency_id,
				amount: price,
				decimals: 0
			},
			picture: secure_thumbnail,
			condition,
			free_shipping,
			sold_quantity,
			description: plain_text
		}
	};
	return sign(response);
};

const sign = data => {
	const author = config.get('authorEndpoint');
	return { author, ...data };
};

module.exports = {
	mapItemsResponse,
	mapItemResponse
};
