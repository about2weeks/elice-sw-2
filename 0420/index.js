const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body: 'javascript is...'}    
];

let nextId = 4;
let selectedId = null;

function navHandler(e){
    //1. 링크가 작동하지 않아야 한다
    e.preventDefault();
    //2. 아이디 값 알아내기
    selectedId = Number(e.target.id);

    read();
}
function nav(){
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


function read(){
    //3. 아이디와 일치하는 토픽 원소를 찾는다
    const topic = topics.filter(e=> e.id === selectedId)[0];
    //4. 본문을 만든다
    const content = `<h2>${topic.title}</h2>
    ${topic.body}`;
    //5. 본문 출력
    document.querySelector('article').innerHTML=content;

    control();
}

function createHandler(e){
    e.preventDefault();
    
    const t = e.target.title.value;
    const b = e.target.body.value;
    const newTopic = {id:nextId,title:t, body:b};

    topics.push(newTopic);
    
    nav();
    selectedId = nextId;
    nextId++;
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

function update(){

}

function dlt(){

}

function control(){
    let contextUI = '';
    if(selectedId!==null){
       contextUI = `
       <li><a href="/update">Update</a></li>
    <li><a href="/delete">Delete</a></li>
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
