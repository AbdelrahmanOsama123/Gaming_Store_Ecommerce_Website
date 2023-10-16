
const saveImage = async(url='',data={})=>{
  const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
  });
  
  try{
      const result = await res.text();
      return result;
  }
  catch(error){
      console.log(`sending data to server error: ${error}`);
  }
}

const sendProductData = async (url = '', data = {}) => {
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
}

const getEnterHome = async(url)=>{
  const res = await fetch(url);
  window.location.href=res.url;
}
let msgRegisterSpan = document.getElementById('msgSpan');
function enteringHome(){
  getEnterHome('/home');
}

const addProductButton = document.getElementById('btnAddProduct');
addProductButton.addEventListener('click',async(event)=>{
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    const name = formData.get('name');
    const price = formData.get('price');
    const quantity = formData.get('quantity');
    const description = formData.get('description');
    const catagory = formData.get('category');
    const image = formData.get('image');
    const afteroffer = formData.get('afteroffer');
    

  if(name==''|| price==''|| afteroffer==''|| catagory==''||description==''||quantity==''){
      msgRegisterSpan.textContent = "Please, add all product data ";
      msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
      return ;
  }

  else if(price <=0 || quantity<=0 || afteroffer<=0){
    msgRegisterSpan.textContent = 'please, enter positive numbers';
    msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return ;
  }

  else{
      const product = await sendProductData('/products',{
        name,
        price,
        afteroffer,
        catagory,
        description,
        quantity,
        image
    });

    if(product.status =='failed'){
      msgRegisterSpan.textContent = 'invalid convert this text to numbers (quantity,price,afterprice) ';
      msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
      return ;
    }

    msgRegisterSpan.textContent = 'You have add product data successfully ';
    msgRegisterSpan.style.cssText = 'color:rgb(0,255,0);font-size: 16px; font-weight: bold;';
  }

  const response = await saveImage('/saveProductImage',formData);
  const myimage = response.image;
  console.log(myimage);
  setTimeout(enteringHome,3000);

  });



