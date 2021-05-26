import { getCheckedRadio, returnFormValue, printTarget, addEventListenerList } from './modules/helpers'
import { createCardBtns, createTodoCard } from './modules/cardHelpers'
import { App } from './factories/app'
import { List } from './factories/list'
import { v4 as uuidv4 } from 'uuid'


// TODO:
// Local storage
// "Today"
// Edit
// Sort by

// LS

const storageAvailable = (type) => {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

const populateStorage = () => {
  localStorage.setItem('app', app);

  const testApp = localStorage.getItem('app');
}

// Factories

class TodoItem {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description || "";
    this.dueDate = dueDate || new Date();
    this.priority = priority || "low";
    this.done = false;
    this.uuid = uuidv4();
  }
};

// HANDLE CREATION

const createNewTodo = () => {

  const todoTitle = returnFormValue('todoTitle');
  const description = returnFormValue('description');
  // const dueDate = formatDate(returnFormValue('dueDate'));
  const dueDate = returnFormValue('dueDate');
  const priority = getCheckedRadio('priority');

  if (todoTitle === null || todoTitle === '') { return; }

  return new TodoItem(todoTitle, description, dueDate, priority);

};

// HANDLE USER INPUT

const handleFormSubmit = () => {

  const newTodo = createNewTodo();
  const selectedList = returnFormValue('listSelect');
  const targetList = app.lists.filter((list) => list.name === selectedList)[0];

  if (newTodo) {
    targetList.addTodo(newTodo);
    refreshTodos();
    addCardListeners();
  }

};

// VIEW

const changeListHeader = () => {
  const listHeader = document.getElementById('listHeader');
  listHeader.innerHTML = currentList.name;
};

const refreshTodos = () => {
  const display = document.getElementById('tasklist');
  display.innerHTML = '';

  if (currentList.name === 'All') { refreshAll(display) }
  if (currentList.name !== 'All') { refreshCurrent(display, currentList) }

};

const refreshCurrent = (display, list) => {
  list.items.forEach((item) => {
    display.appendChild(createTodoCard(item));
  })
};

const refreshAll = (display) => {
  app.lists.forEach(list => {
    refreshCurrent(display, list);
  })
};

const handleCheckboxClick = (todoID) => {
  let todo;
  if (currentList.name !== 'All') {
    todo = currentList.items.find((item) => item.uuid === todoID);
  } else {
    todo = app.lists.map(list => {
      list.items.find((item) => item.uuid === todoID);
    })
  }

  todo.done = todo.done ? false : true;
};

const titleStrike = (todoID) => {
  const targetTodo = document.body.querySelector(`.todoCard[data-uuid="${todoID}"]`)
  targetTodo.classList.toggle('strike');
};

const removeCard = (node) => {
  node.remove();
};

const deleteItem = (todoID) => {
  if (currentList.name !== 'All') {
    currentList.deleteTodo(todoID);
  } else {
    const targetList = app.lists.find((list) => {
      if (list.items.find(item => item.uuid === todoID)) {
        return list;
      }
    })

    targetList.deleteTodo(todoID);
  }
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
    deleteItem(todoID); // model
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
    if (!returnFormValue('todoTitle') || !returnFormValue('listSelect')) {
      alert('Enter a Title!');
      return;
    };
    handleFormSubmit();
    addTodoForm.reset();
  });

  // select active list on left
  const listSelectors = document.querySelectorAll('.list-selector');
  addEventListenerList(listSelectors, 'click', function(e) {
    // set new currentList
    currentList = (app.getList(e.target.dataset.list));
    changeListHeader();
    // refresh todos
    refreshTodos();
    addCardListeners();
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


const createDropdown = (listname) => {
  const dropdownItem = document.createElement('div');
  dropdownItem.innerHTML = listname;
  dropdownItem.setAttribute('data-dropdown', listname);

  return dropdownItem;
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

  if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log('yay')
    populateStorage();
  }
  else {
    // Too bad, no localStorage for us
  }

};

const addSampleTodos = () => {
  const sampleH = new TodoItem('Bills', 'Water bill', '', 'high');
  const sampleM = new TodoItem('Homework', 'Assignment #13', '', 'medium');
  const sampleL = new TodoItem('Ab Workout', '5x crunches', '', 'low');
  currentList.addTodo(sampleH);
  currentList.addTodo(sampleM);
  currentList.addTodo(sampleL);
};

let app;
let currentList;
initialize();


