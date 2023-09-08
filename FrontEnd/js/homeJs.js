const getProducts = async(url)=>{
    const res = await fetch(url);
    try{
        const data = res.json();
        return data;
    }
    catch(error){
        throw new Error('cannot get data from database '+error);
    }
}

const loadTrendingProductsData = async(url)=>{
        const products = await getProducts(url);
        for(const product of products){
            const gamesContainer = document.getElementById('gamesContainer');

            const outerDiv = document.createElement("div");
            outerDiv.className = "col-lg-3 col-md-6 col-sm-6";

            // Create the inner div with class "item"
            const innerDiv = document.createElement("div");
            innerDiv.className = "item";

            // Create the thumb div
            const thumbDiv = document.createElement("div");
            thumbDiv.className = "thumb";

            // Create the image element
            const image = document.createElement("img");
            image.src = "assets/images/trending-01.jpg";
            image.alt = "";

            // Create the anchor element wrapping the image
            const anchor = document.createElement("a");
            anchor.href = "http://127.0.0.1:8000/productDetails";
            anchor.appendChild(image);
            // Create the span element with class "price"
            const priceSpan = document.createElement("span");
            priceSpan.className = "price";
            
            priceSpan.innerHTML = `<em>$${product.price}</em>$${product.afteroffer}`;

            // Append the image and price span to the thumb div
            thumbDiv.appendChild(anchor);
            thumbDiv.appendChild(priceSpan);

            // Create the down-content div
            const downContentDiv = document.createElement("div");
            downContentDiv.className = "down-content";

            // Create the category span
            const categorySpan = document.createElement("span");
            
            categorySpan.textContent = product.catagory;
            categorySpan.classList.add('catagory');
            // Create the h4 element
            const h4 = document.createElement("h4");
            h4.textContent = product.name;
            h4.classList.add('name');
            // Create the anchor element for the shopping bag icon
            const shoppingBagAnchor = document.createElement("a");
            shoppingBagAnchor.href = "http://127.0.0.1:8000/productDetails";
            shoppingBagAnchor.classList.add('link');

            // Create the shopping bag icon
            const shoppingBagIcon = document.createElement("i");
            shoppingBagIcon.className = "fa fa-shopping-bag";

            // Append the shopping bag icon to the anchor element
            shoppingBagAnchor.appendChild(shoppingBagIcon);

            // Append the category span, h4, and shopping bag anchor to the down-content div
            downContentDiv.appendChild(categorySpan);
            downContentDiv.appendChild(h4);
            downContentDiv.appendChild(shoppingBagAnchor);

            // Append the thumb div and down-content div to the inner div
            innerDiv.appendChild(thumbDiv);
            innerDiv.appendChild(downContentDiv);

            // Append the inner div to the outer div
            outerDiv.appendChild(innerDiv);

            // Append the outer div to the desired parent element in your HTML document
            // const parentElement = document.getElementById("parentElementId");
            // parentElement.appendChild(outerDiv);
            gamesContainer.appendChild(outerDiv);

        }
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
            console.log(data);
            return data;
          } catch (error) {
            console.log('error', error);
          }
    }

    const sendData = async (url)=>{
        const names = document.getElementsByClassName('name');
        const links = document.getElementsByClassName('link');
        const catagories = document.getElementsByClassName('catagory');
        for(let i = 0;i<links.length;++i){
            links[i].addEventListener('click',async ()=>{
            await sendToProductDetails(url,{name:names[i].textContent,catagory:catagories[i].textContent})
            .then(async()=>{
                await fetch('/productDetails');
            })
            });
        }
    };  

loadTrendingProductsData('/trending')
.then(function(){
    sendData('/target');
});

