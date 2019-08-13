const express = require('express');
const router = express.Router();
const { getItems, getItem, getItemDescription } = require('../gateway/items');
const { mapItemsResponse, mapItemResponse } = require('../mapper/items');
const { mapCategoriesItems, mapCategoriesItem } = require('../mapper/categories');
const { getCategories } = require('../gateway/categories');

router.get('/', async (req, res) => {
	
	if (!req.query.q)
		return res.status(404).send({ message: "Field 'q' is required" });

	const data = await getItems(req.query.q);
	
	if (!data) return res.status(404).send({ message: 'Not found' });

	const categories = await mapCategoriesItems(data);
	const mappedData = { ...(await mapItemsResponse(data)), categories };
	res.send(mappedData);
});

router.get('/:id', async (req, res) => {
	if (!req.params.id)
		return res.status(404).send({ message: "Field 'id' is required" });

	const data = await getItem(req.params.id);
	if (!data) return res.status(404).send({ message: 'The item was not found' });

	const description = await getItemDescription(req.params.id);
  
	if (!description)
		return res
			.status(404)
			.send({ message: "The item's description was not found" });
			
	const categoriesResp = await getCategories(data.category_id);
	const categories = await mapCategoriesItem(categoriesResp);
	const mappedData = {...await mapItemResponse(data, description), categories};
	res.send(mappedData);
});

module.exports = router;
