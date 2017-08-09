var button=document.getElementById('counter');
var counter=0;
button.click=function()
{
    counter++;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
    
};
