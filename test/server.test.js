const supertest = require('supertest');

const request = supertest('localhost:8080')

test('Servidor rodando!', () => {
 return request.get('/').then(res => expect(res.status).toBe(200));
});
