const issuesContainer=document.getElementById("issues-container");
const loadingspener=document.getElementById("spiner");
const allIssuesBtn=document.getElementById("all-issues-btn");
const openIssuesbtn=document.getElementById("open-issues-btn");
const closedIssueBtn=document.getElementById("close-issues-btn");
const allbtn=
document.querySelectorAll("#close-issues-btn, #open-issues-btn, #all-issues-btn")
const issueCounter=document.getElementById("Issues-counter");
const modal         = document.getElementById("issue-modal");
const modalOverlay  = document.getElementById("modal-overlay");
const modalCloseBtn = document.getElementById("modal-close-btn");



let allIssues = [];


loadmodal=async(id)=>{
const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/${id}`;
console.log(url)
const  res=await fetch(url);
const details=await res.json()
displayissuedetail(details.data)

}




function showloading(){
  loadingspener.classList.remove("hidden");
  loadingspener.classList.add("flex");
}
function  hiddenloading(){
   loadingspener.classList.add("hidden")
    loadingspener.classList.remove("flex");
}

async function  loadissues(){
    showloading()
    setTimeout(async() => {
      const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await  res.json();
    hiddenloading()
      allIssues = data.data;
    displayissues(allIssues);
    }, 1000);
     
}

const loadissuedetail= async(id)=>{
  const  url= `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res= await fetch(url);
  const  details=await res.json();
   displayIsuueDetails(details.data)
}

  const displayIsuueDetails=(issue)=>{
console.log(issue)
const detailBox=document.getElementById("details-container");
detailBox.innerHTML="hello"
document.getElementById("issue_modal").showModal();
  }


function displayAllIssues() { 
    showloading()
    allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
      setTimeout(() => {
         allIssuesBtn.classList.add("btn-primary")
         hiddenloading()
  displayissues(allIssues);
      }, 500);
}

function displayOpenIssues(){
    showloading()
     allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
         openIssuesbtn.classList.add("btn-primary")
setTimeout(() => {
  const  openIssues=allIssues.filter(issue =>  issue.status==="open");
hiddenloading()
displayissues(openIssues)
}, 500);

}


function   displayClosedIssues(){
    showloading()
     allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
         closedIssueBtn.classList.add("btn-primary")
    setTimeout(() => {
      const  closedissues=allIssues.filter(issue =>issue.status==="closed");
    hiddenloading()
    displayissues(closedissues)
    }, 500);
}

function  displayissues(issues){
    issuesContainer.innerHTML="";
      issueCounter.innerHTML = issues.length;
issues.forEach( issue=> {
   
      
    const  statusbasedimg=issue.status==="open"
    ? "./assets/Open-Status.png"
    :  "./assets/Closed- Status .png"
    console.log(issue)
 
    const card=document.createElement("div");
    card.innerHTML=` <div    class="bg-white rounded-2xl h-[300px]  ${issue.status=='open'?'border-t-3 border-green-500' :'border-t-3 border-red-500' } p-5 w-80 shadow-sm">
    <div class="flex justify-between items-center           mb-3">
      <img class="w-7 h-7" src="${statusbasedimg}" alt="${issue.status}">
      <span class="text-xs font-bold px-3 py-1 rounded-full border  ${ 
      issue.priority === 'high'   ? 'border-red-300 text-red-500 bg-red-100'   
      : issue.priority === 'medium'? 'border-orange-300 text-orange-500 bg-orange-100 '
      : 'border-gray-300 text-gray-500 bg-gray-100' 
    }">${issue.priority}</span>
    </div>
    <h2 onclick="loadissuedetail(${issue.id})" class="font-bold text-gray-900 text-base mb-2">${issue.title}</h2>
    <p class="text-gray-500 text-sm mb-4">${issue.description}</p>

    
    <div class="flex gap-2 flex-wrap mb-4">
      ${issue.labels.map(label => `
        <span class="text-xs px-2 py-1 rounded-full border 
         font-medium ${label === 'help wanted'   ? 'border-orange-300 text-orange-500 bg-orange-100' 
      : label === 'bug'           ? 'border-red-300 text-red-500 bg-red-100'   
      : label === 'documentation' ? 'border-yellow-300 text-green-yellow bg-yellow-100'  
     
        : label === 'enhancement'    ? 'border-green-300 text-green-500 bg-green-100'  
      : label === 'good first issue'? 'border-purple-300 text-purple-500 bg-purple-100 '
      : 'border-gray-300 text-gray-500 bg-gray-100' 
    }">
      
          ${label}
        </span>
      `).join("")}
    </div>

    <hr class="border-gray-100 mb-3">
    <p class="text-gray-400 text-xs">#${issue.id} by <span class="font-medium">${issue.author}</span></p>
    <p class="text-gray-400 text-xs mt-1">${issue.createdAt}</p>
  </div>` 


issuesContainer.appendChild(card);
});

}

loadissues()

document.getElementById("search-input-btn").addEventListener("click", 
  ()=>{
    allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
const  inputSearch=document.getElementById("search-input");
const  searchValue=inputSearch.value.trim().toLowerCase();
console.log(searchValue)
fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
.then((res)=>res.json())
.then((data)=>{
  const allIssues=data.data;
  console.log(allIssues)
  const filterIssues=allIssues.filter(issue=>issue.title.toLowerCase().includes(searchValue));
  displayissues(filterIssues);
});

})