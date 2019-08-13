const axios = require('axios').default;
const config = require('config');
const apiBase = config.get('apiBase');

module.exports = {
	getCategories: async (categoryId = '') => {
		try {
			const { data } = await axios.get(`${apiBase}/categories/${categoryId}`);
			return data;
		} catch (error) {
			return null;
		}
	}
};
