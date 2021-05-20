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

/***/ "./src/factories/app.js":
/*!******************************!*\
  !*** ./src/factories/app.js ***!
  \******************************/
/***/ ((module) => {

eval("class App {\n  constructor() {\n    this.lists = [];\n    this.currentList;\n\n    this.addList = (list) => {\n      let listExists = this.lists.some((ele) => ele.getName() === list.getName());\n      if (listExists) {\n        console.log('please choose an unique name');\n        return;\n      }\n      this.lists.push(list);\n    }\n    this.setCurrentList = (list) => {\n      if (this.lists.some((ele) => ele.name === list.name)) {\n        this.currentList = list;\n      }\n    }\n  }\n}\n\nmodule.exports = { App }\n\n//# sourceURL=webpack://webpack-demo/./src/factories/app.js?");

/***/ }),

/***/ "./src/factories/list.js":
/*!*******************************!*\
  !*** ./src/factories/list.js ***!
  \*******************************/
/***/ ((module) => {

eval("class List {\n  constructor(name) {\n    name = name || \"default\";\n    this.items = [];\n\n    this.getName = () => name;\n    this.getItemsLength = () => items.length;\n\n    this.addTodo = (todo) => {\n      // if item name does not currently exist, add it\n      let itemExists = this.items.some((item) => item.name === todo.name);\n\n      if (itemExists) {\n        console.log('please choose an unique name')\n        return;\n      }\n\n      this.items.push(todo);\n    };\n\n    this.deleteTodo = (todo) => {\n      const index = this.items.indexOf(todo);\n      if (index > - 1) this.items.splice(index, 1);\n    };\n  }\n};\n\nmodule.exports = { List }\n\n//# sourceURL=webpack://webpack-demo/./src/factories/list.js?");

/***/ }),

/***/ "./src/factories/todoitem.js":
/*!***********************************!*\
  !*** ./src/factories/todoitem.js ***!
  \***********************************/
/***/ ((module) => {

eval("class TodoItem {\n  constructor(name, description, dueDate, priority) {\n    this.name = name;\n    this.description = description || \"\";\n    this.dueDate = dueDate || \"tomorrow\";\n    this.priority = priority || \"low\";\n  }\n};\n\nmodule.exports = { TodoItem }\n\n//# sourceURL=webpack://webpack-demo/./src/factories/todoitem.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/helpers */ \"./src/modules/helpers.js\");\n/* harmony import */ var _modules_helpers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _factories_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/app */ \"./src/factories/app.js\");\n/* harmony import */ var _factories_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_factories_app__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _factories_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/list */ \"./src/factories/list.js\");\n/* harmony import */ var _factories_list__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_factories_list__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _factories_todoitem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/todoitem */ \"./src/factories/todoitem.js\");\n/* harmony import */ var _factories_todoitem__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_factories_todoitem__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n// HANDLE CREATION\n\nconst createNewTodo = () => {\n\n  let todoTitle = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('todoTitle');\n  let description = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('description');\n  let dueDate = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.returnFormValue)('dueDate');\n  let priority = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.getCheckedRadio)('priority');\n\n  if (todoTitle === null || todoTitle === '') { return; }\n\n  return new _factories_todoitem__WEBPACK_IMPORTED_MODULE_3__.TodoItem(todoTitle, description, dueDate, priority);\n\n};\n\n// HANDLE USER INPUT\n\nconst handleFormSubmit = () => {\n\n  const newTodo = createNewTodo();\n\n  if (newTodo) {\n    currentList.addTodo(newTodo);\n    console.log(currentList);\n  }\n\n};\n\n// VIEW\n\nconst refreshTodos = () => {\n  const display = document.getElementById('todoDisplay');\n\n  currentList.items.forEach((item) => {\n    display.appendChild(createTodoCard(item));\n  })\n\n};\n\n\nconst createTodoCard = (todo) => {\n  const card = document.createElement('div');\n  card.setAttribute('class', 'todoCard');\n\n  const priorityColor = document.createElement('div');\n  priorityColor.setAttribute('class', `priority ${todo.priority}`);\n\n  const cardBody = document.createElement('div');\n  cardBody.setAttribute('class', 'cardBody');\n  const title = document.createElement('div');\n  title.textContent = todo.name;\n  const date = document.createElement('div');\n  date.innerHTML = todo.dueDate;\n  const buttons = createCardBtns();\n\n  cardBody.appendChild(title);\n  cardBody.appendChild(date);\n  cardBody.appendChild(buttons);\n\n  card.appendChild(priorityColor);\n  card.appendChild(cardBody);\n\n  return card;\n\n};\n\nconst createCardBtns = () => {\n  const buttons = document.createElement('div');\n\n  const editBtn = document.createElement('button');\n  editBtn.setAttribute('class', 'editBtn btn');\n  editBtn.innerHTML = 'Edit';\n  const deleteBtn = document.createElement('button');\n  deleteBtn.setAttribute('class', 'deleteBtn btn');\n  deleteBtn.innerHTML = 'Delete';\n  buttons.appendChild(editBtn);\n  buttons.appendChild(deleteBtn);\n\n  return buttons;\n};\n\n\n\n// INITIAL\n\nconst addListeners = () => {\n\n  // add todo form\n  let addTodoForm = document.getElementById('addTodoForm');\n  addTodoForm.addEventListener('submit', function(e) {\n    e.preventDefault();\n    handleFormSubmit();\n  });\n\n  // select active list on left\n  let listSelectors = document.querySelectorAll('.list-selector');\n  addEventListenerList(listSelectors, \"click\", function(e) {\n    (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.printTarget)(e);\n  });\n\n};\n\nconst addEventListenerList = (nodeList, event, fn) => {\n  for (var i = 0; i < nodeList.length; i++) {\n    nodeList[i].addEventListener(event, fn, false);\n  }\n};\n\nconst populateLeft = () => {\n  const leftLists = document.getElementById('lists');\n\n  app.lists.forEach((list) => {\n    let container = document.createElement('div');\n    container.innerHTML = list.getName();\n    container.setAttribute('class', 'list-selector');\n    container.setAttribute('data-list', list.getName())\n\n    leftLists.appendChild(container);\n  });\n};\n\nconst addDefaultLists = () => {\n  let work = new _factories_list__WEBPACK_IMPORTED_MODULE_2__.List('Work');\n  let school = new _factories_list__WEBPACK_IMPORTED_MODULE_2__.List('School');\n  let church = new _factories_list__WEBPACK_IMPORTED_MODULE_2__.List('Church');\n\n  app.addList(work);\n  app.addList(school);\n  app.addList(church);\n\n  currentList = work;\n\n};\n\nconst initialize = () => {\n\n  app = new _factories_app__WEBPACK_IMPORTED_MODULE_1__.App();\n  addDefaultLists();\n  populateLeft();\n  addListeners();\n\n};\n\nconst addSampleTodos = () => {\n  const sampleH = new _factories_todoitem__WEBPACK_IMPORTED_MODULE_3__.TodoItem('bills', 'no', '6-1-2021', 'high');\n  const sampleM = new _factories_todoitem__WEBPACK_IMPORTED_MODULE_3__.TodoItem('homework', 'no', '6-1-2021', 'medium');\n  const sampleL = new _factories_todoitem__WEBPACK_IMPORTED_MODULE_3__.TodoItem('workout', 'no', '6-1-2021', 'low');\n  currentList.addTodo(sampleH);\n  currentList.addTodo(sampleM);\n  currentList.addTodo(sampleL);\n};\n\nlet app;\nlet currentList;\ninitialize();\naddSampleTodos();\nrefreshTodos();\n\n\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ ((module) => {

eval("const getCheckedRadio = (name) => {\n  let radio = document.querySelectorAll(`input[name=\"${name}\"]`);\n  let selected;\n\n  for (let i = 0; i < radio.length; i++) {\n    if (radio[i].checked) {\n      selected = radio[i].value;\n      break;\n    }\n  }\n\n  return selected;\n};\n\nconst returnFormValue = (name) => {\n  const target = document.getElementById(`${name}`);\n  if (!target) return null;\n  return target.value;\n};\n\nconst printTarget = (e) => {\n  console.log(e.target.dataset.list);\n};\n\nmodule.exports = { getCheckedRadio, returnFormValue, printTarget }\n\n//# sourceURL=webpack://webpack-demo/./src/modules/helpers.js?");

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