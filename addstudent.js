const submit = document.getElementById('submit');
const newstudentcontainer = document.getElementById('new-student');
submit.addEventListener('click',()=>{
    const name =document.getElementById('name').value;
    const languages =document.getElementById('languages').value;
    fetch(`/api/students?name=${name}&languages=${languages}`,{
        method:'POST',
    })
    .then(response=>response.json())
    .then(({name})=>{
        const newstudent = document.createElement('div');
        newstudent.innerHTML=`
        <h3>Congrates,your name was added!</h3>
        <div class="student-text">${name.name}</div>
        <div class="attribution">- ${name.languages}</div>
        <p> Go to the <a href ="indi.html">Home page</a>to request and view all students</p>`
        newstudentcontainer.appendChild(newstudent);
    });
});
