
const getOrderItems = async(url,data)=>{
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

const getUserData = async (url)=>{
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
const getOrderIdsAndStaus = async(url)=>{
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

const loadOrderItems = async(status)=>{
    let orderItems =[];
    const OrderIdsAndStatus = await getOrderIdsAndStaus('/getOrderIdsAndStatus');
    const ordersIds = OrderIdsAndStatus.orderIds;
    const ordersStatus = OrderIdsAndStatus.orderStatus;
    for(let i = 0;i<ordersIds.length;++i){
        if(ordersStatus[i] == status){
            const result = await getOrderItems('/getOrderItems',{order_id:ordersIds[i]});
            orderItems.push(result);
        }
    }
    let parentElement = document.getElementById('productsContainer');
    const fragment = document.createDocumentFragment();
    for(const orderItem of orderItems){
        for(const order of orderItem){
            const container = document.createElement('div');
            container.className = 'col-lg-3 col-md-6 col-sm-6 align-self-center mb-30 trending-items col-md-6';

            const item = document.createElement('div');
            item.className = 'item';

            const thumb = document.createElement('div');
            thumb.className = 'thumb';

            const image = document.createElement('img');
            image.src = 'assets/images/trending-01.jpg';
            image.alt = '';

            thumb.appendChild(image);

            const price = document.createElement('span');
            price.className = 'price';
            price.innerHTML = `<em>$${order.productprice*order.quantity}</em>$${(order.afteroffer)*(order.quantity)}`;
            thumb.appendChild(price);

            item.appendChild(thumb);

            const downContent = document.createElement('div');
            downContent.className = 'down-content';

            const category = document.createElement('span');
            category.className = 'category';
            category.textContent = order.catagory;

            downContent.appendChild(category);

            const title = document.createElement('h4');
            title.textContent = order.name;

            downContent.appendChild(title);
            const linebreak = document.createElement('br');
            downContent.appendChild(linebreak);
            
            const order_id = document.createElement('p');
            order_id.textContent = `Order_Id : ${order.order_id}`;
            downContent.appendChild(order_id);

            const quantity = document.createElement('p');
            quantity.textContent = `Quantity : ${order.quantity}`;
            downContent.appendChild(quantity);
            
            const link = document.createElement('a');
            link.href = 'http://127.0.0.1:8000/productDetails';
            link.classList.add('link');

            const icon = document.createElement('i');
            icon.className = 'fa fa-shopping-bag';

            link.appendChild(icon);

            downContent.appendChild(link);

            item.appendChild(downContent);

            container.appendChild(item);

            const starsList = document.createElement("ul");
            starsList.classList.add("stars");
            for (let i = 0; i < 5; i++) {
                const starItem = document.createElement("li");
                starItem.style.float='left';
                starItem.style.color = '#ffcc00';
                const starIcon = document.createElement("i");
                starIcon.classList.add("fa", "fa-star");
                starItem.appendChild(starIcon);
                starsList.appendChild(starItem);
            }
            downContent.appendChild(starsList);
            fragment.appendChild(container);
        }
        
    }
    parentElement.innerHTML = '';
    parentElement.appendChild(fragment);
    
}


loadOrderItems('current')
.then(async()=>{
    const userData =  await getUserData('/userId');
    const profileName = document.getElementById('profileName');
    profileName.textContent= `${userData.firstname} ${userData.lastname}`;
});

const saveImage = async(url='',data={})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: data,
    });
    
    try{
        const result = await res.json();
        return result;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}

const showImage = async(imagename)=>{
    try{
        const img = document.getElementById('userImage');
        img.src = `http://127.0.0.1:8000/showImage/${imagename}`;
    }
    catch(error){
        console.log(`showing image from server error: ${error}`);
    }
}

let fileInput = document.getElementById('file-input');
    
fileInput.addEventListener('change', async function(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const response = await saveImage('/saveImage',formData);
    showImage(response.image);
});

const getImage = async(url)=>{
    const res = await fetch(url);
    try{
        const result = await res.json();
        return result;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}

getImage('/getImage')
.then((image)=>{
    console.log(image);
    showImage(image);
})

const btnCurrent = document.getElementById('btnCurrent');
const btnCompleted = document.getElementById('btnCompleted');

btnCurrent.addEventListener('click',async()=>{
    btnCurrent.classList.add('is_active');
    btnCompleted.classList.remove('is_active');
    await loadOrderItems('current');
});
btnCompleted.addEventListener('click',async()=>{
    btnCompleted.classList.add('is_active');
    btnCurrent.classList.remove('is_active');
    await loadOrderItems('completed');
});
