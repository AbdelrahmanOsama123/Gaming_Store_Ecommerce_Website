function validateEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

const sendSenderData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

const btnSendMessage = document.getElementById('btnSendMessage');
const emailMessage = document.getElementById('emailMessage');

btnSendMessage.addEventListener('click', async (event) => {
  event.preventDefault();

    
  let firstName = document.getElementById('txtFirstName').value;
  let lastName = document.getElementById('txtLastName').value;
  let email = document.getElementById('txtEmail').value;
  let subject = document.getElementById('txtSubject').value;
  let message = document.getElementById('txtMessage').value;

  if(!validateEmail(email)){
    emailMessage.textContent = 'Please enter Valid email';
    emailMessage.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }

  if (firstName === '') {
    emailMessage.textContent = 'Please enter Your name';
    emailMessage.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if (lastName === '') {
    emailMessage.textContent = 'Please enter Your Surname';
    emailMessage.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if (email === '') {
    emailMessage.textContent = 'Please enter Your E-mail';
    emailMessage.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  
  if (subject === '') {
    emailMessage.textContent = 'Please enter a Subject';
    emailMessage.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
  if(message == ''){
    emailMessage.textContent = 'Please enter Your Message';
    emailMessage.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return;
  }
 
  const senderData = {
    firstName,
    lastName,
    email,
    subject,
    message
  };

  const res = await sendSenderData('/sendMail', senderData);
  if(res=='Email is sent successfully!')
    {
        setTimeout(()=>{
            emailMessage.textContent = 'Email is sent successfully!';
            emailMessage.style.cssText='color:rgb(0,255,0);font-size: 16px; font-weight: bold;';
          });
    }
  else{
    setTimeout(()=>{
        emailMessage.textContent = "You entered invalid email ";
        emailMessage.style.cssText='color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
      });
  }
  setTimeout(()=>{
    emailMessage.textContent= ' ';
  },3000)

});