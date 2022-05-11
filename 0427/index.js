// const topics = [
//     {id:1, title:'html', body:'html is...'},
//     {id:2, title:'css', body:'css is...'},
//     {id:3, title:'javascript', body: 'javascript is...'}    
// ];

let nextId = 4;
let selectedId = null;

function navHandler(e){
    //1. 링크가 작동하지 않아야 한다
    e.preventDefault();
    //2. 아이디 값 알아내기
    selectedId = Number(e.target.id);

    read();
}
async function nav(){

    document.querySelector('nav>ol').innerHTML = "Loading...";

    let response = await fetch('http://localhost:3000/topics');
    let topics = await response.json();
    
    const navTag = topics.map(e=>`<li><a href="/read/${e.id}" id="${e.id}" onclick="navHandler(event);">${e.title}</a></li>`).join('');//배열을 문자열로 만들어주기 위해서 조인을 사용
    document.querySelector('nav>ol').innerHTML = navTag;
   
}

function createForm(){
let tag = '';
tag = `<form name = "form">
<input type = "text" id = "title" name = "title" placeholder = "제목을 입력하세요" size = "40">
<br>
<textarea name = "body" id = "body" rows = "5" cols = "40" placeholder="본문을 입력하세요"></textarea>
</form>`;
document.querySelector('#formDiv').innerHTML = tag;
document.querySelector('#createBtn').remove();

let btn = document.createElement('input');
btn.setAttribute("type","button");
btn.setAttribute("id", "submit");
btn.setAttribute("value","submit");

document.querySelector('#formDiv').appendChild(btn);
}

document.querySelector('#createBtn').addEventListener('click',createForm);   

function createPage(){

}

function welcome(){
    document.querySelector('article').innerHTML = `<h2>Welcome</h2>In my Web`;
    selectedId=null;
    control();
}


async function read(){
    // //3. 아이디와 일치하는 토픽 원소를 찾는다
    // const topic = topics.filter(e=> e.id === selectedId)[0];
    // //4. 본문을 만든다
    // const content = `<h2>${topic.title}</h2>
    // ${topic.body}`;
    // //5. 본문 출력
    // document.querySelector('article').innerHTML=content;

    // control();

    let response = await fetch('http://localhost:3000/topics/'+selectedId);
    let topic = await response.json();

    const content = `<h2>${topic.title}</h2>
    ${topic.body}`;
    document.querySelector('article').innerHTML=content;
    control();

}

async function createHandler(e){
    e.preventDefault();
    
    const t = e.target.title.value;
    const b = e.target.body.value;
    let response = await fetch('http://localhost:3000/topics',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({title:t, body:b}),
    });
    let data = await response.json();
  
    nav();
    selectedId = data.id;
    read();

   
}

function create(){
    
    const content = `
    <form onsubmit="createHandler(event);">
    <input type = "text" id = "title" name = "title" placeholder = "제목을 입력하세요" size = "40">
    <br>
    <textarea name = "body" id = "body" rows = "5" cols = "40" placeholder="본문을 입력하세요"></textarea>
    <br>
    <input type ="submit" value ="create"> 
    </form>
    `;
    
    document.querySelector('article').innerHTML = content;
}

async function update(){
    let response = await fetch('http://localhost:3000/topics/'+selectedId);
    let topic = await response.json();

    const content = `
    <form onsubmit="updateHandler(event);">
    <input type = "text" id = "title" name = "title" value = "${topic.title}" size = "40">
    <br>
    <textarea name = "body" id = "body" rows = "5" cols = "40">${topic.body}</textarea>
    <br>
    <input type ="submit" value ="update"> 
    </form>
    `;
    
    document.querySelector('article').innerHTML = content;

    control();
  
}

async function updateHandler(e){
    e.preventDefault();

    const t = e.target.title.value;
    const b = e.target.body.value;
    let response = await fetch('http://localhost:3000/topics/'+selectedId,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({title:t, body:b}),
    });
    let topic =  await response.json();
 
    nav();
    selectedId = data.id;
    read();
   
}

async function dlt(){
  

    let response =  await fetch('http://localhost:3000/topics/'+selectedId,{
        method: 'DELETE'
    });
    let data =  await response.json();

        nav();
        welcome();

}

function control(){
    let contextUI = '';
    if(selectedId!==null){
       contextUI = `
       <li><a href="/update" onclick="event.preventDefault(); update();">Update</a></li>
    <li><a href="/delete" onclick="event.preventDefault(); dlt();">Delete</a></li>
       `;
    }

    document.querySelector('#control').innerHTML = `
    <li><a href="/create" onclick="
    event.preventDefault();
    create();"
    >Create</a></li>
    ${contextUI}
    `;
}

nav();
welcome();
control();
