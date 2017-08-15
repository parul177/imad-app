var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config=
{
  user:'pscancer177',
  database:'pscancer177',
host:'db.imad.hasura-app.io',
port:'5432',
password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

var articles={
'articleone':{
title:'article-1|Parul Sahi',
heading:'GST',
 date: '25 October 2017',
content:`<p>
    Goods and Services Tax (GST) is an indirect tax which was introduced in India on 1 July 2017 and was applicable throughout India which replaced multiple cascading taxes levied by the central and state governments. It was introduced as The Constitution (One Hundred and First Amendment) Act 2017, following the passage of Constitution 122nd Amendment Bill. The GST is governed by a GST Council and its Chairman is the Finance Minister of India.
    </p>
    <p>Under GST, goods and services are taxed at the following rates, 0, 5%, 12% ,18% and 28%. There is a special rate of 0.25% on rough precious and semi-precious stones and 3% on gold. In addition a cess of 15% or other rates on top of 28% GST applies on few items like aerated drinks, luxury cars and tobacco products. 
    </p>
    <p>GST was initially proposed to replace a slew of indirect taxes with a unified tax and was therefore set to dramatically reshape the country's 2 trillion dollar economy. The rate of GST in India is between double to four times that levied in other countries like Singapore.
    </p>`

},
'articletwo':{
title:'article-2|Parul Sahi',
heading:'GLOBAL WARMING',
 date: '25 October 2016',
content:`<p>
    Goods and Services Tax (GST) is an indirect tax which was introduced in India on 1 July 2017 and was applicable throughout India which replaced multiple cascading taxes levied by the central and state governments. It was introduced as The Constitution (One Hundred and First Amendment) Act 2017, following the passage of Constitution 122nd Amendment Bill. The GST is governed by a GST Council and its Chairman is the Finance Minister of India.
    </p>
    <p>Under GST, goods and services are taxed at the following rates, 0, 5%, 12% ,18% and 28%. There is a special rate of 0.25% on rough precious and semi-precious stones and 3% on gold. In addition a cess of 15% or other rates on top of 28% GST applies on few items like aerated drinks, luxury cars and tobacco products. 
    </p>
    <p>GST was initially proposed to replace a slew of indirect taxes with a unified tax and was therefore set to dramatically reshape the country's 2 trillion dollar economy. The rate of GST in India is between double to four times that levied in other countries like Singapore.
    </p>`

},
'articlethree':{
title:'article-3|Parul Sahi',
heading:'GST',
 date: '25 October 2015',
content:`<p>
    Global warming, also referred to as climate change, is the observed century-scale rise in the average temperature of the Earth's climate system and its related effects. Multiple lines of scientific evidence show that the climate system is warming. Many of the observed changes since the 1950s are unprecedented in the instrumental temperature record which extends back to the mid-19th century, and in paleoclimate proxy records covering thousands of years.
    </p>
    <p>In 2013, the Intergovernmental Panel on Climate Change (IPCC) Fifth Assessment Report concluded that "It is extremely likely that human influence has been the dominant cause of the observed warming since the mid-20th century." The largest human influence has been the emission of greenhouse gases such as carbon dioxide, methane and nitrous oxide.
    </p>
    <p>Climate model projections summarized in the report indicated that during the 21st century, the global surface temperature is likely to rise a further 0.3 to 1.7 °C (0.5 to 3.1 °F) in the lowest emissions scenario, and 2.6 to 4.8 °C (4.7 to 8.6 °F) in the highest emissions scenario. These findings have been recognized by the national science academies of the major industrialized nations and are not disputed by any scientific body of national or international standing.
    </p>`

}
};



function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=
`
    <html>
<head>
<title>${title}
</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
 <link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
    <div>
        <a href="/">home</a>
    </div>
    <hr/>
    <div>
        <h3>
           ${heading}
           ${date}
        </h3>
    </div>
    <div>
        ${content}
    </div>
    </div>
</body>
</html>
`;
return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool=new Pool(config);

app.get('/test_db', function (req, res) 
{
pool.query('SELECT * FROM articles',function(err,result)
  {
  if(err)
      {
res.status(500).send(err.toString());
      }
  else
      {
         res.send(JSON.stringify(result.rows));
   }
  });
});

//app.get('/articleone', function (req, res) {
 //res.send(createTemplate(articleone));
//});

app.get('/articletwo', function (req, res) {
  res.send(createTemplate(articletwo));
});

app.get('/articlethree', function (req, res) {
  res.send(createTemplate(articlethree));
});


app.get('/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
    
    res.send(createTemplate(articles[articleName]));
});

app.get('/articletable/:articleName',function(req,res)
{
    var name=req.params.articleName;
   //pool.query("SELECT * FROM articletable WHERE title='"+req.params.articleName+ "'",function(err,result)
 //   pool.query("SELECT * FROM articletable where title= '"+name+"'",function(err,result)
   pool.query("SELECT * FROM user WHERE username= '"+name+"'",function(err,result)
   {
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          if(result.rows.length===0)
          {
              res.status(404).send('article not found');
          }
          else
          {
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
          
      }
   }); 
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var counter=0;
app.get('/counter', function (req, res) {
    counter++;
  res.send(counter.toString());
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submitname', function (req, res) {
    //get the names from the request
   // var name=req.params.name;
    var name=req.query.name;
    names.push(name);
    //JSON
    res.send(JSON.stringify(names));
  
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
