import { getCheckedRadio, returnFormValue, printTarget } from './modules/helpers'
import { App } from './factories/app'
import { List } from './factories/list'
import { TodoItem } from './factories/todoitem'

// HANDLE CREATION

const createNewTodo = () => {

  let todoTitle = returnFormValue('todoTitle');
  let description = returnFormValue('description');
  let dueDate = returnFormValue('dueDate');
  let priority = getCheckedRadio('priority');

  if (todoTitle === null || todoTitle === '') { return; }

  return new TodoItem(todoTitle, description, dueDate, priority);

};

// HANDLE USER INPUT

const handleFormSubmit = () => {

  const newTodo = createNewTodo();

  if (newTodo) {
    currentList.addTodo(newTodo);
    console.log(currentList);
  }

};

// VIEW

const refreshTodos = () => {
  const display = document.getElementById('todoDisplay');

  currentList.items.forEach((item) => {
    display.appendChild(createTodoCard(item));
  })

};


const createTodoCard = (todo) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'todoCard');

  const priorityColor = document.createElement('div');
  priorityColor.setAttribute('class', `priority ${todo.priority}`);

  const cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'cardBody');
  const title = document.createElement('div');
  title.textContent = todo.name;
  const date = document.createElement('div');
  date.innerHTML = todo.dueDate;
  const buttons = createCardBtns();

  cardBody.appendChild(title);
  cardBody.appendChild(date);
  cardBody.appendChild(buttons);

  card.appendChild(priorityColor);
  card.appendChild(cardBody);

  return card;

};

const createCardBtns = () => {
  const buttons = document.createElement('div');

  const editBtn = document.createElement('button');
  editBtn.setAttribute('class', 'editBtn btn');
  editBtn.innerHTML = 'Edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'deleteBtn btn');
  deleteBtn.innerHTML = 'Delete';
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  return buttons;
};



// INITIAL

const addListeners = () => {

  // add todo form
  let addTodoForm = document.getElementById('addTodoForm');
  addTodoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit();
  });

  // select active list on left
  let listSelectors = document.querySelectorAll('.list-selector');
  addEventListenerList(listSelectors, "click", function(e) {
    printTarget(e);
  });

};

const addEventListenerList = (nodeList, event, fn) => {
  for (var i = 0; i < nodeList.length; i++) {
    nodeList[i].addEventListener(event, fn, false);
  }
};

const populateLeft = () => {
  const leftLists = document.getElementById('lists');

  app.lists.forEach((list) => {
    let container = document.createElement('div');
    container.innerHTML = list.getName();
    container.setAttribute('class', 'list-selector');
    container.setAttribute('data-list', list.getName())

    leftLists.appendChild(container);
  });
};

const addDefaultLists = () => {
  let work = new List('Work');
  let school = new List('School');
  let church = new List('Church');

  app.addList(work);
  app.addList(school);
  app.addList(church);

  currentList = work;

};

const initialize = () => {

  app = new App();
  addDefaultLists();
  populateLeft();
  addListeners();

};

const addSampleTodos = () => {
  const sampleH = new TodoItem('bills', 'no', '6-1-2021', 'high');
  const sampleM = new TodoItem('homework', 'no', '6-1-2021', 'medium');
  const sampleL = new TodoItem('workout', 'no', '6-1-2021', 'low');
  currentList.addTodo(sampleH);
  currentList.addTodo(sampleM);
  currentList.addTodo(sampleL);
};

let app;
let currentList;
initialize();
addSampleTodos();
refreshTodos();


