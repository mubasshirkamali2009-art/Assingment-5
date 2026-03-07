const issuesContainer=document.getElementById("issues-container");
const loadingspener=document.getElementById("spiner");
const allIssuesBtn=document.getElementById("all-issues-btn");
const openIssuesbtn=document.getElementById("open-issues-btn");
const closedIssueBtn=document.getElementById("close-issues-btn");
const allbtn=
document.querySelectorAll("#close-issues-btn, #open-issues-btn, #all-issues-btn")
const issueCounter=document.getElementById("Issues-counter");




let allIssues = [];


function showloading(){
  loadingspener.classList.remove("hidden");
  loadingspener.classList.add("flex");
}
function  hiddenloading(){
   loadingspener.classList.add("hidden")
}

async function  loadissues(){
    showloading()
    const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await  res.json();
    hiddenloading()
      allIssues = data.data;
    displayissues(allIssues);
     
}

function displayAllIssues() { 
    showloading()
    allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
         allIssuesBtn.classList.add("btn-primary")
         hiddenloading()
  displayissues(allIssues);
}

function displayOpenIssues(){
    showloading()
     allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
         openIssuesbtn.classList.add("btn-primary")
const  openIssues=allIssues.filter(issue =>  issue.status==="open");
hiddenloading()
displayissues(openIssues)
}

function   displayClosedIssues(){
    showloading()
     allbtn.forEach(btn=>{
    btn.classList.remove("btn-primary")
})
         closedIssueBtn.classList.add("btn-primary")
    const  closedissues=allIssues.filter(issue =>issue.status==="closed");
    hiddenloading()
    displayissues(closedissues)
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
    card.innerHTML=` <div class="bg-white rounded-2xl border h-[300px] border-gray-200 p-5 w-80 shadow-sm">
    <div class="flex justify-between items-center mb-3">
      <img class="w-7 h-7" src="${statusbasedimg}" alt="${issue.status}">
      <span class="text-xs font-bold px-3 py-1 rounded-full border border-red-300 text-red-400 bg-red-50">${issue.priority}</span>
    </div>
    <h2 class="font-bold text-gray-900 text-base mb-2">${issue.title}</h2>
    <p class="text-gray-500 text-sm mb-4">${issue.description}</p>

    
    <div class="flex gap-2 flex-wrap mb-4">
      ${issue.labels.map(label => `
        <span class="text-xs px-2 py-1 rounded-full border border-orange-300 text-orange-500 bg-orange-50 font-medium">
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