import orchestrator from 'tests/orchestrator.js';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe('POST /api/v1/status', () => {
  describe('Anonymous user', () => {
    test('Retrieving current system status', async () => {
      const response = await fetch('http://localhost:3000/api/v1/status', { method: 'POST' });
      expect(response.status).toBe(405); //método não permitido
    });
  });
});

/* eslint-disable */
//
// test.only('Teste de SQL Injection', async () => {
//   await fetch('http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --'');
// });
/* eslint-enable */
