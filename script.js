const fetchallbutton = document.getElementById('fetch-all');
const fetchrandombutton=document.getElementById('fetch-random');
const fetchbyname = document.getElementById('search-by-name');
const studentcontainer = document.getElementById('student-container');
const Text = document.querySelector('.student');
const attributionText = document.querySelector('.attribution');

const resetStudents = () => {
  studentcontainer.innerHTML = '';
}

const renderError = response => {
  studentcontainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderStudents = (students = []) => {
  resetStudents();
  if (students.length > 0) {
    students.forEach(name => {
      const newStudent = document.createElement('div');
      newStudent.className = 'single-student';
      newStudent.innerHTML = `<div class="student-text">${name.name}</div>
      <div class="attribution">- ${name.languages}</div>`;
      studentcontainer.appendChild(newStudent);
    });
  } else {
    studentcontainer.innerHTML = '<p>Your request returned no student.</p>';
  }
}

fetchallbutton.addEventListener('click', () => {
  fetch('/api/students')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderStudents(response.students);
  });
});

fetchrandombutton.addEventListener('click', () => {
  fetch('/api/students/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderStudents([response.name]);
  });
});

fetchbyname.addEventListener('click', () => {
  const person = document.getElementById('person').value;
  fetch(`/api/students?name=${person}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderStudents(response.students);
  });
});