const btnShow = document.getElementById('btnShow');
const btnAdv = document.getElementById('btnAdv');
const btnStr = document.getElementById('btnStr');
const btnRac = document.getElementById('btnRac');
const btnSand = document.getElementById('btnSand');

btnShow.addEventListener('click',async()=>{
    let products  = await getAllData('/products');
    btnShow.classList.add('is_active');
    btnAdv.classList.remove('is_active');
    btnStr.classList.remove('is_active');
    btnRac.classList.remove('is_active');
    btnSand.classList.remove('is_active');
    await loadProducts(products)
    sendData('/target',products);
});

btnAdv.addEventListener('click',async()=>{
    btnAdv.classList.add('is_active');
    btnShow.classList.remove('is_active');
    btnStr.classList.remove('is_active');
    btnRac.classList.remove('is_active');
    btnSand.classList.remove('is_active');
    const products = await getDatabyCatagory('/products/catagory','ADVENTURE')
    sendData('/target',products);
});

btnStr.addEventListener('click',async()=>{
    btnStr.classList.add('is_active');
    btnAdv.classList.remove('is_active');
    btnShow.classList.remove('is_active');
    btnRac.classList.remove('is_active');
    btnSand.classList.remove('is_active');
    const products = await getDatabyCatagory('/products/catagory','STRATEGY')
    sendData('/target',products);
});

btnRac.addEventListener('click',async()=>{
    btnRac.classList.add('is_active');
    btnAdv.classList.remove('is_active');
    btnStr.classList.remove('is_active');
    btnShow.classList.remove('is_active');
    btnSand.classList.remove('is_active');
    const products = await getDatabyCatagory('/products/catagory','RACING')
    sendData('/target',products);
});

btnSand.addEventListener('click',async()=>{
    btnSand.classList.add('is_active');
    btnAdv.classList.remove('is_active');
    btnStr.classList.remove('is_active');
    btnRac.classList.remove('is_active');
    btnShow.classList.remove('is_active');
    const products = await getDatabyCatagory('/products/catagory','SANDBOX')
    sendData('/target',products);
});

const getProducts = async(url = '')=>{
    const res = await fetch(url);
    try{
        const products = await res.json();
        return products;
    }
    catch(error){
        throw new Error('cannot get data from database '+error);
    }
}
const getProductsByCatagory = async (url = ' ',catagory) => {
  // Append the query string to the URL
  const requestUrl = `${url}/${catagory}`;

  const res = await fetch(requestUrl);
  try{
    const newData = await res.json();
    return newData;
  }
  catch(error){
    throw new Error('cannot get data from database '+error);
    }
}

const getAllData = async(url)=>{
    let products = await getProducts(url);
    return products;
}

const getDatabyCatagory = async(url,catagory)=>{
    let products = await getProductsByCatagory(url,catagory);
    await loadProducts(products);
    return products;
}

const allProducts = async()=>{
    let products  = await getAllData('/products');
    await loadProducts(products)
    sendData('/target',products);
}
allProducts();

let productsContainer = document.getElementById('productsContainer');
const loadProducts = async(products)=>{
    const fragment = document.createDocumentFragment();
    for(const product of products){
        const container = document.createElement('div');
        container.className = 'col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6';

        const item = document.createElement('div');
        item.className = 'item';

        const thumb = document.createElement('div');
        thumb.className = 'thumb';

        const image = document.createElement('img');
        image.src = '../assets/images/trending-01.jpg';
        image.alt = 'not found';

        thumb.appendChild(image);

        const price = document.createElement('span');
        price.className = 'price';
        price.innerHTML = `<em>$${product.price}</em>$${product.afteroffer}`;
        price.classList.add('Price');
        thumb.appendChild(price);

        item.appendChild(thumb);

        const downContent = document.createElement('div');
        downContent.className = 'down-content';

        const category = document.createElement('span');
        category.className = 'category';
        category.textContent = product.catagory;
        category.classList.add('catagory');

        downContent.appendChild(category);

        const title = document.createElement('h4');
        title.textContent = product.name;
        title.classList.add('name');

        downContent.appendChild(title);

        const link = document.createElement('a');
        link.href = 'http://127.0.0.1:8000/productDetails';
        link.classList.add('link');

        const icon = document.createElement('i');
        icon.className = 'fa fa-shopping-bag';

        link.appendChild(icon);

        downContent.appendChild(link);

        item.appendChild(downContent);

        container.appendChild(item);
        fragment.appendChild(container);
    }
    productsContainer.innerHTML = '';
    productsContainer.appendChild(fragment);
    
}

const sendToProductDetails = async (url,data={})=>{
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
    
const sendData = async (url,products)=>{
        const names = document.getElementsByClassName('name');
        const links = document.getElementsByClassName('link');
        const catagories = document.getElementsByClassName('catagory');
        for(let i = 0;i<links.length;++i){
            links[i].addEventListener('click',async ()=>{
            await sendToProductDetails(url,{name:names[i].textContent,catagory:catagories[i].textContent,id:products[i].id,description:products[i].description})
            .then(async()=>{
                await fetch('/productDetails');
            })
            });
        }
    };  

const getPageProducts = async(url,data)=>{
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
const pageNumbers = document.getElementsByClassName('pageNumber');

const container = document.getElementById('container');
console.log(container);

const getEachPageProducts = async(pageNumber)=>{
        container.scrollIntoView({ behavior: 'smooth' });
        const offset = ((parseInt(pageNumber.textContent))-1)*4;
        const products = await getPageProducts('/limit4',{offset});
        console.log(products);
        await loadProducts(products);
        sendData('/target',products);
}

const handelePageNumbers = ()=>{
    for(const pageNumber of pageNumbers)
    {
        pageNumber.addEventListener('click',async(event)=>{
            event.preventDefault();
            getEachPageProducts(pageNumber);
        });
    }
}
handelePageNumbers();

