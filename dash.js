// start

document.addEventListener("DOMContentLoaded", function(){

  initLogin();
  initTasks();
  initNotes();
  initBalance();
  initTimer();
  initQuotes();

});



//login

function initLogin(){

  if(localStorage.getItem("login") === "true"){

    document.getElementById("loginbox").style.display = "none";
    document.getElementById("dashboard").classList.remove("hidden");

  }

}


function login(){

  let user = document.getElementById("name").value;
  let pass = document.getElementById("password").value;

  let msg = document.getElementById("msg");

  if(user === "Anchu" && pass === "12345"){

    localStorage.setItem("login","true");

    document.getElementById("loginbox").style.display = "none";
    document.getElementById("dashboard").classList.remove("hidden");

  }else{

    msg.innerText = "Login Invalid";
    msg.style.color = "red";

  }
}


function logout(){

  localStorage.clear();
  location.reload();

}



// task

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function initTasks(){
  showtask();
}


function addtask(){

  let input = document.getElementById("task");

  if(input.value === ""){
    alert("Enter task");
    return;
  }

  let task = {
    id: Date.now(),
    name: input.value
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";

  showtask();
}


function showtask(){

  let list = document.getElementById("tasklist");

  list.innerHTML = "";

  tasks.forEach(function(task){

    let li = document.createElement("li");

    li.innerText = task.name;

    li.onclick = function(){
      dltTask(task.id);
    };

    list.appendChild(li);

  });

}


function dltTask(id){

  tasks = tasks.filter(function(task){
    return task.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  showtask();
}



//notes

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function initNotes(){
  shownotes();
}


function savenote(){

  let noteText = document.getElementById("notebook").value;

  if(noteText === ""){
    alert("Write something");
    return;
  }

  notes.push(noteText);

  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("notebook").value = "";

  shownotes();
}


function shownotes(){

  let box = document.getElementById("notes");

  box.innerHTML = "";

  notes.forEach(function(note){

    let div = document.createElement("div");

    div.className = "note";

    div.innerText = note;

    box.appendChild(div);

  });

}



//expense

let balance = Number(localStorage.getItem("balance")) || 20;

function initBalance(){

  document.getElementById("balance").innerText =
    "Balance: " + balance;

}


function add(){

  let amount = Number(document.getElementById("amount").value);

  let type = document.getElementById("type").value;

  if(amount === 0){
    alert("Enter Amount");
    return;
  }

  if(type === "income"){
    balance += amount;
  }else{
    balance -= amount;
  }

  localStorage.setItem("balance", balance);

  initBalance();

  document.getElementById("amount").value = "";

}



// timer

let seconds = Number(localStorage.getItem("seconds")) || 0;

let timer = null;

function initTimer(){

  showTimer();

}


function starttimer(){

  if(timer !== null) return;

  timer = setInterval(function(){

    seconds++;

    localStorage.setItem("seconds", seconds);

    showTimer();

  }, 1000);
}


function stoptimer(){

  clearInterval(timer);

  timer = null;

}


function showTimer(){

  let min = Math.floor(seconds/60);

  let sec = seconds % 60;

  document.getElementById("timer").innerText =
    min + ":" + (sec < 10 ? "0" : "") + sec;

}



// quote

let quotes = [
  "Believe in yourself",
  "Never give up",
  "Dream big",
  "Stay positive"
];


function initQuotes(){

  let btn = document.getElementById("button");

  if(btn){

    btn.onclick = async function(){

      let quote = await getquote();

      document.getElementById("quotebox").innerText = quote;

    };

  }

}


async function getquote(){

  return new Promise((resolve)=>{

    setTimeout(()=>{

      let i = Math.floor(Math.random() * quotes.length);

      resolve(quotes[i]);

    },1000);

  });

}