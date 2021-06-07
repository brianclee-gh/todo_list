const titleStrike = (todoID) => {
  const targetTodo = document.body.querySelector(`.todoCard[data-uuid="${todoID}"]`)
  targetTodo.classList.toggle('strike');
};

const removeCard = (node) => {
  node.remove();
};

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const setListBackground = (listSelectors, listName) => {
  listSelectors.forEach((node) => node.classList.remove('select'));
  listSelectors.forEach((node) => {
    if (node.dataset.list === listName) {
      node.classList.add('select');
    }

  })
};

const changeSearchHeader = (phrase) => {
  const listHeader = document.getElementById('listHeader');
  listHeader.innerHTML = 'Results for ' + phrase;
};

const showModal = (id) => {
  const modal = document.getElementById(id);
  modal.style.display = 'flex';
};

module.exports = {
  titleStrike,
  removeCard,
  paginate,
  setListBackground,
  changeSearchHeader,
  showModal
}