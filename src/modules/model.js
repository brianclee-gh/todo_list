const transferTodo = (list1, list2, todo) => {
  list1.addTodo(todo);
  list2.deleteTodo(todo.uuid);
};

module.exports = { transferTodo }