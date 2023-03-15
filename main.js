'use strict'
import { debounce } from "lodash"
const container=document.querySelector(".my-container")
const itemdisplay=document.querySelector("#item-display")
const addbtn=document.getElementById("addbtn")
const addmodal=document.getElementById("addmodal")
const submitmodal=document.getElementById("submitmodal")
const taskname=document.getElementById("taskname")
const Priority=document.getElementById("Priority") 
const statuss=document.getElementById("status")
const date=document.getElementById("date")
const search=document.getElementById("searchbar")
const filterbtn=document.getElementById("filterbtn")
const filtermodal=document.getElementById("filter-modal")
const filterpriority=document.getElementById("filter-Priority")
const filterstatus=document.getElementById("filter-status")
const submitfilterbtn=document.getElementById("submitfilterbtn")
const paginate=document.getElementById("paginate")
const nextpage=document.getElementById("next-page")
const previouspage=document.getElementById("previous-page")
const pagenumber=document.getElementById("pagenumber")
const loading=document.getElementById("loading")
let counter=1
let ID=4;
async function getData(url = 'http://localhost:3002/DATA?_page=1&_limit=2'){
    try {
        const response = await (await fetch(url)).json()
        const data = await response;
        loading.classList.add('hidden')
      renderData(data)
    } catch (err) { alert(`your error is: ${err}`)}
};
getData();
const renderData=(data)=>
{
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

    //    add item:
addbtn.addEventListener('click',()=>
{
    container.style.display="none"
    addmodal.style.display="block"
})
async function addNEW(e)
{

    const newData = {
        "id":ID,
        "TaskName":`${taskname.value}`,
        "Priority":`${Priority.value}`,
        "Status":`${statuss.value}`,
        "Deadline":`${date.value}`
    }
    await fetch('http://localhost:3002/DATA',
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

    

    //search section:
    search.addEventListener("input",
        debounce(() => {
          Search();
        }, 1000)
      )
    const Search = () => {
      itemdisplay.innerHTML = "";
      if(search.value!=='')
      {
          getData(`http://localhost:3002/DATA?q=${search.value}`);
      }
      else if(search.value==='')
      {
        getData()
      }
    }

    //filter section:
    filterbtn.addEventListener('click',(e)=>
    {
        e.preventDefault()
        filtermodal.style.display='block'
        container.style.display='none'
    })
    submitfilterbtn.addEventListener('click',(e)=>
    {
        e.preventDefault()
        filtermodal.style.display='none'
        container.style.display='block'
        console.log(filterpriority.value);
        console.log(filterstatus.value);
        itemdisplay.innerHTML = "";
        getData(`http://localhost:3002/DATA?Priority=${filterpriority.value}&Status=${filterstatus.value}`)
    })

    
// pagination 
paginate.addEventListener('click',(e)=>
{
    let target = e.target
    if(target.innerHTML==='NextPage')
    {
        itemdisplay.innerHTML=''
        counter+=1
        pagenumber.innerHTML=`${counter}`
        getData(`http://localhost:3002/DATA?_page=${counter}&_limit=2`)
    }
    else if(target.innerHTML==='PreviousPage')
    {
        itemdisplay.innerHTML=''
        counter-=1
        pagenumber.innerHTML=`${counter}`
        getData(`http://localhost:3002/DATA?_page=${counter}&_limit=2`)
    }
})