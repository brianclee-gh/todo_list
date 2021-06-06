const leftSVGLoader = {
  'All': `<i class="far fa-compass"></i>`,
  'Church': `<i class="fas fa-church"></i>`,
  'School': `<i class="fas fa-school"></i>`,
  'Work': `<i class="fas fa-briefcase"></i>`,
  default: '<i class="fas fa-tasks"></i>',
};

const populateLeft = (app) => {
  const listsBar = document.getElementById('lists');
  listsBar.innerHTML = '';

  app.lists.forEach((list) => {
    const container = document.createElement('div');

    const listsLeft = document.createElement('div');
    listsLeft.setAttribute('class', 'listsLeft');
    const listsRight = document.createElement('div');
    listsRight.setAttribute('class', 'listsRight');
    const listDelete = document.createElement('div');
    listDelete.classList.add('delete-list')
    listDelete.innerHTML = '<i class="far fa-minus-square"></i>';

    listsLeft.innerHTML = leftSVGLoader[list.name]
      ? leftSVGLoader[list.name]
      : leftSVGLoader.default ;
    listsRight.innerHTML = list.name;

    container.setAttribute('class', 'list-selector');
    container.setAttribute('data-list', list.name);

    container.appendChild(listsLeft);
    container.appendChild(listsRight);
    if (list.name !== "All") container.appendChild(listDelete);


    listsBar.appendChild(container);
  });
};

const createDropdown = (listname) => {
  const dropdownItem = document.createElement('div');
  dropdownItem.innerHTML = listname;
  dropdownItem.setAttribute('data-dropdown', listname);

  return dropdownItem;
};

module.exports = { populateLeft, createDropdown }