import { getCheckedRadio, returnFormValue, printTarget, addEventListenerList } from './modules/helpers'
import { createCardBtns, createTodoCard } from './modules/cardHelpers'
import { App } from './factories/app'
import { List } from './factories/list'
// import { TodoItem } from './factories/todoitem'
import { v4 as uuidv4 } from 'uuid'


// TODO:
// Local storage
// All
// Format Right sidebar
// Edit

// Factories

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

// HANDLE CREATION

const formatDateEnding = (date) => {
  const dateEnd = parseInt(date.split(' ')[1]);

  if (dateEnd === 1 || dateEnd === 21) { return 'st'; }
  if (dateEnd === 2 || dateEnd === 22) { return 'nd'; }
  if (dateEnd === 3 || dateEnd === 23) { return 'rd'; }
  return 'th';
};

const formatDate = (dateInput) => {
  const date = dateInput === '' ? new Date() : new Date(dateInput + 'PST');
  const options = {
    month: 'short',
    day: 'numeric',
    // year: 'numeric'
  };
  let newDate =  date.toLocaleDateString('en-US', options);
  return newDate + formatDateEnding(newDate);
};

const createNewTodo = () => {

  const todoTitle = returnFormValue('todoTitle');
  const description = returnFormValue('description');
  // const dueDate = new Date(returnFormValue('dueDate'));
  const dueDate = formatDate(returnFormValue('dueDate'))
  // const dueDate = (returnFormValue('dueDate') !== '') ? formatDate(returnFormValue('dueDate')) : '';
  const priority = getCheckedRadio('priority');

  if (todoTitle === null || todoTitle === '') { return; }

  return new TodoItem(todoTitle, description, dueDate, priority);

};

// HANDLE USER INPUT

const handleFormSubmit = () => {

  const newTodo = createNewTodo();

  if (newTodo) {
    currentList.addTodo(newTodo);
    refreshTodos();
    addCardListeners();
  }

};

// VIEW

const refreshTodos = () => {
  const display = document.getElementById('todoDisplay');

  display.innerHTML = '';

  if (currentList.items.length === 0) { return }

  currentList.items.forEach((item) => {
    display.appendChild(createTodoCard(item));
  })

};

const handleCheckboxClick = (todoID) => {
  const todo = currentList.items.filter((item) => item.uuid === todoID)[0];
  console.log(todo)
  todo.done = todo.done ? false : true;
};

const titleStrike = (todoID) => {
  const targetTodo = document.body.querySelector(`.todoCard[data-uuid="${todoID}"]`)
  targetTodo.classList.toggle('strike');
};

const removeCard = (node) => {
  node.remove();
};

// INITIAL

const addCardListeners = () => {

  // mark card as done (needs reload on every re-render of todos)
  const cardCheckbox = document.querySelectorAll('.todoCheckbox');
  addEventListenerList(cardCheckbox, 'change', function(e) {
    const todoID = e.target.closest('.todoCard').getAttribute('data-uuid');
    handleCheckboxClick(todoID);
    titleStrike(todoID);
  });

  const deleteTodoBtn = document.querySelectorAll('.deleteBtn');
  addEventListenerList(deleteTodoBtn, 'click', function(e) {
    const node = e.target.closest('.todoCard')
    const todoID = e.target.closest('.todoCard').getAttribute('data-uuid');
    removeCard(node); // view
    currentList.deleteTodo(todoID); // model
  });

  // expand cards on click (needs reload on every re-render of todos)

  const todoCards = document.querySelectorAll('.todoCard');
  addEventListenerList(todoCards, "click", function(e) {
    if (e.target.classList.contains('todoCheckbox')) return;
    const parent = e.target.closest('.todoCard');
    parent.classList.toggle('expanded');

  })
};

const addListeners = () => {

  // add todo form
  const addTodoForm = document.getElementById('addTodoForm');
  addTodoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit();
  });

  // select active list on left
  const listSelectors = document.querySelectorAll('.list-selector');
  addEventListenerList(listSelectors, 'click', function(e) {
    // set new currentList
    currentList = (app.getList(e.target.dataset.list));
    // refresh todos
    refreshTodos();
  });

};

const leftSVGLoader = {
  'All': `<i class="far fa-compass"></i>`,
  'Church': `<i class="fas fa-church"></i>`,
  'School': `<i class="fas fa-school"></i>`,
  'Work': `<i class="fas fa-briefcase"></i>`
};

const populateLeft = () => {
  const listsBar = document.getElementById('lists');

  app.lists.forEach((list) => {
    const container = document.createElement('div');

    const listsLeft = document.createElement('div');
    listsLeft.setAttribute('class', 'listsLeft');
    const listsRight = document.createElement('div');
    listsRight.setAttribute('class', 'listsRight');

    listsLeft.innerHTML = leftSVGLoader[list.name];
    listsRight.innerHTML = list.getName();

    container.setAttribute('class', 'list-selector');
    container.setAttribute('data-list', list.getName())

    container.appendChild(listsLeft);
    container.appendChild(listsRight);

    listsBar.appendChild(container);
  });
};

const addDefaultLists = () => {
  let all = new List('All');
  let work = new List('Work');
  let school = new List('School');
  let church = new List('Church');

  app.addList(all);
  app.addList(work);
  app.addList(school);
  app.addList(church);

  currentList = work;

};

const initialize = () => {

  app = new App();
  addDefaultLists();
  populateLeft();
  addSampleTodos();
  refreshTodos();
  addListeners();
  addCardListeners();

};

const addSampleTodos = () => {
  const sampleH = new TodoItem('Bills', 'Water bill', 'May 20th', 'high');
  const sampleM = new TodoItem('Homework', 'Assignment #13', 'Jun 13th', 'medium');
  const sampleL = new TodoItem('Ab Workout', '5x crunches', 'Jun 14th', 'low');
  currentList.addTodo(sampleH);
  currentList.addTodo(sampleM);
  currentList.addTodo(sampleL);
};

let app;
let currentList;
initialize();


