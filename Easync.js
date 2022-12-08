document.getElementById('form').addEventListener("submit",addExpense)
async function addExpense(event){
   try{
        event.preventDefault();
        const obj={
         Amount:document.getElementById('Amount').value,
         Description:document.getElementById('Description').value,
         Category:document.getElementById('Category').value
    }
        let dataObj =await axios.post(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Data`,obj);
        addExpenseToUi(dataObj.data);
   }
   catch(error){
        console.error(error)
   }
}
function addExpenseToUi(obj){
    console.log(obj);
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
//refreshing functionality

window.onload=async function load(){
    try{
        let response =await axios.get(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Data`)
    for(let i=0;i<response.data.length;i++){
        addExpenseToUi(response.data[i]);
    }
    }
    catch(err){
        console.log(err);
    }
}

//edit functionality
async function edit(id){
    try{
        let response=await axios.get(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Data/${id}`)
    document.getElementById("Amount").value=response.data.Amount;
    document.getElementById("Description").value=response.data.Description;
    document.getElementById("Category").value=response.data.Category;
    const parent=document.getElementById("Expenses");
    const child=document.getElementById(id);
    parent.removeChild(child);
    remove(id);
    }catch(err){
        console.error(err)
    }
}

//delete functionality
function remove(id){
    try{
        axios.delete(`https://crudcrud.com/api/a8f7291396824e8fb2e685d94e1210b4/Data/${id}`)
        const parent=document.getElementById("Expenses");
        const child=document.getElementById(id);
        parent.removeChild(child);
    }catch(err){
        console.log(err)
    }
}


