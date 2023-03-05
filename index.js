let userForm = document.getElementById("form");
var userEntries=[];

let errors=[]
const retieveEntries = ()=>{
    let entries = localStorage.getItem('userEntries')
    if(entries){
        entries=JSON.parse(entries)
    }else{
        entries=[]
    }
    return entries
}
const displayEntries = ()=>{
let entries=retieveEntries()
const tableEnt = entries.map((entry)=>{
const first = `<td class='border px-4 py-2'>${entry.FullName}</td>`
const second = `<td class='border px-4 py-2'>${entry.email}</td>`
const third = `<td class='border px-4 py-2'>${entry.password}</td>`
const fourth = `<td class='border px-4 py-2'>${entry.dob}</td>`
const fifth = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`
const row = `<tr>${first} ${second} ${third} ${fourth} ${fifth}</tr>`
return row

}).join('\n')
const table =` <table class='table-auto w-full'>
    <tr>
    <th class='px-4 py-2 '>Name </th>
    <th class='px-4 py-2 '>Email </th>
    <th class='px-4 py-2 '>Password </th>
    <th class='px-4 py-2 '>Dob </th>
    <th class='px-4 py-2 '>Accepted terms? </th>
    </tr>${tableEnt}
</table>`
let details = document.getElementById('userdata')
details.innerHTML=table
}

const saveForm = (event)=>{
event.preventDefault();
const FullName = document.getElementById('name').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
const dob = document.getElementById('dob').value
const acceptTerms = document.getElementById('acceptTerms').checked
var current = new Date().getFullYear();
var birthYear = dob.split("-");
let year=birthYear[0]
var age = current-year
console.log({age,current,birthYear})
if(age < 18 || age > 55){
    document.getElementById('dob').style='border:1px solid red'
  return  alert("Age must be between 18 and 55")

}else{
    document.getElementById('dob').style='border:none'

    const entry ={
        FullName,
        email,
        password,
        dob,
        acceptTerms
     }
     userEntries=retieveEntries()
     userEntries.push(entry);
     localStorage.setItem("userEntries",JSON.stringify(userEntries))
    displayEntries()
    userForm.reset()
   
}
 
}
userForm.addEventListener('submit',saveForm)
displayEntries()