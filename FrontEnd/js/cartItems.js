
const getCartId = async(url)=>{
  const res =  await fetch(url);
  try{
      const data = await res.json();
      return data;
  }
  catch(error)
  {
      console.log("error " + error);
  }
}

const getCartItems = async(url,data)=>{
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

const spanSubtotal = document.getElementById('spanSubtotal');
const spanTotal = document.getElementById('spanTotal');
const spanCheckout = document.getElementById('spanCheckout');
const spanQuantity = document.getElementById('spanQuantity');
const cartContainer = document.getElementById('cartContainer');

const getCartItemsData = async()=>{
    const cart_id = parseInt(await getCartId('/getCartId'));
    const cartItems = await getCartItems('/getCartItems',{cart_id});
    let orderPrice= 0;
    let Totalquantity=0;
    for (const cartItem of cartItems){
        const container = document.createElement('div');
        container.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3', 'p-2', 'items', 'rounded');
        // eslint-disable-next-line no-const-assign
        orderPrice +=(cartItem.afteroffer*cartItem.quantity);
        Totalquantity+=(cartItem.quantity);
        container.classList.add('cartItem');
        // Create the left side div
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('d-flex', 'flex-row');

        // Create the image element
        const image = document.createElement('img');
        image.classList.add('rounded');
        image.src = 'https://i.imgur.com/QRwjbm5.jpg';
        image.width = '40';
        leftDiv.appendChild(image);

        const textDiv = document.createElement('div');
        textDiv.classList.add('ml-2');

        const productName = document.createElement('span');
        productName.classList.add('font-weight-bold', 'd-block');
        productName.textContent = cartItem.name;
        textDiv.appendChild(productName);

        const productSpecs = document.createElement('span');
        productSpecs.classList.add('spec');
        productSpecs.textContent = cartItem.catagory;
        textDiv.appendChild(productSpecs);

        leftDiv.appendChild(textDiv);

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('d-flex', 'flex-row', 'align-items-center');

        const quantity = document.createElement('span');
        quantity.classList.add('d-block');
        quantity.textContent = cartItem.quantity;
        rightDiv.appendChild(quantity);

        const price = document.createElement('span');
        price.classList.add('d-block', 'ml-5', 'font-weight-bold');
        price.innerHTML = `${cartItem.afteroffer*cartItem.quantity} <del>${cartItem.price*cartItem.quantity}</del>`;
        rightDiv.appendChild(price);

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa', 'fa-trash-o', 'ml-3', 'text-black-50');
        rightDiv.appendChild(trashIcon);

        container.appendChild(leftDiv);
        container.appendChild(rightDiv);

        // Append the container to the document body or any other desired element
        cartContainer.appendChild(container);
    } 


    spanSubtotal.innerText=`$${orderPrice}`;
    spanTotal.innerText =`$${orderPrice+20}`;
    spanCheckout.innerText =`$${orderPrice+20}`;
    spanQuantity.innerText =`${Totalquantity}`;
}


const  sendDataToOrder = async(url,data)=>{
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

const  sendDataToOrderItems = async(url,data)=>{
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


const getData = async()=>{
  await getCartItemsData();
}
getData();

const deleteCartItems = async(url,data)=>{
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
const msgCheckoutSpan = document.getElementById('msgSpan');
const btnCheckout = document.getElementById('btnCheckout');
btnCheckout.addEventListener('click',async()=>{
  const cart_id = parseInt(await getCartId('/getCartId'));
  const cartItems = await getCartItems('/getCartItems',{cart_id});
  console.log(cartItems);
  if(cartItems.length==0){
    msgCheckoutSpan.textContent = "you haven't add product to cart";
    msgCheckoutSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return ;
  }
  else{
      msgCheckoutSpan.textContent = 'Order is sent successfully';
      msgCheckoutSpan.style.cssText = 'color:rgb(0,255,0);font-size: 16px; font-weight: bold;';
      const totalPrice = (spanTotal.innerText).slice(1);
      const order = await sendDataToOrder('/orders',{price:totalPrice});
      for(const cartItem of cartItems){
          const order_id = order.id;
          const product_id = cartItem.id;
          const quantity = cartItem.quantity;
          const price = cartItem.quantity * cartItem.afteroffer;
          await sendDataToOrderItems('/orderItems',{order_id,product_id,quantity,price})
      }
      setTimeout(async()=>{
        const cart_id = await getCartId('/getCartId');
        await deleteCartItems('/deleteCartItems',{cart_id})
        const cartItems = document.getElementsByClassName('cartItem');
        const cartItemsArray = Array.from(cartItems);
        for(const item of cartItemsArray){ 
          item.remove();
        }
        spanQuantity.innerText = '0';
      },3000)
      
  }
  
});

