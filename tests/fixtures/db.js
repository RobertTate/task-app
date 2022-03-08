const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Bobby',
  email: 'bobby@example.com',
  password: 'ABCD1234',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_KEY)
  }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo  = {
  _id: userTwoId,
  name: 'Robert',
  email: 'robert@example.com',
  password: 'ABCD1234',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_KEY)
  }]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First Task',
  completed: false,
  owner: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second Task',
  completed: true,
  owner: userOne._id
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third Task',
  completed: true,
  owner: userTwo._id
}

const setupTestDB = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

const tearDownTestDB = async () => {
  await mongoose.disconnect();
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupTestDB,
  tearDownTestDB
};
