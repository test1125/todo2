const taskName = document.querySelector("#task_name");
const addTask = document.querySelector("#add_task");
const note = document.querySelector("#note");
let insertElm="";

function addItem() {
    const dragIcon = '<td><img id="drag_icon" src="drag_indicator.svg"></img></td>';
    let tdTask = `<td>${taskName.value}</td>`;
    const tdComplete = "<td><button>完了</button></td>";
    const tdDelete = "<td><button>削除</button></td>";
    insertElm = `<tr>${dragIcon}${tdTask}${tdComplete}${tdDelete}</tr>`;
    note.insertAdjacentHTML("beforeend", insertElm);
    taskName.value="";
}

addTask.addEventListener("click", addItem);