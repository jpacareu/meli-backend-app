const { getCategories } = require('../gateway/categories');

const mapCategoriesItems = async data => {
	let categories = [];
	const { available_filters: filters } = data;
	if (filters.length) {
		const listOfSearchResultCategories = filters.find(
			el => el.id === 'category'
		);
		if (listOfSearchResultCategories) {
			const topResultsCategory = listOfSearchResultCategories.values[0];
			try {
				const { path_from_root } = await getCategories(topResultsCategory.id);
				categories = path_from_root.map(categ => categ.name);
				return categories;
			} catch (error) {
				categories = [];
			}
		}
	}
	return categories;
};

const mapCategoriesItem = categoriesResp => {
	let categories = [];
	const { path_from_root } = categoriesResp;
	if(path_from_root && path_from_root.length){
		categories = path_from_root.map(el => el.name);
	}
	return categories;
};

module.exports = {
	mapCategoriesItems,
	mapCategoriesItem
};
