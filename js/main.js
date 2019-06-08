const submitAge = function() {
  let today = new Date();
  let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
  let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
  if (today.getFullYear() - selectedYear < 18) {
    lowAge();
  } else if (today.getFullYear() - selectedYear === 18 &&

}

const lowAge = function() {

}

const goodAge = function() {

}

let gate = document.createElement('div');

let monthSelect = document.createElement('select');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
months.forEach((month, i) => {
  let option = document.createElement('option');
  option.value = i;
  option.text = month;
  monthSelect.appendChild(option);
});
monthSelect.setAttribute('id', 'monthSelect');
gate.appendChild(monthSelect);

let yearSelect = document.createElement('select');
let currentYear = new Date().getFullYear();
for (let i = 0; i < 120; i += 1) {
  let option = document.createElement('option');
  option.value = currentYear - i;
  option.text = currentYear - i;
  yearSelect.appendChild(option);
}
yearSelect.setAttribute('id', 'yearSelect');
gate.appendChild(yearSelect);


let submitButton = document.createElement('button');
submitButton.text = 'ENTER';
submitButton.onclick = submitAge;
gate.appendChild(submitButton);

let body = document.querySelector('body');
body.insertAdjacentElement('afterbegin', gate);


