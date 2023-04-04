const taskName = document.querySelector(".add-task__input");
const addTask = document.querySelector(".add-task__button");
const todo = document.querySelector("#todo");
const done = document.querySelector("#done");
const handle = document.querySelector(".item__handle");
const dummy1 = document.querySelector('#dummy1');
const dummy2 = document.querySelector('#dummy2');
const itemInput = document.querySelector(".item__input");

let insertElm="";
let idNum = 0;

function addItem() {
    if (!taskName.value){
        alert("値が入力されていません。")
    } else {
        insertElm =
        `<tr id="list${idNum}" class="item" draggable="true">
            <td class="item__handle">
                <img class="item__drag_icon" src="drag_indicator.svg">
            </td>
            <td class="item__task-name">
                <input class="item__input" value="${taskName.value}">
            </td>
            <td>
                <button class="item__complete">完了</button></td><td><button class="item__delete">削除</button>
            </td>
        </tr>`
        dummy1.insertAdjacentHTML("beforebegin", insertElm);
        taskName.value="";
        idNum++;
    }
}

function DelAndDoneItem(event){
    console.log(event.target);
    if (event.target.className == "item__delete") {
        let id = event.target.closest("tr");
        console.log(id);
        id.remove();
    }
    // 編集完了（Enter押下）時にフォーカスを外す
    else if(event.target.className == "item__input"){
        console.log("itemInput");
        event.target.addEventListener("keydown", e =>{
            console.log("keydown");
            if(e.key == "Enter") {
                e.target.blur();
            }
        })
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
document.querySelector(".add-task__form").addEventListener("submit", (event)=> {
    event.stopPropagation();
    event.preventDefault();
    }
)