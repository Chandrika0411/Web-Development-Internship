const taskInput=document.getElementById("taskInput");
const dateInput=document.getElementById("dateInput");
const timeInput=document.getElementById("timeInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const emptyMsg=document.getElementById("emptyMsg");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
let editIndex=null;

displayTasks();

addBtn.addEventListener("click",addTask);

function addTask(){

    if(taskInput.value.trim()==""){
        alert("Enter Task");
        return;
    }

    let task={
        title:taskInput.value,
        date:dateInput.value,
        time:timeInput.value,
        completed:false
    };

    if(editIndex===null){
        tasks.push(task);
    }
    else{
        task.completed=tasks[editIndex].completed;
        tasks[editIndex]=task;
        editIndex=null;
        addBtn.innerHTML="Add Task";
    }

    saveTask();
    clearInput();
    displayTasks();

}

function displayTasks(){

    taskList.innerHTML="";

    if(tasks.length==0){
        emptyMsg.style.display="block";
    }
    else{
        emptyMsg.style.display="none";
    }

    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML=`

        <div class="taskInfo">

            <div class="taskTitle">${task.title}</div>

            <div class="taskDate">

            📅 ${task.date||"No Date"}

            ⏰ ${task.time||"No Time"}

            </div>

        </div>

        <div class="actions">

        <button class="done" onclick="completeTask(${index})">Done</button>

        <button class="edit" onclick="editTask(${index})">Edit</button>

        <button class="delete" onclick="deleteTask(${index})">Delete</button>

        </div>

        `;

        taskList.appendChild(li);

    });

}

function completeTask(index){

    tasks[index].completed=!tasks[index].completed;

    saveTask();

    displayTasks();

}

function editTask(index){

    taskInput.value=tasks[index].title;

    dateInput.value=tasks[index].date;

    timeInput.value=tasks[index].time;

    editIndex=index;

    addBtn.innerHTML="Update Task";

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTask();

    displayTasks();

}

function clearInput(){

    taskInput.value="";

    dateInput.value="";

    timeInput.value="";

}

function saveTask(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}