//bringing form in the js;
document.getElementById("form").addEventListener('submit',addItem);
function addItem(event){
    event.preventDefault();
    const obj={
        Amount:document.getElementById("Amount").value,
        Description:document.getElementById("Description").value,
        Category:document.getElementById("Category").value,
    }
   axios.post(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Expenses`,obj)
   .then((response)=>{
    addExpenseToUi(response.data);
   })
   .catch((err)=>{
    console.log(err);
   })
}
//Adding new Elements in UI
function addExpenseToUi(obj){
       const tbody=document.getElementById("Expenses");
       const row=document.createElement('tr');
       row.id=obj._id;
       row.innerHTML=`<td>${obj.Amount}</td>
                     <td>${obj.Description}</td>
                     <td>${obj.Category}</td>
                     <td><button onclick="edit('${obj._id}')">Edit</button></td>
                     <td><button onclick="remove('${obj._id}')">Remove</button></td>`;
                     tbody.appendChild(row);
}
//edit functionality
function edit(key){
    console.log(key);
   axios.get(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Expenses/${key}`)
   .then((response)=>{
    console.log(response.data);
    document.getElementById("Amount").value=response.data.Amount;
    document.getElementById("Description").value=response.data.Description;
    document.getElementById("Category").value=response.data.Category;
   })
   .then(()=>{
    remove(key);
    const parent=document.getElementById("Expenses");
    const child=document.getElementById(key);
    parent.removeChild(child);
   })
   .catch((err)=>console.log(err))  
}
//delete functionality
function remove(key){
    axios.delete(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Expenses/${key}`)
    const parent=document.getElementById("Expenses");
    const child=document.getElementById(key);
    parent.removeChild(child);
}
//on refreshing
window.onload=function load(){
    axios.get(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Expenses`)
                .then((response) =>{
                    for(let i=0;i<response.data.length;i++){
                        addExpenseToUi(response.data[i]);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
}