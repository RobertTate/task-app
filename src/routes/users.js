const { Router } = require('express');
const User = require('../models/user');

const usersRouter = Router()

usersRouter.post('/', (req, res) => {
  new User(req.body).save()
  .then((response) => {
    res.status(201).send(response);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
});

usersRouter.get('/', (req, res) => {
  User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((error) => {
    res.status(500).send(error);
  })
});

usersRouter.get('/:id', (req, res) => {
  const { id: _id } = req.params;

  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  }).catch((error) => {
    res.status(500).send(error)
  })
});

module.exports = { usersRouter };
