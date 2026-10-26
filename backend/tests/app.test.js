const request = require('supertest');
const app = require('../app');
const { validateSignup } = require('../routes/authRoutes');
const { validatePost } = require('../routes/postRoutes');

describe('API', () => {
  test('health endpoint responds OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('unauthenticated user cannot create a post', async () => {
    const res = await request(app).post('/api/posts').send({ title: 'x' });
    expect(res.statusCode).toBe(401);
  });
});

test('me endpoint says 401 when not logged in', async () => {
  const res = await request(app).get('/api/auth/me');
  expect(res.statusCode).toBe(401);
});

describe('validateSignup', () => {
  const good = { name: 'Ann', email: 'ann@test.com', password: 'secret1', confirmPassword: 'secret1' };

  test('accepts valid input', () => expect(validateSignup(good)).toEqual([]));
  test('rejects bad email', () => expect(validateSignup({ ...good, email: 'nope' }).length).toBe(1));
  test('rejects short password', () => expect(validateSignup({ ...good, password: '123', confirmPassword: '123' }).length).toBe(1));
  test('rejects mismatched passwords', () => expect(validateSignup({ ...good, confirmPassword: 'other' }).length).toBe(1));
});

describe('validatePost', () => {
  const good = { title: 'Paris', destination: 'France', description: 'Lovely', imageUrl: 'https://a.com/p.jpg' };

  test('accepts valid input', () => expect(validatePost(good)).toEqual([]));
  test('rejects empty post', () => expect(validatePost({}).length).toBeGreaterThan(0));
  test('rejects non-http image URL', () => expect(validatePost({ ...good, imageUrl: 'javascript:alert(1)' }).length).toBe(1));
});
