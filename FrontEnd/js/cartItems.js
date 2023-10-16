const deleteCartItem = async (url,data={})=>{
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

let spanSubtotal = document.getElementById('spanSubtotal');
let spanTotal = document.getElementById('spanTotal');
let spanCheckout = document.getElementById('spanCheckout');
let spanQuantity = document.getElementById('spanQuantity');
let cartContainer = document.getElementById('cartContainer');
let spanShipping = document.getElementById('spanShipping');


const getCartItemsData = async()=>{
    const cart_id = parseInt(await getCartId('/getCartId'));
    const cartItems = await getCartItems('/getCartItems',{cart_id});
    let orderPrice= 0;
    let Totalquantity=0;
    for (const cartItem of cartItems){
        const container = document.createElement('div');
        container.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3', 'p-2', 'items', 'rounded','cart_item');

        orderPrice +=(cartItem.afteroffer*cartItem.quantity);
        Totalquantity+=(cartItem.quantity);
        container.classList.add('cartItem');
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('d-flex', 'flex-row');

        const image = document.createElement('img');
        image.classList.add('rounded');
        image.src = '../assets/images/trending-01.jpg';
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

        const increase = document.createElement('a');
        increase.classList.add('btn','increase');
        increase.style.fontWeight='bold';
        increase.style.fontSize='35px';
        increase.textContent = '+';

        const decrease = document.createElement('a');
        decrease.classList.add('btn','decrease');
        decrease.textContent = '-';
        decrease.style.fontWeight='bold';
        decrease.style.fontSize='35px';

        const quantity = document.createElement('input');
        quantity.readOnly=true;
        quantity.style.cssText="background-color:rgb(225,225,225);width:60px;padding-left:5px";
        quantity.classList.add('d-block','inputs');
        quantity.value = cartItem.quantity;

        rightDiv.appendChild(increase);
        rightDiv.appendChild(quantity);
        rightDiv.appendChild(decrease);
        

        const price = document.createElement('span');
        price.classList.add('prices');
        price.classList.add('d-block', 'ml-5', 'font-weight-bold');
        price.innerHTML = `${cartItem.afteroffer*cartItem.quantity} <del>${cartItem.price*cartItem.quantity}</del>`;
        rightDiv.appendChild(price);

        const trashIconHref = document.createElement('a');
        trashIconHref.href='#';
        trashIconHref.classList.add('trash');
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa', 'fa-trash-o', 'ml-3');
        trashIconHref.appendChild(trashIcon);
        rightDiv.appendChild(trashIconHref);

        container.appendChild(leftDiv);
        container.appendChild(rightDiv);

        cartContainer.appendChild(container);
    } 

    if(cartItems.length==0){
      spanShipping.innerText = '$0';
      spanTotal.innerText = '$0';
      spanCheckout.innerText ='$0';
      spanSubtotal.innerText='$0';
      return;
    }

    spanShipping.innerText = '$20';
    spanSubtotal.innerText=`$${orderPrice}`;
    spanTotal.innerText =`$${orderPrice+20}`;
    spanCheckout.innerText =`$${orderPrice+20}`;
    spanQuantity.innerText =`${Totalquantity}`;
    return cartItems;

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

let itemsLength =0;
const getData = async()=>{
  const cartItems = await getCartItemsData();
  itemsLength = cartItems.length;
  return cartItems;
}
const updateCartItemData = async(url,data)=>{
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

const applyIncreaseANDDecrease = async()=>{
  const cartItems = await getData();
  const increases = document.getElementsByClassName('increase');
  const decreases = document.getElementsByClassName('decrease');
  const inputs = document.getElementsByClassName('inputs');
  const prices = document.getElementsByClassName('prices');
  for(let i= 0;i<cartItems.length;++i){
    increases[i].addEventListener('click',async(event)=>{
      event.preventDefault();
      if(spanQuantity.innerText=='0'){
        spanTotal.innerText = `$${parseInt((spanTotal.innerText).slice(1))+(cartItems[i].afteroffer)+20}`;
        spanCheckout.innerText = `$${parseInt((spanCheckout.innerText).slice(1))+(cartItems[i].afteroffer)+20}`;
      }
      else{
        spanTotal.innerText = `$${parseInt((spanTotal.innerText).slice(1))+(cartItems[i].afteroffer)}`;
        spanCheckout.innerText = `$${parseInt((spanCheckout.innerText).slice(1))+(cartItems[i].afteroffer)}`;
      }
      spanSubtotal.innerText = `$${parseInt((spanSubtotal.innerText).slice(1))+(cartItems[i].afteroffer)}`;
      spanQuantity.innerText = parseInt(spanQuantity.innerText)+1;
      spanCheckout.innerText = `$${parseInt((spanCheckout.innerText).slice(1))+(cartItems[i].afteroffer)}`;
      spanShipping.innerText='$20';

      inputs[i].value = parseInt(inputs[i].value)+1;
      cartItems[i].quantity+=1;
      prices[i].innerHTML = `${cartItems[i].afteroffer*cartItems[i].quantity} <del>${cartItems[i].price*cartItems[i].quantity}</del>`;

      const cart_id = cartItems[i].cart_id;

      await updateCartItemData('/updateCartItem',{cart_id,quantity:cartItems[i].quantity})
    });

    decreases[i].addEventListener('click',async(event)=>{
        if(parseInt(inputs[i].value)>0){
          event.preventDefault();
         
          console.log(spanQuantity.innerText);
          spanQuantity.innerText = parseInt(spanQuantity.innerText)-1;
          if(parseInt(spanQuantity.innerText)>0){
            spanSubtotal.innerText = `$${parseInt((spanSubtotal.innerText).slice(1))-(cartItems[i].afteroffer)}`;
            spanTotal.innerText = `$${parseInt((spanTotal.innerText).slice(1))-(cartItems[i].afteroffer)}`;
            spanCheckout.innerText = `$${parseInt((spanCheckout.innerText).slice(1))-(cartItems[i].afteroffer)}`;
            spanShipping.innerText='$20';
           
          }
          else{
            spanShipping.innerText='$0';
            spanTotal.innerText='$0';
            spanSubtotal.innerText='$0';
            spanQuantity.innerText ='0';
            spanCheckout.innerText ='$0';
          }
          inputs[i].value = parseInt(inputs[i].value)-1;

          cartItems[i].quantity-=1;
          prices[i].innerHTML = `${cartItems[i].afteroffer*cartItems[i].quantity} <del>${cartItems[i].price*cartItems[i].quantity}</del>`;
          
          const cart_id = cartItems[i].cart_id;

          await updateCartItemData('/updateCartItem',{cart_id,quantity:cartItems[i].quantity})
        }
      })
      
  }
  return cartItems;
}

const msgCheckoutSpan = document.getElementById('msgSpan');

const DeleteCartItem = async()=>{
  const cartItems = await applyIncreaseANDDecrease();
  const trashes = Array.from(document.getElementsByClassName('trash'));
  const cart_id = await getCartId('/getCartId');
  let cartItemsElements = Array.from(document.getElementsByClassName('cart_item'));
  const inputs = Array.from(document.getElementsByClassName('inputs'));
  for(let i = 0;i<cartItemsElements.length;++i){
      trashes[i].addEventListener('click',async(event)=>{
        event.preventDefault();
        const product_id = cartItems[i].id;
        await deleteCartItem('/deleteCartItem',{cart_id,product_id});
        cartItemsElements[i].remove();
        spanSubtotal.innerText = `$${parseInt((spanSubtotal.innerText).slice(1))-((cartItems[i].afteroffer)*cartItems[i].quantity)}`;
        spanTotal.innerText = `$${parseInt((spanTotal.innerText).slice(1))-(cartItems[i].afteroffer*cartItems[i].quantity)}`;
        spanQuantity.innerText = (parseInt(spanQuantity.innerText))-inputs[i].value;
        spanCheckout.innerText = `$${parseInt((spanCheckout.innerText).slice(1))-(cartItems[i].afteroffer*cartItems[i].quantity)}`;

      })  
    }
}

DeleteCartItem();

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

const sendOrderEmail = async(url,data)=>{
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
const btnCheckout = document.getElementById('btnCheckout');
btnCheckout.addEventListener('click',async()=>{
  const cart_id = parseInt(await getCartId('/getCartId'));
  const cartItems = await getCartItems('/getCartItems',{cart_id});
  if(cartItems.length==0){
    msgCheckoutSpan.textContent = "you haven't add product to cart";
    msgCheckoutSpan.style.cssText = 'color:rgb(255,0,0);font-size: 16px; font-weight: bold;';
    return ;
  }
  else{
      const totalPrice = (spanTotal.innerText).slice(1);
      const order = await sendDataToOrder('/orders',{price:totalPrice});
      for(const cartItem of cartItems){
          const order_id = order.id;
          const product_id = cartItem.id;
          const quantity = cartItem.quantity;
          const price = cartItem.quantity * cartItem.afteroffer;

          let currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 3);
          let formattedDate = currentDate.toLocaleDateString();

          await sendDataToOrderItems('/orderItems',{order_id,product_id,quantity,price})
          .then(async()=>{
              await sendOrderEmail('/orderEmail',{orderid:order_id,quantity,price,totalPrice:price+20,formattedDate})
          })
      }
      msgCheckoutSpan.textContent = 'Order is sent successfully';
      msgCheckoutSpan.style.cssText = 'color:rgb(0,255,0);font-size: 16px; font-weight: bold;';
      setTimeout(async()=>{
        msgCheckoutSpan.innerText = '';
        const cart_id = await getCartId('/getCartId');
        await deleteCartItems('/deleteCartItems',{cart_id})
        const cartItems = document.getElementsByClassName('cartItem');
        const cartItemsArray = Array.from(cartItems);
        for(const item of cartItemsArray){ 
          item.remove();
        }
        spanSubtotal.textContent='0';
        spanTotal.textContent ='0';
        spanQuantity.textContent ='0';
        spanCheckout.textContent ='0';
      },3000)
      
  }
});

const defaultPageValue = async()=>{
  if(itemsLength==0){
    spanShipping.textContent ='$0';
    spanTotal.textContent ='$0';
  }
}
defaultPageValue();