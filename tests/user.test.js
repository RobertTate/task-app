const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, setupTestDB, tearDownTestDB } = require('./fixtures/db');

beforeEach(setupTestDB);
afterAll(tearDownTestDB);

test('Should Sign Up a New User', async () => {
  const response = await request(app)
    .post('/users/signup')
    .send({
      name: 'Robert',
      email: 'rt@example.com',
      password: 'ABCD1234'
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);

  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Robert',
      email: 'rt@example.com'
    },
    token: user.tokens[0].token
  });
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistant user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'nope@nope.com',
      password: 'ABCD1234'
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test('Should not delete account for unauthenticate user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Rob'
    })
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user.name).toEqual('Rob');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Philadelphia'
    })
    .expect(400);
});
