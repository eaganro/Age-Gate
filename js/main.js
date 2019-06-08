const AgeGate = function(gateOptions = {}) {

  if (localStorage.getItem('ofAge') === 'true') {
    return;
  }

  let defaultOptions = {
    age: 21,
    header: 'WELCOME TO WYNG MAKE THIS LONGER',
    logo: 'https://pbs.twimg.com/profile_images/793821947738062848/SMVsLW5n_400x400.jpg',
  };
  const userOptions = Object.assign({}, defaultOptions, gateOptions);

  const submitAge = function() {
    let today = new Date();
    let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
    let selectedMonth = monthSelect.options[monthSelect.selectedIndex].value;
    if (today.getFullYear() - selectedYear < userOptions.age) {
      message.innerHTML = 'You are not of legal age';
    } else if (today.getFullYear() - selectedYear === userOptions.age && today.getMonth() < selectedMonth) {
      message.innerHTML = 'You are not of legal age';
    } else {
      if (rememberMe.checked) {
        localStorage.setItem('ofAge', true);
      }
      message.innerHTML = 'Welcome';
      setTimeout(() => gate.remove(), 1000);
    }
  }

  let gate = document.createElement('div');
  gate.classList.add('ageGate');

  let flexContainer = document.createElement('div');
  flexContainer.classList.add('flexContainer');

  let logo = document.createElement('img');
  logo.src = userOptions.logo;
  flexContainer.appendChild(logo);

  let header = document.createElement('div');
  header.innerHTML = userOptions.header;
  header.classList.add('headerText');
  flexContainer.appendChild(header);

  let enterAge = document.createElement('div');
  enterAge.innerHTML = 'Please enter your date of birth.';
  enterAge.classList.add('enterAge');
  flexContainer.appendChild(enterAge);

  let selectsContainer = document.createElement('div');
  selectsContainer.classList.add('selectsContainer');
  flexContainer.appendChild(selectsContainer);

  let monthSelect = document.createElement('select');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months.forEach((month, i) => {
    let option = document.createElement('option');
    option.value = i;
    option.text = month;
    monthSelect.appendChild(option);
  });
  monthSelect.setAttribute('id', 'monthSelect');

  monthSelect.onchange = function() {
    daySelect.innerHTML = '';
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let selectedMonth = monthSelect.options[monthSelect.selectedIndex].value;
    let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
    let numDays;
    if (selectedMonth === '1' && (((selectedYear % 4 == 0) && (selectedYear % 100 != 0)) || (selectedYear % 400 == 0))) {
      numDays = 29;
    } else {
      numDays = days[selectedMonth];
    }
    for (let i = 1; i <= numDays; i += 1) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i;
      daySelect.appendChild(option);
    }
  };
  selectsContainer.appendChild(monthSelect);

  let daySelect = document.createElement('select');
  for (let i = 1; i <= 31; i += 1) {
    let option = document.createElement('option');
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }
  daySelect.setAttribute('id', 'daySelect');
  selectsContainer.appendChild(daySelect);

  let yearSelect = document.createElement('select');
  let currentYear = new Date().getFullYear();
  for (let i = 0; i < 120; i += 1) {
    let option = document.createElement('option');
    option.value = currentYear - i;
    option.text = currentYear - i;
    yearSelect.appendChild(option);
  }
  yearSelect.onchange = function() {
    let selectedMonth = monthSelect.options[monthSelect.selectedIndex].value;
    let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
    if (selectedMonth === '1') {
      daySelect.innerHTML = '';
      let numDays = 28;
      if (((selectedYear % 4 == 0) && (selectedYear % 100 != 0)) || (selectedYear % 400 == 0)) {
        numDays = 29;
      }
      for (let i = 1; i <= numDays; i += 1) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        daySelect.appendChild(option);
      }
    }
  };
  yearSelect.setAttribute('id', 'yearSelect');
  selectsContainer.appendChild(yearSelect);

  let submitDiv = document.createElement('div');
  let submitButton = document.createElement('button');
  submitButton.innerHTML = 'ENTER';
  submitButton.onclick = submitAge;
  submitDiv.appendChild(submitButton);

  let checkboxDiv = document.createElement('div');
  checkboxDiv.classList.add('checkboxContainer');
  let rememberMe = document.createElement('input');
  rememberMe.type = 'checkbox';
  rememberMe.name = 'remember';
  let rememberMeLabel = document.createElement('label');
  rememberMeLabel.for = 'remember';
  rememberMeLabel.innerHTML = 'Remember Me';
  checkboxDiv.appendChild(rememberMe);
  checkboxDiv.appendChild(rememberMeLabel);


  submitDiv.appendChild(checkboxDiv);
  flexContainer.appendChild(submitDiv);

  let message = document.createElement('div');
  message.innerHTML = 'You must be of legal age to access this site.';
  message.classList.add('message');
  flexContainer.appendChild(message);
  gate.appendChild(flexContainer);

  let body = document.querySelector('body');
  body.insertAdjacentElement('afterbegin', gate);
}
