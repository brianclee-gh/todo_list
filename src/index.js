import { getCheckedRadio, returnFormValue, printTarget, addEventListenerList } from './modules/helpers'
import { createCardBtns, createTodoCard } from './modules/cardHelpers'
import { populateLeft, createDropdown } from './modules/creators'
import { titleStrike, removeCard } from './modules/view'
import { App } from './factories/app'
import { List } from './factories/list'
import { v4 as uuidv4 } from 'uuid'


// TODO:
// High:
// > Search
// > Sort by

// Low
// > Dates
// > "Today"

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
  localStorage.setItem('app', JSON.stringify(app));
}

const getStorage = () => {
  return JSON.parse(localStorage.getItem('app'))
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

// HANDLE CREATION

const createNewTodo = () => {

  const todoTitle = returnFormValue('todoTitle');
  const description = returnFormValue('description');
  const dueDate = returnFormValue('dueDate');
  const priority = getCheckedRadio('priority');

  if (todoTitle === null || todoTitle === '') { return; }

  return new TodoItem(todoTitle, description, dueDate, priority);

};

// HANDLE USER INPUT

const handleAddTodoSubmit = () => {

  const newTodo = createNewTodo();
  const selectedList = returnFormValue('listSelect');
  const targetList = app.lists.find((list) => list.name === selectedList);

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
    display.appendChild(createTodoCard(item, list));
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

const showModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
};

const populateModal = (todo) => {
  const modal = document.getElementById('modal-form');
  document.getElementById('todoEditing').setAttribute('data-todo', todo.uuid);
  document.getElementById('editTitle').value= todo.name;

};

// Model

const handleListChange = (todoID, targetTodo, selectedList) => {
  const todoCurrentList = findTodoList(todoID);
  if (!todoCurrentList) return;
  if (selectedList !== todoCurrentList.name) {
    transferTodo(app.getList(selectedList), todoCurrentList, targetTodo)
  }

};

const transferTodo = (list1, list2, todo) => {
  list1.addTodo(todo);
  list2.deleteTodo(todo.uuid);
};

const handleSearch = () => {
  const search = returnFormValue('searchInput');
  console.log(search);
};

const findTodoList = (todoID) => {
  return app.lists.find((list) => {
    if (list.items.find(item => item.uuid === todoID)) {
      return list;
    }
  })
};

const deleteItem = (todoID) => {
  if (currentList.name !== 'All') {
    currentList.deleteTodo(todoID);
  } else {
    const targetList = findTodoList(todoID);

    targetList.deleteTodo(todoID);
  }
};

const handleEditTodo = (node) => {
  const todoID = node.getAttribute('data-uuid');
  const listID = node.getAttribute('data-parentList');
  const targetList = app.lists.find((list) => list.name === listID);
  const targetItem = targetList.items.find(item => item.uuid === todoID);

  showModal();
  populateModal(targetItem);
};

// INITIAL

const addCardListeners = () => {

  // mark card as done (needs reload on every re-render of todos)
  const cardCheckbox = document.querySelectorAll('.todoCheckbox');
  addEventListenerList(cardCheckbox, 'change', function(e) {
    const todoID = e.target.closest('.todoCard').getAttribute('data-uuid');
    handleCheckboxClick(todoID);
    titleStrike(todoID);
    populateStorage();
  });

  const editTodoBtn = document.querySelectorAll('.editBtn');
  addEventListenerList(editTodoBtn, 'click', function(e) {
    const node = e.target.closest('.todoCard');
    handleEditTodo(node);
  });

  const deleteTodoBtn = document.querySelectorAll('.deleteBtn');
  addEventListenerList(deleteTodoBtn, 'click', function(e) {
    const node = e.target.closest('.todoCard')
    const todoID = node.getAttribute('data-uuid');
    removeCard(node); // view
    deleteItem(todoID); // model
    populateStorage();
  });

  // expand cards on click (needs reload on every re-render of todos)

  const todoCards = document.querySelectorAll('.todoCard');
  addEventListenerList(todoCards, "click", function(e) {
    if (e.target.classList.contains('todoCheckbox')) return;
    if (e.target.classList.contains('btn')) return;

    const parent = e.target.closest('.todoCard');
    parent.classList.toggle('expanded');
  })
};

const getTodoItem = (todoID) => {
  return currentList.items.find((item) => item.uuid === todoID);
};

const handleEditTodoSubmit = () => {
  const todoID = document.getElementById('todoEditing').getAttribute('data-todo');
  updateTodo(todoID);
  refreshTodos();
  addCardListeners();
};

const updateTodo = (todoID) => {
  // updates target todo with edit form submission
  const targetTodo = getTodoItem(todoID);
  if (returnFormValue('editTitle')) targetTodo.setName(returnFormValue('editTitle'));
  if (returnFormValue('editDescription')) targetTodo.setDescription(returnFormValue('editDescription'));
  if (returnFormValue('editDueDate')) targetTodo.setDueDate(returnFormValue('editDueDate'));
  if (getCheckedRadio('editPriority')) targetTodo.setPriority(getCheckedRadio('editPriority'));
  const selectedList = returnFormValue('editListSelect'); // returns string
  if (selectedList !== '') handleListChange(todoID, targetTodo, selectedList);

};




const addListeners = () => {

  // add todo form
  const addTodoForm = document.getElementById('addTodoForm');
  addTodoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!returnFormValue('todoTitle') || !returnFormValue('listSelect')) {
      alert('Needs a valid title and list!');
      return;
    };

    handleAddTodoSubmit();
    addTodoForm.reset();
    populateStorage();
  });

  const editTodoForm = document.getElementById('modal-form');
  editTodoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    modal.style.display = 'none';
    handleEditTodoSubmit();

  })

  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSearch();
    searchBar.reset();
  })

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


  const closeModalBtn = document.getElementById('modal-close');
  closeModalBtn.addEventListener('click', function(e) {
    modal.style.display = 'none';
  })

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

};



const initialize = () => {

  if (getStorage()) {

    if (storageAvailable('localStorage')) {

      const storedLists = getStorage().lists;
      if (storedLists.length === 0) { return }
      const newApp = new App();
      newApp.addLists(storedLists, List);

      // find stored list with same name, iterate through those items
      newApp.lists.forEach(list => {
        const matchedList = storedLists.find(stored => (stored.name) === list.name);
        if (matchedList.items.length > 0) {
          list.addTodos(matchedList.items, TodoItem)
        }
      })

      app = newApp;
      currentList = app.lists[1]
      populateStorage()
    }
    else {
      app = new App();
      addDefaultLists();
      addSampleTodos();
    }
  } else {
      app = new App();
      addDefaultLists();
      addSampleTodos();
  }

  populateLeft(app);
  refreshTodos();
  addListeners();
  addCardListeners();
  populateStorage();

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

const addSampleTodos = () => {
  const sampleH = new TodoItem('Bills', 'Water bill', '', 'high');
  const sampleM = new TodoItem('Homework', 'Assignment #13', '', 'medium');
  const sampleL = new TodoItem('Workout', '5x crunches', '', 'low');
  currentList.addTodo(sampleH);
  currentList.addTodo(sampleM);
  currentList.addTodo(sampleL);
};

let app;
let currentList;
initialize();


