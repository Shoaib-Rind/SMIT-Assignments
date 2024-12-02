var boxElm = document.getElementsByClassName('box')[0];
function ListData(itemValue){
  this.listText = itemValue;
  this.id = Math.floor((Math.random()*1000 + Number((new Date().getTime().toString()).slice(-4))) )
  this.done = false;
}
function saveData(data) {
  localStorage.setItem('todo_items', JSON.stringify(data))
  boxElm.innerHTML = ''  
  renderListItems(); 
}
function readData() {
  return JSON.parse(localStorage.getItem('todo_items'));
}

var todoData =  (readData()) ?  [...readData()] : []  ; 

function submitInput(e) {
  e.preventDefault();
  var inpValue = document.getElementById('input-text').value;
  
  var obj = new ListData(inpValue);
  todoData = [...todoData, obj]
  console.log(todoData);
  saveData(todoData) 
}

function renderListItems() {
    for (let i = 0; i < todoData.length; i++) {
      boxElm.innerHTML += `<div style='display:flex;'>
      <input type='text' value='${todoData[i].listText}' class='hide'/>
      <p>${todoData[i].listText}</p>
       <button onClick='editItem(event,${todoData[i].id})' style='margin-right: 6px;'>edit</button>
       <button onClick='deleList(event, ${todoData[i].id})'>delete</button>
      </div>`
    }
}
renderListItems();

function deleList(e, id){

  todoData = todoData.filter(item => item.id !== id);

  saveData(todoData);
}


function editItem(e ,id){
 var inputText = e.target.previousElementSibling.previousElementSibling;
 var displayText = e.target.previousElementSibling;
 var button = e.target;

 inputText.style.display = 'block'; 
 displayText.style.display = 'none'; 
 button.innerText = 'Done';

  button.onclick = function () {
    updatedItem(id, inputText.value);
  };
 
}

function updatedItem(id , inptValue){
  console.log(id,inptValue)
  for (let i = 0; i < todoData.length; i++) {
    if(todoData[i].id === id){
      todoData[i] = {...todoData[i], listText:  inptValue}
      saveData(todoData)
      return
    }
  }
}