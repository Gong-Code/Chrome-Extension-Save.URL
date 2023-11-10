let myLeads = [];
const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const deleteBtn = document.querySelector('#delete-btn');
const ulEl = document.querySelector('#ul-el');
const tabBtn = document.querySelector('#tab-btn');

const getLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
console.log(getLocalStorage);

if(getLocalStorage) {
    myLeads = getLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItems = " ";
    for(let i = 0; i < leads.length; i++) {
        listItems += 
        `
            <li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
            </li>
        `;         
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();  
    myLeads = []; 
    render(myLeads);
})

inputBtn.addEventListener('click', () => {
    if(inputEl.value.trim() !== ""){
        myLeads.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    }    
})

