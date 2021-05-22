const getCheckedRadio = (name) => {
  let radio = document.querySelectorAll(`input[name="${name}"]`);
  let selected;

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      selected = radio[i].value;
      break;
    }
  }

  return selected;
};

const returnFormValue = (name) => {
  const target = document.getElementById(`${name}`);
  if (!target) return null;
  return target.value;
};

const printTarget = (e, app) => {
  console.log(e.target.dataset.list);
  console.log(app.getList(e.target.dataset.list));
};

const addEventListenerList = (nodeList, event, fn) => {
  for (var i = 0; i < nodeList.length; i++) {
    nodeList[i].addEventListener(event, fn, false);
  }
};

module.exports = { getCheckedRadio, returnFormValue, printTarget, addEventListenerList }