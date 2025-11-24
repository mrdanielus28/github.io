const posts = document.getElementById("posts");
const msg = document.getElementById("msg");
const user = document.getElementById("username");
const topic = document.getElementById("topicSelect");
const send = document.getElementById("send");

// modal
const wrap = document.getElementById("modal-wrap");
const cancelDel = document.getElementById("cancelDelete");
const confirmDel = document.getElementById("confirmDelete");

let pendingDelete = null;


function load(){
  posts.innerHTML="";

  const DB = JSON.parse(localStorage.getItem("forum")||"{}");
  const arr = DB[topic.value] || [];

  arr.forEach((p,i)=>{
    const el = document.createElement("div");
    el.className="post";
    el.innerHTML = `<b>${p.user}</b><br>${p.text}`;

    const del = document.createElement("div");
    del.textContent="×";
    del.className="del";
    del.onclick=()=>{
      pendingDelete = i;
      wrap.style.display="grid";
    };

    el.appendChild(del);
    posts.appendChild(el);
  });
}


send.onclick = ()=>{
  if(!msg.value.trim()) return;

  const DB = JSON.parse(localStorage.getItem("forum")||"{}");
  DB[topic.value] ??= [];

  DB[topic.value].push({
    text:msg.value.trim(),
    user:user.value || "Аноним"
  });

  localStorage.setItem("forum",JSON.stringify(DB));

  msg.value="";
  load();
};


topic.onchange = load;


// modal
cancelDel.onclick=()=>{
  wrap.style.display="none";
  pendingDelete=null;
}

confirmDel.onclick=()=>{
  const DB = JSON.parse(localStorage.getItem("forum")||"{}");
  DB[topic.value].splice(pendingDelete,1);
  localStorage.setItem("forum",JSON.stringify(DB));
  wrap.style.display="none";
  load();
}

load();
