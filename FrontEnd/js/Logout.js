const logoutButton = document.getElementById('btnLogout');
logoutButton.addEventListener('click',async ()=>{
        const res = await gotoLogoutRoute('/logout');
        console.log(res);
        await gotoLoginPage('/login');
});

const gotoLogoutRoute = async(url)=>{
    try{
        const response = await fetch(url); 
        return response;
    }
    catch(error)
    {
        throw new Error('error',error);
    }
}

const gotoLoginPage = async(url)=>{
    const res = await fetch(url);
    window.location.href = res.url;
}