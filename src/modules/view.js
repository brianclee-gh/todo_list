const titleStrike = (todoID) => {
  const targetTodo = document.body.querySelector(`.todoCard[data-uuid="${todoID}"]`)
  targetTodo.classList.toggle('strike');
};

const removeCard = (node) => {
  node.remove();
};

module.exports = { titleStrike, removeCard }