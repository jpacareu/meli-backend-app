const request = require('supertest');
const config = require('config');

let server;

describe('/api/items', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		await server.close();
	});

	describe('GET /', () => {
		it('should return 404 if no \'q\' provided', async () => {
			const query = "";

			const res = await request(server).get(`/api/items?q=${query}`);
			expect(res.status).toBe(404);
		});

		it('should return 4 items', async () => {
			const query = "Detergente";

			const res = await request(server).get(`/api/items?q=${query}`);
			expect(res.status).toBe(200);
			expect(res.body.items.length).toBe(4);
		});

		it('should sign the service with the \'author\' provided', async () => {
			const query = "Detergente";
			const author = config.get('authorEndpoint');

			const res = await request(server).get(`/api/items?q=${query}`);

			expect(res.body).toHaveProperty('author', author);
		});

	});

	 describe('GET /:id', () => {
		it('should return 404 if no id is passed', async () => {
			const res = await request(server).get('/api/items/');
	
			expect(res.status).toBe(404);
		});

		it('should return 404 if item is not found', async () => {
			const unexistingId = "XXXYYYZZZ"
			const res = await request(server).get(`/api/items/${unexistingId}`);

			expect(res.status).toBe(404);
		});

		it('should return 200 if item is found', async () => {
			const unexistingId = "MLA664363581"
			const res = await request(server).get(`/api/items/${unexistingId}`);

			expect(res.status).toBe(200);
		});


	// 	it('should return 404 if no genre with the given id exists', async () => {
	// 		const id = mongoose.Types.ObjectId();
	// 		const res = await request(server).get('/api/genres/' + id);

	// 		expect(res.status).toBe(404);
	// 	});
	});
});
