let productName  = '';
let productPrice = '';
let afterOffer = '';
let catagory = '';
let description = '';
let quantity = '';
let msgRegisterSpan = document.getElementById('msgSpan');
function enteringHome(){
  getEnterHome('/home');
}

function storeProductData() {
    productName = document.getElementById('txtProductName').value;
    productPrice = document.getElementById('txtProductPrice').value;
    afterOffer = document.getElementById('txtAfterOffer').value;
    catagory = document.getElementById('txtCatagory').value;
    quantity = document.getElementById('txtQuantity').value;
    description = document.getElementById('txtDescription').value;
}

const addProductButton = document.getElementById('btnAddProduct');
addProductButton.addEventListener('click',async(event)=>{
    event.preventDefault();
    storeProductData();
    if(productName==''|| productPrice==''|| afterOffer==''|| catagory==''||description==''||quantity==''){
        msgRegisterSpan.textContent = "Please, add all product data ";
        msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
        return ;
    }
    else{
        
        const product = await sendProductData('/products',{
          name :productName,
          price :productPrice,
          afteroffer :afterOffer,
          catagory,
          description,
          quantity
      });
      if(product.price <=0 || product.quantity<=0 || product.afterOffer<=0){
        msgRegisterSpan.textContent = 'please, enter positive numbers';
        msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
        return ;
      }
      else if(product.status =='failed'){
        msgRegisterSpan.textContent = 'invalid enter text to numbers (quantity,price,afterprice) ';
        msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
        return ;
      }
      else{
        msgRegisterSpan.textContent = 'You have add product data successfully ';
      msgRegisterSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
        setTimeout(enteringHome,3000);
      }
      
    }
  });

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

