const form = document.getElementById('form');

const username = document.getElementById("username");
const email = document.getElementById('email');
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


//Show Error Message
function showError (input,message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small');
  small.innerText = message;
}


// function to show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'  
}


// function to check email validation 
function checkEmail(input){
        const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const value = input.value.trim();
           if (value.match(regex)) {
             showSuccess(input);
           } else {
             showError(input, `Not a valid Email`);
           } 
}


// function to check if the input is blank

function checkRequired(inputArr){
    inputArr.forEach((input)=>{
        if(input.value.trim() ===''){
            showError(input, `${getFieldName(input)} is Required`);
        }else {
        showSuccess(input)
        }
    })
}



// function to check input value length
function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
}

// function to check password match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not Match.')
    }
}


//function to get FieldName for display Error Massages first character as uppercase.
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};


//Event Listeners
form.addEventListener('submit', function (e) {
            e.preventDefault();
            checkRequired([username,email,password, password2])
            checkLength(username,3,15);
            checkLength(password, 6, 25);
            checkEmail(email);
            checkPasswordMatch(password, password2);

})