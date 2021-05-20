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

const printTarget = (e) => {
  console.log(e.target.dataset.list);
};

module.exports = { getCheckedRadio, returnFormValue, printTarget }