const { response } = require('express');
const User = require('../models').User;

async function getUsers() {
    let response = {};
    try {
        const users = await User.findAll();
        response.succeded = true
        response.data = users
      } catch (err) {
        response.succeded = false
        response.failure = err.message
      }
      return response;
}

async function getUser(req) {
    let response = {};
    try {
        const users = await User.findOne(req);
        response.succeded = true
        response.data = users
      } catch (err) {
        response.succeded = false
        response.failure = err.message
      }
      return response;
}

module.exports = {
    getUser,
    getUsers
}