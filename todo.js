/*
Started on: 11 May 2022 2300
Finished: 12 May 2022 0308

Not gna lie, pretty proud of this.

To-do tracking list that saves your undone/unclosed tasks on your local storage.
so no need to worry if you accidentally closed a tab, you may come back to your list anytime with all your data intact as long as \
you're on the same device!
*/

const input = document.querySelector('#todoInput');
const form = document.querySelector('#input');
const ul = document.querySelector('#list');
const closeBtn = document.querySelector('.closeBtn');

let span;
setInterval(()=>{span = document.querySelectorAll('ul li span.tdtracker');}, 100);

let index = Math.ceil(Math.random()*999999999); //to ensure index always start on a diff number when starting program
let key = `tdtracker${index}`;

//storage stuff.. what a nightmare TT 
if (true) { 

    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);

        const newLi = document.createElement('li');
        newLi.innerHTML = localStorage.getItem(key);
        const newBtn = document.createElement('button');
        newBtn.innerHTML = '&#10006;'
        newBtn.classList.add('closeBtn');
        newLi.append(newBtn);
        ul.append(newLi);
      }
}
/*
//to record on the user's browser that user has used page
localStorage.tdtracker = '<p class="attn">Your list has been updated with your previously open undone items! (close this)</p>';
//im gna hide the tracker ig lol
document.querySelector('.attn').parentElement.classList.add('hide'); 
*/



//start of the real code lol

form.addEventListener('submit', (e)=>{ //to add items to todo list
    e.preventDefault(); //stop the redirection when form is submitted
    const newLi = document.createElement('li');
    newLi.innerText = input.value;

    const newSpan = document.createElement('span'); //to store keys for deletion
    newSpan.innerText = key;
    newSpan.classList.add('hide');
    newSpan.classList.add('tdtracker');

    const newBtn = document.createElement('button');
    newBtn.innerHTML = '&#10006;'
    newBtn.classList.add('closeBtn');

    newLi.append(newSpan);
    newLi.append(newBtn);
    ul.append(newLi);

    //for updating.. tdtracker
    localStorage.setItem(key, `${input.value}<span class="hide tdtracker">${key}</span>`);
    index++; key = `tdtracker${index}`;

    input.value = '';
})

ul.addEventListener('click', (e)=>{ //to mark item as done on click
    if (e.target.nodeName === 'LI') {
        e.target.classList.add('done');

        //removing done tasks
        const selectedElementKeyDone = e.srcElement.children[0].innerText;
        localStorage.removeItem(selectedElementKeyDone);
    }
    
    if (e.target.nodeName === 'BUTTON') { //remove item if close button is clicked
        e.path[1].classList.add('hide'); //ngl took an embarrassing amount of effort to find a way 

        //removing closed tasks
        const selectedElementKeyClose = e.srcElement.parentElement.children[0].innerText;
        localStorage.removeItem(selectedElementKeyClose);
    }
})

/* //not working for newly added li elements. should target parent elements instead like i did above
closeBtn.addEventListener('click', (e)=>{ //to remove item from list
    console.log(e.srcElement.parentElement);
    e.srcElement.parentElement.classList.add('hide');
})
*/

//info button
document.querySelector('.infoBtn').addEventListener('click', ()=>{
    alert('Note: \n\
Undone/unclosed items will remain in this list even after a browser/OS restart. \
However, if you clear your browser data, your list will be lost forever!');
})