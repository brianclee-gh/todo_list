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

module.exports = { titleStrike, removeCard, paginate }