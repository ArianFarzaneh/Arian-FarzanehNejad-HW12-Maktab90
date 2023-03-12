'use strict'    
const container=document.querySelector(".my-container")
const itemdisplay=document.querySelector("#item-display")
const priority=document.querySelector("#priority")
const deleteBtn = document.getElementsByClassName('.delete-btn')
const addbtn=document.getElementById("addbtn")
const addmodal=document.getElementById("addmodal")
const submitmodal=document.getElementById("submitmodal")
const taskname=document.getElementById("taskname")
const Priority=document.getElementById("Priority") 
const statuss=document.getElementById("status")
const date=document.getElementById("date")
let ID=4;
async function getData(){
    try {
        const response = await (await fetch('http://localhost:3002/DATA')).json()
        const data = await response;
      console.log(data)
      renderData(data)
    } catch (err) { alert(`your error is: ${err}`)}
};
getData();
const renderData=(data)=>
{
      data.forEach(item => {
          const newItem=`
          <li class="w-12/12  h-[50px] flex id=${ID}">
          <div class="w-[20%] text-center self-center">${item.TaskName}</div>
          <div class="w-[20%] text-center self-center" id="priority">${item.Priority}</div>
          <div class="w-[20%] text-center self-center">${item.Status}</div>
          <div class="w-[20%] text-center self-center">${item.Deadline}</div>
          <div class="w-[20%] text-center self-center flex justify-evenly">
            <button class="bg-red-600 rounded-full w-[80px] text-white delete-btn" id="delete-btn">delete</button>
            <button class="bg-blue-500 rounded-full w-[80px] text-white">edit</button>
            <button class="bg-gray-600 rounded-full w-[80px] text-white">view</button>
            </div>
            </li>`
            itemdisplay.insertAdjacentHTML('beforeend',newItem)
        });
    }
    function deleteFunc(target)
    {
        const thisli = target.closest("li")
        thisli.remove()
    }
   itemdisplay.addEventListener("click",(e)=>
   {
        e.preventDefault()
        let target=e.target
        if(target.innerHTML==="delete")
        deleteFunc(target)
        else if(target.innerHTML==="edit")
        editFunc(target)
        else if(target.innerHTML==="view")
        viewFunc(target)
   })
//    add li:
    addbtn.addEventListener('click',(e)=>
    {
        e.preventDefault()
        container.style.display="none"
        addmodal.style.display="block"
    })
    submitmodal.addEventListener('click',(e)=>
    {
        const newData = {
            "id":ID,
            "TaskName":`${taskname.value}`,
            "Priority":`${Priority.value}`,
            "Status":`${statuss.value}`,
            "Deadline":`${date.value}`
        }
        fetch('http://localhost:3002/DATA',
        {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newData)
        })
        container.style.display="block"
        addmodal.style.display="none"
        ID=ID+1;
    })
    
//using xmlhttprequest:
// const getCountryData = function () {
    //     const request = new XMLHttpRequest();
    //     request.open('GET', 'http://localhost:3002/DATA');
//     request.send();
//     request.addEventListener('load', function () {
//       const [data] =JSON.parse(request.responseText);
//       console.log(data);
//     })
// }
// getCountryData()

