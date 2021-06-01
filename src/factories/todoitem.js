import { v4 as uuidv4 } from 'uuid';

export default class TodoItem {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description || "";
    this.dueDate = dueDate || new Date();
    this.priority = priority || "low";
    this.done = false;
    this.uuid = uuidv4();
  }

  setName = (name) => {
    this.name = name;
  }

  setDescription = (description) => {
    this.description = description
  }

  setDueDate = (date) => {
    this.dueDate = date;
  }

  setPriority = (priority) => {
    this.priority = priority;
  }

  toggleDone = () => {
    this.done = (this.done) ? false : true;
  }
};


module.exports = { TodoItem }