const axios = require('axios').default;
const config = require('config');
const apiBase = config.get('apiBase');

const apiCall = async (route) => {
	try {
		const { data } = await axios.get(route);
		return data;
	} catch (error) {
		return null;
	}
}

module.exports = {
	getItems: async (query = '') => {
		return await apiCall(`${apiBase}/sites/MLA/search?q=${query}`)
	},
	getItem: async (id = '') => {
		return await apiCall(`${apiBase}/items/${id}`)
	},
	getItemDescription: async (id = '') => {
		return await apiCall(`${apiBase}/items/${id}/description`)
	}
};
