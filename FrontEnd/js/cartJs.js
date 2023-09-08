const productName = document.getElementById('idProductName').textContent;

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
const getProductId = async (url,data={})=>{
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

const sendDataToCartItem = async (url,data={})=>{
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

const sendCartItemData = async()=>{
    const quantity = parseInt(document.getElementById('idQuantity').value ? document.getElementById('idQuantity').value : 1);
    const cart_id = parseInt(await getCartId('/getCartId'));
    const product_id = parseInt(await getProductId('/getProductId',{productName}));
    
    await sendDataToCartItem('/cartItems',{quantity,cart_id,product_id});
}

// const sendCounter = async(url,data)=>{
//   const res = await fetch(url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   try {
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log('error', error);
//   }
// }

const btnAddCart = document.getElementById('btnAddCart');

let counter = 0;

btnAddCart.addEventListener('click',async(event)=>{
    event.preventDefault();
    counter++;
    const btnNotification = document.getElementById('btnNotification');
    btnNotification.textContent = counter;
    btnNotification.classList.add('notification');
    await sendCartItemData()
});

const btnCart = document.getElementById('btnCart');
btnCart.addEventListener('click',()=>{
    counter = 0;
    const btnNotification = document.getElementById('btnNotification');
    btnNotification.innerHTML ='';
    btnNotification.classList.remove('notification');
});

