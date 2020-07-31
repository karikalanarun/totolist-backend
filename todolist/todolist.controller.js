const { internalErr, makeResponse } = require("../utils");
const TodoList = require("./todolist.model");
const User = require("../user/user.model")

/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will create a todo list
 */
const create = async ({ body: { title, todos }, user: { id: created_by } }, res) => {
    try {
        const session = await User.startSession();
        const todoList = new TodoList({ title, todos, created_by })
        await todoList.save({ session });
        await User.updateOne({ _id: created_by }, { $push: { todos: todoList.id } }).session(session)
        res.send(makeResponse({ created: todoList.id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will update a title of a todo list
 */
const updateTitle = async ({ params: { list_id }, body: { title } }, res) => {
    try {
        await TodoList.updateOne({ _id: list_id }, { title })
        res.send(makeResponse({ udpated: list_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}


/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will add todo to todolist
 */
const addTodo = async ({ body: { text_history, todos, completed }, params: { list_id } }, res) => {
    try {
        await TodoList.updateOne({ _id: list_id }, { $push: { todos: { text_history, todos, completed } } })
        res.send(makeResponse({ udpated: list_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will update a todo 
 */
const updateTodo = async ({ body: { text_history, todos, completed }, params: { list_id, todoId } }, res) => {
    try {
        await TodoList.updateOne({ _id: list_id, todos: { _id: todoId } }, { $set: { "todos.$": { text_history, todos, completed } } })
        res.send(makeResponse({ udpated: list_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will update the list
 */
const update = async ({ body: { title, todos }, params: { list_id } }, res) => {
    try {
        await TodoList.updateOne({ _id: list_id }, { title, todos })
        res.send(makeResponse({ udpated: list_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}


/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will remove the entire given list
 */
const remove = async ({ params: { list_id } }, res) => {
    try {
        const session = await User.startSession();
        const todoList = TodoList.findById(list_id)
        await TodoList.deleteOne({ _id: list_id }).session(session)
        await User.updateOne({ _id: todoList.created_by }, { $pull: { todos: todoList.id } }).session(session)
        res.send(makeResponse({ deleted: list_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * @route
 * @param {Object} req 
 * @param {Object} res 
 * @description this will fetch all todo lists of a user
 */
const getTodoListsOfUser = async ({ user: { id: created_by } }, res) => {
    try {
        const lists = await TodoList.find({ created_by });
        res.send(makeResponse(lists))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}


const getTodoListOfFriends = async ({ user: { id } }, res) => {
    try {
        const friendIds = (await User.findById(id, "friends")).friends;
        console.log("friendIds ::: ", friendIds)
        const todoLists = await TodoList.find({ created_by: { $in: friendIds.map(friend => friend._id) } }).populate("created_by", ["id", "email", "first_name", "second_name", "last_name"])
        res.send(makeResponse(todoLists))
    } catch (error) {
        console.log("error ::: ", error)
        internalErr(res);
    }
}



module.exports = { create, updateTitle, update, remove, getTodoListsOfUser, getTodoListOfFriends }