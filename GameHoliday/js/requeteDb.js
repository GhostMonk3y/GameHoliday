const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require ('./dbService')
dotenv.config();
port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {
    console.log(request.body);
    const obj = request.body;
    console.log(obj);
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewQuestion(obj);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAll();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
app.get('/getPoints', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getPoints();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
app.get('/getCultureG', (request, response) => {
    console.log('cultureG');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData('CultureG');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});
app.get('/getPixel', (request, response) => {
    console.log('getPixel');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData('Pixel');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});
app.get('/getDessin', (request, response) => {
    console.log('getDessin');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData('Dessin');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});
app.get('/getSport', (request, response) => {
    console.log('getSport');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData('Sport');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});
app.get('/getVoyage', (request, response) => {
    console.log('getVoyage');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData('Voyage');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});
app.get('/getMusique', (request, response) => {
    console.log('getMusique');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData('Musique');
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});

app.get('/getQuestion/:theme/:point', (request, response) => {
    console.log('getQuestion');
    const db = dbService.getDbServiceInstance();
    const themeQuestion  = request.params.theme;
    const pointQuestion  = request.params.point;
    const result = db.getQuestion(themeQuestion, pointQuestion);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

});

// update

app.patch('/reset', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.reset();
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

app.patch('/addPoints/:equipe1/:equipe2/:equipe3', (request, response) => {
    console.log('ici wsh');
    const db = dbService.getDbServiceInstance();
    const equipe1  = request.params.equipe1;
    const equipe2  = request.params.equipe2;
    const equipe3  = request.params.equipe3;
    console.log('ici');
    const result = db.addPoints(equipe1, equipe2, equipe3);
    console.log('après result')
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})
// delete

app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRow(id);
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})