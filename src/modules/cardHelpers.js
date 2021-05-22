const createTodoCard = (todo) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'todoCard');
  if (todo.done) card.classList.add('strike');
  card.setAttribute('data-uuid', `${todo.uuid}`);

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

  const date = createDate(todo.dueDate);
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
  date.innerHTML = dueDate;
  return date;
}

const createCardBtns = () => {
  const buttons = document.createElement('div');
  buttons.setAttribute('class', 'todoBtns')

  const editBtn = document.createElement('button');
  editBtn.setAttribute('class', 'editBtn btn');
  editBtn.innerHTML = `<i class="far fa-edit"></i>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'deleteBtn btn');
  deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  return buttons;
};

const createDescription = (desc) => {
  const description = document.createElement('div');
  description.setAttribute('class', 'description');
  description.innerHTML = desc;
  return description;
}

module.exports = { createCardBtns, createTodoCard }