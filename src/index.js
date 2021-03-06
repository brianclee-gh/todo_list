import { getCheckedRadio, returnFormValue, printTarget, addEventListenerList } from './modules/helpers'
import { createCardBtns, createTodoCard } from './modules/cardHelpers'
import { populateLeft } from './modules/creators'
import { transferTodo } from './modules/model'
import { titleStrike, removeCard, paginate, setListBackground, changeSearchHeader, showModal } from './modules/view'
import { App } from './factories/app'
import { List } from './factories/list'
import { v4 as uuidv4 } from 'uuid'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/material.css'
import { tippyLoad, tippyCards } from './modules/tippy'
import './styles.css';

// TODO:
// > Sort by (A -> Z, date)
// Pages (~ 9 per page)

// Local Storage

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
  constructor(name, description, dueDate, priority, done) {
    this.name = name;
    this.description = description || "";
    this.dueDate = dueDate || new Date();
    this.priority = priority || "low";
    this.done = done || false;
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

const handleAddTodoMobile = (title) => {
  const todo = new TodoItem(title);
  currentList.addTodo(todo);
};

const handleAddList = (title) => {
  const list = new List(title);
  app.addList(list);
};


const handleSubmitNewProject = () => {
  const title = returnFormValue('project-title')
  if (title) {
    const newList = new List(title);
    app.addList(newList);
    populateStorage();
    populateLeft(app);
    populateListDropDown();
    addLeftListeners();
  }
};

const handleEditTodoSubmit = () => {
  const todoID = document.getElementById('todoEditing').getAttribute('data-todo');
  updateTodo(todoID);
  refreshTodos();
  addCardListeners();
  populateStorage();
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

const refreshSearch = (results) => {
  const display = document.getElementById('tasklist');
  display.innerHTML = '';

  results.forEach((item) => {
    display.appendChild(createTodoCard(item));
  })
};

const refreshCurrent = (display, list) => {
  let items;
  if (list.items.length < 9) {
    items = list.items
  } else {
    const pages = Math.floor(list.items.length / 8) +  1;
    items = paginate(list.items, 8, 1);
    console.log('need ' + pages + ' pages!');
  }

  items.forEach((item) => {
    if (display.childNodes.length < 7) {
      display.appendChild(createTodoCard(item, list));
    }

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
    const list = findTodoList(todoID);
    todo = list.items.find((item) => item.uuid === todoID);
  }

  todo.toggleDone();
};

const populateModal = (todo) => {
  const modal = document.getElementById('modal-form');
  document.getElementById('todoEditing').setAttribute('data-todo', todo.uuid);
  document.getElementById('editTitle').value= todo.name;

};

const getTodoItem = (todoID) => {
  const targetList = findTodoList(todoID);
  return targetList.items.find(item => item.uuid === todoID);
};

// Model


const removeCompleted = () => {

  app.lists.forEach((list) => {
    list.clearCompleted();
  })

  refreshTodos();
  addCardListeners();
  populateStorage();
};

const handleListChange = (todoID, targetTodo, selectedList) => {
  const todoCurrentList = findTodoList(todoID);
  if (!todoCurrentList) return;
  if (selectedList !== todoCurrentList.name) {
    transferTodo(app.getList(selectedList), todoCurrentList, targetTodo)
  }

};

const findTodoList = (todoID) => {
  return app.lists.find((list) => {
    if (list.items.find(item => item.uuid === todoID)) {
      return list;
    }
  })
};

const deleteItem = (todoID) => {
  const targetList = findTodoList(todoID);
  targetList.deleteTodo(todoID);
};

const handleEditTodo = (node) => {
  const todoID = node.getAttribute('data-uuid');
  const listID = node.getAttribute('data-parentList');
  const targetList = app.lists.find((list) => list.name === listID);
  const targetItem = targetList.items.find(item => item.uuid === todoID);

  showModal('modal');
  populateModal(targetItem);
};

const handleAddProject = () => {
  showModal('add-project-modal');
};


// Search

const handleSearch = () => {
  const search = returnFormValue('searchInput');
  const result = regexSearch();

  refreshSearch(result);
  changeSearchHeader(search);
  addCardListeners();
};

const regexTokens = (input) => {

  const tokens = input
                  .toLowerCase()
                  .split(' ')
                  .filter(function(token) {
                    return token.trim() !== '';
                  });

  return new RegExp(tokens.join('|', 'gim'));

};

const regexSearch = () => {
  const search = returnFormValue('searchInput');
  const tokenRegex = regexTokens(search);

  const results = []
  app.lists.forEach(list => {
    list.items.forEach((item) => {
      let itemStr = '';
      itemStr += item.name.toLowerCase().trim() + ' ' + item.description.toLowerCase().trim()
      if (itemStr.match(tokenRegex)) {
        results.push(item)

      };
    })
  })

  return results;

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
    populateStorage();
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

  tippyCards();
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

const addDropdown = (node) => {
  node.innerHTML = '';

  let first = document.createElement('option');
  first.value = "";
  first.innerHTML = "Select Project to add to";
  first.disabled = true;
  first.selected = true;

  node.appendChild(first);

  app.lists.forEach(list => {
    if (list.name === 'All') return;
    let dd = document.createElement('option');
    dd.value = list.name;
    dd.innerHTML = list.name;
    node.appendChild(dd);
  })

};

const populateListDropDown = () => {
  const editDD = document.getElementById('editListSelect');
  const addDD = document.getElementById('listSelect');

  addDropdown(editDD);
  addDropdown(addDD);

  deleteListListeners();
};

const deleteListListeners = () => {
  const deleteList = document.querySelectorAll('.delete-list');
  addEventListenerList(deleteList, 'click', function(e) {
    const listName = e.target.closest('.list-selector').dataset.list;
    if (window.confirm("Do you really want to delete this project?")) {
      app.removeList(listName);
      populateLeft(app);
      populateListDropDown();
      addLeftListeners();
      populateStorage();
    }
  })
};

const addLeftListeners = () => {
  const listSelectors = document.querySelectorAll('.list-selector');
  addEventListenerList(listSelectors, 'click', function(e) {
    // set new currentList
    if (e.target.classList[0] === 'delete-list') return;
    const listName = e.target.dataset.list;
    currentList = (app.getList(listName));
    changeListHeader();
    setListBackground(listSelectors, listName);
    // refresh todos
    refreshTodos();
    addCardListeners();
  });
}

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

  const addListBtn = document.getElementById('add-list-btn');
  addListBtn.addEventListener('click', function() {
    handleAddProject();
  })

  const mobileAddForm = document.getElementById('mobile-add-form');
  mobileAddForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mobileTitle = returnFormValue('mobileTitle')
    if (!mobileTitle) return;

    handleAddTodoMobile(mobileTitle);
    mobileAddForm.reset();

    populateStorage();
    refreshTodos();
    addCardListeners();
  })

  // edit Todo modal
  const editTodoForm = document.getElementById('modal-form');
  editTodoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    modal.style.display = 'none';
    handleEditTodoSubmit();

  })

  // add project modal
  const addProjectForm = document.getElementById('add-modal-form');
  addProjectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const testModal = document.getElementById('add-project-modal');
    testModal.style.display = 'none';
    handleSubmitNewProject();
  })

  // search
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSearch();
    searchBar.reset();
  })

  //clear completed
  const clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', function() {
    if (window.confirm("Do you really want to clear all completed items?")) {
      removeCompleted();
    }
  })


  const closeAddModalBtn = document.getElementById('close-add-modal');
  closeAddModalBtn.addEventListener('click', function() {
    const testModal = document.getElementById('add-project-modal')
    testModal.style.display = 'none';
  })

  const closeModalBtn = document.getElementById('modal-close');
  closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  })

  window.onclick = function(event) {
    const testModal = document.getElementById('add-project-modal')
    if (event.target == modal || event.target == testModal) {
      modal.style.display = "none";
      testModal.style.display = 'none';

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
  populateListDropDown();
  addLeftListeners();
  populateStorage();
  tippyLoad();

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
