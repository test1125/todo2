const taskName = document.querySelector("#task_name");
const addTask = document.querySelector("#add_task");
const todo = document.querySelector("#todo");
const done = document.querySelector("#done");
let insertElm="";

function addItem() {
    if (!taskName.value){
        alert("値が入力されていません。")
    } else {
        const dragIcon = '<td><img class="drag_icon" src="drag_indicator.svg"></img></td>';
        let tdTask = `<td>${taskName.value}</td>`;
        const tdComplete = '<td><button class="complete">完了</button></td>';
        const tdDelete = '<td><button class="delete">削除</button></td>';
        insertElm = `<tr>${dragIcon}${tdTask}${tdComplete}${tdDelete}</tr>`;
        todo.insertAdjacentHTML("beforeend", insertElm);
        taskName.value="";
    }
}

function deleteItem(){
    if (event.target.className == "delete") {
        let id = event.target.closest("tbody"); //tbodyが作られるのでそこから消す
        console.log(id);
        id.remove();
    } else if (event.target.innerText == "完了"){
        event.target.innerText="戻す"
        let id = event.target.closest("tbody");
        id.remove();
        done.insertAdjacentHTML("beforeend", id.innerHTML);        
    } else if (event.target.innerText == "戻す") {
        event.target.innerText="完了";
        let id = event.target.closest("tbody");
        id.remove();
        todo.insertAdjacentHTML("beforeend", id.innerHTML);
    }
}


addTask.addEventListener("click", addItem);
document.addEventListener("click", deleteItem);


//リダイレクトを避ける
document.querySelector("#form_task").addEventListener("submit", (event)=> {
    event.stopPropagation();
    event.preventDefault();
    }
)