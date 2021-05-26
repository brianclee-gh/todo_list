/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://webpack-demo/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n    // find the complete implementation of crypto (msCrypto) on IE11.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://webpack-demo/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.default)(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://webpack-demo/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.default)(rnds);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://webpack-demo/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__.default.test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://webpack-demo/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ }),

/***/ "./src/factories/app.js":
/*!******************************!*\
  !*** ./src/factories/app.js ***!
  \******************************/
/***/ ((module) => {

eval("class App {\n  constructor() {\n    this.lists = [];\n    this.currentList;\n\n    this.addList = (list) => {\n      let listExists = this.lists.some((ele) => ele.getName() === list.getName());\n      if (listExists) {\n        console.log('please choose an unique name');\n        return;\n      }\n      this.lists.push(list);\n    }\n\n    this.setCurrentList = (list) => {\n      if (this.lists.some((ele) => ele.name === list.name)) {\n        this.currentList = list;\n      }\n    }\n\n    this.getList = (listName) => {\n      const list = this.lists.filter((list) => list.name === listName);\n      return list[0];\n    }\n\n\n  }\n}\n\nmodule.exports = { App }\n\n//# sourceURL=webpack://webpack-demo/./src/factories/app.js?");

/***/ }),

/***/ "./src/factories/list.js":
/*!*******************************!*\
  !*** ./src/factories/list.js ***!
  \*******************************/
/***/ ((module) => {

eval("class List {\n  constructor(name) {\n    this.name = name || \"default\";\n    this.items = [];\n\n    this.getItems = () => items;\n\n    this.getName = () => name;\n    this.getItemsLength = () => items.length;\n\n    this.addTodo = (todo) => {\n      // if item name does not currently exist, add it\n      let itemExists = this.items.some((item) => item.name === todo.name);\n\n      if (itemExists) {\n        console.log('please choose an unique name')\n        return;\n      }\n\n      this.items.push(todo);\n    };\n\n    this.deleteTodo = (todoID) => {\n      const todo = this.items.filter((item) => item.uuid === todoID)[0];\n      const index = this.items.indexOf(todo);\n      if (index > - 1) this.items.splice(index, 1);\n      console.log(todo, index, this.items);\n    };\n  }\n};\n\nmodule.exports = { List }\n\n//# sourceURL=webpack://webpack-demo/./src/factories/list.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/helpers */ \"./src/modules/helpers.js\");\n/* harmony import */ var _modules_helpers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_cardHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cardHelpers */ \"./src/modules/cardHelpers.js\");\n/* harmony import */ var _modules_cardHelpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_cardHelpers__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _factories_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/app */ \"./src/factories/app.js\");\n/* harmony import */ var _factories_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_factories_app__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _factories_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/list */ \"./src/factories/list.js\");\n/* harmony import */ var _factories_list__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_factories_list__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\n\n\n\n\n// TODO:\n// Local storage\n// \"Today\"\n// Edit\n// Sort by\n\n// LS\n\nconst storageAvailable = (type) => {\n  var storage;\n  try {\n      storage = window[type];\n      var x = '__storage_test__';\n      storage.setItem(x, x);\n      storage.removeItem(x);\n      return true;\n  }\n  catch(e) {\n      return e instanceof DOMException && (\n          // everything except Firefox\n          e.code === 22 ||\n          // Firefox\n          e.code === 1014 ||\n          // test name field too, because code might not be present\n          // everything except Firefox\n          e.name === 'QuotaExceededError' ||\n          // Firefox\n          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&\n          // acknowledge QuotaExceededError only if there's something already stored\n          (storage && storage.length !== 0);\n  }\n}\n\nconst populateStorage = () => {\n  localStorage.setItem('app', app);\n\n  const testApp = localStorage.getItem('app');\n}\n\n// Factories\n\nclass TodoItem {\n  constructor(name, description, dueDate, priority) {\n    this.name = name;\n    this.description = description || \"\";\n    this.dueDate = dueDate || new Date();\n    this.priority = priority || \"low\";\n    this.done = false;\n    this.uuid = (0,uuid__WEBPACK_IMPORTED_MODULE_4__.default)();\n  }\n};\n\n// HANDLE CREATION\n\nconst createNewTodo = () => {\n\n  const todoTitle = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('todoTitle');\n  const description = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('description');\n  // const dueDate = formatDate(returnFormValue('dueDate'));\n  const dueDate = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('dueDate');\n  const priority = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.getCheckedRadio)('priority');\n\n  if (todoTitle === null || todoTitle === '') { return; }\n\n  return new TodoItem(todoTitle, description, dueDate, priority);\n\n};\n\n// HANDLE USER INPUT\n\nconst handleFormSubmit = () => {\n\n  const newTodo = createNewTodo();\n  const selectedList = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('listSelect');\n  const targetList = app.lists.filter((list) => list.name === selectedList)[0];\n\n  if (newTodo) {\n    targetList.addTodo(newTodo);\n    refreshTodos();\n    addCardListeners();\n  }\n\n};\n\n// VIEW\n\nconst changeListHeader = () => {\n  const listHeader = document.getElementById('listHeader');\n  listHeader.innerHTML = currentList.name;\n};\n\nconst refreshTodos = () => {\n  const display = document.getElementById('tasklist');\n  display.innerHTML = '';\n\n  if (currentList.name === 'All') { refreshAll(display) }\n  if (currentList.name !== 'All') { refreshCurrent(display, currentList) }\n\n};\n\nconst refreshCurrent = (display, list) => {\n  list.items.forEach((item) => {\n    display.appendChild((0,_modules_cardHelpers__WEBPACK_IMPORTED_MODULE_1__.createTodoCard)(item));\n  })\n};\n\nconst refreshAll = (display) => {\n  app.lists.forEach(list => {\n    refreshCurrent(display, list);\n  })\n};\n\nconst handleCheckboxClick = (todoID) => {\n  let todo;\n  if (currentList.name !== 'All') {\n    todo = currentList.items.find((item) => item.uuid === todoID);\n  } else {\n    todo = app.lists.map(list => {\n      list.items.find((item) => item.uuid === todoID);\n    })\n  }\n\n  todo.done = todo.done ? false : true;\n};\n\nconst titleStrike = (todoID) => {\n  const targetTodo = document.body.querySelector(`.todoCard[data-uuid=\"${todoID}\"]`)\n  targetTodo.classList.toggle('strike');\n};\n\nconst removeCard = (node) => {\n  node.remove();\n};\n\nconst deleteItem = (todoID) => {\n  if (currentList.name !== 'All') {\n    currentList.deleteTodo(todoID);\n  } else {\n    const targetList = app.lists.find((list) => {\n      if (list.items.find(item => item.uuid === todoID)) {\n        return list;\n      }\n    })\n\n    console.log(targetList);\n\n    targetList.deleteTodo(todoID);\n  }\n};\n\n// INITIAL\n\nconst addCardListeners = () => {\n\n  // mark card as done (needs reload on every re-render of todos)\n  const cardCheckbox = document.querySelectorAll('.todoCheckbox');\n  (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.addEventListenerList)(cardCheckbox, 'change', function(e) {\n    const todoID = e.target.closest('.todoCard').getAttribute('data-uuid');\n    handleCheckboxClick(todoID);\n    titleStrike(todoID);\n  });\n\n  const deleteTodoBtn = document.querySelectorAll('.deleteBtn');\n  (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.addEventListenerList)(deleteTodoBtn, 'click', function(e) {\n    const node = e.target.closest('.todoCard')\n    const todoID = e.target.closest('.todoCard').getAttribute('data-uuid');\n    removeCard(node); // view\n    deleteItem(todoID); // model\n  });\n\n  // expand cards on click (needs reload on every re-render of todos)\n\n  const todoCards = document.querySelectorAll('.todoCard');\n  (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.addEventListenerList)(todoCards, \"click\", function(e) {\n    if (e.target.classList.contains('todoCheckbox')) return;\n    const parent = e.target.closest('.todoCard');\n    parent.classList.toggle('expanded');\n\n  })\n};\n\nconst addListeners = () => {\n\n  // add todo form\n  const addTodoForm = document.getElementById('addTodoForm');\n  addTodoForm.addEventListener('submit', function(e) {\n    e.preventDefault();\n    if (!(0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('todoTitle') || !(0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('listSelect')) {\n      alert('Enter a Title!');\n      return;\n    };\n    handleFormSubmit();\n    addTodoForm.reset();\n  });\n\n  // select active list on left\n  const listSelectors = document.querySelectorAll('.list-selector');\n  (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.addEventListenerList)(listSelectors, 'click', function(e) {\n    // set new currentList\n    currentList = (app.getList(e.target.dataset.list));\n    changeListHeader();\n    // refresh todos\n    refreshTodos();\n    addCardListeners();\n  });\n\n};\n\nconst leftSVGLoader = {\n  'All': `<i class=\"far fa-compass\"></i>`,\n  'Church': `<i class=\"fas fa-church\"></i>`,\n  'School': `<i class=\"fas fa-school\"></i>`,\n  'Work': `<i class=\"fas fa-briefcase\"></i>`\n};\n\nconst populateLeft = () => {\n  const listsBar = document.getElementById('lists');\n\n  app.lists.forEach((list) => {\n    const container = document.createElement('div');\n\n    const listsLeft = document.createElement('div');\n    listsLeft.setAttribute('class', 'listsLeft');\n    const listsRight = document.createElement('div');\n    listsRight.setAttribute('class', 'listsRight');\n\n    listsLeft.innerHTML = leftSVGLoader[list.name];\n    listsRight.innerHTML = list.getName();\n\n    container.setAttribute('class', 'list-selector');\n    container.setAttribute('data-list', list.getName())\n\n    container.appendChild(listsLeft);\n    container.appendChild(listsRight);\n\n    listsBar.appendChild(container);\n  });\n};\n\n\nconst createDropdown = (listname) => {\n  const dropdownItem = document.createElement('div');\n  dropdownItem.innerHTML = listname;\n  dropdownItem.setAttribute('data-dropdown', listname);\n\n  return dropdownItem;\n};\n\n\n\nconst addDefaultLists = () => {\n  let all = new _factories_list__WEBPACK_IMPORTED_MODULE_3__.List('All');\n  let work = new _factories_list__WEBPACK_IMPORTED_MODULE_3__.List('Work');\n  let school = new _factories_list__WEBPACK_IMPORTED_MODULE_3__.List('School');\n  let church = new _factories_list__WEBPACK_IMPORTED_MODULE_3__.List('Church');\n\n  app.addList(all);\n  app.addList(work);\n  app.addList(school);\n  app.addList(church);\n\n  currentList = work;\n\n};\n\nconst initialize = () => {\n\n  app = new _factories_app__WEBPACK_IMPORTED_MODULE_2__.App();\n  addDefaultLists();\n  populateLeft();\n  addSampleTodos();\n  refreshTodos();\n  addListeners();\n  addCardListeners();\n\n  if (storageAvailable('localStorage')) {\n    // Yippee! We can use localStorage awesomeness\n    console.log('yay')\n    populateStorage();\n  }\n  else {\n    // Too bad, no localStorage for us\n  }\n\n};\n\nconst addSampleTodos = () => {\n  const sampleH = new TodoItem('Bills', 'Water bill', '', 'high');\n  const sampleM = new TodoItem('Homework', 'Assignment #13', '', 'medium');\n  const sampleL = new TodoItem('Ab Workout', '5x crunches', '', 'low');\n  currentList.addTodo(sampleH);\n  currentList.addTodo(sampleM);\n  currentList.addTodo(sampleL);\n};\n\nlet app;\nlet currentList;\ninitialize();\n\n\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ }),

/***/ "./src/modules/cardHelpers.js":
/*!************************************!*\
  !*** ./src/modules/cardHelpers.js ***!
  \************************************/
/***/ ((module) => {

eval("const formatDateEnding = (date) => {\n  const dateEnd = parseInt(date.split(' ')[1]);\n\n  if (dateEnd === 1 || dateEnd === 21) { return 'st'; }\n  if (dateEnd === 2 || dateEnd === 22) { return 'nd'; }\n  if (dateEnd === 3 || dateEnd === 23) { return 'rd'; }\n  return 'th';\n};\n\nconst formatDate = (dateInput) => {\n  const date = dateInput === '' ? new Date() : new Date(dateInput + 'PST');\n  const options = {\n    month: 'short',\n    day: 'numeric',\n    // year: 'numeric'\n  };\n  let newDate =  date.toLocaleDateString('en-US', options);\n  return newDate + formatDateEnding(newDate);\n};\n\nconst createTodoCard = (todo) => {\n  const card = document.createElement('div');\n  card.setAttribute('class', 'todoCard');\n  if (todo.done) card.classList.add('strike');\n  card.setAttribute('data-uuid', `${todo.uuid}`);\n\n  const cardContainer = document.createElement('div');\n  cardContainer.setAttribute('class', 'cardContainer');\n\n  const cardLeft = document.createElement('div');\n  cardLeft.setAttribute('class', 'cardLeft');\n\n  const cardRight = document.createElement('div');\n  cardRight.setAttribute('class', 'cardRight');\n\n  const priorityColor = document.createElement('div');\n  priorityColor.setAttribute('class', `priority ${todo.priority}`);\n\n  const cardBody = document.createElement('div');\n  cardBody.setAttribute('class', `cardBody`);\n\n  const description = createDescription(todo.description);\n\n  const title = createTitle(todo.name);\n  const checkbox = createCheckBox();\n  if (todo.done) checkbox.checked = true;\n  cardLeft.appendChild(checkbox);\n  cardLeft.appendChild(title);\n\n  const date = createDate(todo.dueDate);\n  const buttons = createCardBtns();\n\n  cardRight.appendChild(date);\n  cardRight.appendChild(buttons);\n\n  cardBody.appendChild(cardLeft);\n  cardBody.appendChild(cardRight);\n\n  cardContainer.appendChild(cardBody);\n  cardContainer.appendChild(description);\n\n  card.appendChild(priorityColor);\n  card.appendChild(cardContainer);\n\n  return card;\n\n};\n\nconst createTitle = (name) => {\n  var title = document.createElement('div');\n  title.setAttribute('class', 'todoTitle');\n  title.textContent = name;\n\n  return title;\n};\n\nconst createCheckBox = () => {\n  const checkbox = document.createElement('input');\n  checkbox.setAttribute('type', 'checkbox');\n  checkbox.setAttribute('class', 'todoCheckbox checkbox-round');\n  return checkbox;\n};\n\nconst createDate = (dueDate) => {\n  const date = document.createElement('div');\n  date.setAttribute('class', 'todoDate');\n  date.innerHTML = formatDate(dueDate);\n  return date;\n}\n\nconst createCardBtns = () => {\n  const buttons = document.createElement('div');\n  buttons.setAttribute('class', 'todoBtns')\n\n  const editBtn = document.createElement('button');\n  editBtn.setAttribute('class', 'editBtn btn');\n  editBtn.innerHTML = `<i class=\"far fa-edit\"></i>`;\n  const deleteBtn = document.createElement('button');\n  deleteBtn.setAttribute('class', 'deleteBtn btn');\n  deleteBtn.innerHTML = `<i class=\"far fa-trash-alt\"></i>`;\n  buttons.appendChild(editBtn);\n  buttons.appendChild(deleteBtn);\n\n  return buttons;\n};\n\nconst createDescription = (desc) => {\n  const description = document.createElement('div');\n  description.setAttribute('class', 'description');\n  description.innerHTML = desc;\n  return description;\n};\n\nmodule.exports = { createCardBtns, createTodoCard }\n\n//# sourceURL=webpack://webpack-demo/./src/modules/cardHelpers.js?");

/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ ((module) => {

eval("const getCheckedRadio = (name) => {\n  let radio = document.querySelectorAll(`input[name=\"${name}\"]`);\n  let selected;\n\n  for (let i = 0; i < radio.length; i++) {\n    if (radio[i].checked) {\n      selected = radio[i].value;\n      break;\n    }\n  }\n\n  return selected;\n};\n\nconst returnFormValue = (name) => {\n  const target = document.getElementById(`${name}`);\n  if (!target) return null;\n  return target.value;\n};\n\nconst printTarget = (e, app) => {\n  console.log(e.target.dataset.list);\n  console.log(app.getList(e.target.dataset.list));\n};\n\nconst addEventListenerList = (nodeList, event, fn) => {\n  for (var i = 0; i < nodeList.length; i++) {\n    nodeList[i].addEventListener(event, fn, false);\n  }\n};\n\n\nmodule.exports = { getCheckedRadio, returnFormValue, printTarget, addEventListenerList }\n\n//# sourceURL=webpack://webpack-demo/./src/modules/helpers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;