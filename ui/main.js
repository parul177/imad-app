console.log('Loaded!');
//to change the text on the page
var element= document.getElementById('main-text');
element.innerHTML='new changed text';
//to move the image
var img=document.getElementById('madi');
img.onclick=function()
{
    img.style.marginLeft='100px';
};