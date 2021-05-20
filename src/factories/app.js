class App {
  constructor() {
    this.lists = [];
    this.currentList;

    this.addList = (list) => {
      let listExists = this.lists.some((ele) => ele.getName() === list.getName());
      if (listExists) {
        console.log('please choose an unique name');
        return;
      }
      this.lists.push(list);
    }
    this.setCurrentList = (list) => {
      if (this.lists.some((ele) => ele.name === list.name)) {
        this.currentList = list;
      }
    }
  }
}

module.exports = { App }