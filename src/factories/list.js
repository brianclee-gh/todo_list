class List {
  constructor(name) {
    name = name || "default";
    this.items = [];

    this.getName = () => name;
    this.getItemsLength = () => items.length;

    this.addTodo = (todo) => {
      // if item name does not currently exist, add it
      let itemExists = this.items.some((item) => item.name === todo.name);

      if (itemExists) {
        console.log('please choose an unique name')
        return;
      }

      this.items.push(todo);
    };

    this.deleteTodo = (todo) => {
      const index = this.items.indexOf(todo);
      if (index > - 1) this.items.splice(index, 1);
    };
  }
};

module.exports = { List }