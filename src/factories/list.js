class List {
  constructor(name) {
    this.name = name || "default";
    this.items = [];

    this.getItems = () => items;

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

    this.deleteTodo = (todoID) => {
      const todo = this.items.filter((item) => item.uuid === todoID)[0];
      const index = this.items.indexOf(todo);
      if (index > - 1) this.items.splice(index, 1);
      console.log(todo, index, this.items);
    };
  }
};

module.exports = { List }