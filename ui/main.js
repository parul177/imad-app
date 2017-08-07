console.log('Loaded!');
//to change the text on the page
var element= document.getElementById('main-text');
element.innerHTML='new changed text';
//to move the image
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft + 10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function()
{
    var interval=setInterval(moveRight,100);
};