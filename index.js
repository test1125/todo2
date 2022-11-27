const taskName = document.querySelector("#task_name");
const addTask = document.querySelector("#add_task");
const note = document.querySelector("#note");
let insertElm="";

function addItem() {
    const dragIcon = '<td><img class="drag_icon" src="drag_indicator.svg"></img></td>';
    let tdTask = `<td>${taskName.value}</td>`;
    const tdComplete = "<td><button>完了</button></td>";
    const tdDelete = '<td><button class="delete">削除</button></td>';
    insertElm = `<tr>${dragIcon}${tdTask}${tdComplete}${tdDelete}</tr>`;
    note.insertAdjacentHTML("beforeend", insertElm);
    taskName.value="";
}

function deleteItem(){
    if (event.target.className == "delete") {
        let id = event.target.closest("tbody"); //tbodyが作られるのでそこから消す
        console.log(id);
        id.remove();
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