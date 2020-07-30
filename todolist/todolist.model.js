const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text_history: [String],
    completed: Boolean
})

TodoSchema.add({ todos: [TodoSchema] })

const TodoListSchema = new Schema({
    title: String,
    todos: [TodoSchema],
    created_by: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
}, { timestamps: true });

const TodoList = mongoose.model('TodoList', TodoListSchema);



module.exports = TodoList