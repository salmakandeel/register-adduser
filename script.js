
// Name and Password from the register-form
var Name = document.getElementsByName("Name")[0]
var mobile = document.getElementsByName("mobile")[0]
var email = document.getElementsByName("email")[0]
var password = document.getElementsByName("password")[0]
var confirmPassword = document.getElementsByName('confirmPassword')[0];
var signUpForm=document.getElementById('signUpForm')
let p=document.createElement("p");
let signUpButton=document.getElementById('rgstr_btn')
var table = document.getElementById("myTable");
let userName=''
let newUser={}
let result=true
let flag=true
let rowId=0
let update=false
let updateId=0
// function to add new row
const addNewRow=(user)=>{
    var newRow=document.createElement("tr")
    newRow.setAttribute("id",rowId)
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6=newRow.insertCell(5)
    // Add text to the cells
    cell1.innerHTML=rowId
    cell2.innerHTML = user.name;
    cell3.innerHTML = user.mobile;
    cell4.innerHTML = user.email;
    cell5.innerHTML =user.pw;
    cell6.innerHTML='<button class="btn " onclick="updateRow(this)">Update</button> <button class="btn " onclick="deleteRow(this)">Delete</button>'
    table.appendChild(newRow)
    rowId++
}
// function to dispaly rows in table
const displayRows=(users)=>{
    console.log(users);
    table.deleteRow
    users!=null?users.forEach(user=>{
    addNewRow(user)
    console.log("pp");
    }):null
    
    }
users=localStorage.getItem('users')
users=JSON.parse(users)
displayRows(users)
// function to signup
signUpButton.addEventListener('click',function(event) {
 event.preventDefault()
 let validation= validateForm()
 if(validation){
    

    console.log(validatePassword(password.value));
    if(password.value.length<8)
    {p.classList.add('Error')
    p.style.display="block"
    p.innerHTML=' password must be at least 8 character '
    password.after(p)
    console.log(validatePassword(password.value))
    return(0)
}
 if(!validatePassword(password.value))
    {p.classList.add('Error')
    p.style.display="block"
    p.innerHTML=' password must contain at least one capital,small and special character '
    password.after(p)
    console.log(validatePassword(password.value))
    return(0)
}
    if(password.value!=confirmPassword.value){
        p.classList.add('Error')
        p.style.display="block"
        p.innerHTML='confirmPassword and password not equal'
        confirmPassword.after(p)
        return(0)
    }
    console.log(!validateEmail(email.value));
    if(!validateEmail(email.value))
    {p.classList.add('Error')
    p.style.display="block"
    p.innerHTML='Invalid Email'
    email.after(p)
    return (0)
    }
    
    else{
        p.style.display="none"
         users=localStorage.getItem('users')
        users=JSON.parse(users)
        if(users==null) users=[]
//    to prevent display error for update row
console.log("update",update);
        if(update==false){
            users.forEach(user => {
                if( user.email==email.value)
                {
                    alertify.alert('you logged before')
                    flag=false

                }
        })
        } 
        else{

            console.log("id",updateId);
            let updateUser={
                "name":Name.value,
                "mobile":mobile.value,
                "email":email.value,
                "pw":password.value,
            
            }
           users[updateId]=updateUser
           usersJson = JSON.stringify(users);
           console.log("users",users);
           document.getElementById(updateId).cells[1].innerHTML=updateUser.name
           document.getElementById(updateId).cells[2].innerHTML= updateUser.mobile;
           document.getElementById(updateId).cells[3].innerHTML=updateUser.email;
           document.getElementById(updateId).cells[4].innerHTML=updateUser.pw;
          localStorage.setItem("users", usersJson);
           update=false
           flag=false
        }    
        if(flag)
            {
            newUser=
               {
                   "name":Name.value,
                   "mobile":mobile.value,
                   "email":email.value,
                   "pw":password.value,
       
               }
            users.push(newUser)
            console.log(users)
            usersJson = JSON.stringify(users);
            localStorage.setItem("users", usersJson);
            // add new row to table
            addNewRow(newUser)}
    }
    

// reset form
Name.value=''
mobile.value=''
email.value=''
password.value=''
confirmPassword.value=''

}
 })
// function to validate data from fprm
const validateForm=()=>{
    console.log(flag);
    if(Name.value=='')
    {   p.innerHTML='Enter Name...'
    p.classList.add('Error')
        Name.after(p)
        flag=false
        

    }
    else if(mobile.value=='')
        {   p.innerHTML='Enter Mobile...'
        p.classList.add('Error')
            mobile.after(p)
            flag=false
            
        }
         else if(email.value=='')
            {   p.innerHTML='Enter email...'
            p.classList.add('Error')
                email.after(p)
                flag=false
        
            } 
        
         else if(password.value=='')
        {   p.innerHTML='Enter password...'
        p.classList.add('Error')
            password.after(p)
            flag=false
       
        }
        else if(confirmPassword.value==='')
            {  
                p.innerHTML='Enter confirm Password...'
            p.classList.add('Error')
                confirmPassword.after(p)
                flag=false
            } 
        else {
            flag=true
            p.style.display="none"}
            return (flag) 
}
// func to validate email
function validateEmail(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}$))/;
    return re.test(text);
}
// function to validate password
const validatePassword=(pw)=>{
   

    let pattern=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    // let v=pw.match(pattern)
    return (pattern.test(pw))

}

// function to delete row from localStorage
const deleteRow=(btn)=>{
let row=btn.closest('tr')
let Id=row.getAttribute('id')
row.parentNode.removeChild(row)
if(Id!==-1){
  users.splice(Id,1);
  console.log(users);
localStorage.setItem('users',JSON.stringify(users))
let rows=document.querySelectorAll('tr ')
rows.forEach(row=>{
    if(row.getAttribute('id')>Id)
    {row.setAttribute('id',Id)
    row.firstChild.innerHTML=Id
    Id++
    }
})}
}
// function to update row
const updateRow=(btn)=>{
    let row=btn.closest('tr')
    Name.value=row.childNodes[1].innerHTML
    mobile.value=row.childNodes[2].innerHTML
    email.value=row.childNodes[3].innerHTML
    password.value=row.childNodes[4].innerHTML
    confirmPassword.value=row.childNodes[4].innerHTML
    update=true
    updateId=row.getAttribute('id')
}
