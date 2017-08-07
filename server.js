var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleone={
title:'article-1|Parul Sahi',
heading:'GST',
content:`<p>
    Goods and Services Tax (GST) is an indirect tax which was introduced in India on 1 July 2017 and was applicable throughout India which replaced multiple cascading taxes levied by the central and state governments. It was introduced as The Constitution (One Hundred and First Amendment) Act 2017, following the passage of Constitution 122nd Amendment Bill. The GST is governed by a GST Council and its Chairman is the Finance Minister of India.
    </p>
    <p>Under GST, goods and services are taxed at the following rates, 0, 5%, 12% ,18% and 28%. There is a special rate of 0.25% on rough precious and semi-precious stones and 3% on gold. In addition a cess of 15% or other rates on top of 28% GST applies on few items like aerated drinks, luxury cars and tobacco products. 
    </p>
    <p>GST was initially proposed to replace a slew of indirect taxes with a unified tax and was therefore set to dramatically reshape the country's 2 trillion dollar economy. The rate of GST in India is between double to four times that levied in other countries like Singapore.
    </p>`

};
var articletwo={
title:'article-2|Parul Sahi',
heading:'GLOBAL WARMING',
content:`<p>
    Goods and Services Tax (GST) is an indirect tax which was introduced in India on 1 July 2017 and was applicable throughout India which replaced multiple cascading taxes levied by the central and state governments. It was introduced as The Constitution (One Hundred and First Amendment) Act 2017, following the passage of Constitution 122nd Amendment Bill. The GST is governed by a GST Council and its Chairman is the Finance Minister of India.
    </p>
    <p>Under GST, goods and services are taxed at the following rates, 0, 5%, 12% ,18% and 28%. There is a special rate of 0.25% on rough precious and semi-precious stones and 3% on gold. In addition a cess of 15% or other rates on top of 28% GST applies on few items like aerated drinks, luxury cars and tobacco products. 
    </p>
    <p>GST was initially proposed to replace a slew of indirect taxes with a unified tax and was therefore set to dramatically reshape the country's 2 trillion dollar economy. The rate of GST in India is between double to four times that levied in other countries like Singapore.
    </p>`

};
var articlethree={
title:'article-3|Parul Sahi',
heading:'GST',
content:`<p>
    Global warming, also referred to as climate change, is the observed century-scale rise in the average temperature of the Earth's climate system and its related effects. Multiple lines of scientific evidence show that the climate system is warming. Many of the observed changes since the 1950s are unprecedented in the instrumental temperature record which extends back to the mid-19th century, and in paleoclimate proxy records covering thousands of years.
    </p>
    <p>In 2013, the Intergovernmental Panel on Climate Change (IPCC) Fifth Assessment Report concluded that "It is extremely likely that human influence has been the dominant cause of the observed warming since the mid-20th century." The largest human influence has been the emission of greenhouse gases such as carbon dioxide, methane and nitrous oxide.
    </p>
    <p>Climate model projections summarized in the report indicated that during the 21st century, the global surface temperature is likely to rise a further 0.3 to 1.7 °C (0.5 to 3.1 °F) in the lowest emissions scenario, and 2.6 to 4.8 °C (4.7 to 8.6 °F) in the highest emissions scenario. These findings have been recognized by the national science academies of the major industrialized nations and are not disputed by any scientific body of national or international standing.
    </p>`

};




function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
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

app.get('/article-1', function (req, res) {
 res.send(createTemplate(articleone));
});

app.get('/article-2', function (req, res) {
  res.send(createTemplate(articletwo));
});

app.get('/article-3', function (req, res) {
  res.send(createTemplate(articlethree));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
