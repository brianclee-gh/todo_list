const formatDateEnding = (date) => {
  const dateEnd = parseInt(date.split(' ')[1]);

  if (dateEnd === 1 || dateEnd === 21 || dateEnd === 31) { return 'st'; }
  if (dateEnd === 2 || dateEnd === 22) { return 'nd'; }
  if (dateEnd === 3 || dateEnd === 23) { return 'rd'; }
  return 'th';
};

const checkToday = (date) => {
  const todaysDate = new Date();
  const inputDate = new Date(date);
  return (todaysDate.setHours(0,0,0,0) == inputDate.setHours(0,0,0,0));
};

const checkYesterday = (date) => {
  const inputDate = new Date(date);
  yesterday = ( function(){this.setDate(this.getDate()-1); return this} )
            .call(new Date);
  return (yesterday.setHours(0,0,0,0) == inputDate.setHours(0,0,0,0));
};

const checkTomorrow = (date) => {
  const inputDate = new Date(date);
  tomorrow = ( function(){this.setDate(this.getDate()+1); return this} )
            .call(new Date);
  return (tomorrow.setHours(0,0,0,0) == inputDate.setHours(0,0,0,0));
};

const formatDate = (dateInput) => {
  const date = dateInput === '' ? new Date() : new Date(dateInput + 'PST');
  // if it's Today, just return 'Today'
  if (checkToday(date)) { return 'Today' }
  if (checkYesterday(date)) { return 'Yesterday' }
  if (checkTomorrow(date)) { return 'Tomorrow' }
  const options = {
    month: 'short',
    day: 'numeric',
    // year: 'numeric'
  };
  let newDate =  date.toLocaleDateString('en-US', options);
  return newDate + formatDateEnding(newDate);
};

const createTodoCard = (todo, list) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'todoCard');
  if (todo.done) card.classList.add('strike');
  card.setAttribute('data-uuid', `${todo.uuid}`);
  if (list) card.setAttribute('data-parentList', `${list.name}`);

  const cardContainer = document.createElement('div');
  cardContainer.setAttribute('class', 'cardContainer');

  const cardLeft = document.createElement('div');
  cardLeft.setAttribute('class', 'cardLeft');

  const cardRight = document.createElement('div');
  cardRight.setAttribute('class', 'cardRight');

  const priorityColor = document.createElement('div');
  priorityColor.setAttribute('class', `priority ${todo.priority}`);

  const cardBody = document.createElement('div');
  cardBody.setAttribute('class', `cardBody`);

  const description = createDescription(todo.description);

  const title = createTitle(todo.name);
  const checkbox = createCheckBox();
  if (todo.done) checkbox.checked = true;
  cardLeft.appendChild(checkbox);
  cardLeft.appendChild(title);

  const date = createDate((new Date(todo.dueDate)));
  const buttons = createCardBtns();

  cardRight.appendChild(date);
  cardRight.appendChild(buttons);

  cardBody.appendChild(cardLeft);
  cardBody.appendChild(cardRight);

  cardContainer.appendChild(cardBody);
  cardContainer.appendChild(description);

  card.appendChild(priorityColor);
  card.appendChild(cardContainer);

  return card;

};

const createTitle = (name) => {
  var title = document.createElement('div');
  title.setAttribute('class', 'todoTitle');
  title.textContent = name;

  return title;
};

const createCheckBox = () => {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'todoCheckbox checkbox-round');
  return checkbox;
};

const createDate = (dueDate) => {
  const date = document.createElement('div');
  date.setAttribute('class', 'todoDate');
  date.innerHTML = formatDate(dueDate);
  return date;
}

const createCardBtns = () => {
  const buttons = document.createElement('div');
  buttons.setAttribute('class', 'todoBtns')

  const editBtn = document.createElement('button');
  editBtn.setAttribute('class', 'editBtn btn');
  // editBtn.innerHTML = `<i class="far fa-edit"></i>`;
  editBtn.innerHTML = 'Edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'deleteBtn btn');
  // deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  deleteBtn.innerHTML = 'Del'
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  return buttons;
};

const createDescription = (desc) => {
  const description = document.createElement('div');
  description.setAttribute('class', 'description');
  description.innerHTML = desc;
  return description;
};

module.exports = { createCardBtns, createTodoCard }