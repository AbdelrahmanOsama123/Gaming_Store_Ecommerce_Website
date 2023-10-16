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
const getMostPlayedGames = async(url)=>{
    const res = await fetch(url);
    try{
        const data = res.json();
        return data;
    }
    catch(error){
        throw new Error('cannot get data from database '+error);
    }
}

const loadMostPlayedGames = async(url)=>{
    const games = await getMostPlayedGames(url);
    for(const game of games){
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("col-lg-2", "col-md-6", "col-sm-6");

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const thumbDiv = document.createElement("div");
        thumbDiv.classList.add("thumb");

        const anchorTag = document.createElement("a");
        anchorTag.href = "http://127.0.0.1:8000/productDetails";

        const image = document.createElement("img");
        image.src = `http://127.0.0.1:8000/showProductImage/${game.image}`;
        image.alt = "";
        image.classList.add('exploreImage');
        anchorTag.appendChild(image);
        thumbDiv.appendChild(anchorTag);

        const downContentDiv = document.createElement("div");
        downContentDiv.classList.add("down-content");

        const categorySpan = document.createElement("span");
        categorySpan.classList.add("category");
        categorySpan.textContent = game.catagory;
        categorySpan.classList.add('exploreCatagory');

        const h4Tag = document.createElement("h4");
        h4Tag.textContent = game.name;
        h4Tag.classList.add('exploreName');

        const exploreAnchorTag = document.createElement("a");
        exploreAnchorTag.href = "http://127.0.0.1:8000/productDetails";
        exploreAnchorTag.classList.add('explore');
        exploreAnchorTag.textContent = "Explore";

        downContentDiv.appendChild(categorySpan);
        downContentDiv.appendChild(h4Tag);
        downContentDiv.appendChild(exploreAnchorTag);

        itemDiv.appendChild(thumbDiv);
        itemDiv.appendChild(downContentDiv);

        parentDiv.appendChild(itemDiv);
        const Container = document.getElementById('Container');
        Container.appendChild(parentDiv);
    }
    return games;
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
            image.src = `http://127.0.0.1:8000/showProductImage/${product.image}`;
            image.classList.add('gameImage');

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

    const sendData = async (url,products)=>{
        const names = document.getElementsByClassName('name');
        const links = document.getElementsByClassName('link');
        const catagories = document.getElementsByClassName('catagory');
        const explores = document.getElementsByClassName('explore');
        const exploreNames = document.getElementsByClassName('exploreName');
        const exploreCatagories = document.getElementsByClassName('exploreCatagory');
        const gameImages = document.getElementsByClassName('gameImage');
        const exploreImages = document.getElementsByClassName('exploreImage')
        console.log(exploreImages[0]);

        for(let i = 0;i<links.length;++i){
            links[i].addEventListener('click',async ()=>{
            await sendToProductDetails(url,{name:names[i].textContent,catagory:catagories[i].textContent,description:products[i].description,image:gameImages[i].src})
            .then(async()=>{
                await fetch('/productDetails');
            })
            });
        }

        for(let i = 0;i<explores.length;++i){
            explores[i].addEventListener('click',async ()=>{
            await sendToProductDetails(url,{name:exploreNames[i].textContent,catagory:exploreCatagories[i].textContent,description:products[i].description,image:exploreImages[i].src})
            .then(async()=>{
                await fetch('/productDetails');
            })
            });
        }
    };  

loadTrendingProductsData('/trending')
.then(async()=>{
    const products = await loadMostPlayedGames('/getMostPlayed');
    await sendData('/target',products);
})

