const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { 
  userOne,
  userTwo,
  taskOne,
  setupTestDB,
  tearDownTestDB
} = require('./fixtures/db');

beforeEach(setupTestDB);
afterAll(tearDownTestDB);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Test Task'
    })
    .expect(201);
  
  const task = await Task.findById(response.body._id);
  
  expect(task).not.toBeNull();
});

test('Should get all tasks for user one', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test('User Two should not be able to delete a task owned by User One', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  
  expect(task).not.toBeNull();
});
