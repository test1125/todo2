const taskName = document.querySelector("#task_name");
const addTask = document.querySelector("#add_task");
const todo = document.querySelector("#todo");
const done = document.querySelector("#done");
const handle = document.querySelector(".handle");

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
        todo.insertAdjacentHTML("beforeend", insertElm);
        taskName.value="";
        idNum++;
    }
}

function deleteItem(event){
    console.log(event.target);
    if (event.target.className == "delete") {
        let id = event.target.closest("tbody"); //tbodyが作られるのでそこから消す
        console.log(id);
        id.remove();
    } 
    else if (event.target.innerText == "完了"){
        event.target.innerText="戻す"
        let id = event.target.closest("tbody");
        id.remove();
        done.insertAdjacentHTML("beforeend", id.innerHTML);        
    } else if (event.target.innerText == "戻す") {
        event.target.innerText="完了";
        let id = event.target.closest("tbody");
        id.remove();
        todo.insertAdjacentHTML("beforeend", id.innerHTML);
    } else {
        document.querySelectorAll('tr').forEach (elm => {
            elm.ondragstart = function (e) {
                e.dataTransfer.setData('text/plain', e.target.id);
            };
            elm.ondragover = function (e) {
                e.preventDefault();
                this.style.borderTop = '2px solid blue';
            };
            elm.ondragleave = function () {
                this.style.borderTop = '';
            };
            elm.ondrop = function (e) {
                e.preventDefault();
                let id = e.dataTransfer.getData('text/plain');
                let elm_drag = document.getElementById(id);
                console.log(id);
                console.log(elm_drag);
                typeof(elm_drag);
                this.parentNode.insertBefore(elm_drag, this);
                this.style.borderTop = '';
            };
        
        });
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