let firstname = '';
let lastname = '';
let username = '';
let password = '';
let confirmPassword = '';
let msgRegisterSpan = document.getElementById('msgSpan');

function storeRegisterData() {
    firstname = document.getElementById('txtFirstName').value;
    lastname = document.getElementById('txtLastName').value;
    username = document.getElementById('txtUsername').value;
    password = document.getElementById('txtPassword').value;
    confirmPassword = document.getElementById('txtConfirmPassword').value;
}

function Matching(password, confirmPassword) {
  if (
    password === confirmPassword
  ) {
    return true;
  }
  return false;
}

const registerButton = document.getElementById('btnRegister');

registerButton.addEventListener('click', async (event) => {
  event.preventDefault();
  storeRegisterData();

  if (username === '') {
    msgRegisterSpan.textContent = 'Please enter a Username';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if (firstname === '') {
    msgRegisterSpan.textContent = 'Please enter a Firstname';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if (lastname === '') {
    msgRegisterSpan.textContent = 'Please enter a Lastname';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if(password == ''){
    msgRegisterSpan.textContent = 'Please enter a password';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if(confirmPassword == ''){
    msgRegisterSpan.textContent = 'Please enter a Confirm password';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if (Matching(password, confirmPassword)) {
    const data = {
      firstname,
      lastname,
      username,
      password,
      confirmPassword,
    };

    const response = await sendUserData('/users', data);
    if (response === null) {
      msgRegisterSpan.textContent = 'This username is taken, try another one';
      msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    } else {
      msgRegisterSpan.textContent = 'You have registered successfully';
      msgRegisterSpan.style.cssText = 'color:rgb(0,255,0);font-size: 16px; font-weight: bold;';
      setTimeout(() => {
        getEnterWebsite('/login')
        .then(function(){
          createCart('/carts');
        })
      }, 3000);
    }
  } else {
    msgRegisterSpan.textContent = 'Two passwords do not match';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
  }
});

const sendUserData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

const getEnterWebsite = async (url = '') => {
  const res = await fetch(url);
  window.location.href = res.url;
};

const createCart = async(url ='')=>{
  await fetch(url);
}
const signInButton = document.getElementById('btnSignin');

signInButton.addEventListener('click',(event)=>{
  event.preventDefault();
  goToLoginPage('/login');
})

const goToLoginPage = async(url=' ')=>{
  const res = await fetch(url);
  window.location.href = res.url;
}
