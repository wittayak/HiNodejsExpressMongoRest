const express = require('express');
const { Coin, validateCoin } = require('../models/coin');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    let coins = await Coin.find().sort('name');
    for (const coin of coins) {
        await getCurrentPrice(coin); 
    }
    
    res.send(coins);
});

router.post('/', async (req, res) => {
    const { error } = validateCoin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let coin = new Coin({
        code: req.body.code,
        name: req.body.name,
        price: 0
    });

    try {
        coin = await coin.save();
    } catch (err) {
        let messages = '';
        for (field in err.errors) {
            messages += ' ' + err.errors[field].message;
        }
        return res.status(400).send('Could not create coin: ' + messages);
    }
    
    res.send(coin);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const coin = await Coin.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        name: req.body.name
    },
    { new: true }
    );

    if (!coin) return res.status(404).send(`The coin ID ${req.params.id} was not found.`);

    res.send(coin);
})

router.delete('/:id', async (req, res) => {
    const coin = await Coin.findByIdAndRemove(req.params.id)
    if (!coin) return res.status(404).send(`The coin code ${req.params.id} was not found.`);
  
    res.send(coin);
});

async function getCurrentPrice(coin) {
    // call coingecko api to get current price of the coin
    await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.code}&vs_currencies=thb`)
        .then(function (response) {
            if (response.data) {
                for(const field in response.data) {
                    coin.price = response.data[field].thb;
                }
            } 

            return coin;
        })
        .catch(function (error) {
            console.log(error);
            return coin;
        });
}

module.exports = router;
