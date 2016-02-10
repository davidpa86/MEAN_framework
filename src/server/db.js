var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');

var Todo = moongosse('Todo',{
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
});

module.exports.Todo = Todo;
