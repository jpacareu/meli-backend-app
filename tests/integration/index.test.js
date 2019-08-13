const request = require('supertest');

let server;

describe('/*', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		await server.close();
	});

	describe('GET /index.html', () => {
		it('should return an index.html file', async () => {

            const res = await request(server).get(`/index.html`);
            
			expect(res.status).toBe(200);
			expect(res.text).toContain("Buscador Mercado Libre");
		});
	});
});
