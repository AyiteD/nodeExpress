const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.set('view engine', 'ejs');

function handleIndexRequest(req, res) {
    const name = req.query.name || 'Stranger';

    res.render('home', { name: name });
}

function getCryptos(code) {
    return fetch('https://api.nexchange.io/en/api/v1/currency/')
        .then(cryptoData => cryptoData.json())
        .then(cryptoData => {
            return cryptoData.filter(crypto => crypto.code == code);
        })        
        .catch(err => console.log(err));
}

app.get('/', 
    (req, res) => {
        const code = req.query.code;

        getCryptos(code)
        .then(cryptoData => {
            res.render('home', { cryptoData: cryptoData });
        })
        .catch(err => console.log(err))
    }
);
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});