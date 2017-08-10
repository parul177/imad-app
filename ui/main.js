var button=document.getElementById('counter');
button.onclick=function()
{
    //create req object
    var request=new XMLHttpRequest();
    //capture the response & store it in a variable
    request.onreadystatechange=function(){
    if(request.readystate===XMLHttpRequest.DONE)
    {
        //take action
        if(request.status===200)
        {
            var counter=request.responseText;
             var span=document.getElementById('count');
             span.innerHTML=counter.toString();
        }
    }
    };
    //make the request
    request.open('GET','http://pscancer177.imad.hasura-app.io/counter',true);
    request.send(null);
};