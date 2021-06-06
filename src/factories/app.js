class App {
  constructor() {
    this.lists = [];
    this.currentList;

    this.addLists = (array, List) => {
      this.lists = array.map(list => new List(list.name))
    }

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

    this.getList = (listName) => {
      return this.lists.find((list) => list.name === listName);
    }

    this.removeList = (listName) => {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].name === listName) {
          this.lists.splice(i, 1);
          console.log('gone?')
        }
      }
      console.log(this.lists);
    }


  }
}

module.exports = { App }