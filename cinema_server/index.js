const express = require('express');



const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', (req,res) =>{
    res.type('text/plain');
    res.send('Афиша кинотеатров')
})

app.use((req,res)=> {
    res.type('text/plain')
    res.status(404);
    res.send('404 - не найдено')
});

app.use((err, req, res, next)=> {
    console.log(err.stack)
    res.type('text/plain');
    res.status(500);
    res.send('500 - ошибка сервера')
});

app.listen(app.get('port'), ()=> {
    console.log('Express запущен на localhost:'+
    app.get('port')+ '; Нажмите Ctrl+C для завершения')
})