const fs = require('fs');
const path = require('path');

const userFile = path.join(__dirname, '../../user.json');
let users = JSON.parse(fs.readFileSync(userFile , 'utf-8'));

function saveUsers() {
  fs.writeFileSync(userFile, JSON.stringify(users , null, 2));
}

exports.listOfUsers = (req, res) => {
  res.json(users);
};

exports.userById = (req, res) => {
let id = req.params.id

    let index = users.findIndex((user)=>{
        return (user.id == Number.parseInt(id))
    })
    if (index >= 0){
        let std = users[index]
        res.json(std)
    }
    else{
        return res.status(404).json("User Not Found")
    }

};

exports.createUser = (req, res) => {
    const add ={
        id: users.length + 1,
        Name: req.body.Name,
        email: req.body.email
    }

    users.push(add)
    saveUsers()
    res.json (add)
};

exports.updateUser = (req, res) => {
 let id = req.params.id
    let Name = req.body.Name
    let email = req.body.email
    
    let index = users.findIndex((user)=>{
        return (user.id == Number.parseInt(id))
     })
     if (index >= 0){
        let std = users[index]
        std.Name = Name
        std.email = email
        saveUsers()
        res.json(std)
     }
     else{
        return res.status(404).json("User Not Found")
     }

};

exports.deleteUser = (req, res) => {
 let id = req.params.id
  let index = users.findIndex((user)=>{
        return (user.id == Number.parseInt(id))
     })

     if (index >= 0){
        let std = users[index]
        users.splice (index , 1)
        saveUsers()
        res.json(std)
     }
  else{
    return res.status(404).json("User Not Found")
    }

};
