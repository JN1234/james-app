
function login() {

  var password = "";
  var userPassword = document.getElementById('userPassword').value
  
  var feeback = document.getElementById('login-feedback')
  var email = document.getElementById('userEmail').value
  var password = userPassword.toString();

  var info = { password, email
  }
 
  console.log(info)


  fetch("http://issuetracker-web.herokuapp.com/users/login", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(info)
  }).then(response => response.json())
    .then((data) => {
      
      console.log(data)
      if (data[0].id !== -1) {

        localStorage.setItem("user", JSON.stringify(data[0]));
        window.location = "index.html"



      }
      else {
        
       feeback.innerText=data[0].name
       feeback.className="error-text"

      }
    })


}
function logout() {
  localStorage.removeItem("user")
  window.location.reload()
}
function isLoggedIn(){
  
  var user = JSON.parse(localStorage.getItem("user"));

  if(user== null){
    
  window.location="login.html"
  }
}
function goLogin() {
  
  window.location="login.html"
}
function registerUser() {
  var parsedPassword = [];

  var feeback = document.getElementById('register-feedback')
  var password = "";
  var name = document.getElementById('userName').value
  var userPassword = document.getElementById('userPassword').value
  var selects = document.getElementById('roleSelect')
  var email = document.getElementById('userEmail').value
  var roleId = selects.value
  var stringPassword = userPassword.toString().split("");

    for (var i = 0; i < stringPassword.length; i++) {
    if (i < stringPassword.length - 1) {

      parsedPassword.push(stringPassword[i] + "@")
    }
    else {

      parsedPassword.push(stringPassword[i])
    }
  }
  parsedPassword.forEach(item => {
    password += item
  })
  var info = {
    name, password, email, roleId
  }
  var info2 = {
    name, password: "", email, roleId
  }
  console.log(info2)

  fetch("http://issuetracker-web.herokuapp.com/users/create", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(info)
  }).then(data => data.json())
    .then((response) => {

      if(parseInt(response.status) === 500){
        feeback.innerHTML="Fill in all fields"
        feeback.className="error-text"
      }
      if (response[0] === "Password be at least 4 characters long.") {
        feeback.innerHTML=`${response[0]}`
        feeback.className="error-text"
      }
      if (response[0] === "Password must consist of numbers 1 - 9 only.") {
        feeback.innerHTML=`${response[0]}`
        feeback.className="error-text"
      }
      if (response[0] === "User already exists in the database.") {
        feeback.innerHTML=`${response[0]}`
        feeback.className="error-text"
      }
      if (response[0] === "User record created successfully.") {
        localStorage.setItem("user", JSON.stringify(info2));

        window.location = "index.html"
      }
    })
}

function changeView(id) {
  var viewToShow;
  var issue = document.getElementById('issue')
  var welcome = document.getElementById('welcome')
  var about = document.getElementById('about')
  var equipment = document.getElementById('equipment')
  var views = [issue, welcome, about, equipment]
  var user = JSON.parse(localStorage.getItem("user"))
  var viewsFiltered = views.filter((item) => item.id != id.split("View")[0]);
  viewToShow = views.filter((item) => item.id === id.split("View")[0])[0];

  if (user === null && viewToShow.id !== "about" && viewToShow.id !== "welcome") {
    window.location="login.html"
  }
  else if (viewToShow.id === "about" || viewToShow.id === "welcome") {

    viewsFiltered.forEach(item => { item.className = "disappear" })
    viewToShow.className = ""
  }
  else {
    viewsFiltered.forEach(item => { item.className = "disappear" })
    viewToShow.className = ""
  }
}

function goToPage(id){
  
  var page=id.split("View")[0];
  var user = JSON.parse(localStorage.getItem("user"))

  if(user === null){
    window.location="login.html"
  }
  else{
    
  window.location=`${page}.html`;
  }
}

function goHome(){
    
  window.location=`index.html`;
}
function addEquip() {

  var description = document.getElementById('equipmentDesc').value;

  var name = document.getElementById('equipmentName').value;


  fetch("http://issuetracker-web.herokuapp.com/equips/read")
    .then(response => response.json())
    .then(equips => {

      var equipsId = 0;
      if (equips.length > 0) {
        equipsId = equips[equips.length - 1].id + 1;
      }



      var info = {
        description, name, id: equipsId
      }

      console.log(info)

      fetch("http://issuetracker-web.herokuapp.com/equips/create", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify(info)
      }).then(data => data.json())
        .then((response) => {

          window.alert(response[0]);

          var rows = "";


          rows += `<tr><td>` + info.id + `</td><td>` + info.name + `</td><td>` + info.description + `</td><td id=${info.id} onClick="deleteEquip(this.id)" style="color:red;text-decoration:underline;
  cursor: pointer;">` + "delete" + `</td></tr>`;
          $(rows).appendTo("#equipmentList tbody");
        });
    })





}

function addIssue() {

  var description = document.getElementById('issueDesc').value;

  var role = parseInt(JSON.parse(localStorage.getItem("user")).id);
  var user_name =JSON.parse(localStorage.getItem("user")).name
  var location = document.getElementById('issueLocation').value;
  var equipselects = document.getElementById('equipmentSelect');
  var supervisorselects = document.getElementById('supervisorSelect');
  var equipmentId = parseInt(equipselects.value);
  var equipmentName = equipselects.options[equipselects.selectedIndex].text;

  var supervisorId = parseInt(supervisorselects.value);
  var supervisorName = supervisorselects.opti
  var today  = new Date().toISOString().slice(0, 10);

  fetch("http://issuetracker-web.herokuapp.com/issues/read")
    .then(response => response.json())
    .then(issues => {
      var issuesId = 0;
      if (issues.length > 0) {
        issuesId = issues[issues.length - 1].id + 1;
      }

      var info = {
        description, location, equipmentId,supervisorId, userId: role, status: "", id: issuesId,date:today
      }

      console.log(info)
      fetch("http://issuetracker-web.herokuapp.com/issues/create", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify(info)
      }).then(data => data.json())
        .then((response) => {
          window.alert(response[0]);
          var rows = ""
          rows += `<tr ><td> ` + info.id + `</td><td>` + equipmentName + `</td><td>` + info.description + `</td><td>` + info.location + `</td><td>` + info.status + `<p style="font-size:16px;padding:5px;display:inline-block; text-decoration:underline;
  cursor: pointer;color:green;" id=${info.id} onClick="logStuff()" data-bs-toggle="modal" data-bs-target="#issueModal">Edit</p>` + `</td><td>` + user_name + `</td><td>` + supervisorName + `</td><td>` + info.date + `</td><td id=${info.id} onClick="deleteIssue(this.id)" style="color:red;text-decoration:underline;
  cursor: pointer;"> ` + "delete" + `</td></tr>`;


          $(rows).appendTo("#issueList tbody");

        });

    })




}
function cancelIssuePost() {

  console.log("reset form")
  
  var description = document.getElementById('issueDesc').value="";

  var location = document.getElementById('issueLocation').value="";
  var selects = document.getElementById('equipmentSelect').value="0";


}
function cancelEquipPost() {

  console.log("reset form")
  
 
  var description = document.getElementById('equipmentDesc').value="";

  var name = document.getElementById('equipmentName').value="";

}
function getUsers(){
  var userSelect = document.getElementById("supervisorSelect")

  fetch("http://issuetracker-web.herokuapp.com/users/read")
    .then(response => response.json())
    .then(data => {
var supervisors=data.filter(e => e.roleId === "1")
      supervisors.map(item => {
        userSelect.options[userSelect.options.length] = new Option(`${item.name}`, `${item.id}`);
        
      })
    
    })
}
function getRoles(){
  var userSelect = document.getElementById("roleSelect")

  fetch("http://issuetracker-web.herokuapp.com/role/read")
    .then(response => response.json())
    .then(data => {
  data.map(item => {
        userSelect.options[userSelect.options.length] = new Option(`${item.name}`, `${item.id}`);
        
      })
    
    })
}

function getEquips() {


  var logout = document.getElementById('logout')
  var login = document.getElementById('login')
  var username = document.getElementById('username')
  var user = JSON.parse(localStorage.getItem("user"));

  if (user === null) {
    logout.className = "d-none"
    username.innerHTML="No user found"
  }
  else{
    login.className="d-none"
    
    username.innerHTML=` <i data-feather="user" style="color:black;"></i>  Welcome, ${user.name}`
  }
  
  fetch("http://issuetracker-web.herokuapp.com/equips/read")
    .then(response => response.json())
    .then(data => {

      var rows = "";
      $.each(data, function () {

        rows += `<tr><td>` + this.id + `</td><td>` + this.name + `</td><td>` + this.description + `</td><td id=${this.id} onClick="deleteEquip(this.id)" style="color:red;text-decoration:underline;
  cursor: pointer;">` + "delete" + `</td></tr>`;
      });

      $(rows).appendTo("#equipmentList tbody");
    });



}
function getIssues() {

  var equipment = [];
  var users = []
  
  var equipmentSelect = document.getElementById('equipmentSelect');
  fetch("http://issuetracker-web.herokuapp.com/equips/read")
    .then(response => response.json())
    .then(data => {
      equipment = data;
       
      equipment.map(item => {

        equipmentSelect.options[equipmentSelect.options.length] = new Option(`${item.name}`, `${item.id}`);
      })

  fetch("http://issuetracker-web.herokuapp.com/users/read")
  .then(response => response.json())
  .then(data => {
    users = data;
  
    fetch("http://issuetracker-web.herokuapp.com/issues/read")
    .then(response => response.json())
    .then(issues => {



      var rows = "";
      $.each(issues, function () {

        var equip = equipment.find(e => e.id === parseInt(this.equipmentId));
        
        var user = users.find(e => e.id === parseInt(this.userId));
        
        var supervisor = users.find(e => e.id === parseInt(this.supervisorId));

        var name = equip === undefined ? "unknwown" : equip.name;
        
        var user_name = user === undefined ? "unknwown" : user.name;
        
        var supervisor_name = supervisor === undefined ? "unknwown" : supervisor.name;

        rows += `<tr ><td> ` + this.id + `</td><td>` + name + `</td><td>` + this.description + `</td><td>` + this.location + `</td><td>` + this.status + `<p style="font-size:16px;padding:5px;display:inline-block; text-decoration:underline;
cursor: pointer;color:green;" id=${this.id} onClick="logStuff()" data-bs-toggle="modal" data-bs-target="#issueModal">Edit</p>` + `</td><td>` + user_name + `</td><td>` + supervisor_name + `</td><td>` + this.date + `</td><td id=${this.id} onClick="deleteIssue(this.id)" style="color:red;text-decoration:underline;
cursor: pointer;"> ` + "delete" + `</td></tr>`;


      });

      $(rows).appendTo("#issueList tbody");

    });
  }
    
    )
    });
  $('#issueList tbody').on('click', e => {
    //Get the clicked row ID

    var zaf = $('#issueList tbody').attr("id");
    //Log the ID to the console
    console.log(e.target.id);

    var table = document.getElementById("statusId");
    table.innerHTML = e.target.id

  })
  $('#equipmentList tbody').on('click', e => {
    //Get the clicked row ID

    //Log the ID to the console
    console.log(e.target.id + "eq");


  })

}
function nextPage() {
  if (localStorage.totalPrice > 400) {
    window.location.href = "competition.html";
  }
  else {
    window.alert("Submitted succesfully!")
    window.location.reload();
  }
}
function logStuff() {
  console.log("struff")
}

function deleteIssue(e) {


  var today  = new Date().toISOString().slice(0, 10);
  var id = parseInt(e);
  var info = {
    description: "des", location: "ello", equipmentId: "12", userId: 1, status: "status", id, date:today
  }

  console.log(info)

  fetch("http://issuetracker-web.herokuapp.com/issues/delete", {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(info)
  }).then(data => data.json())
    .then((response) => {
      window.alert(response[0]);
      window.location.reload()
    });

}
function deleteEquip(e) {


  var id = parseInt(e);
  var info = {
    name: "name", id, description: "sdsds"
  }

  console.log(info)

  fetch("http://issuetracker-web.herokuapp.com/equips/delete", {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(info)
  }).then(data => data.json())
    .then((response) => {
      window.alert(response[0]);
      window.location.reload()
    });

}
function updateIssue() {


  var dateObject = new Date().getFullYear().toString();
  var month = new Date().getMonth().toString();
  var day = new Date().getDate().toString();
  var id = parseInt(document.getElementById("statusId").innerHTML);
  var status = document.getElementById("issueStatus").value;
  var info = {
    description: "des", location: "ello", equipmentId: "12", userId: 1, status, id, date: dateObject + "-" + "0" + month + '-' + "0" + day
  }

  var role = JSON.parse(localStorage.getItem("user"));
  if (role.roleId !== '1') {
    window.alert("Only Supervisor can provide feedback.Please log in as superviser")
  }
  else {
    fetch("http://issuetracker-web.herokuapp.com/issues/update", {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(info)
    }).then(data => data.json())
      .then((response) => {
        window.alert(response[0]);



      });
  }

}