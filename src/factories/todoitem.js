import { v4 as uuidv4 } from 'uuid';

class TodoItem {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description || "";
    this.dueDate = dueDate || "tomorrow";
    this.priority = priority || "low";
    this.done = false;
    this.uuid = uuidv4();
  }
};

module.exports = { TodoItem }