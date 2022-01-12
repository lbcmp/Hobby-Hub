const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;
const { Op } = require("sequelize");

router.get('/', (req, res) => {
  //get users
  User.findAll()
  .then(users => {
    res.json(users)
  })
  .catch(e => {
    res.json({message: "error"})
  })
})

router.post('/', (req, res) => {  
  //create user
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const email = req.body.email;
  const password = req.body.password;

  User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    age:age,
    email: email,
    password: password
  })
  .then(user => {
    res.status(201).json(user);
  })
  .catch(e => {
    res.status(400).json({error: e, message: e.message});
  })
});

router.get('/:username/:email', (req, res) => {
  //check if username and email exist

  console.log(req.params.username)
  console.log(req.params.email)

  User.findAll({
    where: {
      [Op.or]: [
        {username: req.params.username},
        {email: req.params.email}
      ]
    },
  })
  .then((users) => {
    const usernames = users.map(u => u.dataValues.username)
    const emails = users.map(u => u.dataValues.email)
    const duplicateUsernameExists = usernames.indexOf(req.params.username) !== -1 ? true : false;
    const duplicateEmailExists = emails.indexOf(req.params.email) !== -1 ? true : false;

    res.json({duplicateUsername: duplicateUsernameExists, duplicateEmail: duplicateEmailExists})
  })
  .catch(e => {
    res.json({message: 'User Does not Exist'})
  })
})

router.get('/:id', (req, res) => {
  //get user by id
  User.findByPk(req.params.id)
  .then(user => {
    if (!user) {
      return res.status(404);
    }
    res.json(user)
  })
  .catch(e => {
    res.json(e)
  })
});

module.exports = router;