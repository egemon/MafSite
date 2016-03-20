window.onload = function () {
    pageLogo.style.transform = 'scale(-1,1)';
    setTimeout(function () {
        pageLogo.style.transform = 'scale(1,1)';
        pageLogo.style.transform = '';
    }, 3000);
};