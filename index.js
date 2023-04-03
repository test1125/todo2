const taskName = document.querySelector("#task_name");
const addTask = document.querySelector("#add_task");
const todo = document.querySelector("#todo");
const done = document.querySelector("#done");
const handle = document.querySelector(".handle");
const dummy1 = document.querySelector('#dummy1');
const dummy2 = document.querySelector('#dummy2');

let insertElm="";
let idNum = 0;

function addItem() {
    if (!taskName.value){
        alert("値が入力されていません。")
    } else {
        const dragIcon = '<td class="handle"><img class="drag_icon" src="drag_indicator.svg"></img></td>';
        let tdTask = `<td>${taskName.value}</td>`;
        const tdComplete = '<td><button class="complete">完了</button></td>';
        const tdDelete = '<td><button class="delete">削除</button></td>';
        insertElm = `<tr id="list${idNum}" draggable="true">${dragIcon}${tdTask}${tdComplete}${tdDelete}</tr>`;
        dummy1.insertAdjacentHTML("beforebegin", insertElm);
        taskName.value="";
        idNum++;
    }
}

function DelAndDoneItem(event){
    console.log(event.target);
    if (event.target.className == "delete") {
        let id = event.target.closest("tr");
        console.log(id);
        id.remove();
    } 
    else if (event.target.innerText == "完了"){
        event.target.innerText="戻す"
        let clone = event.target.closest("tr").cloneNode(true);
        let id = event.target.closest("tr");
        id.remove();
        dummy2.before(clone);        
    }
    else if (event.target.innerText == "戻す") {
        event.target.innerText="完了";
        let clone = event.target.closest("tr").cloneNode(true);
        let id = event.target.closest("tr");
        id.remove();
        dummy1.before(clone);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}
  
function handleDragOver(e) {
    e.preventDefault();
    e.target.closest("tr").style.borderTop = '2px solid blue';
}

function handleDragLeave(e) {
    e.target.closest("tr").style.borderTop = '';
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(id);
    e.target.closest("tr").before(dragged);
    e.target.closest("tr").style.borderTop = '';
}

addTask.addEventListener("click", addItem);
todo.addEventListener("click", DelAndDoneItem);
done.addEventListener("click", DelAndDoneItem);
todo.addEventListener("dragstart", handleDragStart);
done.addEventListener("dragstart", handleDragStart);
todo.addEventListener("dragover", handleDragOver);
done.addEventListener("dragover", handleDragOver);
todo.addEventListener("dragleave", handleDragLeave);
done.addEventListener("dragleave", handleDragLeave);
todo.addEventListener("drop", handleDrop);
done.addEventListener("drop", handleDrop);


//リダイレクトを避ける
document.querySelector("#form_task").addEventListener("submit", (event)=> {
    event.stopPropagation();
    event.preventDefault();
    }
)