class TodoItem {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description || "";
    this.dueDate = dueDate || "tomorrow";
    this.priority = priority || "low";
  }
};

module.exports = { TodoItem }