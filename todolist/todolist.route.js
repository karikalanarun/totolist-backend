const express = require('express');
const todolist = express.Router();
const { create, updateTitle, update, remove, getTodoListsOfUser } = require("./todolist.controller")

todolist.get('/', getTodoListsOfUser);

todolist.post('/', create);

todolist.patch('/:list_id/title', updateTitle)

todolist.put('/:list_id', update)

todolist.delete('/:list_id', remove)

module.exports = todolist;
