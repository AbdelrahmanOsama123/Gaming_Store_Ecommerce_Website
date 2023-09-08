let username = ' ';
let password = ' ';
let msgLoginSpan = document.getElementById('msgSpan');

function storeLoginData() {
  username = document.getElementById('txtUsername').value;
  password = document.getElementById('txtPassword').value;
}
function enteringUserWebsite() {
  getEnterWebsiteAsUser('/home');
}

function enteringAdminWebsite(){
  getEnterWebsiteAsAdmin('/addProduct');
}

const buttonSumbit = document.getElementById('btnSubmit');
buttonSumbit.addEventListener('click', async(event) => {
    event.preventDefault();
    storeLoginData();

    const data = {
      username,
      password,
    };
      await(sendLoginData('/authenticate', data))
      
      .then(function(data){
      if(data.status == 'success'){ 
          msgLoginSpan.textContent = 'login successfully';
          msgLoginSpan.style.cssText = 'color:rgb(0,255,0);font-size: 16px; font-weight: bold;';
          if(data.isadmin==false){
            setTimeout(enteringUserWebsite,2000);
          }
          else{
            setTimeout(enteringAdminWebsite,2000);
          }
      }
      else if(data.status == 'failed') {
            msgLoginSpan.textContent = 'Username Or password is incorrect';
            msgLoginSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
        }
    });

});

const sendLoginData = async (url = ' ', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } 
  catch (error) {
    console.log('error', error);
  }
};

const getEnterWebsiteAsUser = async(url='')=>{
  const res = await fetch(url);
  window.location.href = res.url;
}

const getEnterWebsiteAsAdmin = async(url='')=>{
  const res = await fetch(url);
  window.location.href = res.url;
}