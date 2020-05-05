const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const { students } = require('./data');
const { getRandomElement } = require('./utils');
const PORT = process.env.PORT || 3000;
app.use(express.static("./"));
app.use(express.static('public'));
app.get('/', (req, res) =>{
  let bytes = fs.readFileSync('./indi.html').toString();
  res.send(bytes);
});
app.get('/api/students/random',(req,res,next)=>{
    const name =getRandomElement(students);
    res.send({
        name : name
    });
});
app.get('/api/students',(req,res,next)=>{
    if(!req.query.name){
        res.send({
            students:students
        });
    }
    else{
        const studentbyName =students.filter(element =>element.name===req.query.name);
        res.send({
            students:studentbyName
        });
    }
    
});
app.post('/api/students', (req, res,next) => {
  if (req.query.name && req.query.languages) {
    const newStudent = {
    name: req.query.name,
    languages: req.query.languages
  };
    students.push(newStudent);
    res.send({ name: newStudent });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening  : port ${PORT}.`);
});
