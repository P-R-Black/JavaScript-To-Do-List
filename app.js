// Select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'lineThrough';


// variables
let LIST, id;

//get item from local storage ()
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

// Show Today's date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to-do function
function addToDo(toDo, id, done, trash) {

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : " ";

    const item = `
                <li class="item">
                <i class="far co ${DONE}" job="complete" id=${id}></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="far fa-trash-alt de" job="delete" id=${id}></i>
                </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener('keyup',function(even){
    if(event.keyCode == 13) {
        const toDo = input.value;

        if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
            name : toDo,
            id: id,
            done: false,
            trash: false
        });
        // add item to local storage(must be written everywhere we update our list array)
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;

        }
        input.value = "";
    }
});

// Complete To Do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener('click', function(event){
    const element = event.target; // return the clicked element inside the list
    const elementJob = element.attributes.job.value;  // complete or delete

    if(elementJob == "complete") {
        completeToDo(element);
    } else if(elementJob == "delete") {
        removeToDo(element);
    }
    // add item to local storage(must be written everywhere we update our list array)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Target an element created dynamically
//const list = document.getElementById('list');
//list.addEventListener('click', function(event) {
//    let element = event.target;
//    const elementJOB = event.target.attributes.job.value;
//    if(elementJOB == "complete") {
//        completeToDo(element);
//    }else if (elementJOB == "delete"){
//        removeToDo(element);
//    }
//    });
//
//
//// Save To Do List to Local Storage
//
//localStorage.setItem('key', 'value');
//let variable = localStorage.getItem('key');
//
//    localStorage.setItem("TODO", JSON.stringify(LIST));
//
//
//// Restore to do list from local Storage
//
//let LIST, id;
//
//let data = localStorage.getItem("TODO");
//if(data) {
//    LIST = JSON.parse(data);
//    loadToDo(LIST);
//    id = LIST.length;
//    }else{
//        LIST = [];
//        id = 0;
//}
//
//function loadToDo( array ){
//    array.forEach(function(item){
//        addToDo(Item.name, item.id, item.done, item.trash);
//        });
//    }
//
//
//// Clear storage
//const clear = document.querySelector(."clear");
//
//clear.addEventListener('click', function(){
//    localStorage.clear();
//    location.reload();
//});
//
