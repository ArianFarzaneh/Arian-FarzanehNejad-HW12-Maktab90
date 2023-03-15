'use strict'

const body=document.getElementsByTagName('body')    
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
const search=document.getElementById("searchbar")
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
    // let prioritycondition=''
    // if(item.Priority==='Low')
    // {
    //     prioritycondition="text-red-700"
    // }
      data.forEach(item => {
          const newItem=`
          <li class="w-12/12  h-[50px] flex" id="${item.id}">
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
    // delete section:
    function deleteFunc(target)
    {
        let thisli = target.closest("li")
        thisli.remove()
        thisli = target.closest("li").getAttribute('id')
        fetch(`http://localhost:3002/DATA/${thisli}`,
    {
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        },
        // body:JSON.stringify(newData)
    })
    
    }
    //view section:
    function viewFunc(target)
    {
        container.style.display='none'
        const target1=target.closest('div').previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML
        const target2=target.closest('div').previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML
        let optionvalue1,optionvalue2,optionvalue3
        if(target2==="Low")
        {
            optionvalue1="selected"
            optionvalue2=""
            optionvalue3=""
        }
        else if(target2==="Medium")
        {
            optionvalue1=""
            optionvalue2="selected"
            optionvalue3=""
        }
        else if(target2==="High")
        {
            optionvalue1=""
            optionvalue2=""
            optionvalue3="selected"
        }
        const target3=target.closest('div').previousSibling.previousSibling.previousSibling.previousSibling.innerHTML
        let optionstatus1,optionstatus2,optionstatus3
        if(target3==="Todo")
        {
            optionstatus1="selected"
            optionstatus2=""
            optionstatus3=""
        }
        else if(target3==="Doing")
        {
            optionstatus1=""
            optionstatus2="selected"
            optionstatus3=""
        }
        else if(target3==="Done")
        {
            optionstatus1=""
            optionstatus2=""
            optionstatus3="selected"
        }
        const target4=target.closest('div').previousSibling.previousSibling.innerHTML
        console.log(target4);
        const viewmodal=`
        <div class="w-[700px] h-[180px] border-[2px] text-center m-auto mt-[200px] " id="viewmodal">
        <form action="">

            <label for="taskName">Task Name:</label>
            <input disabled value=${target1} required type="text" name="taskName" class="mb-3 pl-2 border-2 rounded-full" id="taskname" placeholder="Enter Your Task Name"><br>

            <label for="priority">priority:</label>
            <select disabled class="mb-3 rounded-full" id="Priority" name="priority">
            <option ${optionvalue1} value="low">low</option>
            <option ${optionvalue2} value="medium">medium</option>
            <option ${optionvalue3} value="high">high</option>
            </select><br>

            <label for="status">status:</label>
            <select disabled class="mb-3 rounded-full" id="status" name="status">
            <option ${optionstatus1} value="Todo">Todo</option>
            <option ${optionstatus2} value="Doing">Doing</option>
            <option ${optionstatus3} value="Done">Done</option>
            </select><br>

            <input disabled value=${target4} type="date" class="mb-3 rounded-full pl-1" id="date"><br>

            <input class="bg-blue-400 rounded-full w-[150px] text-white font-bold" id="okbtn" type="submit" value="ok">

        </form>
        </div>
        `
        addmodal.insertAdjacentHTML('afterend',viewmodal)
        
    }
   itemdisplay.addEventListener("click",(e)=>
   {
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
async function addNEW()
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
}
    submitmodal.addEventListener('click',(e)=>
    {
        addNEW(e)
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

